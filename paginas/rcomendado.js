var misLibros = JSON.parse(localStorage.getItem("misLibros")) || [];

function Aleatorios() {
  document.getElementById("nuevos").innerHTML = "";
  let nuevos = "";

  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * libros.length);
    const libro = libros[num];
    const portada = libro.formats["image/jpeg"] || "https://placehold.co/100x150";

    nuevos += `
      <div class="c-lista-libro">
        <img src="${portada}" alt="${libro.title}" width="100" height="150">
        <p>${libro.title}</p>
        <p>${libro.authors[0]?.name || "Autor desconocido"}</p>
      </div>
    `;

    // Guardar si no está
    if (!misLibros.includes(libro.id)) {
      misLibros.push(libro.id);
      localStorage.setItem("misLibros", JSON.stringify(misLibros));
    }
  }

  document.getElementById("nuevos").innerHTML += nuevos;
  document.getElementById("contador").innerHTML = `${misLibros.length} / ${libros.length}`;
}

function Capturados() {
  document.getElementById("root").innerHTML = "";

  // crear aleatorios
  const capturaAleatoria = document.createElement("section");
  capturaAleatoria.classList.add("c-lista");
  capturaAleatoria.id = "nuevos";

  // boton
  const boton = document.createElement("button");
  boton.textContent = "4 nuevos libros";
  boton.addEventListener("click", () => Aleatorios());

  // lista de colección
  const seccionColeccion = document.createElement("section");
  seccionColeccion.classList.add("c-lista");
  let misItems = "";

  for (let i = 0; i < libros.length; i++) {
    const libro = libros[i];
    const portada = libro.formats["image/jpeg"] || "https://placehold.co/100x150";
    if (misLibros.includes(libro.id)) {
      misItems += `
        <div class="c-unlibro c-mios-libros" onclick="Detalle('${libro.id}')">
          <img src="${portada}" width="60" height="90" loading="lazy">
          <p>${libro.title}</p>
        </div>`;
    } else {
      misItems += `<div class="c-unlibro" id="c-unlibro-${libro.id}"><p>${libro.title}</p></div>`;
    }
  }

  seccionColeccion.innerHTML = misItems;

  let contador = document.createElement("p");
  contador.id = "contador";
  contador.textContent = `${misLibros.length} / ${libros.length}`;

  document.getElementById("root").appendChild(contador);
  document.getElementById("root").appendChild(boton);
  document.getElementById("root").appendChild(capturaAleatoria);
  document.getElementById("root").appendChild(seccionColeccion);
}
