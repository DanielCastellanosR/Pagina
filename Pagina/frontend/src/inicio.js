// Función para verificar las credenciales de inicio de sesión
function verificarCredenciales(usuario, contraseña) {
    // Aquí puedes agregar la lógica para verificar las credenciales en tu base de datos o sistema de autenticación
    // Por ahora, simplemente comprobaremos si el usuario es "admin" y la contraseña es "123456"
    if (usuario === "admin" && contraseña === "123456") {
        return true; // Credenciales válidas
    } else {
        return false; // Credenciales inválidas
    }
}

// Función para manejar el evento de inicio de sesión
function inicio() {
    // Obtener los valores de usuario y contraseña del formulario
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Verificar las credenciales
    if (verificarCredenciales(usuario, contraseña)) {
        // Iniciar sesión exitosamente
        alert("Inicio de sesión exitoso");
        // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones necesarias
    } else {
        // Credenciales inválidas
        alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
}

// Asignar la función inicio al evento de clic del botón de inicio de sesión
document.getElementById("botonInicio").addEventListener("click", inicio);

