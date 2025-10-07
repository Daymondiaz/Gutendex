// ==============================================
// página principal - listado y buscador de libros
// ==============================================

// genera la lista HTML de libros
function generarLista(arrayLibros) {
  let listaHTML = "";
  for (let i = 0; i < arrayLibros.length; i++) {
    const libro = arrayLibros[i];
    const portada = libro.formats["image/jpeg"] || "https://placehold.co/100x150";
    const autor = libro.authors[0]?.name || "Autor desconocido";

    listaHTML += `
      <div class="c-lista-libro" onclick="Detalle('${libro.id}')"
           style="display:inline-block; text-align:center; margin:10px;">
        <img src="${portada}" alt="${libro.title}" width="100" height="150"
             style="border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.2)">
        <p><b>${libro.title}</b></p>
        <p>${autor}</p>
      </div>
    `;
  }
  return listaHTML;
}

// buscador dinámico
function buscadorfuncion(valor) {
  if (valor.length >= 3) {
    const filtrados = libros.filter(libro =>
      libro.title.toLowerCase().includes(valor.toLowerCase())
    );
    document.getElementById("la-lista").innerHTML = generarLista(filtrados);
  } else {
    document.getElementById("la-lista").innerHTML = generarLista(libros);
  }
}

// función principal de la vista Home
function Home() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // campo de búsqueda
  const buscador = document.createElement("input");
  buscador.type = "text";
  buscador.placeholder = "Buscar libro...";
  buscador.style.cssText =
    "display:block;margin:15px auto;padding:8px 12px;width:80%;max-width:400px;font-size:16px;border-radius:8px;border:1px solid #ccc;";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  // contenedor de lista
  const lista = document.createElement("div");
  lista.classList.add("c-contenedor-lista");
  lista.id = "la-lista";
  lista.innerHTML = generarLista(libros);

  // añadir al DOM
  root.appendChild(buscador);
  root.appendChild(lista);
}
