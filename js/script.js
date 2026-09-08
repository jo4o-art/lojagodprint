/* =========================================================
   GOD PRINT — SCRIPT PRINCIPAL
   Compatível com o HTML atual
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const CONFIG = {
    whatsapp: "5591992800697",

    storage: {
        cart: "godprint_cart",
        favorites: "godprint_favorites"
    },

    carousel: {
        autoplay: true,
        interval: 4500
    }
};


/* =========================================================
   PRODUTOS
   Edite/adicione produtos aqui
   ========================================================= */

const products = [
    {
        id: "camiseta-personalizada",
        name: "Camiseta Personalizada",
        category: "Linha Têxtil",
        description: "Camiseta personalizada com impressão de alta qualidade.",
        price: 35.00,
        unit: "1 unidade",
        image: "assets/products/camiseta-01.webp",
        featured: true
    },

    {
        id: "caneca-personalizada",
        name: "Caneca Personalizada",
        category: "Personalizados",
        description: "Caneca personalizada ideal para presentes e empresas.",
        price: 29.90,
        unit: "1 unidade",
        image: "assets/products/caneca-01.webp",
        featured: true
    },

    {
        id: "banner-personalizado",
        name: "Banner Personalizado",
        category: "Banners",
        description: "Banner profissional para eventos, lojas e divulgação.",
        price: 45.00,
        unit: "1 unidade",
        image: "assets/products/banner-01.webp",
        featured: true
    },

    {
        id: "adesivo-personalizado",
        name: "Adesivo Personalizado",
        category: "Adesivos",
        description: "Adesivos personalizados para sua marca ou projeto.",
        price: 15.00,
        unit: "1 unidade",
        image: "assets/products/adesivo-01.webp",
        featured: true
    },

    {
        id: "cartao-visita",
        name: "Cartão de Visita",
        category: "Cartões",
        description: "Cartões de visita com acabamento profissional.",
        price: 35.00,
        unit: "100 unidades",
        image: "assets/products/cartao-01.webp",
        featured: true
    },

    {
        id: "lona-impressa",
        name: "Lona Impressa",
        category: "Lonas",
        description: "Impressão em lona para comunicação visual.",
        price: 55.00,
        unit: "1 m²",
        image: "assets/products/lona-01.webp",
        featured: false
    },

    {
        id: "wind-banner",
        name: "Wind Banner",
        category: "Wind Banner",
        description: "Wind banner personalizado para divulgação externa.",
        price: 149.90,
        unit: "1 unidade",
        image: "assets/products/wind-banner-01.webp",
        featured: false
    },

    {
        id: "moletom-personalizado",
        name: "Moletom Personalizado",
        category: "Linha Têxtil",
        description: "Moletom personalizado com acabamento premium.",
        price: 79.90,
        unit: "1 unidade",
        image: "assets/products/moletom-01.webp",
        featured: false
    },

    {
        id: "sacola-personalizada",
        name: "Sacola Personalizada",
        category: "Personalizados",
        description: "Sacolas personalizadas para sua marca.",
        price: 4.90,
        unit: "1 unidade",
        image: "assets/products/sacola-01.webp",
        featured: false
    },

    {
        id: "placa-personalizada",
        name: "Placa Personalizada",
        category: "Comunicação Visual",
        description: "Placas personalizadas para ambientes e empresas.",
        price: 65.00,
        unit: "1 unidade",
        image: "assets/products/placa-01.webp",
        featured: false
    }
];


/* =========================================================
   CATEGORIAS
   ========================================================= */

const categories = [
    {
        id: "adesivos",
        name: "Adesivos",
        description: "Personalize suas ideias.",
        image: "assets/categories/adesivos.webp"
    },

    {
        id: "banners",
        name: "Banners",
        description: "Sua marca em destaque.",
        image: "assets/categories/banners.webp"
    },

    {
        id: "personalizados",
        name: "Personalizados",
        description: "Produtos feitos para você.",
        image: "assets/categories/personalizados.webp"
    },

    {
        id: "textil",
        name: "Linha Têxtil",
        description: "Vista a sua marca.",
        image: "assets/categories/textil.webp"
    },

    {
        id: "cartoes",
        name: "Cartões",
        description: "Sua identidade profissional.",
        image: "assets/categories/cartoes.webp"
    },

    {
        id: "lonas",
        name: "Lonas",
        description: "Comunicação visual resistente.",
        image: "assets/categories/lonas.webp"
    },

    {
        id: "wind-banner",
        name: "Wind Banner",
        description: "Destaque sua marca.",
        image: "assets/categories/wind-banner.webp"
    },

    {
        id: "comunicacao-visual",
        name: "Comunicação Visual",
        description: "Soluções para sua empresa.",
        image: "assets/categories/comunicacao-visual.webp"
    }
];


