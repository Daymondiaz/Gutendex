function Capturados() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>🎯 Recomendaciones de Libros</h2>";

  // Botón para mostrar un libro recomendado
  const botonRecomendado = document.createElement("button");
  botonRecomendado.textContent = "Mostrar libro recomendado";
  botonRecomendado.style.cssText = `
    display:block;
    margin:15px auto;
    padding:10px 20px;
    font-size:16px;
    background-color:#007bff;
    color:white;
    border:none;
    border-radius:8px;
    cursor:pointer;
  `;
  botonRecomendado.addEventListener("click", mostrarLibroRecomendado);

  // Contenedor donde se mostrará el libro
  const contenedorLibro = document.createElement("div");
  contenedorLibro.id = "recomendado";
  contenedorLibro.style.cssText = "margin-top:20px; text-align:center;";

  // Agregar al DOM
  root.appendChild(botonRecomendado);
  root.appendChild(contenedorLibro);
}


function mostrarLibroRecomendado() {
  const contenedor = document.getElementById("recomendado");

  if (!libros || libros.length === 0) {
    contenedor.innerHTML = "<p>No hay libros cargados todavía.</p>";
    return;
  }

  // Seleccionar un libro al azar
  const randomIndex = Math.floor(Math.random() * libros.length);
  const libro = libros[randomIndex];

  const portada = libro.formats["image/jpeg"] || "https://placehold.co/150x220";
  const autor = libro.authors[0]?.name || "Autor desconocido";
  const idioma = libro.languages.join(", ").toUpperCase();
  const temas = libro.subjects.slice(0, 3).join(", ") || "Sin temas disponibles";

  const descripcion = `
    "${libro.title}" es una obra escrita por ${autor}, disponible en idioma ${idioma}.
    Pertenece a las categorías: ${temas}. Este libro forma parte de la biblioteca pública de Gutendex.
  `;

  contenedor.innerHTML = `
    <div style="display:inline-block; text-align:center; padding:15px; border:1px solid #ccc; border-radius:10px; max-width:300px; box-shadow:0 2px 5px rgba(0,0,0,0.1)">
      <img src="${portada}" alt="${libro.title}" width="150" height="220" style="border-radius:8px; margin-bottom:10px;">
      <h3>${libro.title}</h3>
      <p><b>Autor:</b> ${autor}</p>
      <p><b>Idioma:</b> ${idioma}</p>
      <p><b>Temas:</b> ${temas}</p>
      <p style="text-align:justify;">${descripcion}</p>
      <button onclick="Detalle(${libro.id})"
              style="margin-top:10px;padding:6px 12px;border:none;border-radius:6px;background:#28a745;color:white;cursor:pointer;">
        Ver detalle
      </button>
    </div>
  `;
}
