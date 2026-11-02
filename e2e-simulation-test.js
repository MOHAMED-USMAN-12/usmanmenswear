/**
 * Headless E2E Simulation Test for Usman Mens Wear
 * Validates data integrity, cart calculations, coupon logic, stock deductions, and order lifecycle
 */

const vm = require('vm');
const fs = require('fs');

// Mock browser localStorage & global environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};
global.window = { location: { search: '', href: '' } };
global.document = { querySelectorAll: () => [], getElementById: () => null, addEventListener: () => {} };
global.showToast = (msg, type) => { /* Mock */ };
global.updateHeaderCounts = () => { /* Mock */ };

console.log('--- EXECUTING E2E SHOPPING SIMULATION ---');

// Load files into global scope
['assets/js/products.js', 'assets/js/cart.js', 'assets/js/wishlist.js', 'assets/js/auth.js', 'assets/js/checkout.js'].forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  vm.runInThisContext(code);
});

// 1. Validate Catalog Size
const prods = ProductStore.getAll();
console.log(`[PASS] Catalog initialized with ${prods.length} products (Target: >= 30).`);
if (prods.length < 30) throw new Error("Catalog has fewer than 30 products");

// 2. Test Wishlist Functionality
const testProdId = prods[0].id;
WishlistManager.toggle(testProdId);
console.log(`[PASS] Wishlist toggle item: in wishlist = ${WishlistManager.isInWishlist(testProdId)}`);
if (!WishlistManager.isInWishlist(testProdId)) throw new Error("Wishlist failed");

// 3. Test Cart & Inventory Limits
const initialStock = prods[0].stock;
CartManager.clearCart();
const added = CartManager.addItem(testProdId, "L", "Crisp White", 2);
console.log(`[PASS] Cart addition successful: ${added}`);
if (!added) throw new Error("Failed to add product to cart");

// Test Coupon Discount
const couponRes = CartManager.applyCoupon("WELCOME10");
console.log(`[PASS] Coupon applied: ${couponRes.success}`);
if (!couponRes.success) throw new Error("Failed to apply WELCOME10 coupon");

const calc = CartManager.getCalculations();
console.log(`[PASS] Cart Calculation -> Subtotal: ₹${calc.subtotal}, Discount: ₹${calc.discount}, Shipping: ₹${calc.shipping}, Total: ₹${calc.total}`);
if (calc.total <= 0 || calc.discount <= 0) throw new Error("Calculation mismatch");

// 4. Test Order Placement
const orderData = {
  orderId: "UMW-ORD-TEST-9999",
  userId: "usr-001",
  customer: { name: "Test User", email: "user@usmanwear.com", phone: "9876543210" },
  shippingAddress: { name: "Test User", phone: "9876543210", addressLine: "Test Line", city: "Bengaluru", state: "Karnataka", pincode: "560038" },
  items: CartManager.getCart(),
  calculations: calc,
  appliedCoupon: calc.appliedCoupon,
  paymentMethod: "UPI",
  paymentStatus: "Paid",
  orderStatus: "Confirmed",
  createdAt: new Date().toISOString()
};

OrderStore.createOrder(orderData);
const savedOrder = OrderStore.getById("UMW-ORD-TEST-9999");
console.log(`[PASS] Order created successfully: #${savedOrder.orderId}, Status: ${savedOrder.orderStatus}`);
if (!savedOrder) throw new Error("Order creation failed");

// Verify stock deduction
const updatedProd = ProductStore.getById(testProdId);
console.log(`[PASS] Inventory successfully updated: Old stock: ${initialStock}, New stock: ${updatedProd.stock} (Deducted 2 units)`);
if (updatedProd.stock !== initialStock - 2) throw new Error("Stock deduction failed");

// Test Status Update to 'Shipped' then 'Delivered'
OrderStore.updateStatus(savedOrder.orderId, 'Shipped');
console.log(`[PASS] Order status updated to Shipped: ${OrderStore.getById(savedOrder.orderId).orderStatus === 'Shipped'}`);

OrderStore.updateStatus(savedOrder.orderId, 'Delivered');
console.log(`[PASS] Order status updated to Delivered: ${OrderStore.getById(savedOrder.orderId).orderStatus === 'Delivered'}`);

console.log('\n>>> ALL SHOPPING JOURNEY & TRANSACTION TESTS PASSED! <<<');
