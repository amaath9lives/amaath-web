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
    es: "Director. Música, marcas y contenido.",
    en: "Director. Music, brands and content.",
  },
  // Vídeo de portada (tráiler). Versión para ordenador y versión ligera para móvil.
  videoPortada: "video/trailer-1080.mp4",
  videoPortadaMovil: "video/trailer-720.mp4",
  // Imagen que se ve mientras carga el vídeo
  fotoPortada: "img/trailer-poster.webp",
  // Texto que explica el vídeo de portada
  videoTexto: {
    es: "Tráiler · Sosad — «Háblalo Bajito»",
    en: "Trailer · Sosad — “Háblalo Bajito”",
  },
  // Cifras bajo la portada. Pon aquí tus números reales.
  cifras: [
    { valor: "100+", es: "videoclips dirigidos", en: "music videos directed" },
    { valor: "2018", es: "primer videoclip", en: "first music video" },
    { valor: "120M+", es: "visualizaciones en YouTube", en: "YouTube views" },
    { valor: "30+", es: "artistas", en: "artists" },
  ],
};

/* ---------- SOBRE MÍ (cada línea es un párrafo) ---------- */
const SOBRE_MI = {
  es: [
    "Empecé en 2018 con una cámara y sin saber nada. Desde entonces he dirigido más de 100 videoclips para la escena urbana.",
    "Autodidacta. Pasé de ser filmmaker con una cámara a dirigir proyectos audiovisuales de principio a fin.",
    "La edición y el color los firmo como NINELIVES, mi productora y estudio de postproducción. Así, lo que se imagina en el guion es lo que llega a la pantalla.",
  ],
  en: [
    "I started in 2018 with a camera and no idea what I was doing. Since then I've directed 100+ music videos for the urban scene.",
    "Self-taught. I went from filmmaker with a camera to directing audiovisual projects from start to finish.",
    "Editing and color are signed as NINELIVES, my production company and post-production studio. That way, what's imagined in the script is what ends up on screen.",
  ],
};

/* ---------- ARTISTAS CON LOS QUE HAS TRABAJADO ----------
   Escribe los nombres entre comillas, separados por comas.
   Si la lista está vacía, la sección no aparece. */
const ARTISTAS = [
  "Hard GZ", "Nikone", "Miranda", "Grind", "Nadal015", "Lia Kali", "Denom",
  "Raul Clyde", "Arce", "Al Safir", "Sosad", "Fernandocosta", "Omar Montes", "Zeballos", "Mayo 214",
  "Fyahbwoy", "Sofia Gabanna",
];

/* ---------- TRABAJO SELECCIONADO — TU NIVEL ACTUAL ----------
   Es lo primero que se ve después de la portada. Pon aquí 4–6 piezas que
   te representen HOY: publicidad, marcas, anuncios spec, videoclips recientes…
   La primera sale en grande.

   tipo:    "Videoclip", "Publicidad", "Spec", "Contenido", "Marca"…
   artista: el artista o la marca.
   video:   enlace de YouTube / Vimeo, o un archivo .mp4 de la carpeta video/
   portada: imagen (opcional si es YouTube o Vimeo)

   Los huecos vacíos NO se ven en la web: aparecen solos cuando los rellenas.
*/
const SELECCIONADOS = [
  { tipo: "Videoclip · Tráiler", titulo: "Háblalo Bajito", artista: "Sosad", anio: "", video: "video/trailer-1080.mp4", portada: "img/trailer-poster.webp", loop: "" },
  { tipo: "", titulo: "", artista: "", anio: "", video: "", portada: "", loop: "" },
  { tipo: "", titulo: "", artista: "", anio: "", video: "", portada: "", loop: "" },
  { tipo: "", titulo: "", artista: "", anio: "", video: "", portada: "", loop: "" },
  { tipo: "", titulo: "", artista: "", anio: "", video: "", portada: "", loop: "" },
];

/* ---------- ARCHIVO — VIDEOCLIPS (los más vistos) ----------
   Sale como lista compacta debajo del trabajo seleccionado.
   Una línea por videoclip, en el orden en que quieres que salgan.
*/
const PROYECTOS = [
  { artista: "Hard GZ & Nikone", titulo: "Lo Real", anio: "", visitas: "22M", video: "https://youtu.be/I96S7SxeVV0", portada: "", loop: "" },
  { artista: "Miranda & Hard GZ", titulo: "Volver", anio: "", visitas: "13M", video: "https://youtu.be/SAn9ya_nKPc", portada: "", loop: "" },
  { artista: "Nadal015", titulo: "Street Shark", anio: "", visitas: "12M", video: "https://youtu.be/G80kKs0ait4", portada: "", loop: "" },
  { artista: "Grind", titulo: "Goat", anio: "", visitas: "5,1M", video: "https://youtu.be/GoN7N9FnH1c", portada: "", loop: "" },
  { artista: "Arce", titulo: "Rebelde", anio: "", visitas: "315K", video: "https://youtu.be/xbvaDdxUoeY", portada: "", loop: "" },
  { artista: "Arce ft. Omar Montes", titulo: "Septiembre", anio: "", visitas: "125K", video: "https://youtu.be/TaKXVIiDns4", portada: "", loop: "" },
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
