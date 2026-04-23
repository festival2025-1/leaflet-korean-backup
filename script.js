// Viewport height 계산해서 CSS 변수로 설정
function setVhVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariable();
window.addEventListener('resize', setVhVariable);

const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let current = 0;

const slideIndicator = document.getElementById('slideIndicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let arrowTimeout;

slidesWrapper.style.width = `${totalSlides * 100}vw`;

function updateSlide() {
  slidesWrapper.style.transform = `translateX(-${current * 100}vw)`;
  slideIndicator.textContent = `${current + 1} / ${totalSlides}`;
  prevBtn.style.display = current === 0 ? 'none' : 'block';
  nextBtn.style.display = current === totalSlides - 1 ? 'none' : 'block';
}

function changeSlide(direction) {
  slidesWrapper.style.transition = 'transform 0.5s ease';
  current += direction;

  if (current < 0) current = 0;
  if (current >= totalSlides) current = totalSlides - 1;

  updateSlide();
  showArrowsTemporarily();
}

function showArrowsTemporarily() {
  prevBtn.style.opacity = '1';
  nextBtn.style.opacity = '1';

  if (arrowTimeout) clearTimeout(arrowTimeout);

  arrowTimeout = setTimeout(() => {
    prevBtn.style.opacity = '0';
    nextBtn.style.opacity = '0';
  }, 2000);
}

function toggleMenu() {
  document.getElementById('menuList').classList.toggle('show');
}

function goToSlideInstant(index) {
  slidesWrapper.style.transition = 'none';
  current = index;
  updateSlide();

  setTimeout(() => {
    slidesWrapper.style.transition = 'transform 0.5s ease';
  }, 50);

  document.getElementById('menuList').classList.remove('show');
}

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let isPinchZoom = false;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) {
    isPinchZoom = true;
    return;
  }

  isPinchZoom = false;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  if (isPinchZoom || e.changedTouches.length > 1) return;

  endX = e.changedTouches[0].clientX;
  endY = e.changedTouches[0].clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);

  if (Math.abs(deltaX) > 50 && (angle < 15 || angle > 165)) {
    showArrowsTemporarily();
    if (deltaX < 0) changeSlide(1);
    else changeSlide(-1);
  }
});

updateSlide();

// 인스타그램 버튼 추가
const menuList = document.getElementById('menuList');
const instaLink = document.createElement('a');
instaLink.href = 'https://www.instagram.com/ssaf.official/';
instaLink.target = '_blank';
instaLink.style.display = 'flex';
instaLink.style.alignItems = 'center';
instaLink.style.gap = '6px';
instaLink.style.margin = '10px';
instaLink.style.fontSize = '1rem';
instaLink.style.color = '#fff';
instaLink.style.textDecoration = 'none';

const instaIcon = document.createElement('img');
instaIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png';
instaIcon.alt = 'Instagram Icon';
instaIcon.style.width = '18px';
instaIcon.style.height = '18px';

const instaText = document.createElement('span');
instaText.textContent = '공식 인스타그램';

instaLink.appendChild(instaIcon);
instaLink.appendChild(instaText);
menuList.appendChild(instaLink);

document.addEventListener('click', function(event) {
  const menu = document.getElementById('menuList');
  const menuBtn = document.querySelector('.menu-btn');

  if (
    menu.classList.contains('show') &&
    !menu.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    menu.classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  updateSlide();
  showArrowsTemporarily();
});

/* =========================
   공지 팝업 (여러 장 순차 표시, 접속할 때마다 표시)
   ========================= */

const popupImages = [
  '/images/notice1.jpg',
  '/images/notice2.jpg',
  '/images/notice3.jpg',
  '/images/notice4.jpg',
  '/images/notice5.jpg'
];

let validPopupImages = [];
let currentPopupIndex = 0;

function closePopup() {
  const popup = document.getElementById('noticePopup');
  const popupImg = document.getElementById('noticeImage');

  currentPopupIndex++;

  if (currentPopupIndex < validPopupImages.length) {
    popupImg.src = validPopupImages[currentPopupIndex];
  } else {
    popup.style.display = 'none';
  }
}

window.addEventListener('load', function () {
  const popup = document.getElementById('noticePopup');
  const popupImg = document.getElementById('noticeImage');

  if (!popup || !popupImg) return;

  let checkedCount = 0;
  validPopupImages = [];
  currentPopupIndex = 0;

  popupImages.forEach((src) => {
    const img = new Image();

    img.onload = function () {
      validPopupImages.push(src + '?v=' + Date.now());
      checkedCount++;
      showPopupIfReady();
    };

    img.onerror = function () {
      checkedCount++;
      showPopupIfReady();
    };

    img.src = src;
  });

  function showPopupIfReady() {
    if (checkedCount !== popupImages.length) return;

    if (validPopupImages.length > 0) {
      popupImg.src = validPopupImages[currentPopupIndex];
      popup.style.display = 'flex';
    }
  }
});
