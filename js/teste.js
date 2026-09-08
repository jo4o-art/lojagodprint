/* =========================================================
   GOD PRINT — SCRIPT PRINCIPAL
   ========================================================= */

'use strict';

/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector)
];

const storage = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Evita quebrar o site caso o localStorage esteja indisponível
    }
  }
};

function formatMoney(value) {
  const number = Number(value) || 0;

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


/* =========================================================
   LOADER
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const loader = $('#loader');

  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');

      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  }

});


/* =========================================================
   HEADER / SCROLL
   ========================================================= */

const siteHeader = $('#siteHeader');

function updateHeader() {
  if (!siteHeader) return;

  if (window.scrollY > 30) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, {
  passive: true
});

updateHeader();


/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuBtn = $('#menuBtn');
const mobileNav = $('#mobileNav');

if (menuBtn && mobileNav) {

  menuBtn.addEventListener('click', () => {

    const isOpen = mobileNav.classList.toggle('active');

    menuBtn.classList.toggle('active', isOpen);

    menuBtn.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    document.body.classList.toggle(
      'menu-open',
      isOpen
    );

  });

  $$('.mobile-nav a', mobileNav).forEach(link => {

    link.addEventListener('click', () => {

      mobileNav.classList.remove('active');
      menuBtn.classList.remove('active');

      menuBtn.setAttribute(
        'aria-expanded',
        'false'
      );

      document.body.classList.remove('menu-open');

    });

  });

}


/* =========================================================
   NAVEGAÇÃO POR ÂNCORAS
   ========================================================= */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener('click', event => {

    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const target = $(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = siteHeader
      ? siteHeader.offsetHeight
      : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

  });

});


/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
   ========================================================= */

const revealElements = $$(
  '.reveal, .fade-in, .animate-on-scroll'
);

if (
  revealElements.length &&
  'IntersectionObserver' in window
) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add('visible');
  });

}


/* =========================================================
   CARROSSÉIS
   ========================================================= */

function setupCarousel(
  carouselId,
  previousSelector,
  nextSelector
) {

  const carousel = $(`#${carouselId}`);

  if (!carousel) {
    return;
  }

  const previousButton = $(
    `${previousSelector}[data-carousel="${carouselId === 'featuredCarousel'
      ? 'featured'
      : carouselId === 'customCarousel'
        ? 'custom'
        : 'cards'
    }"]`
  );

  const nextButton = $(
    `${nextSelector}[data-carousel="${carouselId === 'featuredCarousel'
      ? 'featured'
      : carouselId === 'customCarousel'
        ? 'custom'
        : 'cards'
    }"]`
  );

  function getScrollAmount() {

    const card = $('.product-card', carousel);

    if (!card) {
      return carousel.clientWidth;
    }

    const styles = window.getComputedStyle(carousel);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      16;

    return card.getBoundingClientRect().width + gap;

  }

  if (previousButton) {

    previousButton.addEventListener('click', () => {

      carousel.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });

    });

  }

  if (nextButton) {

    nextButton.addEventListener('click', () => {

      carousel.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });

    });

  }

}


/*
 * Os IDs abaixo correspondem aos carrosséis existentes
 * no HTML.
 */

setupCarousel(
  'featuredCarousel',
  '[data-dir="-1"]',
  '[data-dir="1"]'
);

setupCarousel(
  'customCarousel',
  '[data-dir="-1"]',
  '[data-dir="1"]'
);

setupCarousel(
  'cardsCarousel',
  '[data-dir="-1"]',
  '[data-dir="1"]'
);


/* =========================================================
   ARRASTAR CARROSSÉIS COM O MOUSE
   ========================================================= */

$$('.product-carousel').forEach(carousel => {

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  carousel.addEventListener(
    'mousedown',
    event => {

      isDown = true;

      carousel.classList.add('dragging');

      startX = event.pageX -
        carousel.getBoundingClientRect().left;

      scrollLeft = carousel.scrollLeft;

    }
  );

  carousel.addEventListener(
    'mouseleave',
    () => {

      isDown = false;

      carousel.classList.remove('dragging');

    }
  );

  carousel.addEventListener(
    'mouseup',
    () => {

      isDown = false;

      carousel.classList.remove('dragging');

    }
  );

  carousel.addEventListener(
    'mousemove',
    event => {

      if (!isDown) {
        return;
      }

      event.preventDefault();

      const x =
        event.pageX -
        carousel.getBoundingClientRect().left;

      const distance = (x - startX) * 1.5;

      carousel.scrollLeft =
        scrollLeft - distance;

    }
  );

});


