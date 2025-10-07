function Favoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (favoritos.length === 0) {
    document.getElementById("root").innerHTML = "<p>No hay libros favoritos</p>";
  } else {
    document.getElementById("root").innerHTML = generarListaFavoritos(favoritos);
  }
}

function generarListaFavoritos(array) {
  let listaHTML = "";
  for (let i = 0; i < array.length; i++) {
    listaHTML += `
      <div class="c-lista-libro" onclick="Detalle(${array[i].id})">
        <p>${array[i].title}</p>
      </div>
    `;
  }
  return listaHTML;
}
