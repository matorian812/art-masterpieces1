document.addEventListener('DOMContentLoaded', function() {
    // Данные слайдов (в реальном проекте загружаются из presentation.md)
    const slides = [
        {
            type: 'title',
            title: 'От романтизма до модерна',
            subtitle: 'Главные имена и шедевры искусства XVIII-XX веков',
            image: 'https://rusmuseumvrm.ru/data/collections/painting_19/zh_5726/main.jpg',
            description: 'Обзор ключевых произведений из списка'
        },
        {
            type: 'content',
            title: 'Введение',
            content: '<h3>Цель презентации</h3><p>Познакомиться с выдающимися произведениями живописи и скульптуры, понять их значение и место в истории искусства.</p><h3>Структура</h3><ol><li>Золотой век русской живописи</li><li>Передвижники и критический реализм</li><li>Рубеж веков: от реализма к модерну</li><li>Великие русские скульпторы</li><li>Взгляд на Запад</li></ol>'
        },
        {
            type: 'artwork',
            title: 'Золотой век русской живописи',
            subtitle: 'Романтический портрет и бытовой жанр',
            artworks: [
                {
                    title: 'О.А. Кипренский. «Портрет Е.В. Давыдова»',
                    url: 'https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Frusmuseumvrm.ru%2Fdata%2Fcollections%2Fpainting_19%2Fzh_4513%2Fmain.jpg&lr=2&pos=5&rpt=image&text=Кипренский портрет Давыдова',
                    description: 'Герой-гусар, романтический идеал эпохи 1812 года'
                },
                {
                    title: 'О.А. Кипренский. «Портрет А.С. Пушкина»',
                    url: 'https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.tretyakovgallery.ru%2Fupload%2Fiblock%2Fcbf%2Fcbf0f0eafdcdc4b9af1c5ab51eac5853.jpg&lr=2&pos=1&rpt=image&text=Кипренский портрет Пушкина',
                    description: 'Образ поэта-пророка, самый известный прижизненный портрет'
                }
            ]
        },
        // ... добавьте остальные слайды по аналогии
    ];

    let currentSlide = 0;
    const slidesWrapper = document.querySelector('.slides-wrapper');

    // Инициализация презентации
    function initPresentation() {
        renderSlides();
        updateSlideCounter();
        setupEventListeners();
        showSlide(0);
    }

    // Рендер всех слайдов
    function renderSlides() {
        slidesWrapper.innerHTML = '';
        
        slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.dataset.type = slide.type;
            slideElement.dataset.index = index;
            
            let content = '';
            
            switch(slide.type) {
                case 'title':
                    content = `
                        <h1 class="slide-title">${slide.title}</h1>
                        <h2 class="slide-subtitle">${slide.subtitle}</h2>
                        <img src="${slide.image}" alt="${slide.title}" style="max-width: 80%; border-radius: 10px; margin: 20px 0;">
                        <p style="font-size: 1.2em;">${slide.description}</p>
                    `;
                    break;
                    
                case 'content':
                    content = `
                        <h1 class="slide-title">${slide.title}</h1>
                        <div class="content">${slide.content}</div>
                    `;
                    break;
                    
                case 'artwork':
                    let artworksHTML = '';
                    if (slide.artworks) {
                        artworksHTML = '<div class="artworks-grid">';
                        slide.artworks.forEach(artwork => {
                            artworksHTML += `
                                <div class="artwork-item">
                                    <img src="${getDirectImageUrl(artwork.url)}" alt="${artwork.title}" class="artwork-image">
                                    <div class="artwork-info">
                                        <h3 class="artwork-title">${artwork.title}</h3>
                                        <p class="artwork-description">${artwork.description}</p>
                                    </div>
                                </div>
                            `;
                        });
                        artworksHTML += '</div>';
                    }
                    
                    content = `
                        <h1 class="slide-title">${slide.title}</h1>
                        ${slide.subtitle ? `<h2 class="slide-subtitle">${slide.subtitle}</h2>` : ''}
                        ${artworksHTML}
                    `;
                    break;
            }
            
            slideElement.innerHTML = content;
            slidesWrapper.appendChild(slideElement);
        });
    }

    // Получение прямого URL изображения из яндекс-ссылки
    function getDirectImageUrl(yandexUrl) {
        // Это упрощенная версия - в реальном проекте нужно парсить URL
        try {
            const url = new URL(yandexUrl);
            const imgUrl = url.searchParams.get('img_url');
            return imgUrl || yandexUrl;
        } catch {
            return yandexUrl;
        }
    }

    // Показать конкретный слайд
    function showSlide(index) {
        // Скрыть все слайды
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Показать выбранный слайд
        const targetSlide = document.querySelector(`.slide[data-index="${index}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            currentSlide = index;
            updateSlideCounter();
            updateURL();
        }
    }

    // Обновить счетчик слайдов
    function updateSlideCounter() {
        document.getElementById('current-slide').textContent = currentSlide + 1;
        document.getElementById('total-slides').textContent = slides.length;
    }

    // Обновить URL для шаринга
    function updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('slide', currentSlide + 1);
        window.history.replaceState({}, '', url);
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Кнопки навигации
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            }
        });
        
        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                showSlide(currentSlide + 1);
            }
        });
        
        // Полноэкранный режим
        document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
        
        // Быстрая навигация
        document.querySelectorAll('.nav-sections button').forEach(btn => {
            btn.addEventListener('click', () => {
                const slideIndex = parseInt(btn.dataset.slide) - 1;
                showSlide(slideIndex);
            });
        });
        
        // Клавиши клавиатуры
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                    if (currentSlide > 0) showSlide(currentSlide - 1);
                    break;
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
                    break;
                case 'Home':
                    showSlide(0);
                    break;
                case 'End':
                    showSlide(slides.length - 1);
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
            }
        });
        
        // Проверка URL при загрузке
        const urlParams = new URLSearchParams(window.location.search);
        const slideParam = urlParams.get('slide');
        if (slideParam) {
            const slideIndex = parseInt(slideParam) - 1;
            if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slides.length) {
                showSlide(slideIndex);
            }
        }
    }

    // Переключение полноэкранного режима
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Ошибка при включении полноэкранного режима: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Запуск презентации
    initPresentation();
});