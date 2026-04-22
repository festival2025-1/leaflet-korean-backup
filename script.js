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
        showArrowsTemporarily(); }

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let arrowTimeout;

function showArrowsTemporarily() {
  // 화살표 보이기
  prevBtn.style.opacity = '1';
  nextBtn.style.opacity = '1';

  // 기존 타이머 제거 후 새로 시작
  if (arrowTimeout) clearTimeout(arrowTimeout);
  arrowTimeout = setTimeout(() => {
    prevBtn.style.opacity = '0';
    nextBtn.style.opacity = '0';
  }, 2000); // 2초 후 숨김
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

    let startX = 0, startY = 0;
    let endX = 0, endY = 0;
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
    const menuList = document.getElementById("menuList");
    const instaLink = document.createElement("a");
    instaLink.href = "https://www.instagram.com/ssaf.official/";
    instaLink.target = "_blank";
    instaLink.style.display = "flex";
    instaLink.style.alignItems = "center";
    instaLink.style.gap = "6px";
    instaLink.style.margin = "10px";
    instaLink.style.fontSize = "1rem";
    instaLink.style.color = "#fff";
    instaLink.style.textDecoration = "none";

    const instaIcon = document.createElement("img");
    instaIcon.src = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
    instaIcon.alt = "Instagram Icon";
    instaIcon.style.width = "18px";
    instaIcon.style.height = "18px";

    const instaText = document.createElement("span");
    instaText.textContent = "Official Instagram";

    instaLink.appendChild(instaIcon);
    instaLink.appendChild(instaText);
    menuList.appendChild(instaLink);

document.addEventListener('click', function(event) {
  const menu = document.getElementById('menuList');
  const menuBtn = document.querySelector('.menu-btn');

  // 메뉴가 열려 있고, 클릭한 곳이 메뉴나 버튼이 아닐 때 닫기
  if (menu.classList.contains('show') &&
      !menu.contains(event.target) &&
      !menuBtn.contains(event.target)) {
    menu.classList.remove('show');
  }
});

// DOM이 준비되면 실행되는 모든 코드
document.addEventListener('DOMContentLoaded', function () {
  updateSlide();          // 초기 슬라이드 업데이트
  showArrowsTemporarily(); // 첫 진입 시 화살표 표시

  // 팝업 닫기 기능
  const popup = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close');
  if (popup && closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }
});
