/**
 * Usman Mens Wear - Cart Manager
 * Handles cart state, quantities, coupon discounts, calculations, and local storage persistence
 */

const CartManager = {
  CART_KEY: "umw_cart",
  COUPON_KEY: "umw_applied_coupon",

  getCart() {
    try {
      return JSON.parse(localStorage.getItem(this.CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    updateHeaderCounts();
  },

  addItem(productId, size, color, quantity = 1) {
    const product = ProductStore.getById(productId);
    if (!product) {
      showToast("Product not found.", "danger");
      return false;
    }

    if (product.stock < quantity) {
      showToast(`Only ${product.stock} units remaining in stock.`, "danger");
      return false;
    }

    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const newQty = cart[existingIndex].quantity + quantity;
      if (newQty > product.stock) {
        showToast(`Cannot add more. Reached maximum available stock (${product.stock}).`, "danger");
        return false;
      }
      cart[existingIndex].quantity = newQty;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.categoryName,
        size: size,
        color: color,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart(cart);
    showToast(`Added to Bag: ${product.name} (${size})`, "success");
    return true;
  },

  removeItem(productId, size, color) {
    let cart = this.getCart();
    cart = cart.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    );
    this.saveCart(cart);
    showToast("Item removed from your shopping bag.", "gold");
  },

  updateQuantity(productId, size, color, quantity) {
    const qty = parseInt(quantity, 10);
    const product = ProductStore.getById(productId);

    if (qty <= 0) {
      this.removeItem(productId, size, color);
      return;
    }

    if (product && qty > product.stock) {
      showToast(`Cannot exceed available stock of ${product.stock} items.`, "danger");
      return;
    }

    const cart = this.getCart();
    const item = cart.find(
      i => i.productId === productId && i.size === size && i.color === color
    );

    if (item) {
      item.quantity = qty;
      this.saveCart(cart);
    }
  },

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
    localStorage.removeItem(this.COUPON_KEY);
    updateHeaderCounts();
  },

  getAppliedCoupon() {
    try {
      return JSON.parse(localStorage.getItem(this.COUPON_KEY)) || null;
    } catch (e) {
      return null;
    }
  },

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    const coupons = ProductStore.getCoupons();
    const coupon = coupons.find(c => c.code === cleanCode && c.isActive);

    if (!coupon) {
      showToast("Invalid or expired coupon code.", "danger");
      return { success: false, message: "Invalid or expired coupon code." };
    }

    const calculations = this.getCalculations(false);
    if (calculations.subtotal < coupon.minOrderValue) {
      const msg = `Coupon ${coupon.code} requires a minimum order of ${formatCurrency(coupon.minOrderValue)}.`;
      showToast(msg, "danger");
      return { success: false, message: msg };
    }

    localStorage.setItem(this.COUPON_KEY, JSON.stringify(coupon));
    showToast(`Coupon "${coupon.code}" applied successfully!`, "success");
    return { success: true, coupon };
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    showToast("Coupon removed.", "gold");
  },

  getCalculations(includeCoupon = true) {
    const cart = this.getCart();
    let subtotal = 0;
    let originalSubtotal = 0;

    cart.forEach(item => {
      // Re-verify against latest catalog price to prevent tampering
      const freshProd = ProductStore.getById(item.productId);
      const unitPrice = freshProd ? freshProd.price : item.price;
      const originalPrice = freshProd ? freshProd.originalPrice : item.originalPrice;
      
      subtotal += unitPrice * item.quantity;
      originalSubtotal += originalPrice * item.quantity;
    });

    // Standard Shipping: Free for orders >= ₹1,499, else ₹100
    let shipping = subtotal >= 1499 || subtotal === 0 ? 0 : 100;
    let discount = 0;
    let appliedCoupon = includeCoupon ? this.getAppliedCoupon() : null;

    if (appliedCoupon && subtotal > 0) {
      if (subtotal >= appliedCoupon.minOrderValue) {
        if (appliedCoupon.isFreeShipping) {
          shipping = 0;
          discount = 100; // Free shipping subsidy
        } else if (appliedCoupon.discountPercent > 0) {
          discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
        } else if (appliedCoupon.discountAmount > 0) {
          discount = Math.min(appliedCoupon.discountAmount, subtotal);
        }
      } else {
        // Condition no longer met, drop coupon
        this.removeCoupon();
        appliedCoupon = null;
      }
    }

    const total = Math.max(0, subtotal - discount + (appliedCoupon && appliedCoupon.isFreeShipping ? 0 : shipping));
    const savings = Math.max(0, originalSubtotal - subtotal + discount);

    return {
      subtotal,
      originalSubtotal,
      shipping,
      discount,
      total,
      savings,
      appliedCoupon,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  renderCartPage() {
    const cart = this.getCart();
    const container = document.getElementById('cartPageContainer');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="empty-state-box">
            <i class="bi bi-bag-x empty-state-icon"></i>
            <h3 class="mb-3">Your Shopping Bag is Empty</h3>
            <p class="text-muted mb-4">Discover the finest men's formalwear, linen shirts, and handcrafted denim.</p>
            <a href="shop.html" class="btn btn-luxury-primary">
              <i class="bi bi-arrow-left"></i> Explore Catalog
            </a>
          </div>
        </div>
      `;
      return;
    }

    const calc = this.getCalculations();

    const itemsHtml = cart.map(item => `
      <tr>
        <td data-label="Product">
          <div class="cart-item-card">
            <a href="product-details.html?id=${item.productId}">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            </a>
            <div class="cart-item-details">
              <span class="text-muted text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.05em;">${item.category}</span>
              <h6><a href="product-details.html?id=${item.productId}">${item.name}</a></h6>
              <div class="cart-item-meta">
                <span class="badge bg-light text-dark border me-1">Size: ${item.size}</span>
                <span class="badge bg-light text-dark border">Color: ${item.color}</span>
              </div>
              <div class="d-md-none mt-2 fw-bold text-dark">${formatCurrency(item.price)}</div>
            </div>
          </div>
        </td>
        <td data-label="Price" class="d-none d-md-table-cell fw-bold">
          ${formatCurrency(item.price)}
          ${item.originalPrice ? `<div class="text-muted text-decoration-line-through small">${formatCurrency(item.originalPrice)}</div>` : ''}
        </td>
        <td data-label="Quantity">
          <div class="qty-control">
            <button class="qty-btn btn-cart-dec" data-id="${item.productId}" data-size="${item.size}" data-color="${item.color}">-</button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-btn btn-cart-inc" data-id="${item.productId}" data-size="${item.size}" data-color="${item.color}">+</button>
          </div>
        </td>
        <td data-label="Subtotal" class="fw-bold">
          ${formatCurrency(item.price * item.quantity)}
        </td>
        <td data-label="Action" class="text-end">
          <button class="btn btn-sm text-danger btn-cart-remove" data-id="${item.productId}" data-size="${item.size}" data-color="${item.color}" title="Remove Item">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </td>
      </tr>
    `).join('');

    const summaryHtml = `
      <div class="cart-summary-card">
        <h5 class="cart-summary-title">Order Summary</h5>
        
        <div class="summary-row">
          <span>Bag Subtotal (${calc.itemCount} items)</span>
          <span>${formatCurrency(calc.subtotal)}</span>
        </div>

        ${calc.discount > 0 ? `
          <div class="summary-row text-success">
            <span>Coupon Discount</span>
            <span>- ${formatCurrency(calc.discount)}</span>
          </div>
        ` : ''}

        <div class="summary-row">
          <span>Standard Delivery</span>
          <span>${calc.shipping === 0 ? '<strong class="text-success">FREE</strong>' : formatCurrency(calc.shipping)}</span>
        </div>

        ${calc.shipping > 0 ? `
          <div class="alert alert-light border p-2 small text-muted mb-3" style="font-size: 0.76rem;">
            <i class="bi bi-info-circle text-accent"></i> Add <strong>${formatCurrency(1499 - calc.subtotal)}</strong> more to unlock <strong>FREE Delivery</strong>!
          </div>
        ` : ''}

        <div class="summary-row total">
          <span>Total Amount</span>
          <span>${formatCurrency(calc.total)}</span>
        </div>

        ${calc.savings > 0 ? `
          <div class="alert alert-success py-2 px-3 small mt-2 mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-stars"></i>
            <span>You are saving <strong>${formatCurrency(calc.savings)}</strong> on this order!</span>
          </div>
        ` : ''}

        <!-- Coupon Application Form -->
        <div class="mt-4 pt-3 border-top">
          <label class="form-label fw-bold text-uppercase small">Apply Coupon Code</label>
          ${calc.appliedCoupon ? `
            <div class="coupon-applied-pill">
              <div>
                <strong>${calc.appliedCoupon.code}</strong> applied
                <div class="small text-muted">${calc.appliedCoupon.description}</div>
              </div>
              <button class="btn btn-sm btn-outline-danger py-0 px-2" id="btnRemoveCoupon">Remove</button>
            </div>
          ` : `
            <div class="coupon-box">
              <input type="text" id="couponCodeInput" placeholder="Enter coupon code (e.g. WELCOME10)">
              <button class="btn btn-luxury-primary py-2 px-3" id="btnApplyCoupon">Apply</button>
            </div>
            <div class="d-flex gap-2 flex-wrap mb-3">
              <span class="badge bg-light text-dark border cursor-pointer coupon-demo-tag" data-code="WELCOME10">WELCOME10</span>
              <span class="badge bg-light text-dark border cursor-pointer coupon-demo-tag" data-code="SAVE200">SAVE200</span>
              <span class="badge bg-light text-dark border cursor-pointer coupon-demo-tag" data-code="FREESHIP">FREESHIP</span>
            </div>
          `}
        </div>

        <a href="checkout.html" class="btn btn-luxury-gold w-100 py-3 mt-3 fw-bold">
          Proceed to Checkout <i class="bi bi-arrow-right"></i>
        </a>

        <div class="text-center mt-3">
          <a href="shop.html" class="small text-muted"><i class="bi bi-arrow-left"></i> Continue Shopping</a>
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="col-lg-8 mb-4">
        <div class="cart-table-card">
          <table class="table cart-table align-middle mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th class="text-end">Remove</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-4">
        ${summaryHtml}
      </div>
    `;

    // Event Listeners for Cart Actions
    container.querySelectorAll('.btn-cart-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        const color = btn.getAttribute('data-color');
        const item = cart.find(i => i.productId === id && i.size === size && i.color === color);
        if (item) {
          CartManager.updateQuantity(id, size, color, item.quantity + 1);
          CartManager.renderCartPage();
        }
      });
    });

    container.querySelectorAll('.btn-cart-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        const color = btn.getAttribute('data-color');
        const item = cart.find(i => i.productId === id && i.size === size && i.color === color);
        if (item) {
          CartManager.updateQuantity(id, size, color, item.quantity - 1);
          CartManager.renderCartPage();
        }
      });
    });

    container.querySelectorAll('.btn-cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        const color = btn.getAttribute('data-color');
        CartManager.removeItem(id, size, color);
        CartManager.renderCartPage();
      });
    });

    const applyBtn = document.getElementById('btnApplyCoupon');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const code = document.getElementById('couponCodeInput').value;
        const res = CartManager.applyCoupon(code);
        if (res.success) {
          CartManager.renderCartPage();
        }
      });
    }

    const removeBtn = document.getElementById('btnRemoveCoupon');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        CartManager.removeCoupon();
        CartManager.renderCartPage();
      });
    }

    container.querySelectorAll('.coupon-demo-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const codeInput = document.getElementById('couponCodeInput');
        if (codeInput) {
          codeInput.value = tag.getAttribute('data-code');
        }
      });
    });
  }
};

