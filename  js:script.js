// Лайтбокс
let currentIndex = 0;
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  
  lightboxImg.src = imgSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function changeSlide(direction) {
  currentIndex += direction;
  
  if (currentIndex >= galleryItems.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  document.getElementById('lightbox-img').src = imgSrc;
}

// Закрытие при клике вне изображения
document.querySelector('.lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

// Навигация клавиатурой
document.addEventListener('keydown', function(e) {
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Escape') closeLightbox();
  }
});

// Ленивая загрузка изображений
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
});