/* =========================================================
   ESTADO GLOBAL
   ========================================================= */

let cart = loadStorage(CONFIG.storage.cart, []);
let favorites = loadStorage(CONFIG.storage.favorites, []);

let carouselStates = {};


/* =========================================================
   FUNÇÕES UTILITÁRIAS
   ========================================================= */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}


function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}


function loadStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao carregar ${key}:`, error);
        return fallback;
    }
}


function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Erro ao salvar ${key}:`, error);
    }
}


function formatPrice(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getProduct(id) {
    return products.find(product => product.id === id);
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    clearTimeout(toastTimeout);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hidden");

            setTimeout(() => {
                loader.remove();
            }, 700);

        }, 500);

    });
}


/* =========================================================
   HEADER
   ========================================================= */

function initHeader() {

    const header = document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    function updateHeader() {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (!menuBtn || !mobileNav) {
        return;
    }

    function toggleMenu(force) {

        const shouldOpen =
            typeof force === "boolean"
                ? force
                : !mobileNav.classList.contains("active");

        mobileNav.classList.toggle("active", shouldOpen);

        menuBtn.classList.toggle("active", shouldOpen);

        menuBtn.setAttribute(
            "aria-expanded",
            String(shouldOpen)
        );

        menuBtn.setAttribute(
            "aria-label",
            shouldOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

        document.body.classList.toggle(
            "menu-open",
            shouldOpen
        );
    }

    menuBtn.addEventListener("click", () => {
        toggleMenu();
    });

    $$(".mobile-nav a").forEach(link => {

        link.addEventListener("click", () => {
            toggleMenu(false);
        });

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            toggleMenu(false);
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            toggleMenu(false);
        }

    });

}


/* =========================================================
   NAVEGAÇÃO SUAVE
   ========================================================= */

function initSmoothScroll() {

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   CATEGORIAS
   ========================================================= */

function renderCategories() {

    const grid = document.getElementById("categoryGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = categories.map(category => {

        return `
            <button
                type="button"
                class="category-card"
                data-category="${escapeHTML(category.name)}"
                aria-label="Ver produtos de ${escapeHTML(category.name)}"
            >

                <div
                    class="category-card__bg"
                    style="background-image: url('${escapeHTML(category.image)}')"
                ></div>

                <div class="category-card__overlay"></div>

                <div class="category-card__content">

                    <span class="category-card__eyebrow">
                        GOD PRINT
                    </span>

                    <h3>
                        ${escapeHTML(category.name)}
                    </h3>

                    <p>
                        ${escapeHTML(category.description)}
                    </p>

                    <span class="category-card__arrow">
                        →
                    </span>

                </div>

            </button>
        `;

    }).join("");

    $$(".category-card", grid).forEach(card => {

        card.addEventListener("click", () => {

            const category = card.dataset.category;

            const productSection =
                document.getElementById("produtos");

            if (productSection) {
                productSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            setTimeout(() => {
                filterProductsByCategory(category);
            }, 500);

        });

    });

}


/* =========================================================
   CARD DE PRODUTO
   ========================================================= */

function createProductCard(product) {

    const isFavorite =
        favorites.includes(product.id);

    const image =
        product.image ||
        "assets/placeholder.webp";

    return `
        <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
        >

            <div class="product-card__image">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >

                <button
                    type="button"
                    class="product-favorite ${isFavorite ? "active" : ""}"
                    data-favorite="${escapeHTML(product.id)}"
                    aria-label="${isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
                    aria-pressed="${isFavorite}"
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"
                        ></path>
                    </svg>
                </button>

                <span class="product-badge">
                    Personalizável
                </span>

            </div>

            <div class="product-card__body">

                <span class="product-card__category">
                    ${escapeHTML(product.category)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.description)}
                </p>

                <div class="product-card__footer">

                    <div class="product-price">

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                        <small>
                            / ${escapeHTML(product.unit)}
                        </small>

                    </div>

                    <button
                        type="button"
                        class="product-add"
                        data-add-cart="${escapeHTML(product.id)}"
                        aria-label="Adicionar ${escapeHTML(product.name)} ao carrinho"
                    >
                        +
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER DOS PRODUTOS
   ========================================================= */

function renderProductCarousel(elementId, productList) {

    const container =
        document.getElementById(elementId);

    if (!container) {
        return;
    }

    container.innerHTML = productList
        .map(createProductCard)
        .join("");

    initProductButtons(container);
    initProductCarousel(elementId);
}


function initProductButtons(container) {

    $$("[data-add-cart]", container).forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const id =
                button.dataset.addCart;

            addToCart(id);

        });

    });


    $$("[data-favorite]", container).forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const id =
                button.dataset.favorite;

            toggleFavorite(id);

        });

    });


    $$(".product-card", container).forEach(card => {

        card.addEventListener("click", event => {

            if (
                event.target.closest(
                    "button"
                )
            ) {
                return;
            }

            const id =
                card.dataset.productId;

            openProduct(id);

        });

    });

}


/* =========================================================
   PRODUTOS POR CATEGORIA
   ========================================================= */

function getProductsByCategory(category) {

    const normalized =
        category
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    return products.filter(product => {

        const productCategory =
            product.category
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        return (
            productCategory.includes(normalized) ||
            normalized.includes(productCategory)
        );

    });

}


function filterProductsByCategory(category) {

    const matching =
        getProductsByCategory(category);

    if (!matching.length) {

        showToast(
            `Ainda não há produtos cadastrados em ${category}.`
        );

        return;
    }

    const carousel =
        document.getElementById("featuredCarousel");

    if (!carousel) {
        return;
    }

    carousel.innerHTML =
        matching.map(createProductCard).join("");

    initProductButtons(carousel);

    initProductCarousel("featuredCarousel");

    showToast(
        `${matching.length} produto(s) encontrado(s).`
    );

}


/* =========================================================
   INICIALIZAÇÃO DOS CARROSSÉIS
   ========================================================= */

function initProductCarousel(id) {

    const track =
        document.getElementById(id);

    if (!track) {
        return;
    }

    const cards =
        $$(".product-card", track);

    if (!cards.length) {
        return;
    }

    const state = {

        index: 0,

        visible: getVisibleCards(),

        timer: null

    };

    carouselStates[id] = state;


    function getVisibleCards() {

        const width =
            window.innerWidth;

        if (width <= 600) {
            return 1;
        }

        if (width <= 850) {
            return 2;
        }

        if (width <= 1150) {
            return 3;
        }

        return 4;
    }


    function update() {

        state.visible =
            getVisibleCards();

        const maxIndex =
            Math.max(
                0,
                cards.length - state.visible
            );

        state.index =
            Math.min(
                state.index,
                maxIndex
            );

        if (cards.length <= state.visible) {

            track.style.transform =
                "translateX(0)";

            return;
        }

        const firstCard =
            cards[0];

        const cardWidth =
            firstCard.getBoundingClientRect().width;

        const styles =
            window.getComputedStyle(track);

        const gap =
            parseFloat(styles.gap) || 0;

        const distance =
            cardWidth + gap;

        track.style.transform =
            `translateX(-${state.index * distance}px)`;
    }


    function move(direction) {

        const maxIndex =
            Math.max(
                0,
                cards.length - state.visible
            );

        state.index += direction;

        if (state.index < 0) {
            state.index = 0;
        }

        if (state.index > maxIndex) {
            state.index = maxIndex;
        }

        update();
    }


    track.__carouselMove = move;

    update();


    if (
        CONFIG.carousel.autoplay &&
        cards.length > state.visible
    ) {

        state.timer =
            setInterval(() => {

                const maxIndex =
                    Math.max(
                        0,
                        cards.length - state.visible
                    );

                if (
                    state.index >= maxIndex
                ) {
                    state.index = 0;
                } else {
                    state.index++;
                }

                update();

            }, CONFIG.carousel.interval);

        track.addEventListener(
            "mouseenter",
            () => clearInterval(state.timer)
        );

        track.addEventListener(
            "mouseleave",
            () => {

                state.timer =
                    setInterval(() => {

                        const maxIndex =
                            Math.max(
                                0,
                                cards.length - state.visible
                            );

                        if (
                            state.index >= maxIndex
                        ) {
                            state.index = 0;
                        } else {
                            state.index++;
                        }

                        update();

                    }, CONFIG.carousel.interval);

            }
        );
    }

}


/* =========================================================
   CONTROLES DOS CARROSSÉIS
   ========================================================= */

function initCarouselControls() {

    $$("[data-carousel]").forEach(button => {

        button.addEventListener("click", () => {

            const carouselName =
                button.dataset.carousel;

            const direction =
                Number(button.dataset.dir);

            const map = {

                featured:
                    "featuredCarousel",

                custom:
                    "customCarousel",

                cards:
                    "cardsCarousel"

            };

            const carouselId =
                map[carouselName];

            if (!carouselId) {
                return;
            }

            const track =
                document.getElementById(
                    carouselId
                );

            if (
                track &&
                typeof track.__carouselMove === "function"
            ) {

                track.__carouselMove(
                    direction
                );

            }

        });

    });

}


/* =========================================================
   FAVORITOS
   ========================================================= */

function toggleFavorite(productId) {

    const index =
        favorites.indexOf(productId);

    if (index === -1) {

        favorites.push(productId);

        showToast(
            "Produto adicionado aos favoritos."
        );

    } else {

        favorites.splice(index, 1);

        showToast(
            "Produto removido dos favoritos."
        );

    }

    saveStorage(
        CONFIG.storage.favorites,
        favorites
    );

    refreshFavoriteButtons();
    renderFavorites();
}


function refreshFavoriteButtons() {

    $$("[data-favorite]").forEach(button => {

        const id =
            button.dataset.favorite;

        const active =
            favorites.includes(id);

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            String(active)
        );

        button.setAttribute(
            "aria-label",
            active
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"
        );

    });

}


function renderFavorites() {

    const container =
        document.getElementById(
            "favoriteItems"
        );

    if (!container) {
        return;
    }

    if (!favorites.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ♡
                </div>

                <strong>
                    Nenhum favorito ainda.
                </strong>

                <small>
                    Clique no coração dos produtos
                    para adicioná-los aqui.
                </small>

            </div>
        `;

        return;
    }


    const favoriteProducts =
        favorites
            .map(getProduct)
            .filter(Boolean);


    container.innerHTML =
        favoriteProducts.map(product => {

            return `
                <div
                    class="favorite-item"
                    data-favorite-item="${escapeHTML(product.id)}"
                >

                    <div class="favorite-item__image">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                    </div>

                    <div class="favorite-item__info">

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <span>
                            ${formatPrice(product.price)}
                        </span>

                    </div>

                    <button
                        type="button"
                        data-remove-favorite="${escapeHTML(product.id)}"
                        aria-label="Remover ${escapeHTML(product.name)} dos favoritos"
                    >
                        ×
                    </button>

                </div>
            `;

        }).join("");


    $$(
        "[data-remove-favorite]",
        container
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                toggleFavorite(
                    button.dataset.removeFavorite
                );

            }
        );

    });

}


