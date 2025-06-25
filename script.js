/*scroll titulo*/
const spans = document.querySelectorAll('h1 span');
let triggered = false;
window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight / 1.3;
    spans.forEach((span, index) => {
        const rect = span.getBoundingClientRect();
        if (rect.top < triggerPoint && !triggered) {
            setTimeout(() => {
                span.classList.add('visible');
                }, index * 300);
            }
            });
    triggered = true;
    });

/* scroll franquicias */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 }); 

document.querySelectorAll(".franchise-container").forEach(container => {
    observer.observe(container);
});



/*peliculas por franquicia*/

const DATA_URL = "https://raw.githubusercontent.com/panchiwurthg/TRABAJO-FINAL-WEB/main/datos.json";

async function cargarDatosCarrusel() {
  try {
    const respuesta = await fetch(DATA_URL);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP! Estado: ${respuesta.status}. No se pudo cargar datos.json.`);
    }

    const datos = await respuesta.json();
    console.log("Datos cargados correctamente:", datos);

    const franquiciasUnicas = [...new Set(datos.map(p => p.FRANQUICIA))];
    franquiciasUnicas.forEach(nombreFranquicia => {
      const carruselContenedorDOM = document.querySelector(`.carousel[data-franchise="${nombreFranquicia}"]`);

      if (!carruselContenedorDOM) {
        console.warn(`No se encontró un contenedor HTML con data-franchise="${nombreFranquicia}" para el carrusel.`);
        return; 
      }

    const peliculasDeFranquicia = datos.filter(p => p.FRANQUICIA === nombreFranquicia);
    const carruselInterno = document.createElement("div");
    carruselInterno.className = "franchise-carousel"; 

    peliculasDeFranquicia.forEach(pelicula => {
        if (!pelicula.IMAGE || typeof pelicula.IMAGE !== "string" || pelicula.IMAGE.trim() === "") {
          console.warn(`Película sin URL de imagen válida o mal formateada:`, pelicula);
          return;
        }

    const thumb = document.createElement("div");
    thumb.className = "movie-thumb"; // Clase para el estilo de cada miniatura

    const img = document.createElement("img");
    img.src = pelicula.IMAGE; 
    img.alt = pelicula.PELICULA || "Imagen de película"; 
    img.loading = "lazy"; 

    const info = document.createElement("div");
    info.className = "movie-info";
    info.textContent = `${pelicula.PELICULA} (${pelicula.YEAR || 'Año desconocido'}) - Dir. ${pelicula.DIRECTOR || 'Director desconocido'}`;

    thumb.appendChild(img);
    thumb.appendChild(info);

    carruselInterno.appendChild(thumb);
    });

    carruselContenedorDOM.appendChild(carruselInterno);
    });

  } catch (error) {
    console.error("Error crítico al cargar o procesar los datos del carrusel:", error);
  }
}

cargarDatosCarrusel();
