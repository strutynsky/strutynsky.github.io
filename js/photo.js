document.addEventListener('DOMContentLoaded', function () {
  const imageLinks = document.querySelectorAll('.image-link');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.querySelector('.close-btn');

  imageLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const imageSrc = this.querySelector('img').src;
      lightboxImage.src = imageSrc;
      lightbox.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });
});
