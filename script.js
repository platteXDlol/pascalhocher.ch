// Easter Egg - Rapid Click Detection
let clickCount = 0;
let clickTimer = null;
const CLICK_THRESHOLD = 10;
const CLICK_TIMEOUT = 2000; // 2 seconds

const easterEggTrigger = document.getElementById('easterEggTrigger');
const easterEggModal = document.getElementById('easterEggModal');
const closeEasterEgg = document.getElementById('closeEasterEgg');

easterEggTrigger.addEventListener('click', () => {
    clickCount++;
    
    // Clear previous timer
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    
    // Check if threshold reached
    if (clickCount >= CLICK_THRESHOLD) {
        easterEggModal.classList.add('show');
        clickCount = 0;
        return;
    }
    
    // Reset counter after timeout
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, CLICK_TIMEOUT);
});

closeEasterEgg.addEventListener('click', () => {
    easterEggModal.classList.remove('show');
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        document.body.classList.add('funny-theme');
        currentTheme = 'funny';
        themeToggle.textContent = '🌙 Dark Theme';
    } else {
        document.body.classList.remove('funny-theme');
        currentTheme = 'dark';
        themeToggle.textContent = '💖 Astolfo Theme';
    }
});

// Gallery Image Carousel - Random Picture Display
const images = [
    {
        url: './img/Astolfo.jpg',
        alt: 'Astolfo'
    },
    {
        url: './img/Azumanga_Daioh.jpg',
        alt: 'Azumanga Daioh'
    },
    {
        url: './img/COF_Wallpaper.jpg',
        alt: 'COF Wallpaper'
    },
    {
        url: './img/Gordon_Freeman.jpg',
        alt: 'Gordon Freeman'
    },
    {
        url: './img/Gust_x_Casca.jpg',
        alt: 'Gust x Casca'
    },
    {
        url: './img/Initial_D_EG.jpg',
        alt: 'Initial D EG'
    },
    {
        url: './img/lelouche_vi_brittania.jpg',
        alt: 'Lelouche vi Britannia'
    },
    {
        url: './img/mai_san.png',
        alt: 'Mai San'
    },
    {
        url: './img/meowl.jpg',
        alt: 'Meowl'
    },
    {
        url: './img/Swag.jpg',
        alt: 'Swag'
    },
    {
        url: './img/Tony_Tony_Chopper.jpg',
        alt: 'Tony Tony Chopper'
    }
];

let currentImageIndex = 0;
const galleryImage = document.getElementById('galleryImage');
const randomBtn = document.getElementById('randomBtn');
let shownImages = [];

function getRandomImage() {
    // If all images have been shown, reset the shown list
    if (shownImages.length === images.length) {
        shownImages = [];
    }
    
    // Get a random index that hasn't been shown yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (shownImages.includes(randomIndex));
    
    // Add to shown list and display
    shownImages.push(randomIndex);
    currentImageIndex = randomIndex;
    displayImage();
}

function displayImage() {
    const img = images[currentImageIndex];
    galleryImage.innerHTML = `<img src="${img.url}" alt="${img.alt}">`;
}

randomBtn.addEventListener('click', () => {
    getRandomImage();
});

// Initialize with a random image on page load
getRandomImage();

// Navigation Active State
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Visit Counter (Local Storage)
const visitCountElement = document.getElementById('visitCount');

function initVisitCounter() {
    // Get or initialize visit data
    let visitData = JSON.parse(localStorage.getItem('visitData')) || {
        totalVisits: 0,
        lastVisit: null,
        uniqueVisits: 0
    };
    
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    
    // Increment total visits
    visitData.totalVisits++;
    
    // Check if this is a unique visit (not visited in last 24 hours)
    if (!visitData.lastVisit || (now - visitData.lastVisit) > oneDay) {
        visitData.uniqueVisits++;
    }
    
    visitData.lastVisit = now;
    
    // Save to localStorage
    localStorage.setItem('visitData', JSON.stringify(visitData));
    
    // Animate counter
    animateCounter(visitData.uniqueVisits);
}

function animateCounter(target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        visitCountElement.textContent = current.toLocaleString();
    }, 20);
}

// Initialize counter on page load
initVisitCounter();

// Add some console easter egg
console.log('%c👋 Hey there, curious developer!', 'color: #58a6ff; font-size: 20px; font-weight: bold;');
console.log('%cTry clicking the profile picture in the top right 10 times really fast! 🐱', 'color: #3fb950; font-size: 14px;');
console.log('%c- Pascal', 'color: #8b949e; font-style: italic;');