/* =========================================================
   PRODUTOS
   ========================================================= */

function getProducts() {

  return $$('.product-card').map((card, index) => {

    const nameElement =
      $('.product-name', card) ||
      $('.product-title', card) ||
      $('h3', card) ||
      $('h4', card);

    const priceElement =
      $('.product-price', card) ||
      $('.price', card);

    const categoryElement =
      $('.product-category', card) ||
      $('.category', card);

    const image =
      $('img', card);

    const name =
      nameElement
        ? nameElement.textContent.trim()
        : `Produto ${index + 1}`;

    const priceText =
      priceElement
        ? priceElement.textContent.trim()
        : '';

    const category =
      categoryElement
        ? categoryElement.textContent.trim()
        : '';

    const price =
      Number(
        priceText
          .replace(/[^\d,.-]/g, '')
          .replace(/\./g, '')
          .replace(',', '.')
      ) || 0;

    return {
      id:
        card.dataset.id ||
        String(index + 1),

      name,

      category,

      price,

      image:
        image
          ? image.getAttribute('src')
          : '',

      element: card
    };

  });

}


/* =========================================================
   FAVORITOS
   ========================================================= */

let favorites =
  storage.get('godprint-favorites', []);

if (!Array.isArray(favorites)) {
  favorites = [];
}


function saveFavorites() {

  storage.set(
    'godprint-favorites',
    favorites
  );

}


function isFavorite(id) {

  return favorites.includes(String(id));

}


function toggleFavorite(id) {

  id = String(id);

  if (isFavorite(id)) {

    favorites =
      favorites.filter(
        favoriteId => favoriteId !== id
      );

    showToast('Removido dos favoritos');

  } else {

    favorites.push(id);

    showToast('Adicionado aos favoritos');

  }

  saveFavorites();

  updateFavoriteButtons();

  renderFavorites();

}


function updateFavoriteButtons() {

  $$('.product-card').forEach(card => {

    const id =
      card.dataset.id;

    if (!id) {
      return;
    }

    const button =
      $('.favorite', card) ||
      $('.favorite-btn', card) ||
      $('[data-favorite]', card);

    if (!button) {
      return;
    }

    const active =
      isFavorite(id);

    button.classList.toggle(
      'active',
      active
    );

    button.classList.toggle(
      'is-favorite',
      active
    );

    button.setAttribute(
      'aria-pressed',
      String(active)
    );

  });

}


document.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest(
        '.favorite, .favorite-btn, [data-favorite]'
      );

    if (!button) {
      return;
    }

    const card =
      button.closest('.product-card');

    if (!card) {
      return;
    }

    const id =
      card.dataset.id;

    if (!id) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(id);

  }
);


/* =========================================================
   PAINEL DE FAVORITOS
   ========================================================= */

const favoritesPanel =
  $('#favoritesPanel');

const closeFavorites =
  $('#closeFavorites');

const favoriteItems =
  $('#favoriteItems');

function openFavoritesPanel() {

  if (!favoritesPanel) {
    return;
  }

  favoritesPanel.classList.add('active');

  document.body.classList.add(
    'drawer-open'
  );

  updateBackdrop();

}


function closeFavoritesPanel() {

  if (!favoritesPanel) {
    return;
  }

  favoritesPanel.classList.remove(
    'active'
  );

  document.body.classList.remove(
    'drawer-open'
  );

  updateBackdrop();

}


if (closeFavorites) {

  closeFavorites.addEventListener(
    'click',
    closeFavoritesPanel
  );

}


