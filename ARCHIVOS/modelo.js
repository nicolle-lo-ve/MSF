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

    // Obtener series por género
    obtenerSeriesPorGenero(genero) {
        return this.series.filter(serie => 
            serie.genre.toLowerCase().includes(genero.toLowerCase())
        );
    }

    // Obtener series por plataforma
    obtenerSeriesPorPlataforma(plataforma) {
        return this.series.filter(serie => 
            serie.platform.toLowerCase().includes(plataforma.toLowerCase())
        );
    }

    // Obtener una serie aleatoria
    obtenerSerieAleatoria() {
        if (this.series.length === 0) return null;
        const indiceAleatorio = Math.floor(Math.random() * this.series.length);
        return this.series[indiceAleatorio];
    }

    // Obtener todos los géneros únicos
    obtenerTodosLosGeneros() {
        const generos = new Set();
        this.series.forEach(serie => {
            // Separar géneros si están en formato "Drama, Comedia"
            serie.genre.split(',').forEach(g => {
                generos.add(g.trim());
            });
        });
        return Array.from(generos);
    }

    // Obtener todas las plataformas únicas
    obtenerTodasLasPlataformas() {
        const plataformas = new Set();
        this.series.forEach(serie => {
            plataformas.add(serie.platform);
        });
        return Array.from(plataformas);
    }


    // Guardar en localStorage
    _guardarEnLocalStorage() {
        localStorage.setItem('series', JSON.stringify(this.series));
    }
}
