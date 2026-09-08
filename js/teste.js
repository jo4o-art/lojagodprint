/* =========================================================
   GOD PRINT — SCRIPT PRINCIPAL
   JavaScript ES6+
   ========================================================= */


/* =========================================================
   DADOS DOS PRODUTOS
   ========================================================= */

const products = [
  {
    id: 1,
    name: "Camiseta Personalizada Premium",
    category: "Linha Têxtil",
    price: 59.90,
    oldPrice: 69.90,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description:
      "Algodão premium com impressão de alta definição.",
    sale: "Oferta"
  },

  {
    id: 2,
    name: "Adesivo Personalizado",
    category: "Adesivos",
    price: 18.00,
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=900&q=85",
    description:
      "Recorte preciso e acabamento resistente."
  },

  {
    id: 3,
    name: "Cartão de Visita Premium",
    category: "Cartões de Visita",
    price: 35.00,
    oldPrice: 45.00,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
    description:
      "Impressão profissional para sua marca.",
    sale: "-22%"
  },

  {
    id: 4,
    name: "Banner para sua marca",
    category: "Banners",
    price: 49.90,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    description:
      "Comunicação visual com grande impacto."
  },

  {
    id: 5,
    name: "Caneca Personalizada",
    category: "Personalizados",
    price: 32.00,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85",
    description:
      "Sua arte impressa com acabamento premium."
  },

  {
    id: 6,
    name: "Boné Personalizado",
    category: "Bonés",
    price: 44.90,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
    description:
      "Personalização para equipes e eventos."
  },

  {
    id: 7,
    name: "Lona Impressa",
    category: "Lonas",
    price: 79.90,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    description:
      "Alta durabilidade para comunicação externa."
  },

  {
    id: 8,
    name: "Wind Banner",
    category: "Wind Banner",
    price: 119.90,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
    description:
      "Presença visual para eventos e ações."
  },

  {
    id: 9,
    name: "Painel Personalizado",
    category: "Painéis",
    price: 149.90,
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=85",
    description:
      "Painéis para ambientes, eventos e vitrines."
  },

  {
    id: 10,
    name: "Ecobag Personalizada",
    category: "Personalizados",
    price: 39.90,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    description:
      "Estilo, utilidade e identidade visual."
  }
];


/* =========================================================
   CATEGORIAS
   ========================================================= */

const categories = [
  [
    "Adesivos",
    "Impressão e recorte",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Banners",
    "Comunicação visual",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Personalizados",
    "Produtos com sua marca",
    "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Lonas",
    "Alta durabilidade",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Linha Têxtil",
    "Vista sua marca",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Cartões de Visita",
    "Sua marca na mão",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Wind Banner",
    "Destaque em eventos",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Bonés",
    "Identidade que veste",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Painéis",
    "Ambientes e eventos",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80"
  ],

  [
    "Outros",
    "Mais possibilidades",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80"
  ]
];


/* =========================================================
   FUNÇÕES UTILITÁRIAS
   ========================================================= */

const $ = (selector, element = document) =>
  element.querySelector(selector);

const $$ = (selector, element = document) =>
  [...element.querySelectorAll(selector)];

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });


/* =========================================================
   BUSCA
   ========================================================= */

function searchProducts(query, target) {

  if (!target) {
    return;
  }

  const search = query
    .trim()
    .toLowerCase();


  if (!search) {

    target.innerHTML = `
      <div style="
        padding:12px;
        color:#89919b;
        font-size:11px;
      ">
        Digite o nome de um produto ou categoria.
      </div>
    `;

    return;
  }


  const results = products
    .filter(product => {

      const searchableText = `
        ${product.name}
        ${product.category}
        ${product.description}
      `.toLowerCase();

      return searchableText.includes(search);

    })
    .slice(0, 5);


  if (results.length === 0) {

    target.innerHTML = `
      <div style="
        padding:14px;
        color:#89919b;
        font-size:11px;
      ">
        Nenhum produto encontrado.
      </div>
    `;

    return;
  }


  target.innerHTML = results
    .map(product => {

      return `
        <button
          class="search-result"
          data-search-product="${product.id}"
        >

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <span>

            <b>
              ${product.name}
            </b>

            <small>
              ${product.category}
              ·
              ${money(product.price)}
            </small>

          </span>

        </button>
      `;

    })
    .join("");

}


/* =========================================================
   CARROSSEL
   ========================================================= */

function scrollCarousel(
  carouselId,
  direction
) {

  const carousel =
    document.getElementById(carouselId);

  if (!carousel) {
    return;
  }

  carousel.scrollBy({
    left:
      direction *
      carousel.clientWidth *
      0.82,

    behavior: "smooth"
  });

}


/* =========================================================
   EVENTOS DOS PRODUTOS
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const carouselButton =
      event.target.closest(
        "[data-carousel]"
      );

    if (!carouselButton) {
      return;
    }

    const carouselName =
      carouselButton.dataset.carousel;

    const direction =
      Number(
        carouselButton.dataset.dir
      );

    let carouselId;

    if (carouselName === "featured") {
      carouselId = "featuredCarousel";
    }

    if (carouselName === "custom") {
      carouselId = "customCarousel";
    }

    if (carouselName === "cards") {
      carouselId = "cardsCarousel";
    }

    if (carouselId) {
      scrollCarousel(
        carouselId,
        direction
      );
    }
  }
);


/* =========================================================
   BUSCA MOBILE
   ========================================================= */

$("#openSearch")?.addEventListener(
  "click",
  () => {

    const searchScreen =
      $("#searchScreen");

    const input =
      $("#mobileSearchInput");

    if (!searchScreen) {
      return;
    }

    searchScreen.classList.add(
      "open"
    );

    searchScreen.setAttribute(
      "aria-hidden",
      "false"
    );

    setTimeout(
      () => input?.focus(),
      200
    );

  }
);


