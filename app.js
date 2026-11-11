/* Lógica de la web — no hace falta tocar este archivo */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const P = typeof PERFIL !== "undefined" ? PERFIL : {};
  const LIST = typeof PROYECTOS !== "undefined" ? PROYECTOS : [];
  const SEL = (typeof SELECCIONADOS !== "undefined" ? SELECCIONADOS : []).filter((p) => p.video || p.portada || p.titulo);
  const C = typeof CONTACTO !== "undefined" ? CONTACTO : {};
  const ABOUT = typeof SOBRE_MI !== "undefined" ? SOBRE_MI : {};
  const ARTS = typeof ARTISTAS !== "undefined" ? ARTISTAS.filter(Boolean) : [];

  // ---------- Textos ES / EN ----------
  const T = {
    es: {
      nav_work: "Trabajo", nav_about: "Sobre mí", nav_contact: "Contacto",
      hero_side: "Dirección · Edición · Color", hero_cta: "Ver trabajo ↓",
      work_title: "Trabajos", artists_title: "Artistas", about_title: "Sobre mí", serv_title: "Qué hago", contact_title: "Contacto",
      photo_ph: "Tu foto aquí · 4:5",
      s1_t: "Dirección", s1_p: "Videoclips, publicidad y piezas de marca. De la idea y el guion al rodaje, con un tratamiento visual pensado para cada proyecto.",
      s2_t: "Producción", s2_p: "Equipo, localizaciones y plan de rodaje a través de NINELIVES. Un solo interlocutor de principio a fin.",
      s3_t: "Edición y color", s3_p: "Montaje y etalonaje en DaVinci Resolve. El look se decide en rodaje y se termina en postproducción.",
      contact_big: "¿Tienes un proyecto? Cuéntamelo.", contact_reply: "Respondo en 24–48 h.",
      f_name: "Nombre", f_artist: "Artista / marca", f_budget: "Presupuesto", f_select: "Selecciona",
      b1: "Menos de 1.000 €", b4: "Más de 6.000 €", b5: "Lo hablamos",
      f_date: "Fecha aproximada", f_date_ph: "Ej. finales de enero",
      f_idea: "Idea y referencias", f_idea_ph: "Qué quieres hacer, enlaces, referencias visuales…",
      f_send: "Enviar brief", close: "Cerrar",
      watch_sound: "Ver tráiler con sonido", mute: "Silenciar", unmute: "Activar sonido", exit: "Salir",
      sel_title: "Trabajo seleccionado", arch_title: "Archivo — Videoclips", arch_note: "Más de 100 videoclips desde 2018. Estos son los más vistos.",
      s4_t: "Contenido", s4_p: "Piezas para redes para marcas y artistas: formato vertical, ritmo rápido y criterio de cine.",
      empty: "Hueco para videoclip", empty_t: "Título", empty_a: "Artista", watch: "▶ Ver vídeo", all: "Todos",
      err_fields: "Revisa los campos marcados", sending: "Enviando…", ok: "Recibido. Te escribo en 24–48 h.", err_send: "No se pudo enviar. Escríbeme a",
    },
    en: {
      nav_work: "Work", nav_about: "About", nav_contact: "Contact",
      hero_side: "Directing · Editing · Color", hero_cta: "See work ↓",
      work_title: "Work", artists_title: "Artists", about_title: "About", serv_title: "What I do", contact_title: "Contact",
      photo_ph: "Your photo here · 4:5",
      s1_t: "Directing", s1_p: "Music videos, commercials and brand pieces. From idea and script to the shoot, with a visual treatment built for each project.",
      s2_t: "Production", s2_p: "Crew, locations and shooting schedule through NINELIVES. One point of contact from start to finish.",
      s3_t: "Editing & color", s3_p: "Editing and grading in DaVinci Resolve. The look is decided on set and finished in post.",
      contact_big: "Got a project? Tell me about it.", contact_reply: "I reply within 24–48 h.",
      f_name: "Name", f_artist: "Artist / brand", f_budget: "Budget", f_select: "Select",
      b1: "Under €1,000", b4: "Over €6,000", b5: "Let's talk",
      f_date: "Approx. date", f_date_ph: "E.g. late January",
      f_idea: "Idea and references", f_idea_ph: "What you want to make, links, visual references…",
      f_send: "Send brief", close: "Close",
      watch_sound: "Watch trailer with sound", mute: "Mute", unmute: "Unmute", exit: "Exit",
      sel_title: "Selected work", arch_title: "Archive — Music videos", arch_note: "100+ music videos since 2018. These are the most watched.",
      s4_t: "Content", s4_p: "Social pieces for brands and artists: vertical format, fast pace and a cinematic eye.",
      empty: "Music video slot", empty_t: "Title", empty_a: "Artist", watch: "▶ Watch", all: "All",
      err_fields: "Check the highlighted fields", sending: "Sending…", ok: "Received. I'll get back to you within 24–48 h.", err_send: "Couldn't send it. Email me at",
    },
  };
  function pickLang() {
    try { const s = localStorage.getItem("lang"); if (s === "es" || s === "en") return s; } catch (e) {}
    return /^es\b/i.test(navigator.language || "es") ? "es" : "en";
  }
  let L = pickLang();
  const t = (k) => (T[L] && T[L][k]) || T.es[k] || k;
  const loc = (v) => (v && typeof v === "object" ? v[L] || v.es || "" : v || "");

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
  if (P.nombreReal) $("#realName").textContent = P.nombreReal;
  if (P.usuario) { const h = $("#handle"); h.textContent = "@" + P.usuario; h.href = "https://instagram.com/" + P.usuario; }
  if (P.fotoPortada && P.fotoPortada !== "img/trailer-poster.webp") {
    const im = $("#heroImg"); im.removeAttribute("srcset"); im.src = P.fotoPortada;
  }
  // ---------- Vídeo de portada ----------
  const hero = $("#top"), nav = $("#nav");
  let hv = null;
  if (P.videoPortada) {
    const small = window.matchMedia("(max-width: 900px)").matches || (navigator.connection && navigator.connection.saveData);
    const src = small && P.videoPortadaMovil ? P.videoPortadaMovil : P.videoPortada;
    hv = document.createElement("video");
    hv.muted = true; hv.defaultMuted = true; hv.loop = true; hv.playsInline = true; hv.autoplay = true; hv.preload = "auto";
    hv.setAttribute("playsinline", ""); hv.setAttribute("webkit-playsinline", ""); hv.setAttribute("muted", ""); hv.setAttribute("autoplay", "");
    hv.src = src;
    hv.addEventListener("playing", () => hv.classList.add("ready"));
    $("#heroBg").appendChild(hv);
    // Siempre en movimiento (sin sonido). Si el navegador lo bloquea (ahorro de batería, ajustes),
    // arranca en cuanto el visitante toca, hace clic o pulsa una tecla en la página.
    const kick = () => { if (hv.paused) hv.play().catch(() => {}); };
    kick();
    hv.addEventListener("canplay", kick, { once: true });
    ["pointerdown", "touchstart", "keydown", "wheel"].forEach((ev) => window.addEventListener(ev, kick, { once: true, passive: true }));
    $("#soundBtn").hidden = false;
    const enter = () => {
      hero.classList.add("watching"); nav.classList.add("hide");
      const bg = $("#heroBg"), hi = $(".hero-in"); bg.style.clipPath = bg.style.transform = hi.style.transform = hi.style.opacity = "";
      hv.loop = false; hv.muted = false; hv.currentTime = 0; hv.play().catch(() => {});
      $("#muteBtn").textContent = t("mute");
    };
    const exit = () => {
      hero.classList.remove("watching"); nav.classList.remove("hide");
      hv.muted = true; hv.loop = true; hv.play().catch(() => {});
      if (typeof fx === "function") fx();
    };
    $("#soundBtn").addEventListener("click", enter);
    $("#exitBtn").addEventListener("click", exit);
    $("#muteBtn").addEventListener("click", () => { hv.muted = !hv.muted; $("#muteBtn").textContent = t(hv.muted ? "unmute" : "mute"); });
    hv.addEventListener("ended", exit);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && hero.classList.contains("watching")) exit(); });
    // Pausar cuando no se ve (ahorra batería); si estaba con sonido, salir del modo tráiler
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) hv.play().catch(() => {});
      else { if (hero.classList.contains("watching")) exit(); hv.pause(); }
    }, { threshold: 0.25 }).observe(hero);
  }
  const tc = $("#tc"), t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  (function tick(now) {
    const f = Math.floor(((now || t0) - t0) / 40);
    tc.textContent = pad(Math.floor(f / 90000) % 24) + ":" + pad(Math.floor(f / 1500) % 60) + ":" + pad(Math.floor(f / 25) % 60) + ":" + pad(f % 25);
    requestAnimationFrame(tick);
  })();

  // ---------- Pintar todo lo que depende del idioma ----------
  const grid = $("#grid"), stats = $("#stats");

  function renderStats() {
    stats.innerHTML = "";
    (P.cifras || []).filter((c) => c.valor && c.valor.trim() !== "—").forEach((c) => {
      const d = document.createElement("div");
      d.className = "stat";
      d.innerHTML = "<b>" + esc(c.valor) + '</b><span class="mono">' + esc(c[L] || c.es || c.texto || "") + "</span>";
      stats.appendChild(d);
    });
    stats.hidden = !stats.children.length;
  }

  function renderGrid() {
    grid.innerHTML = "";
    $("#seleccion").hidden = !SEL.length;
    SEL.forEach((p, i) => {
      const img = cover(p);
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="thumb">' +
        (img ? '<img loading="' + (i ? "lazy" : "eager") + '" src="' + esc(img) + '" alt="' + esc((p.artista || "") + " — " + (p.titulo || "")) + '">' : "") +
        (p.loop ? '<video muted loop playsinline preload="none" src="' + esc(p.loop) + '"></video>' : "") +
        (p.video ? '<span class="play mono">' + t("watch") + "</span>" : "") +
        "</div>" +
        '<div class="meta"><span class="mono n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(p.titulo) + "<small>" + esc(p.artista) + (p.anio ? " · " + esc(p.anio) : "") + "</small></h3>" +
        (p.tipo ? '<span class="mono tipo">' + esc(p.tipo) + "</span>" : "<span></span>") + "</div>";
      thumbFallback(card.querySelector("img"), p);
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
      grid.appendChild(card);
    });
  }

  function thumbFallback(im, p) {
    const y = ytId(p.video);
    if (!im || !y || p.portada) return;
    const chain = ["sddefault", "hqdefault"];
    im.addEventListener("error", function f() { const n = chain.shift(); if (n) im.src = "https://i.ytimg.com/vi/" + y + "/" + n + ".jpg"; else im.removeEventListener("error", f); });
    im.addEventListener("load", () => { if (im.naturalWidth <= 120 && chain.length) im.dispatchEvent(new Event("error")); });
  }

  // Archivo: lista compacta. En ordenador, al pasar el ratón sale la miniatura.
  const peek = $("#peek"), peekImg = peek.querySelector("img");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function renderArchive() {
    const ul = $("#archList");
    ul.innerHTML = "";
    const rows = LIST.filter((p) => p.video || p.titulo);
    $("#count").textContent = rows.length ? "(" + rows.length + ")" : "";
    $("#archivo").hidden = !rows.length;
    rows.forEach((p, i) => {
      const li = document.createElement("li");
      li.className = "arow";
      li.tabIndex = 0;
      li.innerHTML = '<span class="mono n">' + String(i + 1).padStart(2, "0") + '</span><span class="at">' + esc(p.titulo) + '</span><span class="aa">' + esc(p.artista) + "</span>" +
        '<span class="mono v">' + esc(p.visitas || "") + '</span><span class="mono go">▶</span>';
      const img = cover(p);
      if (fine && img) {
        li.addEventListener("mouseenter", () => { peekImg.src = img; thumbFallback(peekImg, p); peek.classList.add("on"); });
        li.addEventListener("mouseleave", () => peek.classList.remove("on"));
      }
      if (p.video) {
        li.addEventListener("click", () => openLB(p));
        li.addEventListener("keydown", (e) => { if (e.key === "Enter") openLB(p); });
      }
      ul.appendChild(li);
    });
  }
  if (fine) {
    window.addEventListener("mousemove", (e) => {
      const z = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      peek.style.left = e.clientX / z + "px"; peek.style.top = e.clientY / z + "px";
    }, { passive: true });
    window.addEventListener("scroll", () => peek.classList.remove("on"), { passive: true });
  }

  function renderArtists() {
    const sec = $("#artistas");
    if (!ARTS.length) { sec.hidden = true; return; }
    sec.hidden = false;
    $("#artistList").innerHTML = ARTS.map((a) => "<span>" + esc(a) + "</span>").join("<i>/</i> ");
  }

  function renderAbout() {
    const ps = ABOUT[L] || ABOUT.es || [];
    $("#aboutText").innerHTML = ps.map((p, i) => '<p class="' + (i === 0 ? "big" : "") + '">' + esc(p).replace(/NINELIVES/g, "<strong>NINELIVES</strong>") + "</p>").join("");
  }

  function numberSections() {
    let n = 1;
    ["#seleccion", "#archivo", "#artistas", "#sobre", "#servicios", "#contacto"].forEach((id) => {
      const s = $(id);
      if (s && !s.hidden) s.querySelector(".label").textContent = "(" + String(n++).padStart(2, "0") + ")";
    });
  }

  const MF = {
    es: "*Amaath* es director en Madrid. Más de 100 videoclips después, ahora también marcas, publicidad y contenido. Dirección, edición y color bajo una misma mirada.",
    en: "*Amaath* is a director based in Madrid. 100+ music videos later, now also brands, commercials and content. Directing, editing and color under one vision.",
  };
  function renderManifest() {
    $("#mf").innerHTML = MF[L].split(" ").map((w) => w.startsWith("*") ? '<span class="w acc">' + esc(w.replace(/\*/g, "")) + "</span>" : '<span class="w">' + esc(w) + "</span>").join(" ");
    fx();
  }

  // ---------- Animaciones con el scroll ----------
  const rvObs = new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); rvObs.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  function reveal(els, step) { els.forEach((el, i) => { if (el.classList.contains("in")) return; el.classList.add("rv"); el.style.setProperty("--d", ((i % 3) * (step || 0.08)) + "s"); rvObs.observe(el); }); }
  let ticking = false;
  function fx() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const vh = window.innerHeight;
      // Portada: el vídeo se recorta y se aleja al bajar
      if (!hero.classList.contains("watching")) {
        const r = hero.getBoundingClientRect();
        const k = Math.min(Math.max(-r.top / r.height, 0), 1);
        const bg = $("#heroBg");
        bg.style.clipPath = "inset(" + (k * 9) + "% " + (k * 7) + "% " + (k * 2) + "% " + (k * 7) + "% round " + (k * 28) + "px)";
        bg.style.transform = "scale(" + (1 - k * 0.04) + ") translateY(" + (k * 12) + "%)";
        const hi = $(".hero-in");
        hi.style.transform = k ? "translateY(" + (-k * 60) + "px)" : "";
        hi.style.opacity = k ? String(Math.max(1 - k * 1.6, 0)) : "";
      }
      // Frase: las palabras se encienden según avanzas
      const ws = document.querySelectorAll("#mf .w");
      if (ws.length) {
        const r = $("#mf").getBoundingClientRect();
        const start = vh * 0.85, end = vh * 0.35;
        const k = Math.min(Math.max((start - r.top) / (start - end + r.height * 0.6), 0), 1);
        const n = Math.round(k * ws.length);
        ws.forEach((w, i) => w.classList.toggle("on", i < n));
      }
    });
  }
  window.addEventListener("scroll", fx, { passive: true });
  window.addEventListener("resize", fx);

  function apply() {
    document.documentElement.lang = L;
    document.querySelectorAll("[data-i]").forEach((el) => { el.textContent = t(el.dataset.i); });
    document.querySelectorAll("[data-ph]").forEach((el) => { el.placeholder = t(el.dataset.ph); });
    document.querySelectorAll("#lang [data-l]").forEach((s) => s.classList.toggle("on", s.dataset.l === L));
    $("#heroFrase").textContent = loc(P.frase);
    $("#heroCap").textContent = P.videoPortada ? loc(P.videoTexto) : "";
    renderStats(); renderGrid(); renderArchive(); renderArtists(); renderAbout(); numberSections(); renderManifest();
    reveal([...document.querySelectorAll("#grid .card")], 0.1);
    reveal([...document.querySelectorAll(".stat")], 0.08);
    reveal([...document.querySelectorAll(".arow")], 0.05);
    reveal([...document.querySelectorAll(".services li")], 0.1);
    reveal([...document.querySelectorAll(".sec-head, .arch-note, #artistList, #aboutText, .portrait-wrap, #brief")], 0);
  }
  $("#lang").addEventListener("click", () => {
    L = L === "es" ? "en" : "es";
    try { localStorage.setItem("lang", L); } catch (e) {}
    apply();
  });

  // ---------- Visor ----------
  const lb = $("#lb");
  function openLB(p) {
    if (/\.(mp4|webm|mov)(\?|$)/i.test(p.video || "")) {
      lb.querySelector(".frame").innerHTML = '<video src="' + esc(p.video) + '" controls autoplay playsinline></video>';
      lb.querySelector(".cap").textContent = (p.artista || "") + " — " + (p.titulo || "");
      lb.classList.add("open"); document.body.style.overflow = "hidden";
      const hv2 = document.querySelector("#heroBg video"); if (hv2) hv2.pause();
      return;
    }
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
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".x")) closeLB(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.classList.contains("open")) closeLB(); });

  // ---------- Navegación ----------
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
    if (!ok) { status.className = "mono status err"; status.textContent = t("err_fields"); return; }
    if (form.botcheck.checked) return;
    const d = Object.fromEntries(new FormData(form));
    delete d.botcheck;
    d.idioma = L.toUpperCase();

    if (!C.web3formsKey) {
      const body = Object.entries(d).map(([k, v]) => k.charAt(0).toUpperCase() + k.slice(1) + ": " + v).join("\n");
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Brief — " + d.artista) + "&body=" + encodeURIComponent(body);
      return;
    }
    btn.disabled = true;
    status.className = "mono status";
    status.textContent = t("sending");
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
      status.textContent = t("ok");
    } catch (err) {
      status.className = "mono status err";
      status.innerHTML = esc(t("err_send")) + ' <a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>";
    } finally {
      btn.disabled = false;
    }
  });

  apply();
})();
