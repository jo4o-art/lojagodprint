    const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
    const nav = document.getElementById('nav-b');
    nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);
    
    const track = document.getElementById("track");
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const radioNav = document.getElementById("radio-nav");

    let currentIndex = 0;

    // Criar radios
    slides.forEach((_, index) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "carousel";
      radio.dataset.index = index;
      if (index === 0) radio.checked = true;
      radio.addEventListener("change", (e) => {
        currentIndex = index;
        updateCarousel();
      });
      radioNav.appendChild(radio);
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const radios = radioNav.querySelectorAll("input");
      radios.forEach((radio, idx) => (radio.checked = idx === currentIndex));
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    // Drag funcionalidade
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;

    track.addEventListener("mousedown", startDrag);
    track.addEventListener("touchstart", startDrag);

    function startDrag(e) {
      isDragging = true;
      startPos = getPositionX(e);
      track.style.transition = "none";
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchend", endDrag);
    }

    function drag(e) {
      if (!isDragging) return;
      const currentPos = getPositionX(e);
      const delta = currentPos - startPos;
      currentTranslate = -currentIndex * track.offsetWidth + delta;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function endDrag(e) {
      isDragging = false;
      const endPos = getPositionX(e);
      const delta = endPos - startPos;
      const threshold = track.offsetWidth / 4;

      if (delta > threshold && currentIndex > 0) currentIndex--;
      else if (delta < -threshold && currentIndex < slides.length - 1)
        currentIndex++;

      updateCarousel();
      track.style.transition = "transform 0.4s ease";
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    }

    function getPositionX(e) {
      return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    // Autoplay
    setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    }, 4000); 
    // troca a cada 4 segundos
    // Fim do caroucel
  
    const carrossel = document.getElementById('carrossel');
    const anterior = document.getElementById('anterior');
    const proximo = document.getElementById('proximo');
    const LarguraDaTela = window.outerWidth

    if (LarguraDaTela > 1500) {
      NCategorias = 6
    } if (LarguraDaTela < 1500) {
      NCategorias = 5
    } if (LarguraDaTela < 1000 ) {
      NCategorias = 4
    } if (LarguraDaTela < 800) {
      NCategorias = 3
    } if (LarguraDaTela < 650) {
      NCategorias = 2
    }

    let index = 0;

    anterior.addEventListener('click', () => {
      index = (index > 0) ? index - 1 : 0;
      atualizarCarrossel();
    });

    proximo.addEventListener('click', () => {
      const total = carrossel.children.length - NCategorias;
      index = (index < total) ? index + 1 : total;
      atualizarCarrossel();
    });

    function atualizarCarrossel() {
      const largura = 200; // mesma largura da div .item
      carrossel.style.transform = `translateX(-${index * largura}px)`;
    }

        const sliderTextil = document.getElementById('sliderTextil');
        const slideWidth = 250;
        let currentTIndext = 0;

        if (LarguraDaTela > 1150) {
          NProdutos = 4
        } if (LarguraDaTela < 1150) {
          NProdutos = 3
        } if (LarguraDaTela < 800) {
          NProdutos = 2
        } if (LarguraDaTela < 650) {
          NProdutos = 1
        }

        function moveSlideTexil(direction) {
          const totalSlides = sliderTextil.children.length;
          currentTIndext += direction;
          currentTIndext = Math.max(0, Math.min(currentTIndext, totalSlides - NProdutos));
          sliderTextil.style.transform = `translateX(-${currentTIndext * slideWidth}px)`;
        }

        const sliderPersonalizados = document.getElementById('sliderPersonalizados');
    
        let currentPIndext = 0;

        function moveSlidePersonalizados(direction) {
          const totalSlides = sliderPersonalizados.children.length;
          currentPIndext += direction;
          currentPIndext = Math.max(0, Math.min(currentPIndext, totalSlides - NProdutos));
          sliderPersonalizados.style.transform = `translateX(-${currentPIndext * slideWidth}px)`;
        }

        const sliderCartoes = document.getElementById('sliderCartoes');
    
        let currentCIndext = 0;

        function moveSlideCartoes(direction) {
          const totalSlides = sliderCartoes.children.length;
          currentCIndext += direction;
          currentCIndext = Math.max(0, Math.min(currentCIndext, totalSlides - NProdutos));
          sliderCartoes.style.transform = `translateX(-${currentCIndext * slideWidth}px)`;
        }

        const sliderBanner = document.getElementById('sliderBanner');
    
        let currentBIndext = 0;

        function moveSlideBanner(direction) {
          const totalSlides = sliderBanner.children.length;
          currentBIndext += direction;
          currentBIndext = Math.max(0, Math.min(currentBIndext, totalSlides - NProdutos));
          sliderBanner.style.transform = `translateX(-${currentBIndext * slideWidth}px)`;
        }

        const sliderPainel = document.getElementById('sliderPainel');
    
        let currentPaIndext = 0;

        function moveSlidePainel(direction) {
          const totalSlides = sliderPainel.children.length;
          currentPaIndext += direction;
          currentPaIndext = Math.max(0, Math.min(currentPaIndext, totalSlides - NProdutos));
          sliderPainel.style.transform = `translateX(-${currentPaIndext * slideWidth}px)`;
        }

        const sliderWindBanner = document.getElementById('sliderWindBanner');
    
        let currentWBIndext = 0;

        function moveSlideWindBanner(direction) {
          const totalSlides = sliderPainel.children.length;
          currentWBIndext += direction;
          currentWBIndext = Math.max(0, Math.min(currentWBIndext, totalSlides - NProdutos));
          sliderWindBanner.style.transform = `translateX(-${currentWBIndext * slideWidth}px)`;
        }