/* =========================================================
   ABRIR FAVORITOS
   ========================================================= */

function initFavoritesPanel() {

    const favoritesBtn =
        document.getElementById(
            "favoritesBtn"
        );

    const favoritesPanel =
        document.getElementById(
            "favoritesPanel"
        );

    const closeFavorites =
        document.getElementById(
            "closeFavorites"
        );

    if (!favoritesPanel) {
        return;
    }


    function open() {

        closeAllPanels();

        favoritesPanel.classList.add(
            "active"
        );

        favoritesPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        openBackdrop();
    }


    function close() {

        favoritesPanel.classList.remove(
            "active"
        );

        favoritesPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        closeBackdrop();
    }


    if (favoritesBtn) {
        favoritesBtn.addEventListener(
            "click",
            open
        );
    }


    if (closeFavorites) {
        closeFavorites.addEventListener(
            "click",
            close
        );
    }


    favoritesPanel.__close = close;

    renderFavorites();

}


/* =========================================================
   CARRINHO
   ========================================================= */

function addToCart(productId) {

    const product =
        getProduct(productId);

    if (!product) {
        return;
    }

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveStorage(
        CONFIG.storage.cart,
        cart
    );

    updateCartUI();

    showToast(
        `${product.name} foi adicionado ao carrinho.`
    );

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveStorage(
        CONFIG.storage.cart,
        cart
    );

    updateCartUI();

}


function changeCartQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveStorage(
        CONFIG.storage.cart,
        cart
    );

    updateCartUI();

}


function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                getProduct(item.id);

            if (!product) {
                return total;
            }

            return (
                total +
                product.price *
                item.quantity
            );

        },
        0
    );

}


/* =========================================================
   RENDER CARRINHO
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const empty =
        document.getElementById(
            "cartEmpty"
        );

    if (!container) {
        return;
    }


    if (!cart.length) {

        container.innerHTML = "";

        if (empty) {
            empty.style.display = "";
        }

        return;
    }


    if (empty) {
        empty.style.display = "none";
    }


    container.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) {
                return "";
            }

            return `
                <div
                    class="cart-item"
                    data-cart-item="${escapeHTML(product.id)}"
                >

                    <div class="cart-item__image">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                    </div>

                    <div class="cart-item__info">

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <span>
                            ${formatPrice(product.price)}
                        </span>

                        <div class="cart-item__controls">

                            <button
                                type="button"
                                data-cart-minus="${escapeHTML(product.id)}"
                                aria-label="Diminuir quantidade"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                data-cart-plus="${escapeHTML(product.id)}"
                                aria-label="Aumentar quantidade"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="cart-item__remove"
                        data-cart-remove="${escapeHTML(product.id)}"
                        aria-label="Remover produto"
                    >
                        ×
                    </button>

                </div>
            `;

        }).join("");


    $$("[data-cart-minus]", container)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeCartQuantity(
                        button.dataset.cartMinus,
                        -1
                    );

                }
            );

        });


    $$("[data-cart-plus]", container)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeCartQuantity(
                        button.dataset.cartPlus,
                        1
                    );

                }
            );

        });


    $$("[data-cart-remove]", container)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.cartRemove
                    );

                    showToast(
                        "Produto removido do carrinho."
                    );

                }
            );

        });

}


/* =========================================================
   ATUALIZA INTERFACE DO CARRINHO
   ========================================================= */

