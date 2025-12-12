/* ==========================================
           DATOS DEL CATÁLOGO (Simulación de Base de Datos)
           ========================================== */
const productosDB = [
    { id: 1, nombre: "Bolsa de Cemento Sol 42.5kg", precio: 28.50, cat: "Construcción" },
    { id: 2, nombre: "Ladrillo King Kong 18 huecos", precio: 1.20, cat: "Construcción" },
    { id: 3, nombre: "Taladro Percutor 650W Bosch", precio: 249.90, cat: "Herramientas" },
    { id: 4, nombre: "Pintura Látex Blanca 4L", precio: 45.00, cat: "Acabados" },
    { id: 5, nombre: "Juego de Destornilladores x6", precio: 35.00, cat: "Herramientas" },
    { id: 6, nombre: "Casco de Seguridad Amarillo", precio: 15.00, cat: "EPP" },
    { id: 7, nombre: "Varilla de Fierro 1/2'' Aceros Arequipa", precio: 38.00, cat: "Construcción" },
    { id: 8, nombre: "Cerámico San Lorenzo 45x45 m2", precio: 32.00, cat: "Acabados" },
    { id: 9, nombre: "Tubería PVC 4'' Pavco", precio: 22.50, cat: "Gasfitería" },
    { id: 10, nombre: "Guantes de Cuero Reforzado", precio: 12.00, cat: "EPP" },
    { id: 11, nombre: "Martillo de Uña 16oz Stanley", precio: 28.00, cat: "Herramientas" },
    { id: 12, nombre: "Cinta Métrica 5m", precio: 18.00, cat: "Herramientas" },
    { id: 13, nombre: "Tanque de Agua 1100L Rotoplas", precio: 650.00, cat: "Gasfitería" },
    { id: 14, nombre: "Bolsa de Arena Fina", precio: 8.00, cat: "Construcción" },
    { id: 15, nombre: "Foco LED 10W Pack x4", precio: 25.00, cat: "Electricidad" }
];

/* ==========================================
   LÓGICA DEL CATÁLOGO (Paginación + Buscador)
   ========================================== */
const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = "";

const productGrid = document.getElementById('productGrid');
const paginationControls = document.getElementById('paginationControls');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Función Principal: Renderizar Productos
function renderCatalog() {
    productGrid.innerHTML = "";

    // 1. Filtrar
    const filteredProducts = productosDB.filter(p =>
        p.nombre.toLowerCase().includes(currentFilter.toLowerCase())
    );

    // 2. Paginar
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    // Asegurar que la página actual sea válida
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    if (totalPages === 0) currentPage = 1;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredProducts.slice(start, end);

    // 3. Dibujar Cards
    if (paginatedItems.length === 0) {
        productGrid.innerHTML = `<div class="col-12 text-center text-muted py-5"><h3>No se encontraron productos :(</h3></div>`;
    } else {
        paginatedItems.forEach(prod => {
            // Usamos placeholders dinámicos con el nombre del producto para simular imagen real
            const imgUrl = `https://placehold.co/400x300/e9ecef/333?text=${encodeURIComponent(prod.nombre.split(" ")[0])}`;

            const html = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card card-product h-100">
                            <img src="${imgUrl}" class="card-img-top" alt="${prod.nombre}">
                            <div class="card-body d-flex flex-column">
                                <small class="text-muted mb-1">${prod.cat}</small>
                                <h5 class="card-title">${prod.nombre}</h5>
                                <div class="mt-auto d-flex justify-content-between align-items-center">
                                    <span class="price-tag">S/ ${prod.precio.toFixed(2)}</span>
                                    <button class="btn btn-outline-primary btn-sm"><i class="bi bi-cart-plus"></i> Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
            productGrid.innerHTML += html;
        });
    }

    // 4. Dibujar Paginación
    renderPagination(totalPages);
}

// Función Auxiliar: Dibujar controles de paginación
function renderPagination(totalPages) {
    paginationControls.innerHTML = "";
    if (totalPages <= 1) return;

    // Botón Anterior
    let prevDisabled = currentPage === 1 ? "disabled" : "";
    paginationControls.innerHTML += `
                <li class="page-item ${prevDisabled}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Anterior</a>
                </li>`;

    // Números
    for (let i = 1; i <= totalPages; i++) {
        let active = i === currentPage ? "active" : "";
        paginationControls.innerHTML += `
                    <li class="page-item ${active}">
                        <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                    </li>`;
    }

    // Botón Siguiente
    let nextDisabled = currentPage === totalPages ? "disabled" : "";
    paginationControls.innerHTML += `
                <li class="page-item ${nextDisabled}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Siguiente</a>
                </li>`;
}

// Eventos de Catálogo
window.changePage = (page) => {
    if (page < 1) return;
    currentPage = page;
    renderCatalog();
};

searchBtn.addEventListener('click', () => {
    currentFilter = searchInput.value;
    currentPage = 1; // Resetear a página 1 al buscar
    renderCatalog();
});

// Permitir buscar con tecla Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        currentFilter = searchInput.value;
        currentPage = 1;
        renderCatalog();
    }
});

/* ==========================================
   LÓGICA DEL FORMULARIO DE CONTACTO
   ========================================== */
const contactForm = document.getElementById('contactForm');
const successModalElement = document.getElementById('successModal');
const successModal = new bootstrap.Modal(successModalElement);

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recarga de página

    // Simulamos envío (aquí iría una llamada a API real)
    // Mostramos el modal
    successModal.show();
});

// Al cerrar el modal, limpiamos el formulario
successModalElement.addEventListener('hidden.bs.modal', function () {
    contactForm.reset();
});

// Inicializar catálogo al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
});