function renderFavorites() {

  if (!favoriteItems) {
    return;
  }

  const products =
    getProducts();

  const favoriteProducts =
    products.filter(product =>
      isFavorite(product.id)
    );

  favoriteItems.innerHTML = '';

  if (!favoriteProducts.length) {

    favoriteItems.innerHTML = `
      <div class="empty-state">
        <p>Você ainda não possui favoritos.</p>
      </div>
    `;

    return;
  }

  favoriteProducts.forEach(product => {

    const item =
      document.createElement('div');

    item.className =
      'favorite-item';

    item.innerHTML = `
      <div class="favorite-item-image">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}">`
          : ''
        }
      </div>

      <div class="favorite-item-info">
        <strong>${product.name}</strong>
        <span>${formatMoney(product.price)}</span>
      </div>

      <button
        type="button"
        class="favorite-remove"
        data-remove-favorite="${product.id}"
        aria-label="Remover dos favoritos"
      >
        ×
      </button>
    `;

    favoriteItems.appendChild(item);

  });

}


document.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest(
        '[data-remove-favorite]'
      );

    if (!button) {
      return;
    }

    const id =
      button.dataset.removeFavorite;

    favorites =
      favorites.filter(
        favoriteId =>
          String(favoriteId) !== String(id)
      );

    saveFavorites();

    updateFavoriteButtons();

    renderFavorites();

    showToast(
      'Removido dos favoritos'
    );

  }
);


/* =========================================================
   CARRINHO
   ========================================================= */

let cart =
  storage.get('godprint-cart', []);

if (!Array.isArray(cart)) {
  cart = [];
}


function saveCart() {

  storage.set(
    'godprint-cart',
    cart
  );

}


function addToCart(product) {

  const existing =
    cart.find(
      item =>
        String(item.id) ===
        String(product.id)
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

  }

  saveCart();

  renderCart();

  openCart();

  showToast(
    'Produto adicionado ao carrinho'
  );

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        String(item.id) !==
        String(id)
    );

  saveCart();

  renderCart();

}


function changeQuantity(id, amount) {

  const item =
    cart.find(
      product =>
        String(product.id) ===
        String(id)
    );

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id);

    return;

  }

  saveCart();

  renderCart();

}


function getCartSubtotal() {

  return cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) *
      (Number(item.quantity) || 0),
    0
  );

}


function renderCart() {

  const cartItems =
    $('#cartItems');

  const cartEmpty =
    $('#cartEmpty');

  const cartSubtotal =
    $('#cartSubtotal');

  const cartTotal =
    $('#cartTotal');

  if (cartItems) {

    cartItems.innerHTML = '';

    cart.forEach(item => {

      const element =
        document.createElement('div');

      element.className =
        'cart-item';

      element.innerHTML = `
        <div class="cart-item-image">
          ${item.image
            ? `<img src="${item.image}" alt="${item.name}">`
            : ''
          }
        </div>

        <div class="cart-item-info">

          <strong>
            ${item.name}
          </strong>

          <span>
            ${formatMoney(item.price)}
          </span>

          <div class="cart-item-quantity">

            <button
              type="button"
              data-cart-minus="${item.id}"
              aria-label="Diminuir quantidade"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              type="button"
              data-cart-plus="${item.id}"
              aria-label="Aumentar quantidade"
            >
              +
            </button>

          </div>

        </div>

        <button
          type="button"
          class="cart-remove"
          data-cart-remove="${item.id}"
          aria-label="Remover produto"
        >
          ×
        </button>
      `;

      cartItems.appendChild(element);

    });

  }

  const subtotal =
    getCartSubtotal();

  if (cartSubtotal) {

    cartSubtotal.textContent =
      formatMoney(subtotal);

  }

  if (cartTotal) {

    cartTotal.textContent =
      formatMoney(subtotal);

  }

  if (cartEmpty) {

    cartEmpty.style.display =
      cart.length
        ? 'none'
        : '';

  }

  updateCartCount();

}


function updateCartCount() {

  const count =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  $$(
    '[data-cart-count], .cart-count'
  ).forEach(element => {

    element.textContent =
      count;

    element.classList.toggle(
      'has-items',
      count > 0
    );

  });

}


document.addEventListener(
  'click',
  event => {

    const addButton =
      event.target.closest(
        '.product-add, [data-add-cart], .add-to-cart'
      );

    if (addButton) {

      const card =
        addButton.closest(
          '.product-card'
        );

      if (card) {

        const product =
          getProducts().find(
            item =>
              String(item.id) ===
              String(card.dataset.id)
          );

        if (product) {

          event.preventDefault();

          addToCart(product);

          return;

        }

      }

    }


    const plus =
      event.target.closest(
        '[data-cart-plus]'
      );

    if (plus) {

      changeQuantity(
        plus.dataset.cartPlus,
        1
      );

      return;

    }


    const minus =
      event.target.closest(
        '[data-cart-minus]'
      );

    if (minus) {

      changeQuantity(
        minus.dataset.cartMinus,
        -1
      );

      return;

    }


    const remove =
      event.target.closest(
        '[data-cart-remove]'
      );

    if (remove) {

      removeFromCart(
        remove.dataset.cartRemove
      );

    }

  }
);


/* =========================================================
   ABRIR / FECHAR CARRINHO
   ========================================================= */

const cartDrawer =
  $('#cartDrawer');

function openCart() {

  if (!cartDrawer) {
    return;
  }

  cartDrawer.classList.add(
    'active'
  );

  document.body.classList.add(
    'drawer-open'
  );

  updateBackdrop();

}


function closeCart() {

  if (!cartDrawer) {
    return;
  }

  cartDrawer.classList.remove(
    'active'
  );

  document.body.classList.remove(
    'drawer-open'
  );

  updateBackdrop();

}


document.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest(
        '[data-cart-open], #cartButton, .cart-button'
      );

    if (button) {

      event.preventDefault();

      openCart();

    }

  }
);


$$(
  '[data-cart-close], #closeCart, .cart-close'
).forEach(button => {

  button.addEventListener(
    'click',
    closeCart
  );

});


/* =========================================================
   BACKDROP
   ========================================================= */

const drawerBackdrop =
  $('#drawerBackdrop');


function updateBackdrop() {

  if (!drawerBackdrop) {
    return;
  }

  const cartIsOpen =
    cartDrawer &&
    cartDrawer.classList.contains('active');

  const favoritesAreOpen =
    favoritesPanel &&
    favoritesPanel.classList.contains('active');

  drawerBackdrop.classList.toggle(
    'active',
    Boolean(
      cartIsOpen ||
      favoritesAreOpen
    )
  );

}


if (drawerBackdrop) {

  drawerBackdrop.addEventListener(
    'click',
    () => {

      closeCart();

      closeFavoritesPanel();

    }
  );

}


/* =========================================================
   BUSCA DESKTOP
   ========================================================= */

const searchInput =
  $('#searchInput');

const searchResults =
  $('#searchResults');


function searchProducts(term) {

  const normalized =
    String(term || '')
      .trim()
      .toLowerCase();

  const products =
    getProducts();

  if (!normalized) {
    return [];
  }

  return products.filter(product => {

    return (
      product.name
        .toLowerCase()
        .includes(normalized)
      ||
      product.category
        .toLowerCase()
        .includes(normalized)
    );

  });

}


function renderSearchResults(
  term,
  container
) {

  if (!container) {
    return;
  }

  container.innerHTML = '';

  const normalized =
    String(term || '').trim();

  if (!normalized) {
    container.classList.remove(
      'active'
    );

    return;
  }

  const results =
    searchProducts(normalized);

  if (!results.length) {

    container.innerHTML = `
      <div class="search-empty">
        Nenhum produto encontrado.
      </div>
    `;

  } else {

    results.forEach(product => {

      const item =
        document.createElement('button');

      item.type = 'button';

      item.className =
        'search-result-item';

      item.dataset.productId =
        product.id;

      item.innerHTML = `
        <div class="search-result-image">
          ${product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : ''
          }
        </div>

        <div class="search-result-info">
          <strong>${product.name}</strong>
          <span>${formatMoney(product.price)}</span>
        </div>
      `;

      container.appendChild(item);

    });

  }

  container.classList.add(
    'active'
  );

}


if (searchInput) {

  searchInput.addEventListener(
    'input',
    () => {

      renderSearchResults(
        searchInput.value,
        searchResults
      );

    }
  );

}


document.addEventListener(
  'click',
  event => {

    const result =
      event.target.closest(
        '.search-result-item'
      );

    if (!result) {
      return;
    }

    const id =
      result.dataset.productId;

    const card =
      $(
        `.product-card[data-id="${CSS.escape(id)}"]`
      );

    if (card) {

      card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    }

    if (searchInput) {
      searchInput.value = '';
    }

    if (searchResults) {
      searchResults.classList.remove(
        'active'
      );
    }

  }
);


/* =========================================================
   BUSCA MOBILE
   ========================================================= */

const mobileSearchInput =
  $('#mobileSearchInput');

const mobileSearchResults =
  $('#mobileSearchResults');


if (mobileSearchInput) {

  mobileSearchInput.addEventListener(
    'input',
    () => {

      renderSearchResults(
        mobileSearchInput.value,
        mobileSearchResults
      );

    }
  );

}


/* =========================================================
   FECHAR RESULTADOS DE BUSCA
   ========================================================= */

document.addEventListener(
  'click',
  event => {

    const clickedSearch =
      event.target.closest(
        '.search-box, .search-container, .mobile-search'
      );

    if (clickedSearch) {
      return;
    }

    $$('.search-results').forEach(
      results => {
        results.classList.remove(
          'active'
        );
      }
    );

  }
);


/* =========================================================
   CATEGORIAS
   ========================================================= */

const categoryGrid =
  $('#categoryGrid');


if (categoryGrid) {

  categoryGrid.addEventListener(
    'click',
    event => {

      const categoryCard =
        event.target.closest(
          '.category-card'
        );

      if (!categoryCard) {
        return;
      }

      const category =
        categoryCard.dataset.category;

      if (!category) {
        return;
      }

      const products =
        $$('.product-card');

      let found = false;

      products.forEach(card => {

        const cardCategory =
          card.dataset.category;

        if (
          cardCategory &&
          cardCategory
            .toLowerCase() ===
          category.toLowerCase()
        ) {

          if (!found) {

            card.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });

            found = true;

          }

        }

      });

    }
  );

}


/* =========================================================
   FILTRO DE PRODUTOS
   ========================================================= */

function filterProducts(category) {

  const normalized =
    String(category || '')
      .trim()
      .toLowerCase();

  $$('.product-card').forEach(card => {

    const cardCategory =
      String(
        card.dataset.category || ''
      ).toLowerCase();

    const show =
      !normalized ||
      normalized === 'todos' ||
      cardCategory === normalized;

    card.style.display =
      show ? '' : 'none';

  });

}


/* =========================================================
   BOTÕES DE CATEGORIA
   ========================================================= */

$$(
  '[data-category-filter]'
).forEach(button => {

  button.addEventListener(
    'click',
    () => {

      const category =
        button.dataset.categoryFilter;

      filterProducts(category);

      $$(
        '[data-category-filter]'
      ).forEach(item => {

        item.classList.remove(
          'active'
        );

      });

      button.classList.add(
        'active'
      );

    }
  );

});


/* =========================================================
   WHATSAPP
   ========================================================= */

$$(
  '[data-whatsapp], .whatsapp-button, .floating-whatsapp'
).forEach(button => {

  button.addEventListener(
    'click',
    () => {

      showToast(
        'Abrindo atendimento pelo WhatsApp...'
      );

    }
  );

});


/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

const backTop =
  $('#backTop');


function updateBackTop() {

  if (!backTop) {
    return;
  }

  backTop.classList.toggle(
    'visible',
    window.scrollY > 500
  );

}


window.addEventListener(
  'scroll',
  updateBackTop,
  {
    passive: true
  }
);

updateBackTop();


if (backTop) {

  backTop.addEventListener(
    'click',
    () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  );

}


/* =========================================================
   TOAST
   ========================================================= */

const toast =
  $('#toast');

let toastTimer = null;


function showToast(message) {

  if (!toast) {
    return;
  }

  const messageElement =
    $('.toast-message', toast);

  if (messageElement) {

    messageElement.textContent =
      message;

  } else {

    toast.textContent =
      message;

  }

  toast.classList.add(
    'active'
  );

  clearTimeout(
    toastTimer
  );

  toastTimer = setTimeout(
    () => {

      toast.classList.remove(
        'active'
      );

    },
    2500
  );

}


/* =========================================================
   CONTA
   ========================================================= */

$$(
  '[data-account], #accountButton, .account-button'
).forEach(button => {

  button.addEventListener(
    'click',
    event => {

      /*
       * Não força uma página inexistente.
       * Caso o HTML tenha um link real,
       * ele continuará funcionando normalmente.
       */

      if (
        button.tagName.toLowerCase() ===
        'a'
      ) {
        return;
      }

      event.preventDefault();

      showToast(
        'Área da conta em breve.'
      );

    }
  );

});


/* =========================================================
   CHECKOUT
   ========================================================= */

const checkoutBtn =
  $('#checkoutBtn');


if (checkoutBtn) {

  checkoutBtn.addEventListener(
    'click',
    event => {

      if (!cart.length) {

        event.preventDefault();

        showToast(
          'Seu carrinho está vazio.'
        );

        return;

      }

      /*
       * O botão continua respeitando o
       * comportamento definido no HTML.
       */

    }
  );

}


/* =========================================================
   ESC — FECHAR PAINÉIS
   ========================================================= */

document.addEventListener(
  'keydown',
  event => {

    if (event.key !== 'Escape') {
      return;
    }

    closeCart();

    closeFavoritesPanel();

    if (mobileNav) {

      mobileNav.classList.remove(
        'active'
      );

    }

    if (menuBtn) {

      menuBtn.classList.remove(
        'active'
      );

      menuBtn.setAttribute(
        'aria-expanded',
        'false'
      );

    }

    document.body.classList.remove(
      'menu-open'
    );

  }
);


/* =========================================================
   REDIMENSIONAMENTO DA JANELA
   ========================================================= */

let resizeTimer;

window.addEventListener(
  'resize',
  () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(
      () => {

        updateHeader();

        updateBackTop();

      },
      150
    );

  }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    updateFavoriteButtons();

    renderFavorites();

    renderCart();

    updateCartCount();

    updateHeader();

    updateBackTop();

  }
);