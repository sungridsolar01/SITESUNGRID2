(() => {
  const destinationCodes = [115, 117, 110, 103, 114, 105, 100, 109, 114, 111, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
  const destination = destinationCodes.map((code) => String.fromCharCode(code)).join("");

  document.querySelectorAll(".mobile-menu").forEach((menu) => {
    const summary = menu.querySelector("summary");

    menu.addEventListener("toggle", () => {
      summary?.setAttribute("aria-label", menu.open ? "Fechar menu" : "Abrir menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.removeAttribute("open"));
    });
  });

  const navGroups = document.querySelectorAll(".nav-group");
  document.addEventListener("click", (event) => {
    navGroups.forEach((group) => {
      if (group.open && !group.contains(event.target)) group.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") navGroups.forEach((group) => group.removeAttribute("open"));
  });

  document.querySelectorAll("[data-youtube-id]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(link.dataset.youtubeId)}?autoplay=1&rel=0`;
      iframe.title = link.dataset.youtubeTitle || "Vídeo do YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      link.replaceWith(iframe);
    });
  });

  document.querySelectorAll("[data-sungrid-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const label = form.querySelector("[data-submit-label]");
      const feedback = form.querySelector("[data-form-feedback]");
      const idleLabel = label?.textContent || "Enviar solicitação";

      form.setAttribute("aria-busy", "true");
      button?.setAttribute("disabled", "");
      if (label) label.textContent = "Enviando...";
      if (feedback) {
        feedback.textContent = "";
        feedback.className = "form-feedback sending";
      }

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${destination}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (!response.ok) throw new Error("Falha no envio");

        form.reset();
        if (feedback) {
          feedback.textContent = "Solicitação enviada. A equipe Sungrid entrará em contato em breve.";
          feedback.className = "form-feedback success";
        }
      } catch {
        if (feedback) {
          feedback.textContent = "Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.";
          feedback.className = "form-feedback error";
        }
      } finally {
        form.setAttribute("aria-busy", "false");
        button?.removeAttribute("disabled");
        if (label) label.textContent = idleLabel;
      }
    });
  });
})();
