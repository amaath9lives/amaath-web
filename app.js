/* Lógica de la web — no hace falta tocar este archivo */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const P = typeof PERFIL !== "undefined" ? PERFIL : {};
  const LIST = typeof PROYECTOS !== "undefined" ? PROYECTOS : [];
  const C = typeof CONTACTO !== "undefined" ? CONTACTO : {};
  const ABOUT = typeof SOBRE_MI !== "undefined" ? SOBRE_MI : {};
  const ARTS = typeof ARTISTAS !== "undefined" ? ARTISTAS.filter(Boolean) : [];

  // ---------- Textos ES / EN ----------
  const T = {
    es: {
      nav_work: "Trabajos", nav_about: "Sobre mí", nav_contact: "Contacto",
      hero_side: "Dirección · Edición · Color", hero_cta: "Ver trabajos ↓",
      work_title: "Trabajos", artists_title: "Artistas", about_title: "Sobre mí", serv_title: "Qué hago", contact_title: "Contacto",
      photo_ph: "Tu foto aquí · 4:5",
      s1_t: "Dirección", s1_p: "De la idea y el guion al rodaje. Tratamiento visual pensado para la canción y para el artista.",
      s2_t: "Producción", s2_p: "Equipo, localizaciones y plan de rodaje a través de NINELIVES. Un solo interlocutor de principio a fin.",
      s3_t: "Edición y color", s3_p: "Montaje y etalonaje en DaVinci Resolve. El look se decide en rodaje y se termina en postproducción.",
      contact_big: "¿Tienes un tema y una idea? Cuéntamela.", contact_reply: "Respondo en 24–48 h.",
      f_name: "Nombre", f_artist: "Artista / proyecto", f_budget: "Presupuesto", f_select: "Selecciona",
      b1: "Menos de 1.000 €", b4: "Más de 6.000 €", b5: "Lo hablamos",
      f_date: "Fecha aproximada", f_date_ph: "Ej. finales de enero",
      f_idea: "Idea, canción y referencias", f_idea_ph: "Enlace a la canción, la idea, referencias visuales…",
      f_send: "Enviar brief", close: "Cerrar",
      empty: "Hueco para videoclip", empty_t: "Título", empty_a: "Artista", watch: "▶ Ver vídeo", all: "Todos",
      err_fields: "Revisa los campos marcados", sending: "Enviando…", ok: "Recibido. Te escribo en 24–48 h.", err_send: "No se pudo enviar. Escríbeme a",
    },
    en: {
      nav_work: "Work", nav_about: "About", nav_contact: "Contact",
      hero_side: "Directing · Editing · Color", hero_cta: "See work ↓",
      work_title: "Work", artists_title: "Artists", about_title: "About", serv_title: "What I do", contact_title: "Contact",
      photo_ph: "Your photo here · 4:5",
      s1_t: "Directing", s1_p: "From idea and script to the shoot. A visual treatment built around the song and the artist.",
      s2_t: "Production", s2_p: "Crew, locations and shooting schedule through NINELIVES. One point of contact from start to finish.",
      s3_t: "Editing & color", s3_p: "Editing and grading in DaVinci Resolve. The look is decided on set and finished in post.",
      contact_big: "Got a track and an idea? Tell me about it.", contact_reply: "I reply within 24–48 h.",
      f_name: "Name", f_artist: "Artist / project", f_budget: "Budget", f_select: "Select",
      b1: "Under €1,000", b4: "Over €6,000", b5: "Let's talk",
      f_date: "Approx. date", f_date_ph: "E.g. late January",
      f_idea: "Idea, track and references", f_idea_ph: "Link to the track, the idea, visual references…",
      f_send: "Send brief", close: "Close",
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
  if (P.nombreReal) $("#realName").textContent = P.nombreReal;
  if (P.usuario) { const h = $("#handle"); h.textContent = "@" + P.usuario; h.href = "https://instagram.com/" + P.usuario; }
  if (P.fotoPortada && P.fotoPortada !== "img/portada.webp") {
    const im = $("#heroImg"); im.removeAttribute("srcset"); im.src = P.fotoPortada;
  }
  if (P.videoPortada) {
    $("#heroBg").insertAdjacentHTML("beforeend", '<video autoplay muted loop playsinline src="' + esc(P.videoPortada) + '"></video>');
  }
  const tc = $("#tc"), t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  (function tick(now) {
    const f = Math.floor(((now || t0) - t0) / 40);
    tc.textContent = pad(Math.floor(f / 90000) % 24) + ":" + pad(Math.floor(f / 1500) % 60) + ":" + pad(Math.floor(f / 25) % 60) + ":" + pad(f % 25);
    requestAnimationFrame(tick);
  })();

  // ---------- Pintar todo lo que depende del idioma ----------
  const grid = $("#grid"), chips = $("#chips"), stats = $("#stats");
  const filled = LIST.filter((p) => p.video || p.portada || p.titulo);
  let filter = 0;

  function renderStats() {
    stats.innerHTML = "";
    (P.cifras || []).forEach((c) => {
      const d = document.createElement("div");
      d.className = "stat";
      d.innerHTML = "<b>" + esc(c.valor) + '</b><span class="mono">' + esc(c[L] || c.es || c.texto || "") + "</span>";
      stats.appendChild(d);
    });
    stats.hidden = !stats.children.length;
  }

  function renderGrid() {
    grid.innerHTML = "";
    $("#count").textContent = filled.length ? "(" + filled.length + ")" : "";
    LIST.forEach((p, i) => {
      const n = String(i + 1).padStart(2, "0");
      const img = cover(p);
      const card = document.createElement("article");
      card.dataset.artista = (p.artista || "").trim();
      if (!p.video && !img && !p.titulo) {
        card.className = "card empty";
        card.innerHTML = '<div class="thumb"><span class="mono">' + t("empty") + "</span></div>" +
          '<div class="meta"><span class="mono n">' + n + "</span><h3>" + t("empty_t") + "<small>" + t("empty_a") + "</small></h3></div>";
      } else {
        card.className = "card";
        card.innerHTML =
          '<div class="thumb">' +
          (img ? '<img loading="lazy" src="' + esc(img) + '" alt="' + esc((p.artista || "") + " — " + (p.titulo || "")) + '">' : "") +
          (p.loop ? '<video muted loop playsinline preload="none" src="' + esc(p.loop) + '"></video>' : "") +
          (p.video ? '<span class="play mono">' + t("watch") + "</span>" : "") +
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
    // Filtros por artista (solo con 2 o más artistas)
    chips.innerHTML = "";
    const artists = [...new Set(filled.map((p) => (p.artista || "").trim()).filter(Boolean))];
    if (artists.length >= 2) {
      [t("all")].concat(artists).forEach((a, i) => {
        const b = document.createElement("button");
        b.className = "chip" + (i === filter ? " on" : "");
        b.textContent = a;
        b.addEventListener("click", () => { filter = i; applyFilter(artists); chips.querySelectorAll(".chip").forEach((c, j) => c.classList.toggle("on", j === i)); });
        chips.appendChild(b);
      });
      applyFilter(artists);
    }
  }
  function applyFilter(artists) {
    grid.querySelectorAll(".card").forEach((c) => c.classList.toggle("hide", filter !== 0 && c.dataset.artista !== artists[filter - 1]));
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
    ["#trabajos", "#artistas", "#sobre", "#servicios", "#contacto"].forEach((id) => {
      const s = $(id);
      if (s && !s.hidden) s.querySelector(".label").textContent = "(" + String(n++).padStart(2, "0") + ")";
    });
  }

  function apply() {
    document.documentElement.lang = L;
    document.querySelectorAll("[data-i]").forEach((el) => { el.textContent = t(el.dataset.i); });
    document.querySelectorAll("[data-ph]").forEach((el) => { el.placeholder = t(el.dataset.ph); });
    document.querySelectorAll("#lang [data-l]").forEach((s) => s.classList.toggle("on", s.dataset.l === L));
    $("#heroFrase").textContent = loc(P.frase);
    renderStats(); renderGrid(); renderArtists(); renderAbout(); numberSections();
  }
  $("#lang").addEventListener("click", () => {
    L = L === "es" ? "en" : "es";
    try { localStorage.setItem("lang", L); } catch (e) {}
    apply();
  });

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
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".x")) closeLB(); });
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