$("#closeSearch")?.addEventListener(
  "click",
  () => {

    const searchScreen =
      $("#searchScreen");

    searchScreen?.classList.remove(
      "open"
    );

    searchScreen?.setAttribute(
      "aria-hidden",
      "true"
    );

  }
);


/* =========================================================
   BUSCA DESKTOP
   ========================================================= */

$("#searchInput")?.addEventListener(
  "input",
  event => {

    const value =
      event.target.value;

    const dropdown =
      $("#searchDropdown");

    if (!dropdown) {
      return;
    }

    searchProducts(
      value,
      dropdown
    );

    dropdown.classList.toggle(
      "open",
      Boolean(value.trim())
    );

  }
);


/* =========================================================
   BUSCA MOBILE
   ========================================================= */

$("#mobileSearchInput")?.addEventListener(
  "input",
  event => {

    searchProducts(
      event.target.value,
      $("#mobileSearchResults")
    );

  }
);


/* =========================================================
   BOTÃO DE PESQUISA
   ========================================================= */

$("#searchSubmit")?.addEventListener(
  "click",
  () => {

    const input =
      $("#searchInput");

    if (!input) {
      return;
    }

    if (input.value.trim()) {

      $("#produtos")
        ?.scrollIntoView({
          behavior: "smooth"
        });

      $("#searchDropdown")
        ?.classList.remove("open");

    }

  }
);


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const header =
      $("#siteHeader");

    const backTop =
      $("#backTop");

    if (header) {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    }

    if (backTop) {

      backTop.classList.toggle(
        "show",
        window.scrollY > 500
      );

    }

  },
  {
    passive: true
  }
);


/* =========================================================
   VOLTAR AO TOPO
   ========================================================= */

$("#backTop")?.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


function observeReveals() {

  $$(".reveal").forEach(
    element => {

      if (
        !element.classList.contains(
          "visible"
        )
      ) {

        revealObserver.observe(
          element
        );

      }

    }
  );

}


/* =========================================================
   RENDERIZAÇÃO INICIAL
   ========================================================= */

observeReveals();


/* =========================================================
   LOADING SCREEN
   ========================================================= */

function hideLoader() {

  const loader =
    $("#loader");

  if (!loader) {
    return;
  }

  loader.classList.add(
    "is-done"
  );

}


/*
  Espera o carregamento completo
  da página.
*/

window.addEventListener(
  "load",
  () => {

    setTimeout(
      hideLoader,
      450
    );

  }
);


/*
  Segurança:
  caso alguma imagem externa
  demore demais, o loading
  nunca ficará preso.
*/

setTimeout(
  hideLoader,
  3500
);


/* =========================================================
   FECHAR DROPDOWN DE BUSCA AO CLICAR FORA
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const searchWrap =
      $("#desktopSearch");

    const dropdown =
      $("#searchDropdown");

    if (
      searchWrap &&
      dropdown &&
      !searchWrap.contains(event.target)
    ) {

      dropdown.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   TECLA ESC
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    $("#searchScreen")
      ?.classList.remove("open");

    $("#searchDropdown")
      ?.classList.remove("open");

    $("#menuBtn")
      ?.classList.remove("open");

    $("#mobileNav")
      ?.classList.remove("open");

  }
);


/* =========================================================
   SUPORTE A ARRASTAR CARROSSÉIS COM MOUSE
   ========================================================= */

$$(".product-carousel").forEach(
  carousel => {

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;


    carousel.addEventListener(
      "mousedown",
      event => {

        isDragging = true;

        startX = event.pageX;

        startScroll =
          carousel.scrollLeft;

        carousel.style.cursor =
          "grabbing";

      }
    );


    carousel.addEventListener(
      "mouseleave",
      () => {

        isDragging = false;

        carousel.style.cursor =
          "";

      }
    );


    carousel.addEventListener(
      "mouseup",
      () => {

        isDragging = false;

        carousel.style.cursor =
          "";

      }
    );


    carousel.addEventListener(
      "mousemove",
      event => {

        if (!isDragging) {
          return;
        }

        event.preventDefault();

        const distance =
          event.pageX - startX;

        carousel.scrollLeft =
          startScroll - distance;

      }
    );

  }
);


/* =========================================================
   AUTOPLAY SUAVE DO CARROSSEL PRINCIPAL
   ========================================================= */

let autoplayTimer;


function startFeaturedAutoplay() {

  const carousel =
    $("#featuredCarousel");

  if (!carousel) {
    return;
  }

  autoplayTimer =
    setInterval(
      () => {

        /*
          Não avança quando a página
          não está visível.
        */

        if (
          document.hidden
        ) {
          return;
        }


        const maxScroll =
          carousel.scrollWidth -
          carousel.clientWidth;


        if (
          carousel.scrollLeft >=
          maxScroll - 20
        ) {

          carousel.scrollTo({
            left: 0,
            behavior: "smooth"
          });

        } else {

          carousel.scrollBy({
            left:
              carousel.clientWidth *
              0.82,

            behavior: "smooth"
          });

        }

      },
      5000
    );

}


function stopFeaturedAutoplay() {

  if (autoplayTimer) {

    clearInterval(
      autoplayTimer
    );

  }

}


const featuredCarousel =
  $("#featuredCarousel");


featuredCarousel?.addEventListener(
  "mouseenter",
  stopFeaturedAutoplay
);


featuredCarousel?.addEventListener(
  "mouseleave",
  startFeaturedAutoplay
);


startFeaturedAutoplay();


/* =========================================================
   FINAL
   ========================================================= */

console.log(
  "God Print — sistema carregado com sucesso."
);