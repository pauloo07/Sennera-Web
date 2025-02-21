const sections = [...document.querySelectorAll("section")];
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const footer = document.querySelector("footer");
let currentIndex = 0;
let isScrolling = false;

const footerPosition = footer ? footer.offsetTop : window.innerHeight; 

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.pointerEvents = "auto"; 
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.pointerEvents = "none";
  }

  if (window.scrollY + window.innerHeight > footerPosition) {
    const overlap = window.scrollY + window.innerHeight - footerPosition;
    scrollToTopBtn.style.bottom = `${overlap + 20}px`;
  } else {
    scrollToTopBtn.style.bottom = "20px";
  }

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      section.classList.add("visible");
    }
  });
});

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: "smooth" });
  }
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(() => {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.pointerEvents = "none";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    if (sections.length > 0) {
      sections[0].classList.add("visible");
    }
  });

  function scrollBodyEvent() {
    const thumb = document.querySelector(".custom_thumb");
  
    function updateThumbPosition() {
      const scrollHeight = document.documentElement.scrollHeight;
      const containerHeight = window.innerHeight;
      const scrollTop = window.scrollY;
  
      const thumbHeight = Math.max(
        (containerHeight / scrollHeight) * containerHeight,
        30
      );
      thumb.style.height = `${thumbHeight}px`;
  
      const maxScrollTop = scrollHeight - containerHeight;
      const maxThumbTop = containerHeight - thumbHeight;
      const thumbTop = (scrollTop / maxScrollTop) * maxThumbTop;
  
      thumb.style.top = `${thumbTop}px`;
    }
  
    window.addEventListener("scroll", updateThumbPosition);
  
    thumb.addEventListener("mousedown", (e) => {
      const startY = e.clientY;
      const startTop = parseFloat(thumb.style.top) || 0;
  
      function onMouseMove(event) {
        const deltaY = event.clientY - startY;
        const maxThumbTop = window.innerHeight - thumb.clientHeight;
        let newTop = startTop + deltaY;
        newTop = Math.max(0, Math.min(newTop, maxThumbTop));
  
        thumb.style.top = `${newTop}px`;
  
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, (newTop / maxThumbTop) * scrollHeight);
      }
  
      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  
    updateThumbPosition();
  }
  
  scrollBodyEvent();  