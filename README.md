# Usman Mens Wear — Premium E-Commerce Website

An artisanal, commercial-grade fashion e-commerce platform built with **HTML5, CSS3, Bootstrap 5, Vanilla JavaScript, jQuery, and PostgreSQL (Supabase schema)**.

---

## 1. Project Overview & Brand Identity

- **Brand Name:** Usman Mens Wear
- **Brand Aesthetic:** Contemporary Sartorial Luxury
- **Palette:** 
  - Primary: Charcoal Black (`#171717`)
  - Secondary: Crisp White (`#FFFFFF`)
  - Background: Alabaster Off-White (`#F8F7F4`)
  - Accent: Luxury Gold (`#C6A15B`)
  - Typography: *Playfair Display* (Editorial Serif Headings) + *Plus Jakarta Sans* (Body & Micro-copy)

---

## 2. Directory Structure

```
usman-mens-wear/
│
├── index.html               # Luxury Homepage (Hero, Categories, Trending, New, Best Sellers, Newsletter)
├── shop.html                # Product Catalog with Multi-filtering, Sorting, Pagination, Live Search
├── product-details.html     # Dynamic PDP (Thumbnails, Zoom, Size/Color Selectors, PIN Checker, Reviews)
├── cart.html                # Full Cart Drawer/Table, Live Totals, Coupons, Stock Limit Enforcement
├── checkout.html            # Express Multi-step Checkout (Address, Shipping Carrier, UPI/Card/COD)
├── login.html               # Customer & Admin Sign In (1-Click Demo Fillers included)
├── register.html            # New Customer Registration with Form Validation
├── wishlist.html            # Wishlist Manager (Move to Bag, Remove, LocalStorage Sync)
├── my-account.html          # Profile Management, Multiple Saved Addresses (Add/Delete/Default)
├── my-orders.html           # Customer Order History (Active, Delivered, Cancelled Filter Tabs)
├── order-details.html       # Visual 4-Stage Tracking Timeline, Itemized Snapshot, Printable Invoice
├── about.html               # Atelier Story, Sourcing Ethics, Egyptian & Supima Cotton Standards
├── contact.html             # Customer Concierge Inquiry Form & FAQ Accordion
├── privacy-policy.html      # PCI-DSS Data Compliance & Zero Card Storage Statement
├── return-policy.html       # 7-Day Doorstep Exchange & Refund Policy
│
├── admin/                   # Administrative Suite
│   ├── index.html           # Admin Gate & Authentication
│   ├── dashboard.html       # Metrics KPIs, Chart.js Revenue Line & Category Doughnut Charts
│   ├── products.html        # Product CRUD Management Table, Search, Category Filter, Delete
│   ├── add-product.html     # Add / Edit Product Form with Live Image Preview & Spec Inputs
│   ├── orders.html          # Order Management with Live Fulfilment Status Updater
│   ├── customers.html       # Customer Directory, Lifetime Value & Order Frequency Stats
│   ├── inventory.html       # Real-time Stock Adjustment Table with Low-Stock Badges
│   └── coupons.html         # Promotional Voucher Creator & Active Status Switcher
│
├── assets/
│   ├── css/
│   │   ├── style.css        # Luxury Design System, Product Cards, Buttons, Toasts
│   │   ├── responsive.css   # Mobile (360px-390px), Tablet, Desktop Media Queries
│   │   └── admin.css        # Modern Admin Panel Styling, Sidebar, Metric Cards
│   └── js/
│       ├── products.js      # 36 Realistic Fashion Products, Variants & Coupons Catalog
│       ├── main.js          # Currency Formatter (INR), Autocomplete Search, Header Badges, Toasts
│       ├── cart.js          # Cart Logic, Inventory Verification, Coupons, Free Delivery
│       ├── wishlist.js      # Wishlist Operations & Cart Transfer
│       ├── auth.js          # Authentication State, Session Management, Address Book
│       ├── checkout.js      # Checkout Steps, Address Selection, Order Creation, Stock Deductions
│       └── admin.js         # Admin KPIs, Chart.js Charts, Orders & Inventory Sync
│
├── schema.sql               # PostgreSQL / Supabase Schema (18 Tables, Foreign Keys, Indexes, RLS)
├── test-site.js             # Automated HTML/CSS/JS Link and File Integrity Validator
├── e2e-simulation-test.js   # Automated Headless E2E Shopping & Transaction Lifecycle Test
└── README.md                # Technical Documentation & Deployment Guide
```

