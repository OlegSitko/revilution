// Функция для обновления временной метки
function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    const date = new Date();
    timestamp.setAttribute('title', `Последнее обновление: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
}

// Переключатель тёмной темы
const themeSwitch = document.getElementById('checkbox');
if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// Логика работы бургер-меню
const burgerMenu = document.getElementById('burgerMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (burgerMenu && sidebar && overlay) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    
    overlay.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('service-item')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, Array.from(document.querySelectorAll('.service-item')).indexOf(entry.target) * 80);
            } else {
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    
    // Инициализация анимаций для сервисов
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        animateOnScroll.observe(item);
    });
    
    // Анимация для контейнеров с информацией
    const containers = document.querySelectorAll('.services-container, .info-container');
    containers.forEach(container => {
        container.classList.add('scroll-animate');
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        container.style.transition = 'all 0.6s ease';
        animateOnScroll.observe(container);
    });
    
    // Обработка touch-событий для плавности взаимодействия
    const touchItems = document.querySelectorAll('.service-item, .info-item, .sidebar-menu a');
    touchItems.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(0.98)';
            item.style.opacity = '0.9';
        }, { passive: true });
        
        item.addEventListener('touchend', () => {
            setTimeout(() => {
                item.style.transform = '';
                item.style.opacity = '';
            }, 150);
        }, { passive: true });
    });
    
    // Плавное появление элементов
    document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // Предзагрузка анимаций для элементов сервиса
    setTimeout(() => {
        document.querySelectorAll('.service-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 80);
        });
    }, 300);
});
