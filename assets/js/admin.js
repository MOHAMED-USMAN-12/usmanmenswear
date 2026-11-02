/**
 * Usman Mens Wear - Admin Dashboard Script
 * Handles metrics, Chart.js integrations, Product/Order/Inventory/Coupon management
 */

const AdminController = {
  initDashboard() {
    this.renderStats();
    this.initCharts();
    this.renderRecentOrders();
    this.renderLowStockList();
  },

  renderStats() {
    const orders = OrderStore.getAll();
    const products = ProductStore.getAll();
    const users = AuthManager.getAllUsers().filter(u => u.role !== 'admin');

    const totalSales = orders
      .filter(o => o.orderStatus !== 'Cancelled')
      .reduce((sum, o) => sum + (o.calculations?.total || 0), 0);

    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
    const lowStockCount = products.filter(p => p.stock <= 15).length;

    if (document.getElementById('statTotalSales')) document.getElementById('statTotalSales').textContent = formatCurrency(totalSales);
    if (document.getElementById('statTotalOrders')) document.getElementById('statTotalOrders').textContent = orders.length;
    if (document.getElementById('statTotalCustomers')) document.getElementById('statTotalCustomers').textContent = users.length + 18; // Includes offline guest customers
    if (document.getElementById('statTotalProducts')) document.getElementById('statTotalProducts').textContent = products.length;
    if (document.getElementById('statPendingOrders')) document.getElementById('statPendingOrders').textContent = pendingOrders;
    if (document.getElementById('statLowStock')) document.getElementById('statLowStock').textContent = lowStockCount;
  },

  initCharts() {
    // Sales Revenue Chart
    const salesCanvas = document.getElementById('salesChart');
    if (salesCanvas && typeof Chart !== 'undefined') {
      new Chart(salesCanvas, {
        type: 'line',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
          datasets: [{
            label: 'Sales Revenue (₹)',
            data: [42000, 68000, 85000, 112000, 145000, 189000, 215000],
            borderColor: '#C6A15B',
            backgroundColor: 'rgba(198, 161, 91, 0.1)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#171717',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              grid: { color: '#E5E7EB' },
              ticks: {
                callback: (val) => '₹' + (val / 1000) + 'k'
              }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Category Distribution Chart
    const catCanvas = document.getElementById('categoryChart');
    if (catCanvas && typeof Chart !== 'undefined') {
      new Chart(catCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Formal Shirts', 'Casual Shirts', 'Polo T-Shirts', 'Jeans', 'Trousers', 'Accessories'],
          datasets: [{
            data: [30, 22, 18, 15, 10, 5],
            backgroundColor: ['#171717', '#C6A15B', '#4B5563', '#9CA3AF', '#D1D5DB', '#E5E7EB'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { boxWidth: 12, font: { size: 11 } }
            }
          }
        }
      });
    }
  },

  renderRecentOrders() {
    const tableBody = document.getElementById('adminRecentOrdersBody');
    if (!tableBody) return;

    const orders = OrderStore.getAll().slice(0, 5);
    tableBody.innerHTML = orders.map(o => `
      <tr>
        <td><strong><a href="orders.html?id=${o.orderId}">${o.orderId}</a></strong></td>
        <td>${o.customer?.name || 'Customer'}</td>
        <td>${new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
        <td class="fw-bold">${formatCurrency(o.calculations?.total || 0)}</td>
        <td>${this.getStatusBadge(o.orderStatus)}</td>
      </tr>
    `).join('');
  },

  renderLowStockList() {
    const container = document.getElementById('adminLowStockList');
    if (!container) return;

    const lowStockProds = ProductStore.getAll().filter(p => p.stock <= 15).slice(0, 5);
    if (lowStockProds.length === 0) {
      container.innerHTML = '<div class="text-muted p-3">All products are healthy in inventory.</div>';
      return;
    }

    container.innerHTML = lowStockProds.map(p => `
      <div class="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div class="d-flex align-items-center gap-3">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 44px; height: 55px; object-fit: cover; border-radius: 3px;">
          <div>
            <h6 class="mb-0 text-truncate" style="max-width: 180px; font-size: 0.85rem;">${p.name}</h6>
            <div class="small text-muted">SKU: ${p.sku}</div>
          </div>
        </div>
        <div>
          <span class="badge ${p.stock <= 5 ? 'bg-danger' : 'bg-warning text-dark'}">${p.stock} left</span>
        </div>
      </div>
    `).join('');
  },

  getStatusBadge(status) {
    const s = (status || 'Pending').toLowerCase();
    return `<span class="badge-status status-${s}">${status}</span>`;
  },

  // Products Page Controller
  initProductsPage() {
    this.renderProductsTable();

    const searchInput = document.getElementById('adminProductSearch');
    const categoryFilter = document.getElementById('adminCategoryFilter');

    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderProductsTable());
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => this.renderProductsTable());
    }
  },

  renderProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    let products = ProductStore.getAll();
    const query = document.getElementById('adminProductSearch')?.value.trim().toLowerCase() || '';
    const cat = document.getElementById('adminCategoryFilter')?.value || '';

    if (query) {
      products = products.filter(p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query));
    }
    if (cat) {
      products = products.filter(p => p.category === cat);
    }

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 44px; height: 56px; object-fit: cover; border-radius: 3px;">
            <div>
              <strong class="d-block text-dark">${p.name}</strong>
              <small class="text-muted">${p.brand}</small>
            </div>
          </div>
        </td>
        <td><code>${p.sku}</code></td>
        <td><span class="badge bg-light text-dark border">${p.categoryName}</span></td>
        <td class="fw-bold">${formatCurrency(p.price)}</td>
        <td>
          <span class="badge ${p.stock <= 5 ? 'bg-danger' : p.stock <= 15 ? 'bg-warning text-dark' : 'bg-success'}">
            ${p.stock} units
          </span>
        </td>
        <td><span class="badge bg-dark">${p.status || 'Active'}</span></td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary btn-edit-product me-1" data-id="${p.id}" title="Edit Product">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger btn-delete-product" data-id="${p.id}" title="Delete Product">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');

    // Delete event
    tbody.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm("Are you sure you want to remove this product from catalog?")) {
          ProductStore.deleteProduct(id);
          showToast("Product deleted successfully.", "gold");
          this.renderProductsTable();
        }
      });
    });

    // Edit event (redirects to add-product.html?edit=id)
    tbody.querySelectorAll('.btn-edit-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        window.location.href = `add-product.html?edit=${id}`;
      });
    });
  },

  // Orders Page Controller
  initOrdersPage() {
    this.renderOrdersTable();
    const filterStatus = document.getElementById('adminOrderStatusFilter');
    if (filterStatus) {
      filterStatus.addEventListener('change', () => this.renderOrdersTable());
    }
  },

  renderOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    let orders = OrderStore.getAll();
    const filterStatus = document.getElementById('adminOrderStatusFilter')?.value || '';

    if (filterStatus) {
      orders = orders.filter(o => o.orderStatus === filterStatus);
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${o.orderId}</strong></td>
        <td>
          <div><strong>${o.customer?.name || 'Customer'}</strong></div>
          <small class="text-muted">${o.customer?.phone || ''} | ${o.customer?.email || ''}</small>
        </td>
        <td>${new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
        <td>${o.items?.length || 0} items</td>
        <td class="fw-bold">${formatCurrency(o.calculations?.total || 0)}</td>
        <td><span class="badge bg-light text-dark border">${o.paymentMethod}</span></td>
        <td>
          <select class="form-select form-select-sm order-status-select" data-id="${o.orderId}" style="width: 140px;">
            <option value="Pending" ${o.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${o.orderStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${o.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.order-status-select').forEach(select => {
      select.addEventListener('change', function() {
        const orderId = this.getAttribute('data-id');
        const newStatus = this.value;
        OrderStore.updateStatus(orderId, newStatus);
        showToast(`Order ${orderId} updated to "${newStatus}"`, "success");
      });
    });
  },

  // Inventory Page Controller
  initInventoryPage() {
    this.renderInventoryTable();
  },

  renderInventoryTable() {
    const tbody = document.getElementById('adminInventoryTableBody');
    if (!tbody) return;

    const products = ProductStore.getAll();

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 40px; height: 50px; object-fit: cover; border-radius: 3px;">
            <div>
              <strong>${p.name}</strong>
              <div class="small text-muted">SKU: ${p.sku} | ${p.categoryName}</div>
            </div>
          </div>
        </td>
        <td>${p.sizes?.join(', ')}</td>
        <td class="fw-bold">${p.stock}</td>
        <td>
          <span class="badge ${p.stock === 0 ? 'bg-danger' : p.stock <= 10 ? 'bg-warning text-dark' : 'bg-success'}">
            ${p.stock === 0 ? 'Out of Stock' : p.stock <= 10 ? 'Low Stock' : 'Adequate'}
          </span>
        </td>
        <td>
          <div class="input-group input-group-sm" style="max-width: 140px;">
            <input type="number" class="form-control stock-input" value="${p.stock}" min="0" data-id="${p.id}">
            <button class="btn btn-outline-dark btn-save-stock" data-id="${p.id}">Save</button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-save-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const input = tbody.querySelector(`.stock-input[data-id="${id}"]`);
        if (input) {
          const val = parseInt(input.value, 10);
          ProductStore.updateStock(id, val);
          showToast(`Stock updated for ${id}`, "success");
          this.renderInventoryTable();
        }
      });
    });
  },

  // Coupons Page Controller
  initCouponsPage() {
    this.renderCouponsTable();

    const form = document.getElementById('adminCouponForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('couponCode').value.trim().toUpperCase();
        const type = document.getElementById('couponType').value;
        const value = parseInt(document.getElementById('couponValue').value, 10);
        const minOrder = parseInt(document.getElementById('couponMinOrder').value, 10);
        const desc = document.getElementById('couponDesc').value.trim();

        if (!code || isNaN(value)) {
          showToast("Please provide coupon code and value.", "danger");
          return;
        }

        const newCoupon = {
          code: code,
          discountPercent: type === 'percent' ? value : 0,
          discountAmount: type === 'fixed' ? value : 0,
          minOrderValue: minOrder || 0,
          description: desc || `${code} discount voucher`,
          expiryDate: "2027-12-31",
          isActive: true
        };

        ProductStore.saveCoupon(newCoupon);
        showToast(`Coupon ${code} created successfully!`, "success");
        form.reset();
        this.renderCouponsTable();
      });
    }
  },

  renderCouponsTable() {
    const tbody = document.getElementById('adminCouponsTableBody');
    if (!tbody) return;

    const coupons = ProductStore.getCoupons();

    tbody.innerHTML = coupons.map(c => `
      <tr>
        <td><code>${c.code}</code></td>
        <td>${c.discountPercent > 0 ? `${c.discountPercent}% OFF` : formatCurrency(c.discountAmount) + ' OFF'}</td>
        <td>${formatCurrency(c.minOrderValue)}</td>
        <td><small class="text-muted">${c.description}</small></td>
        <td><span class="badge ${c.isActive ? 'bg-success' : 'bg-secondary'}">${c.isActive ? 'Active' : 'Disabled'}</span></td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger btn-del-coupon" data-code="${c.code}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-del-coupon').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (confirm(`Delete coupon ${code}?`)) {
          ProductStore.deleteCoupon(code);
          showToast(`Coupon ${code} removed.`, "gold");
          this.renderCouponsTable();
        }
      });
    });
  }
};

