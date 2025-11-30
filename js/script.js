const helloWorld = document.querySelector('.hello-world');
helloWorld.addEventListener('click', function() { this.classList.add('clicked'); });

document.querySelector('.passioni').addEventListener('click', function() {
  const paragraphs = this.querySelectorAll('.paragrafi');
  const img = this.querySelector('.img-pass');
  
  paragraphs.forEach(p => {
    p.classList.toggle('d-flex');
    p.classList.toggle('d-none');
  });
  
  if (img.src.includes('0x1900-000000-80-0-0.jpg')) {
    img.src = 'imgs/outer_wilds.jpg';
    img.alt = 'videogioco';
  } else {
    img.src = 'imgs/0x1900-000000-80-0-0.jpg';
    img.alt = 'musica';
  }
});

const fadeOutPromise = (el) => new Promise((resolve) => {
  if (!el.classList.contains('d-none')) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.classList.add('d-none');
      el.style.opacity = '';
      resolve();
    }, 250);
  } else {
    resolve();
  }
});

const fadeIn = (el) => {
  el.classList.remove('d-none');
  el.style.opacity = '0';
  el.offsetHeight; // Trigger reflow
  el.style.opacity = '1';
};

document.querySelectorAll('#lavori .box-lavori').forEach(box => {
  box.addEventListener('click', async () => {
    const img = box.querySelector('img');
    if (!img) return;
    const target = img.classList[0];
    
    const vuoto = document.querySelector('.vuoto');
    const eliminare = document.querySelector('.eliminare');
    const descriptions = document.querySelectorAll('.descrizioni > div[class^="l"]');
    const selected = document.querySelector('.descrizioni > .' + target);
    
    // Fade out all descriptions first and await completion
    await Promise.all(Array.from(descriptions).map(fadeOutPromise));
    
    const handleTransitionEnd = () => {
      vuoto.removeEventListener('transitionend', handleTransitionEnd);
      if (eliminare) eliminare.classList.add('d-none');
      if (selected) fadeIn(selected);
    };
    
    if (vuoto && vuoto.classList.contains('expanded')) {
      // Already expanded: immediate switch after fade out
      if (eliminare) eliminare.classList.add('d-none');
      if (selected) fadeIn(selected);
    } else if (vuoto) {
      // Expanding: wait for transition after fade out
      vuoto.addEventListener('transitionend', handleTransitionEnd);
      vuoto.classList.add('expanded');
    } else {
      // Fallback
      if (eliminare) eliminare.classList.add('d-none');
      if (selected) fadeIn(selected);
    }
  });
});

const lavoriCarousel = document.querySelector('.lavori-carousel');
if (lavoriCarousel) {
  const boxes = lavoriCarousel.querySelectorAll('.carousel-box-lavori-wrapper .box-lavori');
const descriptions = lavoriCarousel.querySelectorAll('.carousel-description');
const leftArrow = lavoriCarousel.querySelector('.left-arrow');
const rightArrow = lavoriCarousel.querySelector('.right-arrow');
const nlavoro = lavoriCarousel.querySelector('.nlavoro');
let currentIndex = 0;

function showBox(index) {
  boxes.forEach((box, i) => {
    box.classList.toggle('d-none', i !== index);
  });
  descriptions.forEach((desc, i) => {
    desc.classList.toggle('d-none', i !== index);
  });
  if (nlavoro) {
    nlavoro.textContent = `${index + 1}/${boxes.length}`;
  }
}
  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
    showBox(currentIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % boxes.length;
    showBox(currentIndex);
  });

  // Initialize carousel
  showBox(currentIndex);
}

// IntersectionObserver for navigation highlighting
const navList = document.querySelector('.nav-list');
const navLinks = navList.querySelectorAll('a');

// Remove focus from links after clicking
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    this.blur();
  });
});

// Create IntersectionObserver options
const observerOptions = {
  root: null, // viewport
  rootMargin: '-30% 0px -40% 0px', // Trigger when 20% from top and 70% from bottom
  threshold: 0 // Trigger as soon as any part is visible
};

// Track which sections are currently visible
let visibleSections = new Set();

// Create IntersectionObserver callback
const observerCallback = (entries) => {
  // Update visible sections set
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSections.add(entry.target.id);
    } else {
      visibleSections.delete(entry.target.id);
    }
  });
  
  // Clear all visible classes
  navLinks.forEach(link => link.classList.remove('visible'));
  
  // If any section is visible, highlight corresponding links
  if (visibleSections.size > 0) {
    // Get the first visible section (topmost)
    const visibleId = Array.from(visibleSections)[0];
    const baseId = visibleId.replace(/m$/, '');
    
    // Add visible class to matching links
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const baseHref = href.replace(/m$/, '');
      
      if (baseId === baseHref) {
        link.classList.add('visible');
      }
    });
  }
};

// Create and start the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all ancora elements - both desktop and mobile versions
const ancoraElements = document.querySelectorAll('[id^="hello-world"], [id^="passioni"], [id^="lavori"]');
ancoraElements.forEach(element => {
  observer.observe(element);
});
