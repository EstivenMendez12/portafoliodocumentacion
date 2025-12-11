// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Cerrar navbar en móviles
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if(navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Sistema de filtrado de documentos
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase active al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const documents = document.querySelectorAll('[data-category]');
        
        if (filter === 'all') {
            // Mostrar todos los documentos
            documents.forEach(doc => {
                doc.style.display = 'block';
            });
        } else {
            // Filtrar documentos por categoría
            documents.forEach(doc => {
                const categories = doc.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    doc.style.display = 'block';
                } else {
                    doc.style.display = 'none';
                }
            });
        }
    });
});

// Contador animado en la sección de estadísticas
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observador para animar contadores cuando son visibles
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target, 2000);
                    }, 500);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats-card');
if (statsSection) {
    observer.observe(statsSection);
}

// Efecto hover mejorado para tarjetas
document.querySelectorAll('.document-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.document-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.document-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Mostrar notificación al abrir documento
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const fileName = this.href.split('/').pop();
        console.log(`Abriendo documento: ${fileName}`);
        // Puedes agregar aquí un toast notification si lo deseas
    });
});

// Preloader (opcional)
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// Agregar tooltips a los badges
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Inicializar contadores
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (!isNaN(target)) {
            counter.textContent = '0';
            setTimeout(() => {
                animateCounter(counter, target, 2000);
            }, 1000);
        }
    });
});