function updateCartUI() {

    renderCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (cartCount) {
        cartCount.textContent =
            count;
    }


    const subtotal =
        getCartTotal();


    const cartSubtotal =
        document.getElementById(
            "cartSubtotal"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (cartSubtotal) {
        cartSubtotal.textContent =
            formatPrice(subtotal);
    }

    if (cartTotal) {
        cartTotal.textContent =
            formatPrice(subtotal);
    }

}


/* =========================================================
   PAINEL DO CARRINHO
   ========================================================= */

function initCartPanel() {

    const cartBtn =
        document.getElementById(
            "cartBtn"
        );

    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );

    const closeCart =
        document.getElementById(
            "closeCart"
        );


    if (!cartDrawer) {
        return;
    }


    function open() {

        closeAllPanels();

        cartDrawer.classList.add(
            "active"
        );

        cartDrawer.setAttribute(
            "aria-hidden",
            "false"
        );

        openBackdrop();
    }


    function close() {

        cartDrawer.classList.remove(
            "active"
        );

        cartDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

        closeBackdrop();
    }


    if (cartBtn) {
        cartBtn.addEventListener(
            "click",
            open
        );
    }


    if (closeCart) {
        closeCart.addEventListener(
            "click",
            close
        );
    }


    cartDrawer.__close = close;


    updateCartUI();

}


/* =========================================================
   BACKDROP
   ========================================================= */

function initBackdrop() {

    const backdrop =
        document.getElementById(
            "drawerBackdrop"
        );

    if (!backdrop) {
        return;
    }

    backdrop.addEventListener(
        "click",
        closeAllPanels
    );

}


function openBackdrop() {

    const backdrop =
        document.getElementById(
            "drawerBackdrop"
        );

    if (backdrop) {
        backdrop.classList.add(
            "active"
        );
    }

    document.body.classList.add(
        "drawer-open"
    );
}


function closeBackdrop() {

    const backdrop =
        document.getElementById(
            "drawerBackdrop"
        );

    if (backdrop) {
        backdrop.classList.remove(
            "active"
        );
    }

    document.body.classList.remove(
        "drawer-open"
    );
}


