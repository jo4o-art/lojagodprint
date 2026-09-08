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
   ESTADO DA APLICAÇÃO
   ========================================================= */

let cart = JSON.parse(
  localStorage.getItem("godprint-cart") || "[]"
);

let favorites = JSON.parse(
  localStorage.getItem("godprint-favorites") || "[]"
);


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
   CARD DE PRODUTO
   ========================================================= */

function productCard(product) {

  const liked = favorites.includes(product.id);

  return `
    <article
      class="product-card"
      data-id="${product.id}"
    >

      <div class="product-image">

        <img
          loading="lazy"
          src="${product.image}"
          alt="${product.name}"
        >

        ${
          product.sale
            ? `<span class="sale">${product.sale}</span>`
            : ""
        }

        <button
          class="favorite ${liked ? "active" : ""}"
          data-favorite="${product.id}"
          aria-label="Favoritar ${product.name}"
        >
          ${liked ? "♥" : "♡"}
        </button>

      </div>

      <div class="product-info">

        <small>
          ${product.category}
        </small>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <div class="price">

          <strong>
            ${money(product.price)}
          </strong>

          ${
            product.oldPrice
              ? `<del>${money(product.oldPrice)}</del>`
              : ""
          }

        </div>

        <button
          class="product-add"
          data-add="${product.id}"
        >
          Adicionar ao carrinho
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   RENDERIZAÇÃO DE PRODUTOS
   ========================================================= */

function renderProducts(containerId, filterFunction = () => true) {

  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const filteredProducts = products.filter(filterFunction);

  container.innerHTML = filteredProducts
    .map(productCard)
    .join("");
}


/* =========================================================
   RENDERIZAR TODOS OS CARROSSÉIS
   ========================================================= */

function renderAllProducts() {

  renderProducts(
    "featuredCarousel"
  );

  renderProducts(
    "customCarousel",
    product =>
      product.category === "Personalizados" ||
      product.category === "Linha Têxtil" ||
      product.category === "Bonés"
  );

  renderProducts(
    "cardsCarousel",
    product =>
      product.category === "Cartões de Visita" ||
      product.category === "Banners" ||
      product.category === "Adesivos"
  );

}


/* =========================================================
   RENDERIZAR CATEGORIAS
   ========================================================= */

function renderCategories() {

  const container = $("#categoryGrid");

  if (!container) {
    return;
  }

  container.innerHTML = categories
    .map((category, index) => {

      return `
        <a
          class="category-card reveal"
          href="#produtos"
          style="transition-delay:${index * 35}ms"
        >

          <div
            class="category-card__bg"
            style="background-image:url('${category[2]}')"
          ></div>

          <div class="category-card__body">

            <small>
              categoria
            </small>

            <strong>
              ${category[0]}
            </strong>

            <span>
              ${category[1]}

              <b>
                →
              </b>
            </span>

          </div>

        </a>
      `;

    })
    .join("");
}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveData() {

  localStorage.setItem(
    "godprint-cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "godprint-favorites",
    JSON.stringify(favorites)
  );

}


/* =========================================================
   CONTADORES
   ========================================================= */

function updateCounts() {

  const cartCount = $("#cartCount");
  const favoriteCount = $("#favoriteCount");

  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (favoriteCount) {
    favoriteCount.textContent = favorites.length;
  }

}


/* =========================================================
   CARRINHO
   ========================================================= */

function renderCart() {

  const empty = $("#cartEmpty");
  const itemsContainer = $("#cartItems");

  if (!empty || !itemsContainer) {
    return;
  }

  if (cart.length === 0) {

    itemsContainer.innerHTML = "";

    empty.classList.add("show");

  } else {

    empty.classList.remove("show");

    itemsContainer.innerHTML = cart
      .map(item => {

        const product = products.find(
          product => product.id === item.id
        );

        if (!product) {
          return "";
        }

        return `
          <div class="cart-item">

            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <div>

              <h4>
                ${product.name}
              </h4>

              <small>
                ${money(product.price)} cada
              </small>

              <div class="qty">

                <button
                  data-qty="${product.id}"
                  data-change="-1"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>

                <b>
                  ${item.qty}
                </b>

                <button
                  data-qty="${product.id}"
                  data-change="1"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>

              </div>

            </div>

            <div>

              <strong>
                ${money(product.price * item.qty)}
              </strong>

              <button
                class="cart-remove"
                data-remove="${product.id}"
                aria-label="Remover produto"
              >
                ×
              </button>

            </div>

          </div>
        `;

      })
      .join("");

  }


  const total = cart.reduce(
    (total, item) => {

      const product = products.find(
        product => product.id === item.id
      );

      if (!product) {
        return total;
      }

      return total + product.price * item.qty;

    },
    0
  );


  const subtotal = $("#cartSubtotal");
  const totalElement = $("#cartTotal");

  if (subtotal) {
    subtotal.textContent = money(total);
  }

  if (totalElement) {
    totalElement.textContent = money(total);
  }

  updateCounts();

}


/* =========================================================
   ABRIR CARRINHO
   ========================================================= */

function openCart() {

  const drawer = $("#cartDrawer");
  const backdrop = $("#drawerBackdrop");

  if (!drawer || !backdrop) {
    return;
  }

  drawer.classList.add("open");
  backdrop.classList.add("show");

  drawer.setAttribute(
    "aria-hidden",
    "false"
  );

  renderCart();

}


/* =========================================================
   FECHAR CARRINHO / FAVORITOS
   ========================================================= */

function closePanels() {

  const cartDrawer = $("#cartDrawer");
  const favoritesPanel = $("#favoritesPanel");
  const backdrop = $("#drawerBackdrop");

  cartDrawer?.classList.remove("open");
  favoritesPanel?.classList.remove("open");
  backdrop?.classList.remove("show");

  cartDrawer?.setAttribute(
    "aria-hidden",
    "true"
  );

  favoritesPanel?.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast = $("#toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.godPrintToast);

  window.godPrintToast = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* =========================================================
   ADICIONAR AO CARRINHO
   ========================================================= */

function addToCart(productId) {

  const existingItem = cart.find(
    item => item.id === productId
  );

  if (existingItem) {

    existingItem.qty += 1;

  } else {

    cart.push({
      id: productId,
      qty: 1
    });

  }

  saveData();

  renderCart();

  showToast(
    "Produto adicionado ao carrinho."
  );

}


/* =========================================================
   FAVORITOS
   ========================================================= */

function toggleFavorite(productId) {

  if (favorites.includes(productId)) {

    favorites = favorites.filter(
      id => id !== productId
    );

    showToast(
      "Produto removido dos favoritos."
    );

  } else {

    favorites.push(productId);

    showToast(
      "Produto adicionado aos favoritos."
    );

  }

  saveData();

  updateCounts();

  renderAllProducts();

  renderFavorites();

  observeReveals();

}


/* =========================================================
   RENDERIZAR FAVORITOS
   ========================================================= */

function renderFavorites() {

  const container = $("#favoriteItems");

  if (!container) {
    return;
  }

  if (favorites.length === 0) {

    container.innerHTML = `
      <div class="cart-empty show">

        <span>♡</span>

        <b>
          Nenhum favorito ainda
        </b>

        <small>
          Salve produtos para encontrá-los aqui.
        </small>

      </div>
    `;

    return;
  }


  container.innerHTML = favorites
    .map(productId => {

      const product = products.find(
        product => product.id === productId
      );

      if (!product) {
        return "";
      }

      return `
        <div class="favorite-row">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <div>

            <strong>
              ${product.name}
            </strong>

            <small>
              ${money(product.price)}
            </small>

          </div>

        </div>
      `;

    })
    .join("");

}


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


    /* -----------------------------------------
       ADICIONAR AO CARRINHO
       ----------------------------------------- */

    const addButton =
      event.target.closest("[data-add]");

    if (addButton) {

      const productId =
        Number(addButton.dataset.add);

      addToCart(productId);

      return;
    }


    /* -----------------------------------------
       FAVORITO
       ----------------------------------------- */

    const favoriteButton =
      event.target.closest(
        "[data-favorite]"
      );

    if (favoriteButton) {

      const productId =
        Number(
          favoriteButton.dataset.favorite
        );

      toggleFavorite(productId);

      return;
    }


    /* -----------------------------------------
       REMOVER DO CARRINHO
       ----------------------------------------- */

    const removeButton =
      event.target.closest(
        "[data-remove]"
      );

    if (removeButton) {

      const productId =
        Number(
          removeButton.dataset.remove
        );

      cart = cart.filter(
        item => item.id !== productId
      );

      saveData();

      renderCart();

      showToast(
        "Produto removido do carrinho."
      );

      return;
    }


    /* -----------------------------------------
       ALTERAR QUANTIDADE
       ----------------------------------------- */

    const quantityButton =
      event.target.closest(
        "[data-qty]"
      );

    if (quantityButton) {

      const productId =
        Number(
          quantityButton.dataset.qty
        );

      const change =
        Number(
          quantityButton.dataset.change
        );

      const item =
        cart.find(
          item => item.id === productId
        );

      if (!item) {
        return;
      }

      item.qty += change;


      if (item.qty <= 0) {

        cart = cart.filter(
          cartItem =>
            cartItem.id !== productId
        );

      }


      saveData();

      renderCart();

      return;
    }


    /* -----------------------------------------
       CONTROLES DOS CARROSSÉIS
       ----------------------------------------- */

    const carouselButton =
      event.target.closest(
        "[data-carousel]"
      );

    if (carouselButton) {

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

      return;
    }


    /* -----------------------------------------
       RESULTADO DA BUSCA
       ----------------------------------------- */

    const searchResult =
      event.target.closest(
        "[data-search-product]"
      );

    if (searchResult) {

      const productId =
        Number(
          searchResult.dataset.searchProduct
        );

      addToCart(productId);

      $("#searchDropdown")
        ?.classList.remove("open");

      $("#searchInput")?.blur();

      $("#searchScreen")
        ?.classList.remove("open");

      return;
    }

  }
);


/* =========================================================
   CARRINHO
   ========================================================= */

$("#cartBtn")?.addEventListener(
  "click",
  openCart
);


$("#closeCart")?.addEventListener(
  "click",
  closePanels
);


$("#drawerBackdrop")?.addEventListener(
  "click",
  closePanels
);


/* =========================================================
   FAVORITOS
   ========================================================= */

$("#favoritesBtn")?.addEventListener(
  "click",
  () => {

    const panel =
      $("#favoritesPanel");

    const backdrop =
      $("#drawerBackdrop");

    if (!panel || !backdrop) {
      return;
    }

    panel.classList.add("open");

    backdrop.classList.add("show");

    panel.setAttribute(
      "aria-hidden",
      "false"
    );

    renderFavorites();

  }
);


$("#closeFavorites")?.addEventListener(
  "click",
  closePanels
);


/* =========================================================
   CHECKOUT
   ========================================================= */

$("#checkoutBtn")?.addEventListener(
  "click",
  () => {

    if (cart.length === 0) {

      showToast(
        "Adicione produtos ao carrinho primeiro."
      );

      return;
    }


    /*
      Aqui você poderá futuramente
      conectar Mercado Pago,
      PagSeguro, Stripe,
      WhatsApp ou outro checkout.
    */

    showToast(
      "Pedido preparado para finalizar."
    );

  }
);


/* =========================================================
   MENU MOBILE
   ========================================================= */

$("#menuBtn")?.addEventListener(
  "click",
  () => {

    const button =
      $("#menuBtn");

    const menu =
      $("#mobileNav");

    if (!button || !menu) {
      return;
    }

    button.classList.toggle("open");

    menu.classList.toggle("open");

    const isOpen =
      button.classList.contains("open");

    button.setAttribute(
      "aria-expanded",
      isOpen
    );

  }
);


/* =========================================================
   FECHAR MENU MOBILE AO CLICAR EM LINK
   ========================================================= */

$$(".mobile-nav a").forEach(
  link => {

    link.addEventListener(
      "click",
      () => {

        $("#menuBtn")
          ?.classList.remove("open");

        $("#mobileNav")
          ?.classList.remove("open");

        $("#menuBtn")
          ?.setAttribute(
            "aria-expanded",
            "false"
          );

      }
    );

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

renderCategories();

renderAllProducts();

renderCart();

renderFavorites();

updateCounts();

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

    closePanels();

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