
let libros = []; 

async function conexionLista() {
  try {
    const res = await fetch("https://gutendex.com/books?languages=es"); 
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("❌ Error al conectar con Gutendex:", error);
    return [];
  }
}


async function General() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando libros...</p>";

  libros = await conexionLista();

  console.log("📚 Libros cargados:", libros.length); // para verificar en consola

  if (libros.length > 0) {
    Home();
  } else {
    root.innerHTML = `
      <p>No se pudieron cargar los libros 😢</p>
      <p>Verifica tu conexión o la API Gutendex.</p>
    `;
  }
}

General();
