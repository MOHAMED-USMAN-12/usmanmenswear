/**
 * Usman Mens Wear - Core Application Script
 * Global utilities, Search Autocomplete, Toast notifications, Header updates
 */

// Formatting currency to Indian Rupee (INR)
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Global Toast System
function showToast(message, type = 'gold') {
  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const typeClass = type === 'success' ? 'toast-success' : type === 'danger' ? 'toast-danger' : '';
  const iconClass = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-bag-check-fill';
  
  toast.className = `custom-toast ${typeClass}`;
  toast.innerHTML = `
    <i class="bi ${iconClass} custom-toast-icon"></i>
    <div class="custom-toast-msg">${message}</div>
    <button type="button" class="btn-close btn-close-sm" aria-label="Close" style="font-size: 0.7rem;"></button>
  `;

  container.appendChild(toast);

  // Close button click
  toast.querySelector('.btn-close').addEventListener('click', () => {
    toast.remove();
  });

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Update Header Counts (Cart & Wishlist)
function updateHeaderCounts() {
  try {
    const cart = JSON.parse(localStorage.getItem('umw_cart')) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartBadges = document.querySelectorAll('.header-cart-count');
    cartBadges.forEach(b => {
      b.textContent = cartCount;
      b.style.display = cartCount > 0 ? 'flex' : 'none';
    });

    const wishlist = JSON.parse(localStorage.getItem('umw_wishlist')) || [];
    const wishlistBadges = document.querySelectorAll('.header-wishlist-count');
    wishlistBadges.forEach(b => {
      b.textContent = wishlist.length;
      b.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  } catch (e) {
    console.error("Error updating counts:", e);
  }
}

// Autocomplete Search Functionality
function initLiveSearch() {
  const searchInputs = document.querySelectorAll('.site-search-input');
  
  searchInputs.forEach(input => {
    const parentContainer = input.closest('.search-container') || input.parentElement;
    let dropdown = parentContainer.querySelector('.search-results-dropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      parentContainer.appendChild(dropdown);
    }

    input.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('show');
        return;
      }

      const allProducts = ProductStore.getAll();
      const matched = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.categoryName.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.fabric && p.fabric.toLowerCase().includes(query))
      ).slice(0, 5);

      if (matched.length === 0) {
        dropdown.innerHTML = `
          <div class="p-3 text-center text-muted" style="font-size: 0.85rem;">
            No products found matching "<strong>${query}</strong>"
          </div>
        `;
      } else {
        dropdown.innerHTML = matched.map(p => `
          <a href="product-details.html?id=${p.id}" class="search-item">
            <img src="${p.images[0]}" alt="${p.name}">
            <div class="search-item-info">
              <h6>${p.name}</h6>
              <div class="price">${formatCurrency(p.price)} <small class="text-muted text-decoration-line-through">${formatCurrency(p.originalPrice)}</small></div>
            </div>
          </a>
        `).join('') + `
          <div class="p-2 text-center bg-light border-top">
            <a href="shop.html?search=${encodeURIComponent(query)}" class="text-dark fw-bold" style="font-size: 0.78rem;">
              View all results (${matched.length}+) <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        `;
      }
      dropdown.classList.add('show');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!parentContainer.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Submit on Enter
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

// Newsletter Subscription Handler
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Thank you! ${input.value} has been subscribed to Usman Mens Wear VIP offers.`, 'success');
        input.value = '';
      }
    });
  });
}

// Quick Pincode checker simulator
function checkDeliveryPincode(pincode) {
  const cleanPin = (pincode || '').trim();
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      valid: false,
      message: "Please enter a valid 6-digit Indian PIN code."
    };
  }

  // Realistic delivery estimation
  const metroPins = ['11', '40', '56', '60', '70', '50']; // Delhi, Mumbai, BLR, Chennai, Kol, Hyd
  const isMetro = metroPins.some(prefix => cleanPin.startsWith(prefix));
  
  return {
    valid: true,
    estimatedDays: isMetro ? "2 - 3 business days" : "4 - 6 business days",
    codAvailable: true,
    shippingFee: 0,
    message: `Delivery available to ${cleanPin}! Expected within ${isMetro ? '2-3' : '4-6'} business days. Cash on Delivery is eligible.`
  };
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderCounts();
  initLiveSearch();
  initNewsletter();
});

