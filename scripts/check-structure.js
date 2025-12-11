const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

let failed = false;
function assert(condition, message) {
  if (!condition) {
    console.error(`✖ ${message}`);
    failed = true;
  }
}

// Ensure core sections exist for navigation anchors
['inicio', 'servicios', 'nosotros', 'proyectos', 'clientes', 'contacto'].forEach((id) => {
  assert(new RegExp(`id=["']${id}["']`).test(html), `Falta la sección con id="${id}"`);
});

// Basic contact form field checks
const formFields = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'correo', label: 'Correo electrónico' },
  { id: 'telefono', label: 'Teléfono' },
  { id: 'servicio', label: 'Tipo de servicio' },
  { id: 'mensaje', label: 'Mensaje' },
];

formFields.forEach(({ id, label }) => {
  assert(new RegExp(`id=["']${id}["']`).test(html), `Falta el campo "${label}" con id="${id}"`);
});

// Hero call-to-action buttons should link to services and contact
assert(/href="#servicios"/.test(html), 'El botón "Ver servicios" debe enlazar a #servicios');
assert(/href="#contacto"/.test(html), 'El botón "Contactar ahora" debe enlazar a #contacto');

if (failed) {
  process.exitCode = 1;
  console.error('\nRevisa index.html: faltan elementos requeridos.');
} else {
  console.log('✓ Estructura principal verificada exitosamente.');
}
