let esFavorito = false;

async function Detalle(id) {
  const root = document.getElementById("root");
  root.innerHTML = "Cargando...";

  const res = await fetch(`https://gutendex.com/books/${id}`);
  const data = await res.json();

  // Revisar si está en favoritos
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  esFavorito = favoritos.some(libro => libro.id === data.id);

  const portada = data.formats["image/jpeg"] || "https://placehold.co/200x300";
  const autor = data.authors[0]?.name || "Autor desconocido";
  const idioma = data.languages.join(", ").toUpperCase();

  const detalle = `
    <section class="c-detalle">
      <img src="${portada}" alt="${data.title}" height="200">
      <h2>${data.title}</h2>
      <p><b>Autor:</b> ${autor}</p>
      <p><b>Idioma:</b> ${idioma}</p>
      <p><b>Descargas:</b> ${data.download_count}</p>

      <button onclick="toggleFavorito(${data.id}, '${data.title}')">
        <span id="corazon-${data.id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
    </section>
  `;
  root.innerHTML = detalle;
}

function toggleFavorito(id, titulo) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = favoritos.some(lib => lib.id === id);

  if (existe) {
    favoritos = favoritos.filter(lib => lib.id !== id);
    esFavorito = false;
  } else {
    favoritos.push({ id, title: titulo });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  const corazon = document.getElementById(`corazon-${id}`);
  if (corazon) corazon.textContent = esFavorito ? "❤️" : "🤍";
}
