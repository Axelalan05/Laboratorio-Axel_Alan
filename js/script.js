const campos_formulario = {
  nombre: document.getElementById("nombre"),
  apellido: document.getElementById("apellido"),
  email: document.getElementById("email"),
  telefono: document.getElementById("telefono"),
  edad: document.getElementById("edad"),
  direccion: document.getElementById("direccion"),
  provincia: document.getElementById("provincia"),
  codigo_postal: document.getElementById("codigo_postal"),
};

const celdas_tabla = {
  nombre: document.querySelector("table tbody tr:nth-child(1) td:nth-child(2)"),
  apellido: document.querySelector(
    "table tbody tr:nth-child(2) td:nth-child(2)"
  ),
  email: document.querySelector("table tbody tr:nth-child(3) td:nth-child(2)"),
  telefono: document.querySelector(
    "table tbody tr:nth-child(4) td:nth-child(2)"
  ),
  edad: document.querySelector("table tbody tr:nth-child(5) td:nth-child(2)"),
  direccion: document.querySelector(
    "table tbody tr:nth-child(6) td:nth-child(2)"
  ),
  provincia: document.querySelector(
    "table tbody tr:nth-child(7) td:nth-child(2)"
  ),
  codigo_postal: document.querySelector(
    "table tbody tr:nth-child(8) td:nth-child(2)"
  ),
};

function actualizarTabla(campo, celda) {
  campo.addEventListener("input", () => {
    celda.textContent = campo.value;
  });
}

for (let campo in campos_formulario) {
  actualizarTabla(campos_formulario[campo], celdas_tabla[campo]);
}

function mostrarOcultarCV() {
  const cvCompleto = document.getElementById("cv-completo");
  const cvAbreviado = document.getElementById("cv-abreviado");
  const boton = event.target;

  if (cvCompleto.style.display === "none") {
    cvCompleto.style.display = "block";
    cvAbreviado.style.display = "none";
    boton.textContent = "Leer menos";
  } else {
    cvCompleto.style.display = "none";
    cvAbreviado.style.display = "block";
    boton.textContent = "Leer más";
  }
}
