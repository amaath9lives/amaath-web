/* =========================================================
   TU WEB — SOLO TIENES QUE EDITAR ESTE ARCHIVO
   ========================================================= */

/* ---------- TUS DATOS ---------- */
const PERFIL = {
  nombre: "Amaath",
  frase: "Director de videoclips. Madrid.",
  // Vídeo de fondo de la portada (opcional): mp4 corto, sin audio, 1920x1080, < 8 MB.
  // Ej. "img/hero.mp4". Si lo dejas vacío "", sale un fondo oscuro con grano.
  videoPortada: "",
  // Cifras que salen bajo la portada (puedes cambiarlas o quitar alguna)
  cifras: [
    { valor: "100+", texto: "videoclips dirigidos" },
    { valor: "2018", texto: "primer videoclip" },
    { valor: "D · E · C", texto: "dirección, edición y color" },
    { valor: "MAD", texto: "base en Madrid" },
  ],
};

/* ---------- TUS VIDEOCLIPS ----------
   Cada bloque { ... } es un trabajo. El orden aquí es el orden en la web.
   - artista: nombre del artista (también crea el filtro por artista)
   - titulo:  nombre de la canción
   - anio:    año (opcional)
   - visitas: ej. "2,4M" (opcional, se ve a la derecha)
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
  // Clave de Web3Forms (la que te llega por email). Sin ella, el formulario
  // abre el correo del cliente con el brief ya escrito.
  web3formsKey: "",
};
