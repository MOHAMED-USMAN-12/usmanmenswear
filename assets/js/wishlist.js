/**
 * Usman Mens Wear - Wishlist Manager
 * Handles wishlist items, move to cart, and local storage persistence
 */

const WishlistManager = {
  WISHLIST_KEY: "umw_wishlist",

  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(this.WISHLIST_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(list) {
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
    updateHeaderCounts();
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggle(productId) {
    let list = this.getWishlist();
    const product = ProductStore.getById(productId);
    const prodName = product ? product.name : "Product";

    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
      this.saveWishlist(list);
      showToast(`Removed from Wishlist: ${prodName}`, "gold");
      return false;
    } else {
      list.push(productId);
      this.saveWishlist(list);
      showToast(`Saved to Wishlist: ${prodName}`, "success");
      return true;
    }
  },

  remove(productId) {
    let list = this.getWishlist();
    list = list.filter(id => id !== productId);
    this.saveWishlist(list);
    showToast("Product removed from wishlist.", "gold");
  },

  moveToCart(productId, size, color) {
    const product = ProductStore.getById(productId);
    if (!product) return;

    const chosenSize = size || product.sizes[0];
    const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");

    const added = CartManager.addItem(productId, chosenSize, chosenColor, 1);
    if (added) {
      this.remove(productId);
    }
  },

  renderWishlistPage() {
    const container = document.getElementById('wishlistContainer');
    if (!container) return;

    const listIds = this.getWishlist();
    const products = listIds.map(id => ProductStore.getById(id)).filter(Boolean);

    if (products.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="empty-state-box">
            <i class="bi bi-heart empty-state-icon"></i>
            <h3 class="mb-3">Your Wishlist is Empty</h3>
            <p class="text-muted mb-4">Save your favorite luxury items and build your sartorial wardrobe.</p>
            <a href="shop.html" class="btn btn-luxury-primary">
              <i class="bi bi-compass"></i> Explore Collection
            </a>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => `
      <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="product-card">
          <div class="product-thumb">
            <a href="product-details.html?id=${product.id}">
              <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </a>
            <button class="btn-wishlist active" data-id="${product.id}" title="Remove from wishlist">
              <i class="bi bi-heart-fill text-danger"></i>
            </button>
            <div class="product-badges">
              ${product.discount > 0 ? `<span class="tag-badge badge-sale">${product.discount}% OFF</span>` : ''}
            </div>
          </div>
          <div class="product-details-content">
            <div class="product-category-brand">${product.brand}</div>
            <h6 class="product-title">
              <a href="product-details.html?id=${product.id}">${product.name}</a>
            </h6>
            <div class="product-price-row mb-3">
              <span class="current-price">${formatCurrency(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
            </div>
            <button class="btn btn-luxury-primary w-100 btn-move-cart" data-id="${product.id}" data-size="${product.sizes[0]}" data-color="${product.colors[0]?.name || ''}">
              <i class="bi bi-bag-plus"></i> Move to Bag
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Remove handlers
    container.querySelectorAll('.btn-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        WishlistManager.remove(id);
        WishlistManager.renderWishlistPage();
      });
    });

    // Move to cart handlers
    container.querySelectorAll('.btn-move-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        const color = btn.getAttribute('data-color');
        WishlistManager.moveToCart(id, size, color);
        WishlistManager.renderWishlistPage();
      });
    });
  }
};

