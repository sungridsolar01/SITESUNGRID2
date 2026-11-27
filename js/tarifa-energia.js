/* Página /tarifa-energia-sp/: consulta da distribuidora por cidade ou CEP e links para a calculadora e o WhatsApp. */
(function (global) {
  "use strict";

  var WHATSAPP = "5512991886006";

  function normalizeText(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function formatPct(value) {
    return "+" + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  }

  /** Lê "350", "350,50", "R$ 1.200,00" ou "1200.5" e devolve o número (ou null). */
  function parseValor(text) {
    var raw = String(text || "").replace(/[^0-9.,]/g, "");
    if (!raw) return null;
    if (raw.indexOf(",") >= 0) raw = raw.replace(/\./g, "").replace(",", ".");
    else if (/^\d{1,3}(\.\d{3})+$/.test(raw)) raw = raw.replace(/\./g, "");
    var value = Number(raw);
    return isFinite(value) && value > 0 && value < 1000000 ? value : null;
  }

  function formatValor(value) {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /** Mensagem do WhatsApp; cidade e valor entram só quando foram informados. */
  function whatsappText(cidade, valor) {
    var text = "Olá! Vi a página de tarifas.";
    if (cidade && valor) text += " Moro em " + cidade + " e minha conta é de cerca de R$ " + formatValor(valor) + ".";
    else if (cidade) text += " Moro em " + cidade + ".";
    else if (valor) text += " Minha conta é de cerca de R$ " + formatValor(valor) + ".";
    return text + " Quero uma simulação.";
  }

  function calculatorHref(cidade, valor) {
    var params = new URLSearchParams();
    if (cidade) { params.set("uf", "SP"); params.set("cidade", cidade); }
    if (valor) params.set("gasto", String(Math.round(valor)));
    var query = params.toString();
    return "/calculadora-solar/" + (query ? "?" + query : "");
  }

  /** Texto do resultado para uma cidade da tabela [nome, chave, outras?]. */
  function describe(entry, config) {
    var nome = entry[0];
    var key = entry[1];
    var outras = entry[2] || [];
    var html;
    if (key.indexOf("coop:") === 0) {
      html = "Em " + escapeHtml(nome) + ", a distribuidora principal é a cooperativa <strong>" + escapeHtml(key.slice(5)) + "</strong>. As cooperativas não entram neste ranking.";
    } else {
      var dist = config.distribuidoras[key];
      html = "Sua distribuidora: <strong>" + escapeHtml(dist.nome) + "</strong>. A tarifa dela subiu <strong>" + formatPct(dist.alta) + "</strong> no período.";
    }
    if (outras.length) html += " Em " + escapeHtml(nome) + ", parte dos imóveis é atendida por " + escapeHtml(outras.join(" e ")) + "; confira o nome na sua conta de luz.";
    return html;
  }

  /** Texto do balão do mapa: só a distribuidora (nunca a cidade). */
  function areaLabel(key, config) {
    if (!key) return "";
    if (key.indexOf("coop:") === 0) return key.slice(5) + " (cooperativa)";
    var dist = config.distribuidoras[key];
    return dist ? dist.nome + " — a tarifa subiu " + formatPct(dist.alta) : "";
  }

  /** Mapa interativo: destaca a área inteira da distribuidora no mouse, toque, teclado, ranking e consulta. */
  function initMap(config) {
    var stage = document.querySelector("[data-tarifa-map]");
    var noop = { select: function () {} };
    if (!stage || !global.fetch || !global.DOMParser) return noop;
    var img = stage.querySelector("img");
    var tip = stage.querySelector("[data-tarifa-tip]");
    var hint = document.querySelector("[data-tarifa-hint]");
    var bars = document.querySelector(".tarifa-bars");
    var rows = bars ? Array.prototype.slice.call(bars.querySelectorAll("li[data-key]")) : [];
    var svg = null, areas = [], lift = null;
    var hoverKey = null, focusKey = null, selectedKey = null, fromLookup = false, shown = null, pointer = null;
    var api = { select: function (key) { selectedKey = key || null; fromLookup = !!selectedKey; pointer = null; render(); } };

    function areaFor(key) { for (var i = 0; i < areas.length; i++) if (areas[i].getAttribute("data-key") === key) return areas[i]; return null; }

    function placeTip(key) {
      var box = stage.getBoundingClientRect();
      var x, y;
      if (pointer) { x = pointer.x - box.left; y = pointer.y - box.top; }
      else {
        var marker = svg.querySelector('.tm-k[data-key="' + key + '"] circle');
        var rect = (marker || areaFor(key)).getBoundingClientRect();
        x = rect.left + rect.width / 2 - box.left;
        y = rect.top + (marker ? 0 : rect.height / 2) - box.top;
      }
      var half = Math.min(tip.offsetWidth / 2, box.width / 2);
      x = Math.max(half + 4, Math.min(box.width - half - 4, x));
      tip.style.left = x + "px";
      tip.style.top = Math.max(tip.offsetHeight + 16, y) + "px";
    }

    function render() {
      if (!svg) return;
      var key = hoverKey || focusKey || selectedKey;
      var label = areaLabel(key, config);
      if (!label) key = null;
      stage.classList.toggle("is-active", !!key);
      if (bars) bars.classList.toggle("is-active", !!key && !!config.distribuidoras[key]);
      areas.forEach(function (area) {
        var on = area.getAttribute("data-key") === key;
        area.classList.toggle("is-on", on);
        area.setAttribute("aria-pressed", String(area.getAttribute("data-key") === selectedKey));
      });
      Array.prototype.forEach.call(svg.querySelectorAll(".tm-k"), function (marker) { marker.classList.toggle("is-on", marker.getAttribute("data-key") === key); });
      rows.forEach(function (row) { row.classList.toggle("is-on", row.getAttribute("data-key") === key); });
      if (key !== shown) {
        while (lift.firstChild) lift.removeChild(lift.firstChild);
        if (key) {
          var copy = document.createElementNS("http://www.w3.org/2000/svg", "g");
          copy.setAttribute("class", areaFor(key).getAttribute("class").replace(/\b(tm-a|is-on)\b/g, "").replace(/\s+/g, " ").trim());
          Array.prototype.forEach.call(areaFor(key).childNodes, function (node) { copy.appendChild(node.cloneNode(true)); });
          lift.appendChild(copy);
        }
        shown = key;
      }
      if (key) { tip.textContent = label; tip.hidden = false; placeTip(key); }
      else tip.hidden = true;
    }

    function keyOf(target) {
      var area = target && target.closest ? target.closest(".tm-a") : null;
      return area && svg && svg.contains(area) ? area.getAttribute("data-key") : null;
    }

    function wire() {
      areas = Array.prototype.slice.call(svg.querySelectorAll(".tm-a[data-key]"));
      lift = svg.querySelector(".tm-lift");
      svg.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch") return;
        var key = keyOf(event.target);
        pointer = key ? { x: event.clientX, y: event.clientY } : null;
        if (key !== hoverKey) { hoverKey = key; render(); }
        else if (key) placeTip(key);
      });
      svg.addEventListener("pointerleave", function () { hoverKey = null; pointer = null; render(); });
      svg.addEventListener("click", function (event) {
        var key = keyOf(event.target);
        pointer = null;
        selectedKey = key && key !== selectedKey ? key : null;
        fromLookup = false;
        if (!selectedKey && document.activeElement && svg.contains(document.activeElement)) document.activeElement.blur();
        if (!key || event.pointerType === "touch" || !event.pointerType) hoverKey = null;
        render();
      });
      svg.addEventListener("focusin", function (event) {
        var visible = true;
        try { visible = event.target.matches(":focus-visible"); } catch (error) {}
        focusKey = visible ? keyOf(event.target) : null;
        if (focusKey) pointer = null;
        render();
      });
      svg.addEventListener("focusout", function () { focusKey = null; render(); });
      svg.addEventListener("keydown", function (event) {
        var key = keyOf(event.target);
        if (key && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          selectedKey = key === selectedKey ? null : key;
          fromLookup = false;
          render();
        }
      });
      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape" || !(hoverKey || focusKey || selectedKey)) return;
        hoverKey = focusKey = selectedKey = null;
        pointer = null;
        if (document.activeElement && svg.contains(document.activeElement)) document.activeElement.blur();
        render();
      });
      document.addEventListener("click", function (event) {
        if (!selectedKey || fromLookup || svg.contains(event.target)) return;
        if (event.target.closest && event.target.closest("[data-tarifa-lookup]")) return;
        selectedKey = null;
        render();
      });
      rows.forEach(function (row) {
        row.addEventListener("mouseenter", function () { hoverKey = row.getAttribute("data-key"); pointer = null; render(); });
        row.addEventListener("mouseleave", function () { hoverKey = null; render(); });
      });
      global.addEventListener("resize", function () { if (shown) placeTip(shown); });
      if (hint) hint.hidden = false;
      render();
    }

    fetch(img.currentSrc || img.src)
      .then(function (response) { if (!response.ok) throw new Error("HTTP " + response.status); return response.text(); })
      .then(function (text) {
        var parsed = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
        if (!parsed || parsed.nodeName.toLowerCase() !== "svg") return;
        svg = document.importNode(parsed, true);
        svg.setAttribute("role", "group");
        svg.setAttribute("aria-describedby", "tarifa-map-tip");
        svg.setAttribute("focusable", "false");
        stage.replaceChild(svg, img);
        wire();
      })
      .catch(function () {});
    return api;
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  function init() {
    var form = document.querySelector("[data-tarifa-lookup]");
    var configNode = document.getElementById("tarifa-config");
    if (!configNode) return;
    var config = JSON.parse(configNode.textContent);
    var map = initMap(config);
    if (!form) return;
    var cidadeInput = form.querySelector("[data-tarifa-cidade]");
    var contaInput = form.querySelector("[data-tarifa-conta]");
    var result = form.querySelector("[data-tarifa-result]");
    var calcLink = form.querySelector("[data-tarifa-calc]");
    var waLink = form.querySelector("[data-tarifa-wa]");
    var datalist = document.getElementById(cidadeInput.getAttribute("list"));
    var cities = null;
    var byName = {};
    var current = "";
    var lookupId = 0;

    function load() {
      if (cities) return cities;
      cities = fetch(config.dataUrl)
        .then(function (response) { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); })
        .then(function (data) {
          var fragment = document.createDocumentFragment();
          Object.keys(data).forEach(function (code) {
            byName[normalizeText(data[code][0])] = data[code];
            var option = document.createElement("option");
            option.value = data[code][0];
            fragment.appendChild(option);
          });
          datalist.appendChild(fragment);
          return data;
        })
        .catch(function (error) { cities = null; throw error; });
      return cities;
    }

    function updateLinks() {
      var valor = parseValor(contaInput.value);
      calcLink.href = calculatorHref(current, valor);
      waLink.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(whatsappText(current, valor));
    }

    function show(html) { result.innerHTML = html; }

    function lookup() {
      var value = cidadeInput.value.trim();
      var id = ++lookupId;
      current = "";
      updateLinks();
      map.select(null);
      if (!value) return show("Digite sua cidade ou CEP para ver a distribuidora e quanto a tarifa dela subiu no período.");
      var cep = value.replace(/\D/g, "");
      if (/^\d{5}-?\d{3}$/.test(value.replace(/\s/g, ""))) {
        show("Buscando o CEP...");
        Promise.all([load(), fetch("https://viacep.com.br/ws/" + cep + "/json/").then(function (r) { return r.json(); })])
          .then(function (res) {
            if (id !== lookupId) return;
            var data = res[0];
            var cepInfo = res[1];
            if (!cepInfo || cepInfo.erro) return show("Não encontramos esse CEP. Confira os números ou digite o nome da cidade.");
            if (cepInfo.uf !== "SP") return show("Esse CEP é de " + escapeHtml(cepInfo.localidade) + " - " + escapeHtml(cepInfo.uf) + ". Esta página mostra só as distribuidoras do estado de São Paulo.");
            var entry = data[cepInfo.ibge];
            if (!entry) return show("Não encontramos a distribuidora de " + escapeHtml(cepInfo.localidade) + ". Confira o nome da distribuidora na sua conta de luz.");
            current = entry[0];
            updateLinks();
            show(describe(entry, config));
            map.select(entry[1]);
          })
          .catch(function () { if (id === lookupId) show("Não foi possível consultar o CEP agora. Digite o nome da cidade."); });
        return;
      }
      if (/^\d+$/.test(cep) && cep.length === value.replace(/[\s-]/g, "").length) return show("Digite o CEP com 8 números ou o nome da cidade.");
      load().then(function () {
        if (id !== lookupId) return;
        var entry = byName[normalizeText(value)];
        if (!entry) return show("Não encontramos essa cidade no estado de São Paulo. Confira o nome ou digite o CEP.");
        current = entry[0];
        cidadeInput.value = entry[0];
        updateLinks();
        show(describe(entry, config));
        map.select(entry[1]);
      }).catch(function () { if (id === lookupId) show("Não foi possível carregar a lista de cidades agora. Tente de novo em instantes."); });
    }

    cidadeInput.addEventListener("focus", function () { load().catch(function () {}); }, { once: true });
    cidadeInput.addEventListener("change", lookup);
    cidadeInput.addEventListener("keydown", function (event) { if (event.key === "Enter") { event.preventDefault(); lookup(); } });
    contaInput.addEventListener("input", updateLinks);
    contaInput.addEventListener("blur", function () {
      var valor = parseValor(contaInput.value);
      if (valor) contaInput.value = "R$ " + formatValor(valor);
      updateLinks();
    });
    form.addEventListener("submit", function (event) { event.preventDefault(); lookup(); });
  }

  global.SungridTarifa = { parseValor: parseValor, whatsappText: whatsappText, calculatorHref: calculatorHref, normalizeText: normalizeText, areaLabel: areaLabel };
  if (typeof document === "undefined") return;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : globalThis);