---

## 3. Key Functionality & Modules

### A. Dynamic Product Catalog (36 Items)
- **Categories:** Formal Shirts, Casual Linen Shirts, Supima Polo T-Shirts, Heavyweight Graphic Tees, Selvedge Denim Jeans, Formal Pleated Trousers, Casual Chinos, and Luxury Leather Accessories.
- **Attributes:** Unique SKUs, dual prices with discount percentage, multiple sizes (`S`, `M`, `L`, `XL`, `XXL` or waist `30`–`38`), color swatches, stock count, fabric composition, and care tips.

### B. Catalog Filtering & Search (`shop.html`)
- Multi-dimensional filters that work seamlessly together:
  - **Category Filter** (Radio buttons with live product count)
  - **Price Range Slider** (Interactive slider up to ₹4,500)
  - **Size Selector** (Multi-size toggles)
  - **Stock Filter** (In-Stock only checkbox)
  - **Sorting** (Popularity, Price Low to High, Price High to Low, Newest, Discount)
  - **Live Autocomplete Search** (Predictive dropdown with image thumbnails and direct links)
  - **Active Filter Pills** with 1-click removal

### C. Product Details & Variants (`product-details.html`)
- Interactive image gallery with thumbnail clicks and cursor zoom.
- Mandatory size selection validation before adding to bag.
- Variant color selector that updates the label.
- Quantity controller that prevents exceeding available warehouse inventory.
- Real-time Indian PIN code delivery checker (estimates delivery duration and COD availability).
- Sartorial Size Measurement Chart Modal.
- 1-click "Add to Bag" and "Buy Now".

### D. Cart & Coupon Engine (`cart.html`)
- Automatic subtotal calculation re-verified against catalog data to prevent client-side price tampering.
- Free shipping threshold logic (Free above ₹1,499; otherwise ₹100 standard shipping).
- Working Coupon Codes:
  - `WELCOME10`: 10% discount on orders above ₹999.
  - `SAVE200`: Flat ₹200 discount on orders above ₹1,499.
  - `FREESHIP`: 100% shipping subsidy on orders above ₹799.
  - `LUXURY25`: 25% discount on orders above ₹2,999.

### E. Checkout & Order Generation (`checkout.html`)
- Multi-step validation: Full name, 10-digit mobile, email, address, city, state, 6-digit PIN.
- Logged-in customer address selection with automatic pre-fill.
- Simulated payment options: **UPI** (QR & VPA), **Credit/Debit Cards** (Visa/Mastercard/RuPay), **Net Banking**, and **Cash on Delivery (COD)**.
- Generates unique order numbers (e.g. `UMW-ORD-202611-8931`) with immutable item snapshots.
- **Automatic inventory deduction**: Subtracts purchased units from product stock across the catalog.

### F. Customer Dashboard (`my-account.html` & `my-orders.html`)
- Profile updating (Name, Mobile).
- Address book: Add new delivery address, set default, and delete.
- Order tracking with visual 4-stage progression (`Order Placed` &rarr; `Packed & QC` &rarr; `Shipped` &rarr; `Delivered`).
- Printable invoice receipt (`window.print()`).
- Cancellation and 7-day return request workflows.

