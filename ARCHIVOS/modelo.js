class ModeloSeries {
    constructor() {
        this.series = JSON.parse(localStorage.getItem('series')) || [];
    }

    // Obtener todas las series
    obtenerTodasLasSeries() {
        return this.series;
    }

    // Obtener una serie por ID
    obtenerSeriePorId(id) {
        return this.series.find(serie => serie.id === id);
    }

    // Añadir una nueva serie
    agregarSerie(serie) {
        const nuevaSerie = {
            id: Date.now().toString(),
            ...serie
        };
        this.series.push(nuevaSerie);
        this._guardarEnLocalStorage();
        return nuevaSerie;
    }

    // Actualizar una serie existente
    actualizarSerie(id, serieActualizada) {
        const indice = this.series.findIndex(serie => serie.id === id);
        if (indice !== -1) {
            this.series[indice] = { ...this.series[indice], ...serieActualizada };
            this._guardarEnLocalStorage();
            return true;
        }
        return false;
    }

    // Eliminar una serie
    eliminarSerie(id) {
        const indice = this.series.findIndex(serie => serie.id === id);
        if (indice !== -1) {
            this.series.splice(indice, 1);
            this._guardarEnLocalStorage();
            return true;
        }
        return false;
    }

    // Guardar en localStorage
    _guardarEnLocalStorage() {
        localStorage.setItem('series', JSON.stringify(this.series));
    }
}