function closeAllPanels() {

    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );

    const favoritesPanel =
        document.getElementById(
            "favoritesPanel"
        );


    if (
        cartDrawer &&
        cartDrawer.__close
    ) {
        cartDrawer.__close();
    } else if (cartDrawer) {

        cartDrawer.classList.remove(
            "active"
        );

        cartDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        favoritesPanel &&
        favoritesPanel.__close
    ) {
        favoritesPanel.__close();
    } else if (favoritesPanel) {

        favoritesPanel.classList.remove(
            "active"
        );

        favoritesPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    closeBackdrop();

}


/* =========================================================
   BUSCA
   ========================================================= */

function initSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchResults =
        document.getElementById(
            "searchResults"
        );

    const mobileSearchInput =
        document.getElementById(
            "mobileSearchInput"
        );

    const mobileSearchResults =
        document.getElementById(
            "mobileSearchResults"
        );


    function search(
        value,
        resultContainer
    ) {

        if (!resultContainer) {
            return;
        }

        const term =
            value
                .trim()
                .toLowerCase();

        if (!term) {

            resultContainer.innerHTML = "";

            resultContainer.classList.remove(
                "active"
            );

            return;
        }


        const results =
            products.filter(product => {

                const text =
                    [
                        product.name,
                        product.category,
                        product.description
                    ]
                        .join(" ")
                        .toLowerCase();

                return text.includes(term);

            });


        if (!results.length) {

            resultContainer.innerHTML = `
                <div class="search-empty">
                    Nenhum produto encontrado.
                </div>
            `;

        } else {

            resultContainer.innerHTML =
                results
                    .slice(0, 6)
                    .map(product => {

                        return `
                            <button
                                type="button"
                                class="search-result"
                                data-search-product="${escapeHTML(product.id)}"
                            >

                                <img
                                    src="${escapeHTML(product.image)}"
                                    alt=""
                                >

                                <span>

                                    <strong>
                                        ${escapeHTML(product.name)}
                                    </strong>

                                    <small>
                                        ${formatPrice(product.price)}
                                    </small>

                                </span>

                            </button>
                        `;

                    })
                    .join("");

        }


        resultContainer.classList.add(
            "active"
        );


        $$(
            "[data-search-product]",
            resultContainer
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.searchProduct;

                    openProduct(id);

                    resultContainer.classList.remove(
                        "active"
                    );

                    if (searchInput) {
                        searchInput.value = "";
                    }

                    if (mobileSearchInput) {
                        mobileSearchInput.value = "";
                    }

                }
            );

        });

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                search(
                    searchInput.value,
                    searchResults
                );

            }
        );

    }


    if (mobileSearchInput) {

        mobileSearchInput.addEventListener(
            "input",
            () => {

                search(
                    mobileSearchInput.value,
                    mobileSearchResults
                );

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".search-wrapper"
                ) &&
                !event.target.closest(
                    ".mobile-search"
                )
            ) {

                if (searchResults) {
                    searchResults.classList.remove(
                        "active"
                    );
                }

                if (mobileSearchResults) {
                    mobileSearchResults.classList.remove(
                        "active"
                    );
                }

            }

        }
    );

}


/* =========================================================
   PRODUTO
   ========================================================= */

function openProduct(productId) {

    const product =
        getProduct(productId);

    if (!product) {
        return;
    }

    addToCart(product.id);

}


/* =========================================================
   FINALIZAR PEDIDO
   ========================================================= */

