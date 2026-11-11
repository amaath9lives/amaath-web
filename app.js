/* Lógica de la web — no hace falta tocar este archivo */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const P = typeof PERFIL !== "undefined" ? PERFIL : {};
  const LIST = typeof PROYECTOS !== "undefined" ? PROYECTOS : [];
  const C = typeof CONTACTO !== "undefined" ? CONTACTO : {};

  // ---------- Vídeo ----------
  function ytId(u) { const m = (u || "").match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : null; }
  function vimeo(u) { const m = (u || "").match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/); return m ? { id: m[1], h: m[2] } : null; }
  function embed(u) {
    const y = ytId(u);
    if (y) return "https://www.youtube-nocookie.com/embed/" + y + "?autoplay=1&rel=0&modestbranding=1";
    const v = vimeo(u);
    if (v) return "https://player.vimeo.com/video/" + v.id + "?autoplay=1&byline=0&title=0&portrait=0" + (v.h ? "&h=" + v.h : "");
    return null;
  }
  function cover(p) {
    if (p.portada) return p.portada;
    const y = ytId(p.video);
    return y ? "https://i.ytimg.com/vi/" + y + "/maxresdefault.jpg" : null;
  }

  // ---------- Portada ----------
  if (P.nombre) $("#heroName").textContent = P.nombre;
  if (P.frase) $("#heroFrase").textContent = P.frase;
  if (P.videoPortada) {
    $("#heroBg").innerHTML = '<video autoplay muted loop playsinline src="' + esc(P.videoPortada) + '"></video>';
  }
  // Código de tiempo a 25 fps
  const tc = $("#tc"), t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  (function tick(now) {
    const f = Math.floor(((now || t0) - t0) / 40);
    tc.textContent = pad(Math.floor(f / 90000) % 24) + ":" + pad(Math.floor(f / 1500) % 60) + ":" + pad(Math.floor(f / 25) % 60) + ":" + pad(f % 25);
    requestAnimationFrame(tick);
  })();

  // Cifras
  const stats = $("#stats");
  (P.cifras || []).forEach((c) => {
    const d = document.createElement("div");
    d.className = "stat";
    d.innerHTML = "<b>" + esc(c.valor) + '</b><span class="mono">' + esc(c.texto) + "</span>";
    stats.appendChild(d);
  });
  if (!stats.children.length) stats.remove();

  // ---------- Trabajos ----------
  const grid = $("#grid");
  const filled = LIST.filter((p) => p.video || p.portada || p.titulo);
  $("#count").textContent = filled.length ? "(" + filled.length + ")" : "";
  LIST.forEach((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    const img = cover(p);
    const card = document.createElement("article");
    card.dataset.artista = p.artista || "";
    if (!p.video && !img && !p.titulo) {
      card.className = "card empty";
      card.innerHTML = '<div class="thumb"><span class="mono">Hueco para videoclip</span></div>' +
        '<div class="meta"><span class="mono n">' + n + "</span><h3>Título<small>Artista</small></h3></div>";
    } else {
      card.className = "card";
      card.innerHTML =
        '<div class="thumb">' +
        (img ? '<img loading="lazy" src="' + esc(img) + '" alt="' + esc((p.artista || "") + " — " + (p.titulo || "")) + '">' : "") +
        (p.loop ? '<video muted loop playsinline preload="none" src="' + esc(p.loop) + '"></video>' : "") +
        (p.video ? '<span class="play mono">▶ Ver vídeo</span>' : "") +
        "</div>" +
        '<div class="meta"><span class="mono n">' + n + "</span><h3>" + esc(p.titulo) + "<small>" + esc(p.artista) + (p.anio ? " · " + esc(p.anio) : "") + "</small></h3>" +
        (p.visitas ? '<span class="mono v">' + esc(p.visitas) + "</span>" : "<span></span>") + "</div>";
      const vid = card.querySelector("video");
      if (vid) {
        card.addEventListener("mouseenter", () => vid.play().catch(() => {}));
        card.addEventListener("mouseleave", () => { vid.pause(); vid.currentTime = 0; });
      }
      if (p.video) {
        card.tabIndex = 0;
        card.addEventListener("click", () => openLB(p));
        card.addEventListener("keydown", (e) => { if (e.key === "Enter") openLB(p); });
      }
    }
    grid.appendChild(card);
  });

  // Filtros por artista (solo si hay 2 o más artistas)
  const artists = [...new Set(filled.map((p) => (p.artista || "").trim()).filter(Boolean))];
  if (artists.length >= 2) {
    const chips = $("#chips");
    ["Todos"].concat(artists).forEach((a, i) => {
      const b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " on" : "");
      b.textContent = a;
      b.addEventListener("click", () => {
        chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
        grid.querySelectorAll(".card").forEach((c) => {
          c.classList.toggle("hide", i !== 0 && c.dataset.artista.trim() !== a);
        });
      });
      chips.appendChild(b);
    });
  }

  // ---------- Visor ----------
  const lb = $("#lb");
  function openLB(p) {
    const src = embed(p.video);
    if (!src) { window.open(p.video, "_blank", "noopener"); return; }
    lb.querySelector(".frame").innerHTML = '<iframe src="' + src + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(p.titulo) + '"></iframe>';
    lb.querySelector(".cap").textContent = (p.artista || "") + " — " + (p.titulo || "");
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLB() {
    lb.classList.remove("open");
    lb.querySelector(".frame").innerHTML = "";
    document.body.style.overflow = "";
  }
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("x")) closeLB(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.classList.contains("open")) closeLB(); });

  // ---------- Navegación ----------
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Contacto ----------
  document.querySelectorAll("[data-email]").forEach((a) => { a.href = "mailto:" + C.email; a.textContent = C.email; });
  document.querySelectorAll("[data-ig]").forEach((a) => { a.href = "https://instagram.com/" + C.instagram; });
  document.querySelectorAll("[data-tt]").forEach((a) => { a.href = "https://www.tiktok.com/@" + C.tiktok; });
  $("#year").textContent = new Date().getFullYear();

  const form = $("#brief"), status = $("#status"), btn = form.querySelector("button");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((el) => {
      const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { status.className = "mono status err"; status.textContent = "Revisa los campos marcados"; return; }
    if (form.botcheck.checked) return;
    const d = Object.fromEntries(new FormData(form));
    delete d.botcheck;

    if (!C.web3formsKey) {
      const body = Object.entries(d).map(([k, v]) => k.charAt(0).toUpperCase() + k.slice(1) + ": " + v).join("\n");
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Brief — " + d.artista) + "&body=" + encodeURIComponent(body);
      return;
    }
    btn.disabled = true;
    status.className = "mono status";
    status.textContent = "Enviando…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({
          access_key: C.web3formsKey,
          subject: "Nuevo brief desde amaath.com — " + d.artista,
          from_name: "amaath.com",
          replyto: d.email,
        }, d)),
      });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      form.reset();
      status.className = "mono status ok";
      status.textContent = "Recibido. Te escribo en 24–48 h.";
    } catch (err) {
      status.className = "mono status err";
      status.innerHTML = 'No se pudo enviar. Escríbeme a <a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>";
    } finally {
      btn.disabled = false;
    }
  });
})();
