
  const helloWorld = document.querySelector('.hello-world');
  
  helloWorld.addEventListener('click', function() {
    this.classList.add('clicked');
  });

document.querySelector('.passioni').addEventListener('click', function() {
  const paragraphs = this.querySelectorAll('.paragrafi');
  const img = this.querySelector('.img-pass');
  
  // Toggle dei paragrafi
  paragraphs.forEach(p => {
    p.classList.toggle('d-block');
    p.classList.toggle('d-none');
  });
  
  // Toggle dell'immagine
  if (img.src.includes('0x1900-000000-80-0-0.jpg')) {
    img.src = 'imgs/outer_wilds.jpg';
    img.alt = 'videogioco';
  } else {
    img.src = 'imgs/0x1900-000000-80-0-0.jpg';
    img.alt = 'musica';
  }
});

document.querySelectorAll('.box-lavori').forEach(box => {
  box.addEventListener('click', () => {
    const img = box.querySelector('img');
    if (!img) return;
    const target = img.classList[0]; // l1, l2, l3, ...
    // nasconde tutte le descrizioni
    document.querySelectorAll('.container-fluid > div[class^="l"]').forEach(desc => {
      desc.classList.add('d-none');
    });
    // mostra quella corrispondente
    const selected = document.querySelector('.container-fluid > .' + target);
    if (selected) selected.classList.remove('d-none');
  });
});

// MOBILE CAROUSEL LOGIC
const lavoriCarousel = document.querySelector('.lavori-carousel');
if (lavoriCarousel) {
  const boxes = lavoriCarousel.querySelectorAll('.carousel-box-lavori-wrapper .box-lavori');
  const descriptions = lavoriCarousel.querySelectorAll('.carousel-description');
  const leftArrow = lavoriCarousel.querySelector('.left-arrow');
  const rightArrow = lavoriCarousel.querySelector('.right-arrow');
  let currentIndex = 0;

  function showBox(index) {
    boxes.forEach((box, i) => {
      box.classList.toggle('d-none', i !== index);
    });
    descriptions.forEach((desc, i) => {
      desc.classList.toggle('d-none', i !== index);
    });
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
