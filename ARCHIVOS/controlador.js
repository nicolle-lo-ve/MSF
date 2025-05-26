class ControladorSeries {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

        // Vincular eventos
        this.vista.vincularAgregarSerie(this.manejarAgregarSerie);
        this.vista.vincularAlternarDetalles(this.manejarAlternarDetalles);
        this.vista.vincularEditarSerie(this.manejarEditarSerie);
        this.vista.vincularEliminarSerie(this.manejarEliminarSerie);
        this.vista.vincularGuardarSerie(this.manejarGuardarSerie);
        this.vista.vincularCancelarModal(this.manejarCancelarModal);

        // Mostrar series iniciales
        this.mostrarSeries();
    }

    // Mostrar todas las series
    mostrarSeries = () => {
        const series = this.modelo.obtenerTodasLasSeries();
        this.vista.mostrarSeries(series);
    }

    // Manejar añadir nueva serie
    manejarAgregarSerie = () => {
        this.vista.mostrarModal();
    }

    // Manejar mostrar/ocultar detalles
    manejarAlternarDetalles = (id) => {
        this.vista.alternarDetallesSerie(id);
    }

    // Manejar editar serie
    manejarEditarSerie = (id) => {
        const serie = this.modelo.obtenerSeriePorId(id);
        if (serie) {
            this.vista.mostrarModal(serie);
        }
    }

    // Manejar eliminar serie
    manejarEliminarSerie = (id) => {
        const exito = this.modelo.eliminarSerie(id);
        if (exito) {
            this.mostrarSeries();
        }
    }

    // Manejar guardar serie
    manejarGuardarSerie = (id, datosSerie) => {
        if (id) {
            // Actualizar serie existente
            this.modelo.actualizarSerie(id, datosSerie);
        } else {
            // Añadir nueva serie
            this.modelo.agregarSerie(datosSerie);
        }
        this.mostrarSeries();
    }

    // Manejar cancelar modal
    manejarCancelarModal = () => {
        this.vista.ocultarModal();
        this.vista.ocultarModalConfirmacion();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const modelo = new ModeloSeries();
    const vista = new VistaSeries();
    new ControladorSeries(modelo, vista);
});