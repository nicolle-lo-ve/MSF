class VistaSeries {
    constructor() {
        this.contenedorSeries = document.getElementById('series-container');
        this.botonAgregarSerie = document.getElementById('add-series-btn');
        this.modal = document.getElementById('series-modal');
        this.modalConfirmacion = document.getElementById('confirm-modal');
        this.tituloModal = document.getElementById('modal-title');
        this.formularioSerie = document.getElementById('series-form');
        this.botonCerrar = document.querySelector('.close-btn');
        this.botonCancelar = document.getElementById('cancel-btn');
        this.botonGuardar = document.getElementById('save-btn');
        this.botonConfirmarCancelar = document.getElementById('confirm-cancel');
        this.botonConfirmarEliminar = document.getElementById('confirm-delete');

        // Campos del formulario
        this.campoIdSerie = document.getElementById('series-id');
        this.campoTitulo = document.getElementById('title');
        this.campoImagen = document.getElementById('image');
        this.campoPlataforma = document.getElementById('platform');
        this.campoAnio = document.getElementById('year');
        this.campoGenero = document.getElementById('genre');
        this.campoMultiTemporada = document.getElementById('isMultiSeason');
    }

    // Mostrar todas las series
    mostrarSeries(series) {
        this.contenedorSeries.innerHTML = '';
        series.forEach(serie => {
            const elementoSerie = this._crearElementoSerie(serie);
            this.contenedorSeries.appendChild(elementoSerie);
        });
    }

    // Crear elemento HTML para una serie
    _crearElementoSerie(serie) {
        const tarjetaSerie = document.createElement('div');
        tarjetaSerie.className = 'serie-card';
        tarjetaSerie.dataset.id = serie.id;

        tarjetaSerie.innerHTML = `
            <div class="serie-header">
                <h3 class="serie-title">${serie.title}</h3>
                <div class="serie-actions">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Borrar</button>
                </div>
            </div>
            <div class="serie-details">
                <img src="${serie.image}" alt="${serie.title}" class="serie-image">
                <p class="serie-info"><strong>Plataforma:</strong> ${serie.platform}</p>
                <p class="serie-info"><strong>Año:</strong> ${serie.year}</p>
                <p class="serie-info"><strong>Género:</strong> ${serie.genre}</p>
                <p class="serie-info"><strong>Tipo:</strong> ${serie.isMultiSeason ? 'Serie con temporadas' : 'Miniserie'}</p>
            </div>
        `;

        return tarjetaSerie;
    }

    // Mostrar modal para añadir/editar serie
    mostrarModal(serie = null) {
        if (serie) {
            this.tituloModal.textContent = 'Editar Serie';
            this.campoIdSerie.value = serie.id;
            this.campoTitulo.value = serie.title;
            this.campoImagen.value = serie.image;
            this.campoPlataforma.value = serie.platform;
            this.campoAnio.value = serie.year;
            this.campoGenero.value = serie.genre;
            this.campoMultiTemporada.checked = serie.isMultiSeason;
        } else {
            this.tituloModal.textContent = 'Añadir Nueva Serie';
            this.formularioSerie.reset();
            this.campoIdSerie.value = '';
        }
        this.modal.style.display = 'flex';
    }

    // Ocultar modal
    ocultarModal() {
        this.modal.style.display = 'none';
    }

    // Mostrar modal de confirmación
    mostrarModalConfirmacion(serieId) {
        this.modalConfirmacion.dataset.id = serieId;
        this.modalConfirmacion.style.display = 'flex';
    }

    // Ocultar modal de confirmación
    ocultarModalConfirmacion() {
        this.modalConfirmacion.style.display = 'none';
    }

    // Alternar visibilidad de los detalles de la serie
    alternarDetallesSerie(serieId) {
        const tarjetaSerie = document.querySelector(`.serie-card[data-id="${serieId}"]`);
        if (tarjetaSerie) {
            const detalles = tarjetaSerie.querySelector('.serie-details');
            detalles.classList.toggle('active');
        }
    }

    // Vincular eventos
    vincularAgregarSerie(manejador) {
        this.botonAgregarSerie.addEventListener('click', manejador);
    }

    vincularAlternarDetalles(manejador) {
        this.contenedorSeries.addEventListener('click', evento => {
            if (evento.target.classList.contains('serie-title')) {
                const tarjetaSerie = evento.target.closest('.serie-card');
                manejador(tarjetaSerie.dataset.id);
            }
        });
    }

    vincularEditarSerie(manejador) {
        this.contenedorSeries.addEventListener('click', evento => {
            if (evento.target.classList.contains('edit-btn')) {
                const tarjetaSerie = evento.target.closest('.serie-card');
                manejador(tarjetaSerie.dataset.id);
            }
        });
    }

    vincularEliminarSerie(manejador) {
        this.contenedorSeries.addEventListener('click', evento => {
            if (evento.target.classList.contains('delete-btn')) {
                const tarjetaSerie = evento.target.closest('.serie-card');
                this.mostrarModalConfirmacion(tarjetaSerie.dataset.id);
            }
        });

        this.botonConfirmarEliminar.addEventListener('click', () => {
            manejador(this.modalConfirmacion.dataset.id);
            this.ocultarModalConfirmacion();
        });
    }

    vincularGuardarSerie(manejador) {
        this.formularioSerie.addEventListener('submit', evento => {
            evento.preventDefault();
            const datosSerie = {
                title: this.campoTitulo.value,
                image: this.campoImagen.value,
                platform: this.campoPlataforma.value,
                year: parseInt(this.campoAnio.value),
                genre: this.campoGenero.value,
                isMultiSeason: this.campoMultiTemporada.checked
            };
            
            const id = this.campoIdSerie.value;
            manejador(id, datosSerie);
            this.ocultarModal();
        });
    }

    vincularCancelarModal(manejador) {
        this.botonCerrar.addEventListener('click', manejador);
        this.botonCancelar.addEventListener('click', manejador);
        this.botonConfirmarCancelar.addEventListener('click', manejador);
    }
}