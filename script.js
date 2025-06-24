//datos json//
async function datos() {
    const consulta = await fetch("https://raw.githubusercontent.com/panchiwurthg/TRABAJO-FINAL-WEB/refs/heads/main/datosjson.json");
    data = await consulta.json();
    console.log(data);
    }
    datos().catch((error) => console.error(error));


//scroll titulo//
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

//scroll franquicias//
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
            }
            });    
    }, { threshold: 0.3 });

document.querySelectorAll(".franchise-container").forEach(container => {
    observer.observe(container);
    });