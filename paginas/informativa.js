function Informativa() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>📚 Información de los libros cargados</h2>";

  if (!libros || libros.length === 0) {
    root.innerHTML += "<p>No hay libros cargados todavía.</p>";
    return;
  }

  let contenido = "";

  libros.forEach(libro => {
    const portada = libro.formats["image/jpeg"] || "https://placehold.co/100x150";
    const autor = libro.authors[0]?.name || "Autor desconocido";
    const idioma = libro.languages.join(", ").toUpperCase();
    const temas = libro.subjects.slice(0, 3).join(", ") || "Sin temas disponibles";

    // Generar una descripción breve combinando datos del libro
    const descripcion = `
      "${libro.title}" es una obra escrita por ${autor}, disponible en idioma ${idioma}.
      Pertenece a las categorías: ${temas}. Este libro forma parte del catálogo público de Gutendex,
      donde se recopilan textos literarios clásicos y de dominio público.`;

    contenido += `
      <div class="c-detalle-libro" 
           style="margin:15px;padding:10px;border:1px solid #ccc;border-radius:10px;box-shadow:0 2px 5px rgba(0,0,0,0.1)">
        <img src="${portada}" alt="${libro.title}" width="100" height="150"
             style="float:left;margin-right:15px;border-radius:8px;">
        <h3>${libro.title}</h3>
        <p><b>Autor:</b> ${autor}</p>
        <p><b>Idioma:</b> ${idioma}</p>
        <p><b>Temas:</b> ${temas}</p>
        <p style="text-align:justify;">${descripcion}</p>
        <div style="clear:both;"></div>
      </div>
    `;
  });

  root.innerHTML += contenido;
}
