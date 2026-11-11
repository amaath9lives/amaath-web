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
  // Foto de portada (carpeta img)
  fotoPortada: "img/portada.webp",
  // Cifras bajo la portada. Pon aquí tus números reales.
  cifras: [
    { valor: "100+", es: "videoclips dirigidos", en: "music videos directed" },
    { valor: "2018", es: "primer videoclip", en: "first music video" },
    { valor: "120M+", es: "visualizaciones en YouTube", en: "YouTube views" },
    { valor: "30+", es: "artistas", en: "artists" },
  ],
};

/* ---------- TRÁILER (sale al bajar, debajo de la portada) ----------
   Versión para ordenador y versión ligera para móvil, en la carpeta "video".
   Si dejas video vacío "", la sección no aparece. */
const TRAILER = {
  video: "video/trailer-1080.mp4",
  videoMovil: "video/trailer-720.mp4",
  poster: "img/trailer-poster.webp",
  posterMovil: "img/trailer-poster-m.webp",
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
  "Hard GZ", "Nikone", "Miranda", "Grind", "Nadal015", "Lia Kali", "Denom",
  "Raul Clyde", "Arce", "Al Safir", "Sosad", "Fernandocosta", "Zeballos", "Mayo 214",
  "Fyahbwoy", "Sofia Gabanna", "Blake", "Makro", "Anier", "Jado PVG", "PGJ",
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
  { artista: "Hard GZ & Nikone", titulo: "Lo Real", anio: "", visitas: "22M", video: "https://youtu.be/I96S7SxeVV0", portada: "", loop: "" },
  { artista: "Miranda & Hard GZ", titulo: "Volver", anio: "", visitas: "13M", video: "https://youtu.be/SAn9ya_nKPc", portada: "", loop: "" },
  { artista: "Nadal015", titulo: "Street Shark", anio: "", visitas: "12M", video: "https://youtu.be/G80kKs0ait4", portada: "", loop: "" },
  { artista: "Grind", titulo: "Goat", anio: "", visitas: "5,1M", video: "https://youtu.be/GoN7N9FnH1c", portada: "", loop: "" },
  { artista: "Sofia Gabanna & Hard GZ", titulo: "Vivimos Deprisa", anio: "", visitas: "4,4M", video: "https://youtu.be/-PkNgMNnr2I", portada: "", loop: "" },
  { artista: "Miranda & Nadal015", titulo: "Demons", anio: "", visitas: "4,4M", video: "https://youtu.be/Yzz6zoiN8NM", portada: "", loop: "" },
  { artista: "Arce ft. Al Safir", titulo: "Nékora", anio: "", visitas: "878K", video: "https://youtu.be/Px05StgxA5I", portada: "", loop: "" },
  { artista: "Miranda", titulo: "Destello", anio: "", visitas: "3,7M", video: "https://youtu.be/j2-u328M9CA", portada: "", loop: "" },
  { artista: "Hard GZ & Denom ft. Lia Kali", titulo: "Ayer", anio: "", visitas: "2,7M", video: "https://youtu.be/E_czYtKq8PU", portada: "", loop: "" },
  { artista: "Arce ft. Nadal015", titulo: "Kazike", anio: "", visitas: "2,3M", video: "https://youtu.be/b9Bo321g2n4", portada: "", loop: "" },
  { artista: "Nadal015 & Fernandocosta", titulo: "Soy un C4brón", anio: "", visitas: "920K", video: "https://youtu.be/xIzHxz_NiRo", portada: "", loop: "" },
  { artista: "Fyahbwoy & Nadal015", titulo: "Perros", anio: "", visitas: "1,5M", video: "https://youtu.be/e2nnLKiC3ag", portada: "", loop: "" },
];

/* ---------- CONTACTO ---------- */
const CONTACTO = {
  email: "amaath9lives@gmail.com",
  instagram: "amaath9lives",
  tiktok: "amaath9lives",
  // Clave de Web3Forms (pública, no pasa nada porque se vea)
  web3formsKey: "c8defed5-4682-4a3b-81d4-741918e5f040",
};
