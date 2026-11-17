/*
 * Calculadora Solar da Sungrid (/calculadora-solar/ e /calculadora-solar/resultado/).
 * Os parâmetros vêm do JSON #solar-calculator-config, gerado a partir de
 * app/_components/solarCalculatorConfig.ts. Sem tarifa e fator de desempenho
 * configurados, nenhum número é exibido.
 */
(function (root) {
  "use strict";

  var STORAGE_KEY = "sungrid-calculadora-solar";
  var NBSP = /\u00a0|\u202f/g;

  function isConfigured(config) {
    return !!config
      && typeof config.tarifaRsPorKwh === "number" && config.tarifaRsPorKwh > 0
      && typeof config.fatorDesempenho === "number" && config.fatorDesempenho > 0 && config.fatorDesempenho <= 1
      && config.irradiacaoKwhM2Dia > 0 && config.diasMes > 0 && config.potenciaModuloKwp > 0 && config.precoPorKwp > 0;
  }

  /** Converte a posição do slider em gasto; no fim da barra marca "a partir de". */
  function normalizeGasto(value, config) {
    var gasto = Math.round(Number(value));
    if (!isFinite(gasto) || gasto <= 0) return null;
    var maisQue = gasto >= config.gastoMaximo;
    return { gasto: maisQue ? config.gastoMaximo : gasto, aPartirDe: maisQue };
  }

  /**
   * Estimativa do sistema. Retorna null quando a configuração está incompleta
   * ou o gasto é inválido.
   */
  function calcular(gastoInformado, config) {
    if (!isConfigured(config)) return null;
    var gasto = normalizeGasto(gastoInformado, config);
    if (!gasto) return null;
    var consumoKwhMes = gasto.gasto / config.tarifaRsPorKwh;
    var potenciaKwp = consumoKwhMes / (config.irradiacaoKwhM2Dia * config.diasMes * config.fatorDesempenho);
    // Arredonda para cima, tolerando ruído de ponto flutuante (ex.: 1,2 / 0,6).
    var placas = Math.ceil(Number((potenciaKwp / config.potenciaModuloKwp).toFixed(9)));
    // A partir do limite (ex.: >= 30 kWp, sem arredondar), o sistema inteiro usa o preço reduzido.
    var precoPorKwp = precoPorKwpPara(potenciaKwp, config);
    var valor = potenciaKwp * precoPorKwp;
    return {
      gasto: gasto.gasto,
      aPartirDe: gasto.aPartirDe,
      consumoKwhMes: consumoKwhMes,
      potenciaKwp: potenciaKwp,
      placas: placas,
      precoPorKwp: precoPorKwp,
      valor: valor,
    };
  }

  function precoPorKwpPara(potenciaKwp, config) {
    var limite = Number(config.limiteKwpPrecoReduzido);
    var reduzido = Number(config.precoPorKwpAcimaLimite);
    if (limite > 0 && reduzido > 0 && potenciaKwp >= limite) return reduzido;
    return config.precoPorKwp;
  }

  function formatBRL(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0, minimumFractionDigits: 0 })
      .format(Math.round(value)).replace(NBSP, " ");
  }

  function formatKwp(value) {
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value).replace(NBSP, " ") + " kWp";
  }

  function formatGastoLabel(value, config) {
    return Number(value) >= config.gastoMaximo ? formatBRL(config.gastoMaximo) + " ou mais" : formatBRL(Number(value) || 0);
  }

  function formatValorEstimado(result) {
    // Usado em [VALOR] da mensagem: "no valor de R$ X (a partir desse valor)" no caso de R$ 10.000 ou mais.
    return result.aPartirDe ? formatBRL(result.valor) + " (a partir desse valor)" : formatBRL(result.valor);
  }

  function cidadeLabel(cidade, uf) {
    return uf ? cidade + " - " + uf : cidade;
  }

  /** Mensagem pedida pela Sungrid para o botão "Confirme seu orçamento". */
  function buildWhatsappMessage(data) {
    return "Olá, tudo bem? Calculei estimativa do meu projeto e será de " + data.placas + " placas e no valor de " + data.valor
      + ". Gostaria de confirmar esse orçamento para a cidade " + cidadeLabel(data.cidade, data.uf)
      + "\nInteresse em baterias e sistemas de armazenamento: " + (data.baterias === "sim" ? "Sim" : "Não");
  }

  /** Mensagem usada enquanto a calculadora está em configuração. */
  function buildUnconfiguredMessage(data, config) {
    var parts = ["Olá, Sungrid! Usei a calculadora solar do site e gostaria de uma estimativa."];
    if (data.cidade) parts.push("Cidade: " + cidadeLabel(data.cidade, data.uf) + ".");
    if (data.gasto) parts.push("Gasto mensal com energia: " + formatGastoLabel(data.gasto, config) + ".");
    if (data.baterias) parts.push("Interesse em baterias e sistemas de armazenamento: " + (data.baterias === "sim" ? "Sim" : "Não"));
    return parts.join("\n");
  }

  function whatsappUrl(number, text) {
    return "https://wa.me/" + String(number).replace(/\D/g, "") + "?text=" + encodeURIComponent(text);
  }

  function buildQuery(data) {
    var params = new URLSearchParams();
    params.set("uf", data.uf);
    params.set("cidade", data.cidade);
    params.set("gasto", String(data.gasto));
    params.set("baterias", data.baterias);
    return params.toString();
  }

  /** Lê e valida os dados do fluxo (estado, cidade, gasto e baterias). */
  function parseQuery(search, config) {
    var params = new URLSearchParams(search || "");
    var uf = (params.get("uf") || "").toUpperCase();
    var cidade = (params.get("cidade") || "").trim();
    var baterias = params.get("baterias");
    var gasto = normalizeGasto(params.get("gasto"), config);
    if (!/^[A-Z]{2}$/.test(uf) || !cidade || cidade.length > 80 || !gasto || (baterias !== "sim" && baterias !== "nao")) return null;
    return { uf: uf, cidade: cidade, gasto: gasto.aPartirDe ? config.gastoMaximo : gasto.gasto, baterias: baterias };
  }

  var core = {
    isConfigured: isConfigured,
    normalizeGasto: normalizeGasto,
    calcular: calcular,
    precoPorKwpPara: precoPorKwpPara,
    formatBRL: formatBRL,
    formatKwp: formatKwp,
    formatGastoLabel: formatGastoLabel,
    formatValorEstimado: formatValorEstimado,
    buildWhatsappMessage: buildWhatsappMessage,
    buildUnconfiguredMessage: buildUnconfiguredMessage,
    whatsappUrl: whatsappUrl,
    buildQuery: buildQuery,
    parseQuery: parseQuery,
  };
  root.SungridSolarCalculator = core;

  if (typeof document === "undefined") return;

  function readConfig() {
    var node = document.getElementById("solar-calculator-config");
    if (!node) return null;
    try { return JSON.parse(node.textContent || "{}"); } catch (error) { return null; }
  }

  function saveState(data) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (error) { /* modo privado */ }
  }

  function loadState() {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null"); } catch (error) { return null; }
  }

  function normalizeText(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  var cityCache = {};
  function loadCities(uf, version) {
    if (cityCache[uf]) return cityCache[uf];
    cityCache[uf] = fetch("/data/municipios/" + encodeURIComponent(uf) + ".json?v=" + encodeURIComponent(version || ""))
      .then(function (response) { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); })
      .catch(function (error) { delete cityCache[uf]; throw error; });
    return cityCache[uf];
  }

  function initForm(form, config) {
    var uf = form.querySelector("[name=uf]");
    var cidade = form.querySelector("[name=cidade]");
    var datalist = document.getElementById(cidade.getAttribute("list"));
    var gasto = form.querySelector("[name=gasto]");
    var gastoOutput = form.querySelector("[data-gasto-output]");
    var error = form.querySelector("[data-calc-error]");
    var pending = document.querySelector("[data-calc-unconfigured]");
    var pendingLink = pending && pending.querySelector("a");
    var version = form.getAttribute("data-version") || "";
    var cities = [];

    function showError(message, field) {
      error.textContent = message;
      error.hidden = !message;
      if (field) field.focus();
    }

    function updateGasto() {
      var label = formatGastoLabel(gasto.value, config);
      gastoOutput.textContent = label;
      gasto.setAttribute("aria-valuetext", label);
      gasto.style.setProperty("--fill", (Number(gasto.value) / Number(gasto.max)) * 100 + "%");
    }

    function populateCities(selected) {
      cities = [];
      datalist.innerHTML = "";
      cidade.disabled = true;
      cidade.placeholder = "Carregando cidades...";
      return loadCities(uf.value, version).then(function (list) {
        cities = list;
        var fragment = document.createDocumentFragment();
        list.forEach(function (name) { var option = document.createElement("option"); option.value = name; fragment.appendChild(option); });
        datalist.appendChild(fragment);
        cidade.disabled = false;
        cidade.placeholder = "Digite e selecione a cidade";
        if (typeof selected === "string") cidade.value = selected;
      }).catch(function () {
        cidade.disabled = false;
        cidade.placeholder = "Digite a cidade";
      });
    }

    function matchCity(value) {
      var wanted = normalizeText(value);
      if (!wanted) return "";
      if (!cities.length) return value.trim();
      for (var i = 0; i < cities.length; i += 1) if (normalizeText(cities[i]) === wanted) return cities[i];
      return "";
    }

    var params = new URLSearchParams(location.search);
    var saved = parseQuery(params.toString(), config) || loadState();
    if (saved && saved.uf && uf.querySelector('option[value="' + saved.uf + '"]')) uf.value = saved.uf;
    if (saved && saved.gasto) gasto.value = String(Math.min(Number(saved.gasto), config.gastoMaximo));
    if (saved && saved.baterias) {
      var radio = form.querySelector('[name=baterias][value="' + saved.baterias + '"]');
      if (radio) radio.checked = true;
    }
    updateGasto();
    populateCities(saved && saved.uf === uf.value ? saved.cidade : "");

    gasto.addEventListener("input", updateGasto);
    uf.addEventListener("change", function () { cidade.value = ""; populateCities(""); if (pending) pending.hidden = true; });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var city = matchCity(cidade.value);
      var bateria = form.querySelector("[name=baterias]:checked");
      if (!city) return showError("Selecione uma cidade da lista.", cidade);
      if (!(Number(gasto.value) > 0)) return showError("Arraste a barra para informar o gasto mensal com energia.", gasto);
      if (!bateria) return showError("Responda se tem interesse em baterias e sistemas de armazenamento.", form.querySelector("[name=baterias]"));
      showError("");
      cidade.value = city;
      var data = { uf: uf.value, cidade: city, gasto: Number(gasto.value), baterias: bateria.value };
      saveState(data);
      if (!isConfigured(config)) {
        if (pending) {
          pendingLink.href = whatsappUrl(config.whatsappNumber, buildUnconfiguredMessage(data, config));
          pending.hidden = false;
          pending.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
      location.href = form.getAttribute("action") + "?" + buildQuery(data);
    });
  }

  function initResult(container, config) {
    var data = parseQuery(location.search, config);
    if (!data) {
      location.replace(container.getAttribute("data-form-url") || "/calculadora-solar/");
      return;
    }
    saveState(data);
    var pending = container.querySelector("[data-calc-unconfigured]");
    var result = calcular(data.gasto, config);
    if (!result) {
      pending.querySelector("a").href = whatsappUrl(config.whatsappNumber, buildUnconfiguredMessage(data, config));
      pending.hidden = false;
      return;
    }
    var valor = formatValorEstimado(result);
    container.querySelector("[data-result-kwp]").textContent = formatKwp(result.potenciaKwp);
    container.querySelector("[data-result-placas]").textContent = String(result.placas);
    container.querySelector("[data-result-valor]").textContent = formatBRL(result.valor);
    container.querySelector("[data-result-apartir]").hidden = !result.aPartirDe;
    container.querySelector("[data-result-whatsapp]").href = whatsappUrl(config.whatsappNumber, buildWhatsappMessage({
      placas: result.placas,
      valor: valor,
      cidade: data.cidade,
      uf: data.uf,
      baterias: data.baterias,
    }));
    container.querySelector("[data-result-ready]").hidden = false;
  }

  function init() {
    var config = readConfig();
    if (!config) return;
    var form = document.querySelector("[data-solar-calculator]");
    if (form) initForm(form, config);
    var result = document.querySelector("[data-solar-result]");
    if (result) initResult(result, config);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : globalThis);
