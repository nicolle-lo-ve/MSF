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
        this.botonMiLista = document.querySelector('.nav-link:nth-child(2)');
        this.botonGeneros = document.getElementById('generos-link');
        this.botonPlataformas = document.getElementById('plataformas-link');
        this.botonRecomendar = document.getElementById('hero-add-btn');
        this.seccionPlataforma = document.getElementById('platform-series');
        this.botonInicio = document.getElementById('inicio-link');

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

        // Mostrar géneros disponibles
    // Modificar el método mostrarGeneros
    mostrarGeneros(generos) {
        // Verificar si ya existe el contenedor de géneros
        let contenedorGeneros = document.querySelector('.generos-container');
        
        if (!contenedorGeneros) {
            contenedorGeneros = document.createElement('div');
            contenedorGeneros.className = 'generos-container';
            contenedorGeneros.innerHTML = '<h3 class="section-title">🎭 Géneros</h3>';
            
            const listaGeneros = document.createElement('div');
            listaGeneros.className = 'generos-lista';
            contenedorGeneros.appendChild(listaGeneros);
            
            // Insertar solo si no existe
            this.contenedorSeries.parentElement.insertBefore(contenedorGeneros, this.contenedorSeries);
        }
        
        // Actualizar la lista de géneros
        const listaGeneros = contenedorGeneros.querySelector('.generos-lista');
        listaGeneros.innerHTML = ''; // Limpiar solo la lista de géneros
        
        generos.forEach(genero => {
            const botonGenero = document.createElement('button');
            botonGenero.className = 'genero-btn';
            botonGenero.textContent = genero;
            botonGenero.dataset.genero = genero;
            listaGeneros.appendChild(botonGenero);
        });
        
        // No limpiar las series
        // this.contenedorSeries.innerHTML = '';
    }

    // Modificar el método mostrarPlataformas
    mostrarPlataformas(plataformas) {
        // Verificar si ya existe el contenedor de plataformas
        let contenedorPlataformas = document.querySelector('.plataformas-container');
        
        if (!contenedorPlataformas) {
            contenedorPlataformas = document.createElement('div');
            contenedorPlataformas.className = 'plataformas-container';
            contenedorPlataformas.innerHTML = '<h3 class="section-title">🎬 Plataformas</h3>';
            
            const listaPlataformas = document.createElement('div');
            listaPlataformas.className = 'plataformas-lista';
            contenedorPlataformas.appendChild(listaPlataformas);
            
            // Insertar antes del contenedor de series
            this.contenedorSeries.parentElement.insertBefore(contenedorPlataformas, this.contenedorSeries);
        }
        
        // Actualizar la lista de plataformas
        const listaPlataformas = contenedorPlataformas.querySelector('.plataformas-lista');
        listaPlataformas.innerHTML = '';
        
        plataformas.forEach(plataforma => {
            const botonPlataforma = document.createElement('button');
            botonPlataforma.className = 'plataforma-btn';
            botonPlataforma.textContent = plataforma;
            botonPlataforma.dataset.plataforma = plataforma;
            listaPlataformas.appendChild(botonPlataforma);
        });
    }

    // Mostrar serie recomendada
    mostrarSerieRecomendada(serie) {
        const modalRecomendacion = document.createElement('div');
        modalRecomendacion.id = 'recomendacion-modal';
        modalRecomendacion.className = 'modal';
        
        modalRecomendacion.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>✨ Te recomendamos</h2>
                <div class="serie-recomendada">
                    <img src="${serie.image}" alt="${serie.title}" class="serie-image">
                    <h3>${serie.title}</h3>
                    <p><strong>Plataforma:</strong> ${serie.platform}</p>
                    <p><strong>Género:</strong> ${serie.genre}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalRecomendacion);
        modalRecomendacion.style.display = 'flex';
        
        modalRecomendacion.querySelector('.close-btn').addEventListener('click', () => {
            modalRecomendacion.remove();
        });
    }

    // Vincular eventos nuevos
     vincularMostrarGeneros(manejador) {
        this.botonGeneros.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.botonGeneros.classList.add('active');
            manejador();
        });
    }

    vincularMostrarPlataformas(manejador) {
        this.botonPlataformas.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.botonPlataformas.classList.add('active');
            manejador();
        });
    }

    vincularRecomendarSerie(manejador) {
        this.botonRecomendar.addEventListener('click', manejador);
    }

    vincularFiltrarPorGenero(manejador) {
        document.addEventListener('click', evento => {
            if (evento.target.classList.contains('genero-btn')) {
                const genero = evento.target.dataset.genero;
                manejador(genero);
            }
        });
    }

    vincularFiltrarPorPlataforma(manejador) {
        document.addEventListener('click', evento => {
            if (evento.target.classList.contains('plataforma-btn')) {
                const plataforma = evento.target.dataset.plataforma;
                manejador(plataforma);
            }
        });
    }

    
    vincularMostrarInicio(manejador) {
        this.botonInicio.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.botonInicio.classList.add('active');
            
            // Eliminar el contenedor de géneros si existe
            const contenedorGeneros = document.querySelector('.generos-container');
            if (contenedorGeneros) {
                contenedorGeneros.remove();
            }
            
            // Eliminar el contenedor de plataformas si existe
            const contenedorPlataformas = document.querySelector('.plataformas-container');
            if (contenedorPlataformas) {
                contenedorPlataformas.remove();
            }
            
            // Restaurar el título original de la sección de series
            const tituloSeries = this.contenedorSeries.previousElementSibling;
            if (tituloSeries && tituloSeries.classList.contains('section-title')) {
                tituloSeries.textContent = '💖 Mis Series Favoritas';
            }
            
            manejador();
        });
    }

}