function initCheckout() {

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );

    if (!checkoutBtn) {
        return;
    }


    checkoutBtn.addEventListener(
        "click",
        () => {

            if (!cart.length) {

                showToast(
                    "Seu carrinho está vazio."
                );

                return;
            }


            let message =
                "Olá, God Print! Gostaria de fazer um pedido:%0A%0A";


            cart.forEach(item => {

                const product =
                    getProduct(item.id);

                if (!product) {
                    return;
                }

                message +=
                    `• ${product.name} — ${item.quantity}x — ${formatPrice(product.price * item.quantity)}%0A`;

            });


            message +=
                `%0ASubtotal: ${formatPrice(getCartTotal())}`;


            const url =
                `https://wa.me/${CONFIG.whatsapp}?text=${message}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   VOLTAR AO TOPO
   ========================================================= */

function initBackTop() {

    const button =
        document.getElementById(
            "backTop"
        );

    if (!button) {
        return;
    }


    function update() {

        button.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }


    update();


    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ANIMAÇÕES REVEAL
   ========================================================= */

function initReveal() {

    const elements =
        $$(".reveal");

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {
                element.classList.add(
                    "visible"
                );
            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {
            observer.observe(element);
        }
    );

}


/* =========================================================
   NAVEGAÇÃO ATIVA
   ========================================================= */

function initActiveNavigation() {

    const sections =
        $$("main section[id]");

    const navLinks =
        $$(".desktop-nav a");


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            observer.observe(section)
    );

}


/* =========================================================
   ATALHOS DO TECLADO
   ========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeAllPanels();

            }

        }
    );

}


/* =========================================================
   REDIMENSIONAMENTO DOS CARROSSÉIS
   ========================================================= */

let resizeTimeout;

function initResize() {

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );

            resizeTimeout =
                setTimeout(() => {

                    Object.keys(
                        carouselStates
                    ).forEach(id => {

                        const track =
                            document.getElementById(
                                id
                            );

                        if (
                            track &&
                            track.__carouselMove
                        ) {

                            const event =
                                new Event(
                                    "carouselresize"
                                );

                            track.dispatchEvent(
                                event
                            );

                        }

                    });

                }, 150);

        }
    );


    Object.keys(
        carouselStates
    ).forEach(id => {

        const track =
            document.getElementById(id);

        if (!track) {
            return;
        }

        track.addEventListener(
            "carouselresize",
            () => {

                const cards =
                    $$(".product-card", track);

                if (!cards.length) {
                    return;
                }

                const first =
                    cards[0];

                const cardWidth =
                    first.getBoundingClientRect()
                        .width;

                const styles =
                    getComputedStyle(track);

                const gap =
                    parseFloat(styles.gap) || 0;

                const state =
                    carouselStates[id];

                state.visible =
                    window.innerWidth <= 600
                        ? 1
                        : window.innerWidth <= 850
                            ? 2
                            : window.innerWidth <= 1150
                                ? 3
                                : 4;

                const max =
                    Math.max(
                        0,
                        cards.length -
                        state.visible
                    );

                state.index =
                    Math.min(
                        state.index,
                        max
                    );

                track.style.transform =
                    `translateX(-${state.index * (cardWidth + gap)}px)`;

            }
        );

    });

}


/* =========================================================
   INICIALIZAÇÃO DOS PRODUTOS
   ========================================================= */

function initProducts() {

    const featured =
        products.filter(
            product =>
                product.featured
        );


    const custom =
        products.filter(
            product =>
                product.category ===
                "Personalizados"
        );


    const cards =
        products.filter(
            product =>
                product.category ===
                "Cartões"
        );


    renderProductCarousel(
        "featuredCarousel",
        featured.length
            ? featured
            : products
    );


    renderProductCarousel(
        "customCarousel",
        custom.length
            ? custom
            : products.slice(0, 6)
    );


    renderProductCarousel(
        "cardsCarousel",
        cards.length
            ? cards
            : products.slice(0, 6)
    );

}


/* =========================================================
   PREVENÇÃO DE ERRO DE IMAGENS
   ========================================================= */

function initImageFallback() {

    document.addEventListener(
        "error",
        event => {

            const image =
                event.target;

            if (
                image &&
                image.tagName === "IMG"
            ) {

                image.classList.add(
                    "image-error"
                );

            }

        },
        true
    );

}


/* =========================================================
   APLICAÇÃO PRINCIPAL
   ========================================================= */

function initGodPrint() {

    console.log(
        "God Print — JavaScript iniciado."
    );


    initLoader();

    initHeader();

    initMobileMenu();

    initSmoothScroll();

    renderCategories();

    initProducts();

    initCarouselControls();

    initFavoritesPanel();

    initCartPanel();

    initBackdrop();

    initSearch();

    initCheckout();

    initBackTop();

    initReveal();

    initActiveNavigation();

    initKeyboard();

    initImageFallback();

    initResize();

}


/* =========================================================
   INICIAR QUANDO O DOM ESTIVER PRONTO
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initGodPrint
    );

} else {

    initGodPrint();

}