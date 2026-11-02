const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'shop.html',
  'product-details.html',
  'cart.html',
  'checkout.html',
  'login.html',
  'register.html',
  'wishlist.html',
  'my-account.html',
  'my-orders.html',
  'order-details.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'return-policy.html',
  'admin/index.html',
  'admin/dashboard.html',
  'admin/products.html',
  'admin/add-product.html',
  'admin/orders.html',
  'admin/customers.html',
  'admin/inventory.html',
  'admin/coupons.html'
];

console.log('--- USMAN MENS WEAR INTEGRITY AUDIT ---');

let hasErrors = false;

// 1. Verify all HTML files exist
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${file}`);
    hasErrors = true;
  } else {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.length < 100) {
      console.error(`FILE TOO SHORT: ${file}`);
      hasErrors = true;
    }
    
    // Check actual <script src="..."> tags (not template literals)
    const scriptMatches = content.match(/<script[^>]+src="([^"]+)"/g) || [];
    scriptMatches.forEach(tag => {
      const src = tag.match(/src="([^"]+)"/)[1];
      if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:') && !src.includes('${')) {
        const baseDir = path.dirname(filePath);
        const resolved = path.resolve(baseDir, src);
        if (!fs.existsSync(resolved)) {
          console.error(`BROKEN SCRIPT LINK in ${file}: ${src} -> ${resolved}`);
          hasErrors = true;
        }
      }
    });

    // Check actual <link href="..."> tags
    const linkMatches = content.match(/<link[^>]+href="([^"]+)"/g) || [];
    linkMatches.forEach(tag => {
      const href = tag.match(/href="([^"]+)"/)[1];
      if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('data:') && !href.includes('${')) {
        const cleanHref = href.split('?')[0];
        const baseDir = path.dirname(filePath);
        const resolved = path.resolve(baseDir, cleanHref);
        if (!fs.existsSync(resolved)) {
          console.error(`BROKEN LINK TAG in ${file}: ${href} -> ${resolved}`);
          hasErrors = true;
        }
      }
    });

    // Check anchor tags <a href="...">
    const aMatches = content.match(/<a[^>]+href="([^"]+)"/g) || [];
    aMatches.forEach(tag => {
      const href = tag.match(/href="([^"]+)"/)[1];
      if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('data:') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.includes('${')) {
        const cleanHref = href.split('?')[0];
        if (cleanHref) {
          const baseDir = path.dirname(filePath);
          const resolved = path.resolve(baseDir, cleanHref);
          if (!fs.existsSync(resolved)) {
            console.error(`BROKEN ANCHOR LINK in ${file}: ${href} -> ${resolved}`);
            hasErrors = true;
          }
        }
      }
    });
  }
});

// 2. Check CSS files
const cssFiles = ['assets/css/style.css', 'assets/css/responsive.css', 'assets/css/admin.css'];
cssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING CSS: ${file}`);
    hasErrors = true;
  }
});

// 3. Check JS files
const jsFiles = [
  'assets/js/products.js',
  'assets/js/main.js',
  'assets/js/cart.js',
  'assets/js/wishlist.js',
  'assets/js/auth.js',
  'assets/js/checkout.js',
  'assets/js/admin.js'
];
jsFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING JS: ${file}`);
    hasErrors = true;
  }
});

// 4. Check schema.sql
if (!fs.existsSync(path.join(__dirname, 'schema.sql'))) {
  console.error('MISSING schema.sql');
  hasErrors = true;
}

if (!hasErrors) {
  console.log(`\n>>> SUCCESS: All ${htmlFiles.length} HTML pages, 3 CSS stylesheets, 7 JS engines, and schema.sql passed 100% integrity validation! <<<`);
} else {
  console.error('FAILURE: Integrity check failed with errors.');
  process.exit(1);
}
