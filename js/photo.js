document.addEventListener('DOMContentLoaded', function () {
  const imageLinks = document.querySelectorAll('.image-link');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeBtn = document.querySelector('.close-btn');
  let currentIndex = 0;
  let swipeInProgress = false;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function showImage(index) {
    const imageSrc = imageLinks[index].querySelector('img').src;
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'block';
    currentIndex = index;
    document.body.classList.add('lightbox-open');
    addNavigationButtons();
  }

  function hideImage() {
    lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
    removeNavigationButtons();
  }

  function addNavigationButtons() {
    const prevBtn = document.createElement('div');
    prevBtn.classList.add('lightbox-prev');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.addEventListener('click', showPreviousImage);
    lightbox.appendChild(prevBtn);

    const nextBtn = document.createElement('div');
    nextBtn.classList.add('lightbox-next');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.addEventListener('click', showNextImage);
    lightbox.appendChild(nextBtn);
  }

  function removeNavigationButtons() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (prevBtn) {
      prevBtn.removeEventListener('click', showPreviousImage);
      prevBtn.parentNode.removeChild(prevBtn);
    }

    if (nextBtn) {
      nextBtn.removeEventListener('click', showNextImage);
      nextBtn.parentNode.removeChild(nextBtn);
    }
  }

  imageLinks.forEach(function (link, index) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showImage(index);
    });
  });

  closeBtn.addEventListener('click', function () {
    hideImage();
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === this) {
      hideImage();
    }
  });

  lightbox.addEventListener('touchstart', function (e) {
    if (isMobile) {
      const touchStartX = e.touches[0].clientX;

      function handleTouchMove(e) {
        if (swipeInProgress) return;

        const touchCurrentX = e.touches[0].clientX;
        const diffX = touchStartX - touchCurrentX;

        if (diffX > 50) {
          swipeInProgress = true;
          showNextImage();
          setTimeout(function () {
            swipeInProgress = false;
          }, 400);
        } else if (diffX < -50) {
          swipeInProgress = true;
          showPreviousImage();
          setTimeout(function () {
            swipeInProgress = false;
          }, 400);
        }
      }

      function handleTouchEnd() {
        lightbox.removeEventListener('touchmove', handleTouchMove);
        lightbox.removeEventListener('touchend', handleTouchEnd);
      }

      lightbox.addEventListener('touchmove', handleTouchMove);
      lightbox.addEventListener('touchend', handleTouchEnd);
    }
  });

  function showNextImage() {
    if (currentIndex === imageLinks.length - 1) {
      hideImage();
    } else {
      showImage(currentIndex + 1);
    }
  }

  function showPreviousImage() {
    if (currentIndex === 0) {
      hideImage();
    } else {
      showImage(currentIndex - 1);
    }
  }
});
