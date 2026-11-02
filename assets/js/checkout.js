/**
 * Usman Mens Wear - Checkout & Payment Simulation Manager
 * Handles multi-step checkout, address selection, payment validation, and order generation
 */

// Initial Seed Orders for demo
const INITIAL_ORDERS = [
  {
    orderId: "UMW-ORD-202611-8931",
    userId: "usr-001",
    customer: {
      name: "Usman Khan",
      email: "user@usmanwear.com",
      phone: "9876543210"
    },
    shippingAddress: {
      name: "Usman Khan",
      phone: "9876543210",
      addressLine: "Flat 402, Royal Residency, 12th Main Road, Indiranagar",
      landmark: "Near Defense Colony Park",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    items: [
      {
        productId: "prod-101",
        name: "Royal Oxford Classic White Formal Shirt",
        size: "L",
        color: "Crisp White",
        price: 1899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80"
      },
      {
        productId: "prod-501",
        name: "Kurabo Selvedge Raw Indigo Slim Denim",
        size: "34",
        color: "Raw Deep Indigo",
        price: 2999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
      }
    ],
    calculations: {
      subtotal: 4898,
      discount: 489,
      shipping: 0,
      total: 4409
    },
    appliedCoupon: {
      code: "WELCOME10",
      discountPercent: 10
    },
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    trackingId: "BLUEDART-EXP-940218",
    createdAt: "2026-10-30T10:15:00.000Z",
    estimatedDelivery: "2026-11-04"
  },
  {
    orderId: "UMW-ORD-202610-7219",
    userId: "usr-001",
    customer: {
      name: "Usman Khan",
      email: "user@usmanwear.com",
      phone: "9876543210"
    },
    shippingAddress: {
      name: "Usman Khan",
      phone: "9876543210",
      addressLine: "Level 6, Tech Park Towers, Whitefield",
      landmark: "Opposite Metro Station",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066"
    },
    items: [
      {
        productId: "prod-301",
        name: "Supima Mercerized Cotton Luxury Polo",
        size: "M",
        color: "Deep Navy",
        price: 1499,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80"
      }
    ],
    calculations: {
      subtotal: 2998,
      discount: 200,
      shipping: 0,
      total: 2798
    },
    appliedCoupon: {
      code: "SAVE200",
      discountAmount: 200
    },
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingId: "DELHIVERY-PR-552091",
    createdAt: "2026-10-24T14:30:00.000Z",
    deliveredAt: "2026-10-28T16:45:00.000Z"
  }
];

const OrderStore = {
  ORDERS_KEY: "umw_orders",

  init() {
    if (!localStorage.getItem(this.ORDERS_KEY)) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    }
  },

  getAll() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  },

  getById(orderId) {
    const orders = this.getAll();
    return orders.find(o => o.orderId.toUpperCase() === (orderId || '').toUpperCase()) || null;
  },

  getUserOrders(userId) {
    const orders = this.getAll();
    if (!userId) return [];
    return orders.filter(o => o.userId === userId);
  },

  createOrder(orderData) {
    const orders = this.getAll();
    orders.unshift(orderData);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));

    // Deduct inventory
    orderData.items.forEach(item => {
      const prod = ProductStore.getById(item.productId);
      if (prod) {
        ProductStore.updateStock(prod.id, Math.max(0, prod.stock - item.quantity));
      }
    });

    return orderData;
  },

  updateStatus(orderId, newStatus) {
    const orders = this.getAll();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.orderStatus = newStatus;
      if (newStatus === "Delivered") {
        order.deliveredAt = new Date().toISOString();
      }
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
      return order;
    }
    return null;
  }
};

OrderStore.init();

