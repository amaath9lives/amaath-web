/* =========================================================
   TU WEB — SOLO TIENES QUE EDITAR ESTE ARCHIVO
   Los textos van en español (es) e inglés (en).
   ========================================================= */

/* ---------- TUS DATOS ---------- */
const PERFIL = {
  nombre: "Amaath",
  nombreReal: "Alexandru Hristu",
  usuario: "amaath9lives",
  frase: {
    es: "Director de videoclips. Madrid.",
    en: "Music video director. Madrid.",
  },
  // Foto de portada (en la carpeta img). Si pones un vídeo en videoPortada,
  // se usa el vídeo y la foto queda de respaldo mientras carga.
  fotoPortada: "img/portada.webp",
  videoPortada: "",
  // Cifras bajo la portada. Pon aquí tus números reales.
  cifras: [
    { valor: "100+", es: "videoclips dirigidos", en: "music videos directed" },
    { valor: "2018", es: "primer videoclip", en: "first music video" },
    { valor: "—", es: "visitas en YouTube", en: "YouTube views" },
    { valor: "—", es: "artistas", en: "artists" },
  ],
};

/* ---------- SOBRE MÍ (cada línea es un párrafo) ---------- */
const SOBRE_MI = {
  es: [
    "Empecé en 2018 con una cámara y sin saber nada. Desde entonces he dirigido más de 100 videoclips para la escena urbana.",
    "Autodidacta. La dirección, la edición y el color pasan por las mismas manos, así que lo que se imagina en el guion es lo que llega a la pantalla.",
    "Produzco a través de NINELIVES.",
  ],
  en: [
    "I started in 2018 with a camera and no idea what I was doing. Since then I've directed 100+ music videos for the urban scene.",
    "Self-taught. Directing, editing and color grading go through the same hands, so what's imagined in the script is what ends up on screen.",
    "I produce through NINELIVES.",
  ],
};

/* ---------- ARTISTAS CON LOS QUE HAS TRABAJADO ----------
   Escribe los nombres entre comillas, separados por comas.
   Si la lista está vacía, la sección no aparece. */
const ARTISTAS = [
  // "Artista 1", "Artista 2", "Artista 3",
];

/* ---------- TUS VIDEOCLIPS ----------
   Cada bloque { ... } es un trabajo. El orden aquí es el orden en la web.
   - artista: nombre del artista (también crea el filtro por artista)
   - titulo:  nombre de la canción
   - anio:    año (opcional)
   - visitas: ej. "2,4M" (opcional)
   - video:   enlace de YouTube o Vimeo, tal cual lo copias
   - portada: imagen en la carpeta "img" (ej. "img/clip01.jpg"), 16:9.
              Si lo dejas vacío "", se usa la portada de YouTube.
   - loop:    (opcional) mp4 corto sin audio que se reproduce al pasar el ratón
   Para añadir más: copia un bloque entero. Para quitar uno: bórralo entero. */
const PROYECTOS = [
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
  { artista: "", titulo: "", anio: "", visitas: "", video: "", portada: "", loop: "" },
];

/* ---------- CONTACTO ---------- */
const CONTACTO = {
  email: "amaath9lives@gmail.com",
  instagram: "amaath9lives",
  tiktok: "amaath9lives",
  // Clave de Web3Forms (pública, no pasa nada porque se vea)
  web3formsKey: "c8defed5-4682-4a3b-81d4-741918e5f040",
};