### G. Administrative Dashboard (`admin/`)
- Protected access gate with session verification.
- Real-time KPI counters: Total Sales (₹), Total Orders, Total Customers, Low Stock Alerts.
- Chart.js Monthly Sales Revenue Line Chart and Category Distribution Doughnut Chart.
- Products Manager: Edit details, add new products with live image preview, delete from catalog.
- Orders Manager: Real-time fulfilment status dropdown (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
- Inventory Manager: Live inline stock adjusters with low-stock warnings.
- Coupons Manager: Create percentage or flat discount vouchers with minimum order limits.

---

## 4. Test Credentials

### Customer Account
- **Email:** `user@usmanwear.com`
- **Password:** `user123`
- *Or use the "Customer Demo" button on `login.html` for 1-click login.*

### Administrator Account
- **Email:** `admin@usmanwear.com`
- **Password:** `admin123`
- *Or use the "Admin Demo" button on `admin/index.html`.*

---

## 5. How to Run the Website Locally

Since the application uses standard frontend web technologies (HTML5, CSS3, JavaScript, Bootstrap 5 CDN, and jQuery CDN), **no compilation or bundler build step is required**.

### Option 1: Any Local HTTP Server
Run any lightweight static server in the root folder:

```bash
# Using Node.js (npx)
npx serve .

# Or using Python (if installed)
python -m http.server 8080

# Or using PHP (if installed)
php -S localhost:8080
```
Then open your browser at `http://localhost:8080`.

### Option 2: Direct File Open
You can directly double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

---

## 6. Verification & Automated Test Report

Two automated test suites are included in the repository:

### Test 1: Static Asset & Link Integrity Check
Validates all 23 HTML files, links, scripts, and CSS stylesheets:
```bash
node test-site.js
```
**Result:**
```
--- USMAN MENS WEAR INTEGRITY AUDIT ---
>>> SUCCESS: All 23 HTML pages, 3 CSS stylesheets, 7 JS engines, and schema.sql passed 100% integrity validation! <<<
```

### Test 2: Headless E2E Shopping Lifecycle Simulation
Simulates catalog loading, cart additions, variant validations, coupon calculation, order placement, stock deduction, and status updates:
```bash
node e2e-simulation-test.js
```
**Result:**
```
--- EXECUTING E2E SHOPPING SIMULATION ---
[PASS] Catalog initialized with 36 products (Target: >= 30).
[PASS] Wishlist toggle item: in wishlist = true
[PASS] Cart addition successful: true
[PASS] Coupon applied: true
[PASS] Cart Calculation -> Subtotal: ₹3798, Discount: ₹380, Shipping: ₹0, Total: ₹3418
[PASS] Order created successfully: #UMW-ORD-TEST-9999, Status: Confirmed
[PASS] Inventory successfully updated: Old stock: 28, New stock: 26 (Deducted 2 units)
[PASS] Order status updated to Shipped: true
[PASS] Order status updated to Delivered: true

>>> ALL SHOPPING JOURNEY & TRANSACTION TESTS PASSED! <<<
```

---

## 7. Production Database & Backend Setup (Supabase / PostgreSQL)

A complete production schema with all **18 requested tables** is included in `schema.sql`:
1. `profiles`
2. `categories`
3. `products`
4. `product_images`
5. `product_variants`
6. `inventory_logs`
7. `addresses`
8. `carts`
9. `cart_items`
10. `wishlists`
11. `coupons`
12. `orders`
13. `order_items`
14. `payments`
15. `shipments`
16. `reviews`
17. `returns`

### Setting Up Supabase:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste the contents of `schema.sql` and click **Run**.
4. All tables, foreign key relationships, indexes, and Row Level Security (RLS) policies will be provisioned.
5. In production, configure Supabase Auth (Email/Password or Phone OTP).

---

## 8. Payment Gateway Integration Guide (Production)

For this development build, an interactive simulation mode is enabled to let testers test UPI, Credit Cards, Net Banking, and COD without charging real cards.

### To Enable Live Razorpay / UPI in Production:
1. Register for an account on [razorpay.com](https://razorpay.com).
2. Add the Razorpay Checkout script in `checkout.html`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
3. Create a serverless endpoint (e.g. Supabase Edge Function or Node.js `/api/create-razorpay-order`) that uses your secret key to create an order:
   ```javascript
   const order = await razorpay.orders.create({
     amount: payableAmount * 100, // amount in paise
     currency: "INR",
     receipt: orderId
   });
   ```
4. On payment completion, verify the signature on your server (`razorpay_signature` HMAC SHA256) before marking `order_status = 'Confirmed'` in PostgreSQL.

---

## 9. Deployment Instructions

### Vercel / Netlify / GitHub Pages
Because the website is built with clean static frontend code (HTML, CSS, JS, Bootstrap CDN), it can be deployed with zero build configuration:
1. Push the repository to GitHub.
2. Link the repository to **Vercel** or **Netlify**.
3. Set the **Build Command** to empty (None) and the **Publish Directory** to `.`.
4. The website will be live globally on HTTPS with CDN edge caching.

---

© 2026 Usman Mens Wear Private Limited. All rights reserved.