// Checkout Controller
const CheckoutManager = {
  initCheckoutPage() {
    const cart = CartManager.getCart();
    if (cart.length === 0) {
      window.location.href = "cart.html";
      return;
    }

    const calc = CartManager.getCalculations();
    this.renderOrderSummary(calc, cart);
    this.populateSavedAddresses();
    this.bindEvents(calc);
  },

  populateSavedAddresses() {
    const user = AuthManager.getCurrentUser();
    const container = document.getElementById('savedAddressesList');
    if (!container) return;

    if (user && user.addresses && user.addresses.length > 0) {
      container.innerHTML = `
        <label class="form-label fw-bold text-uppercase small text-muted mb-2">Select from Saved Addresses</label>
        <div class="row g-2 mb-3">
          ${user.addresses.map((addr, idx) => `
            <div class="col-md-6">
              <div class="card p-3 h-100 cursor-pointer border ${addr.isDefault ? 'border-primary bg-light' : ''} saved-addr-card" data-idx="${idx}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <strong>${addr.type} Address</strong>
                  ${addr.isDefault ? '<span class="badge bg-dark">Default</span>' : ''}
                </div>
                <div class="small text-dark fw-bold">${addr.name} - ${addr.phone}</div>
                <div class="small text-muted">${addr.addressLine}, ${addr.city}, ${addr.state} - ${addr.pincode}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Fill in default
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      this.fillAddressForm(defaultAddr);

      container.querySelectorAll('.saved-addr-card').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('.saved-addr-card').forEach(c => c.classList.remove('border-primary', 'bg-light'));
          card.classList.add('border-primary', 'bg-light');
          const idx = parseInt(card.getAttribute('data-idx'), 10);
          CheckoutManager.fillAddressForm(user.addresses[idx]);
        });
      });
    } else {
      container.innerHTML = '';
      if (user) {
        document.getElementById('checkoutName').value = user.name || '';
        document.getElementById('checkoutEmail').value = user.email || '';
        document.getElementById('checkoutPhone').value = user.phone || '';
      }
    }
  },

  fillAddressForm(addr) {
    if (!addr) return;
    if (document.getElementById('checkoutName')) document.getElementById('checkoutName').value = addr.name || '';
    if (document.getElementById('checkoutPhone')) document.getElementById('checkoutPhone').value = addr.phone || '';
    if (document.getElementById('checkoutAddress')) document.getElementById('checkoutAddress').value = addr.addressLine || '';
    if (document.getElementById('checkoutLandmark')) document.getElementById('checkoutLandmark').value = addr.landmark || '';
    if (document.getElementById('checkoutCity')) document.getElementById('checkoutCity').value = addr.city || '';
    if (document.getElementById('checkoutState')) document.getElementById('checkoutState').value = addr.state || '';
    if (document.getElementById('checkoutPincode')) document.getElementById('checkoutPincode').value = addr.pincode || '';
  },

  renderOrderSummary(calc, cart) {
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const summaryTotals = document.getElementById('checkoutSummaryTotals');

    if (summaryItems) {
      summaryItems.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center gap-3 py-2 border-bottom">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 62px; object-fit: cover; border-radius: 3px;">
          <div class="flex-grow-1">
            <h6 class="mb-0 text-truncate" style="max-width: 200px; font-size: 0.85rem;">${item.name}</h6>
            <div class="small text-muted">Qty: ${item.quantity} | Size: ${item.size}</div>
          </div>
          <div class="text-end fw-bold" style="font-size: 0.88rem;">
            ${formatCurrency(item.price * item.quantity)}
          </div>
        </div>
      `).join('');
    }

    if (summaryTotals) {
      summaryTotals.innerHTML = `
        <div class="summary-row">
          <span>Items Subtotal</span>
          <span>${formatCurrency(calc.subtotal)}</span>
        </div>
        ${calc.discount > 0 ? `
          <div class="summary-row text-success">
            <span>Coupon (${calc.appliedCoupon.code})</span>
            <span>- ${formatCurrency(calc.discount)}</span>
          </div>
        ` : ''}
        <div class="summary-row">
          <span>Standard Delivery</span>
          <span>${calc.shipping === 0 ? '<strong class="text-success">FREE</strong>' : formatCurrency(calc.shipping)}</span>
        </div>
        <div class="summary-row total">
          <span>Payable Amount</span>
          <span>${formatCurrency(calc.total)}</span>
        </div>
      `;
    }
  },

  bindEvents(calc) {
    const form = document.getElementById('checkoutForm');
    const placeOrderBtn = document.getElementById('btnPlaceOrder');

    // Payment method radio selection toggles details
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', function() {
        document.querySelectorAll('.payment-details-box').forEach(b => b.style.display = 'none');
        const targetBox = document.getElementById(`${this.value}DetailsBox`);
        if (targetBox) targetBox.style.display = 'block';
      });
    });

    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Form Validation
        const name = document.getElementById('checkoutName').value.trim();
        const email = document.getElementById('checkoutEmail').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        const address = document.getElementById('checkoutAddress').value.trim();
        const city = document.getElementById('checkoutCity').value.trim();
        const state = document.getElementById('checkoutState').value.trim();
        const pincode = document.getElementById('checkoutPincode').value.trim();
        const landmark = document.getElementById('checkoutLandmark') ? document.getElementById('checkoutLandmark').value.trim() : '';

        if (!name || !email || !phone || !address || !city || !state || !pincode) {
          showToast("Please fill in all required shipping address fields.", "danger");
          return;
        }

        if (!/^\d{10}$/.test(phone)) {
          showToast("Please enter a valid 10-digit mobile number.", "danger");
          return;
        }

        if (!/^\d{6}$/.test(pincode)) {
          showToast("Please enter a valid 6-digit Indian PIN code.", "danger");
          return;
        }

        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPayment) {
          showToast("Please select a payment method.", "danger");
          return;
        }

        const paymentMethod = selectedPayment.value;

        // Disable button to prevent duplicate submissions
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Processing Order...`;

        // Generate Order
        const user = AuthManager.getCurrentUser();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
        const newOrderId = `UMW-ORD-${dateStr}-${randomNum}`;

        const cart = CartManager.getCart();

        const orderData = {
          orderId: newOrderId,
          userId: user ? user.id : "guest-user",
          customer: { name, email, phone },
          shippingAddress: { name, phone, addressLine: address, landmark, city, state, pincode },
          items: cart,
          calculations: calc,
          appliedCoupon: calc.appliedCoupon,
          paymentMethod: paymentMethod,
          paymentStatus: paymentMethod === "COD" ? "Pending (Cash on Delivery)" : "Paid (Simulated)",
          orderStatus: "Confirmed",
          trackingId: `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}`,
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };

        // Save order & clear bag
        setTimeout(() => {
          OrderStore.createOrder(orderData);
          CartManager.clearCart();
          showToast("Order placed successfully!", "success");
          window.location.href = `order-details.html?id=${newOrderId}&success=true`;
        }, 1200);
      });
    }
  }
};

