/**
 * Usman Mens Wear - Master Products Catalog
 * Contains 32 realistic fashion products across all major categories
 */

const INITIAL_PRODUCTS = [
  // --- FORMAL SHIRTS ---
  {
    id: "prod-101",
    name: "Royal Oxford Classic White Formal Shirt",
    category: "formal-shirts",
    categoryName: "Formal Shirts",
    brand: "Usman Sartorial",
    price: 1899,
    originalPrice: 3499,
    discount: 45,
    rating: 4.8,
    reviewCount: 142,
    sku: "UMW-FSH-101",
    stock: 28,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Ice Blue", hex: "#D6E4F0" },
      { name: "Soft Pink", hex: "#F7D6D0" }
    ],
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Crafted from 100% two-ply Egyptian long-staple cotton, this Royal Oxford weave shirt embodies effortless sophistication. Finished with mother-of-pearl buttons, a stiffened spread collar, and double-button cuffs suitable for boardrooms or galas.",
    fabric: "100% Giza Egyptian Two-Ply Cotton (80s count)",
    fit: "Tailored Slim Fit",
    care: "Machine wash cold inside-out. Warm steam iron.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-102",
    name: "Milano Herringbone French Cuff Formal Shirt",
    category: "formal-shirts",
    categoryName: "Formal Shirts",
    brand: "Usman Sartorial",
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.9,
    reviewCount: 88,
    sku: "UMW-FSH-102",
    stock: 14,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Sky Blue", hex: "#7CB9E8" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?auto=format&fit=crop&w=900&q=80"
    ],
    description: "An Italian-inspired subtle herringbone weave shirt equipped with dual French cuffs for your finest cufflinks. Designed with a contemporary cutaway collar that pairs harmoniously with Windsor knot ties.",
    fabric: "100% Superfine Italian Weave Cotton",
    fit: "Contemporary Slim Fit",
    care: "Dry clean or gentle hand wash. High steam iron.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-103",
    name: "Executive Micro-Gingham Non-Iron Navy Shirt",
    category: "formal-shirts",
    categoryName: "Formal Shirts",
    brand: "Usman Mens Wear",
    price: 1699,
    originalPrice: 2899,
    discount: 41,
    rating: 4.7,
    reviewCount: 110,
    sku: "UMW-FSH-103",
    stock: 35,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy/White", hex: "#1A2E40" },
      { name: "Grey/White", hex: "#6C7A89" }
    ],
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Designed for the modern executive on the go. Engineered with non-iron wrinkle-free cotton technology that stays crisp through a full 14-hour workday and long flights.",
    fabric: "100% Compact Liquid-Treated Cotton",
    fit: "Regular Smart Fit",
    care: "Machine wash warm, hang dry. No ironing necessary.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-104",
    name: "Regal Charcoal Dobby Weave Business Shirt",
    category: "formal-shirts",
    categoryName: "Formal Shirts",
    brand: "Usman Sartorial",
    price: 1999,
    originalPrice: 3299,
    discount: 39,
    rating: 4.6,
    reviewCount: 65,
    sku: "UMW-FSH-104",
    stock: 19,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Midnight Black", hex: "#171717" }
    ],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Textured dobby micro-geometric weave that offers deep color depth under indoor and natural lighting. Features semi-spread semi-cutaway collar with collar stays included.",
    fabric: "100% Pure Combed Cotton Dobby",
    fit: "Slim Fit",
    care: "Machine wash cold with like colors.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: true,
    status: "active"
  },

  // --- CASUAL SHIRTS ---
  {
    id: "prod-201",
    name: "Riviera Pure Linen Mandarin Collar Shirt",
    category: "casual-shirts",
    categoryName: "Casual Shirts",
    brand: "Usman Casuals",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.9,
    reviewCount: 230,
    sku: "UMW-CSH-201",
    stock: 40,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Warm Olive", hex: "#556B2F" },
      { name: "Sand Beige", hex: "#D2B48C" },
      { name: "Breeze White", hex: "#FDFDFD" }
    ],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Breathe easy in 100% French Normandy flax linen. Features a band/mandarin collar, rolled-cuff styling tabs, and wooden buttons for an artisanal weekend finish.",
    fabric: "100% Natural Normandy Linen",
    fit: "Relaxed Summer Fit",
    care: "Gentle machine wash cold. Line dry in shade.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-202",
    name: "Heritage Indigo Chambray Workshirt",
    category: "casual-shirts",
    categoryName: "Casual Shirts",
    brand: "Usman Casuals",
    price: 1599,
    originalPrice: 2699,
    discount: 40,
    rating: 4.7,
    reviewCount: 154,
    sku: "UMW-CSH-202",
    stock: 22,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo Blue", hex: "#2E4A62" },
      { name: "Washed Slate", hex: "#4C6B82" }
    ],
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Rugged yet refined, this classic indigo chambray shirt features double patch chest pockets with button flaps and triple-needle chain stitching along the side seams.",
    fabric: "100% Slub Yarn Indigo Chambray",
    fit: "Standard Casual Fit",
    care: "Wash with dark colors. Indigo will naturally develop a unique patina.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-203",
    name: "Cuban Collar Resort Print Casual Shirt",
    category: "casual-shirts",
    categoryName: "Casual Shirts",
    brand: "Usman Casuals",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.6,
    reviewCount: 92,
    sku: "UMW-CSH-203",
    stock: 31,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Monochrome Botanical", hex: "#222222" },
      { name: "Terracotta Palm", hex: "#9E4734" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Channel effortless coastal style. Features an open camp collar, boxy silhouette, and breathable Rayon-Cotton blend fabric printed with vintage tropical etchings.",
    fabric: "70% Breathable Rayon, 30% Cotton",
    fit: "Boxy Relaxed Fit",
    care: "Hand wash cold. Do not tumble dry.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-204",
    name: "Classic Buffalo Check Brushed Cotton Flannel",
    category: "casual-shirts",
    categoryName: "Casual Shirts",
    brand: "Usman Mens Wear",
    price: 1699,
    originalPrice: 2799,
    discount: 39,
    rating: 4.8,
    reviewCount: 168,
    sku: "UMW-CSH-204",
    stock: 25,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Burgundy Check", hex: "#6E263D" },
      { name: "Forest Green Check", hex: "#1B3B2B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Double-brushed cotton for incredible softness and warmth on cooler evenings. Perfect layered over a plain white crewneck tee or buttoned under a denim jacket.",
    fabric: "100% Brushed Ring-Spun Cotton Flannel",
    fit: "Comfort Regular Fit",
    care: "Machine wash cold with mild detergent.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },

  // --- POLO T-SHIRTS ---
  {
    id: "prod-301",
    name: "Supima Mercerized Cotton Luxury Polo",
    category: "polo-tshirts",
    categoryName: "Polo T-Shirts",
    brand: "Usman Atelier",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.9,
    reviewCount: 312,
    sku: "UMW-POL-301",
    stock: 50,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Navy", hex: "#101D38" },
      { name: "Pure Black", hex: "#0F0F0F" },
      { name: "Burgundy", hex: "#5C1D24" }
    ],
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Crafted from double-mercerized Supima cotton that boasts a silky lustre, saturated colour fastness, and ultra-smooth hand-feel. Finished with an embroidered tonal crest.",
    fabric: "100% Double-Mercerized Supima Cotton",
    fit: "Athletic Slim Fit",
    care: "Machine wash delicate. Dry flat.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-302",
    name: "Contrast Tipped Pique Knit Golf Polo",
    category: "polo-tshirts",
    categoryName: "Polo T-Shirts",
    brand: "Usman Mens Wear",
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    rating: 4.7,
    reviewCount: 140,
    sku: "UMW-POL-302",
    stock: 33,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sage Green", hex: "#8F9779" },
      { name: "Alabaster White", hex: "#F4F0EA" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Classic sports aesthetic with dual contrast tipping on collar and ribbed arm cuffs. Reinforced side slits for unrestricted movement on the fairway or around town.",
    fabric: "95% Combed Pique Cotton, 5% Elastane",
    fit: "Standard Athletic Fit",
    care: "Machine wash cold with like colors.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-303",
    name: "Knitted Textured Open-Collar Polo",
    category: "polo-tshirts",
    categoryName: "Polo T-Shirts",
    brand: "Usman Atelier",
    price: 1899,
    originalPrice: 3199,
    discount: 40,
    rating: 4.8,
    reviewCount: 79,
    sku: "UMW-POL-303",
    stock: 16,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Oatmeal Melange", hex: "#D6C7B2" },
      { name: "Mocha Brown", hex: "#4D382C" }
    ],
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The height of modern European smart-casual dressing. Features an open Johnny collar without buttons, knitted from a lightweight waffle gauge stitch.",
    fabric: "100% Breathable Combed Cotton Knit",
    fit: "Tailored Smart Fit",
    care: "Hand wash or wool cycle. Never hang dry to prevent stretching.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },

  // --- PRINTED & GRAPHIC T-SHIRTS ---
  {
    id: "prod-401",
    name: "Architectural Minimalist Heavyweight Tee",
    category: "printed-tshirts",
    categoryName: "T-Shirts",
    brand: "Usman Casuals",
    price: 899,
    originalPrice: 1599,
    discount: 43,
    rating: 4.8,
    reviewCount: 420,
    sku: "UMW-TEE-401",
    stock: 65,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Black", hex: "#232323" },
      { name: "Off White", hex: "#F7F5F0" },
      { name: "Castlerock Grey", hex: "#5C5D60" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Constructed from 240 GSM dense heavyweight combed cotton. Screen-printed with minimalist typographic typography on the left chest and back using eco-friendly water-based discharge ink.",
    fabric: "100% 240 GSM Combed Cotton",
    fit: "Drop-Shoulder Boxy Fit",
    care: "Machine wash cold inside-out.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-402",
    name: "Monochrome Abstract Line-Art Oversized Tee",
    category: "printed-tshirts",
    categoryName: "T-Shirts",
    brand: "Usman Casuals",
    price: 999,
    originalPrice: 1799,
    discount: 44,
    rating: 4.6,
    reviewCount: 185,
    sku: "UMW-TEE-402",
    stock: 42,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Chalk White", hex: "#FAF8F5" },
      { name: "Pebble Grey", hex: "#9E9D99" }
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Curated modern art for everyday streetwear. Features thick ribbed collar that won't sag, seamless tubular body construction, and a clean abstract back print.",
    fabric: "100% Organic Ring-Spun Cotton (220 GSM)",
    fit: "Modern Oversized Fit",
    care: "Wash cold, iron print inside-out.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-403",
    name: "Atelier Vintage Signature Heritage Graphic Tee",
    category: "printed-tshirts",
    categoryName: "T-Shirts",
    brand: "Usman Atelier",
    price: 949,
    originalPrice: 1699,
    discount: 44,
    rating: 4.7,
    reviewCount: 95,
    sku: "UMW-TEE-403",
    stock: 30,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Forest Pine", hex: "#1C3328" },
      { name: "Faded Ochre", hex: "#B8860B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Special enzyme pigment-wash delivers an authentic vintage lived-in handfeel. Adorned with Usman Atelier heritage crest motif across the chest.",
    fabric: "100% Cotton with Bio-Wash and Enzyme Treatment",
    fit: "Relaxed Fit",
    care: "Wash with like colors inside-out.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },

  // --- JEANS & DENIM ---
  {
    id: "prod-501",
    name: "Kurabo Selvedge Raw Indigo Slim Denim",
    category: "jeans",
    categoryName: "Jeans",
    brand: "Usman Sartorial",
    price: 2999,
    originalPrice: 5499,
    discount: 45,
    rating: 4.9,
    reviewCount: 178,
    sku: "UMW-JNS-501",
    stock: 18,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Raw Deep Indigo", hex: "#141F36" },
      { name: "Overdyed Black", hex: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Woven on vintage shuttle looms in Okayama, this 13.5 oz red-line selvedge denim is untreated raw indigo. Breaks in over time to mirror your personal wear habits, honeycombs, and fades.",
    fabric: "100% Japanese Cotton Shuttle-Loom Selvedge Denim",
    fit: "Slim Straight Fit",
    care: "Wear frequently; soak inside-out in cold water with minimal detergent.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-502",
    name: "Vintage Whisker Wash Tapered Stretch Jeans",
    category: "jeans",
    categoryName: "Jeans",
    brand: "Usman Mens Wear",
    price: 2199,
    originalPrice: 3899,
    discount: 43,
    rating: 4.8,
    reviewCount: 260,
    sku: "UMW-JNS-502",
    stock: 44,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Medium Stonewash", hex: "#4B6B94" },
      { name: "Light Vintage Blue", hex: "#8DAECB" }
    ],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Features authentic hand-sanded whiskering and subtle thigh scraping. Engineered with 2% elastane for seamless all-day 360-degree comfort without bagging at the knees.",
    fabric: "98% Combed Cotton, 2% Spandex",
    fit: "Tapered Fit",
    care: "Machine wash cold inside-out.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-503",
    name: "Midnight Stay-Black Clean Cut Slim Jeans",
    category: "jeans",
    categoryName: "Jeans",
    brand: "Usman Mens Wear",
    price: 1999,
    originalPrice: 3499,
    discount: 42,
    rating: 4.7,
    reviewCount: 145,
    sku: "UMW-JNS-503",
    stock: 29,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Pitch Black", hex: "#0B0B0B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Formulated with reactive dye technology that retains its intense pitch-black color through up to 40 machine washes. Clean tonal stitching makes it perfect for smart casual styling.",
    fabric: "98% Ring-Spun Cotton, 2% Lycra",
    fit: "Tailored Slim Fit",
    care: "Machine wash cold with gentle detergent. Avoid optical brighteners.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-504",
    name: "Classic 90s Relaxed Fit Lightwash Jeans",
    category: "jeans",
    categoryName: "Jeans",
    brand: "Usman Casuals",
    price: 1899,
    originalPrice: 3199,
    discount: 40,
    rating: 4.6,
    reviewCount: 88,
    sku: "UMW-JNS-504",
    stock: 21,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Bleach Light Blue", hex: "#A8C5DA" }
    ],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Embrace authentic retro aesthetics. Roomy through the seat and thighs with a straight leg opening that stacks effortlessly over leather sneakers or boots.",
    fabric: "100% Sturdy Midweight Cotton Denim",
    fit: "Relaxed 90s Straight Fit",
    care: "Machine wash cold with like colors.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },

  // --- FORMAL TROUSERS ---
  {
    id: "prod-601",
    name: "Savile Row Double-Pleated Wool Blend Trousers",
    category: "formal-trousers",
    categoryName: "Formal Trousers",
    brand: "Usman Sartorial",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    rating: 4.9,
    reviewCount: 134,
    sku: "UMW-FTR-601",
    stock: 15,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Charcoal Grey", hex: "#3A3D40" },
      { name: "Navy Houndstooth", hex: "#1A2536" },
      { name: "Sand Taupe", hex: "#B8A898" }
    ],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Classic sartorial British tailoring featuring twin forward pleats, side adjuster buckles (no belt needed), and extended buttoned waistband tab. Hangs with a drape unmatched by standard off-the-rack slacks.",
    fabric: "65% Australian Merino Wool, 33% Polyester, 2% Elastane",
    fit: "High-Rise Tailored Fit",
    care: "Dry clean only.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-602",
    name: "Slim Fit Stretch Gabardine Formal Slacks",
    category: "formal-trousers",
    categoryName: "Formal Trousers",
    brand: "Usman Sartorial",
    price: 1899,
    originalPrice: 3299,
    discount: 42,
    rating: 4.7,
    reviewCount: 198,
    sku: "UMW-FTR-602",
    stock: 36,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Midnight Navy", hex: "#111827" },
      { name: "Steel Grey", hex: "#4B5563" },
      { name: "Jet Black", hex: "#1F2421" }
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Smooth gabardine weave with internal gripper waistband that prevents your dress shirt from pulling loose. Clean flat front with slanted side pockets and button-through rear welt pockets.",
    fabric: "70% Viscose Rayon, 28% Poly, 2% Spandex",
    fit: "Mid-Rise Slim Fit",
    care: "Dry clean or delicate cycle wash with cool water.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-603",
    name: "Glen Check Micro-Patterned Formal Trousers",
    category: "formal-trousers",
    categoryName: "Formal Trousers",
    brand: "Usman Sartorial",
    price: 2199,
    originalPrice: 3799,
    discount: 42,
    rating: 4.8,
    reviewCount: 76,
    sku: "UMW-FTR-603",
    stock: 12,
    sizes: ["32", "34", "36"],
    colors: [
      { name: "Grey Prince of Wales", hex: "#525252" }
    ],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Distinguished Glen check pattern that elevates plain white or light blue dress shirts. Finished with turn-up cuffs at the hem for a timeless bespoke silhouette.",
    fabric: "Poly-Wool Luxury Blend",
    fit: "Tapered Ankle-Length Fit",
    care: "Dry clean recommended.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: true,
    status: "active"
  },

  // --- CASUAL TROUSERS & CHINOS ---
  {
    id: "prod-701",
    name: "Milano Stretch Cotton Sartorial Chinos",
    category: "trousers",
    categoryName: "Casual Trousers",
    brand: "Usman Casuals",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.8,
    reviewCount: 340,
    sku: "UMW-CTR-701",
    stock: 55,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Classic Khaki", hex: "#C3B091" },
      { name: "Olive Green", hex: "#4B5320" },
      { name: "Navy Blue", hex: "#1C2833" },
      { name: "Stone Grey", hex: "#95A5A6" }
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The ultimate weekday-to-weekend essential. High-count twill weave cotton with 3% stretch allows natural ease of movement while maintaining sharp creases.",
    fabric: "97% Brushed Twill Cotton, 3% Elastane",
    fit: "Slim Tapered Fit",
    care: "Machine wash cold inside-out.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-702",
    name: "Gurkha Drawstring Linen-Cotton Trousers",
    category: "trousers",
    categoryName: "Casual Trousers",
    brand: "Usman Atelier",
    price: 2099,
    originalPrice: 3599,
    discount: 41,
    rating: 4.9,
    reviewCount: 112,
    sku: "UMW-CTR-702",
    stock: 20,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Ivory Ecru", hex: "#EAE6DF" },
      { name: "Tobacco Brown", hex: "#715138" }
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Inspired by traditional Nepalese Gurkha military trousers, reimagined with an internal elasticated back and polished brass side buckles for vacation-ready comfort.",
    fabric: "55% Normandy Linen, 45% Organic Cotton",
    fit: "Relaxed Pleated Fit",
    care: "Cold gentle wash. Line dry in shade.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-703",
    name: "Urban Explorer Cargo Chino Joggers",
    category: "trousers",
    categoryName: "Casual Trousers",
    brand: "Usman Casuals",
    price: 1899,
    originalPrice: 3199,
    discount: 40,
    rating: 4.7,
    reviewCount: 165,
    sku: "UMW-CTR-703",
    stock: 32,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Military Olive", hex: "#3B4D3C" },
      { name: "Stealth Black", hex: "#1C1C1C" }
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Modernized utility wear with sleek low-profile cargo pockets, reinforced articulated knees, and discreet elastic ankle cuffs.",
    fabric: "98% Heavy Cotton Ripstop, 2% Spandex",
    fit: "Athletic Tapered Cargo Fit",
    care: "Machine wash cold with like colors.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },

  // --- ACCESSORIES ---
  {
    id: "prod-801",
    name: "Full-Grain Italian Leather Reversible Belt",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Leathercraft",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.9,
    reviewCount: 280,
    sku: "UMW-ACC-801",
    stock: 45,
    sizes: ["Free Size (Up to 42)"],
    colors: [
      { name: "Black / Cognac Brown", hex: "#1C1B1A" }
    ],
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Two belts in one. Twist the satin brushed nickel buckle 180 degrees to switch seamlessly between rich dark cognac brown and classic executive black full-grain leather.",
    fabric: "100% Genuine Full-Grain Tuscan Leather",
    fit: "Adjustable 32-42 inches (screw clip included)",
    care: "Clean with dry cloth. Apply leather balm twice yearly.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-802",
    name: "Silk Jacquard Necktie & Pocket Square Set",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Sartorial",
    price: 1199,
    originalPrice: 2199,
    discount: 45,
    rating: 4.8,
    reviewCount: 140,
    sku: "UMW-ACC-802",
    stock: 27,
    sizes: ["Standard 3.15 inch width"],
    colors: [
      { name: "Royal Gold & Navy Paisley", hex: "#1C2E4A" },
      { name: "Burgundy Floral", hex: "#631A28" }
    ],
    images: [
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Handmade from 1200-needle woven pure mulberry silk with rich wool interlining that springs back cleanly from any knot. Accompanied by a matching hand-rolled pocket square.",
    fabric: "100% Pure Mulberry Silk",
    fit: "Standard Length (58 inch)",
    care: "Dry clean only. Steam with care.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-803",
    name: "Handcrafted Chelsea Boots in Cigar Brown Suede",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Leathercraft",
    price: 3999,
    originalPrice: 6999,
    discount: 42,
    rating: 4.9,
    reviewCount: 92,
    sku: "UMW-ACC-803",
    stock: 14,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Cigar Brown Suede", hex: "#5C4033" },
      { name: "Onyx Black Suede", hex: "#1F1F1F" }
    ],
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Goodyear-welted construction with water-repellent Italian calf suede, tonal elasticated side gussets, pull tabs, and non-slip Dainite rubber studded sole.",
    fabric: "Premium Suede Calf Leather / Dainite Sole",
    fit: "True to UK Size",
    care: "Use suede brush and waterproofing protector spray.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-804",
    name: "Minimalist Chronograph Watch with Leather Strap",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Atelier",
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    rating: 4.8,
    reviewCount: 165,
    sku: "UMW-ACC-804",
    stock: 22,
    sizes: ["40mm Dial"],
    colors: [
      { name: "Gold / White Dial", hex: "#C6A15B" },
      { name: "Silver / Black Dial", hex: "#333333" }
    ],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Surgical-grade 316L stainless steel casing housing a precision Japanese quartz chronograph movement. Protected under scratch-resistant sapphire crystal glass.",
    fabric: "316L Stainless Steel / Sapphire Crystal / Italian Leather",
    fit: "Universal Men's 40mm",
    care: "5 ATM Water Resistance (splash resistant).",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-805",
    name: "Matte Gunmetal Geometric Cufflinks Set",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Sartorial",
    price: 899,
    originalPrice: 1599,
    discount: 43,
    rating: 4.7,
    reviewCount: 64,
    sku: "UMW-ACC-805",
    stock: 38,
    sizes: ["Free Size"],
    colors: [
      { name: "Gunmetal", hex: "#4B4D4F" },
      { name: "Brushed Gold", hex: "#C6A15B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Modern architectural hexagonal cufflinks with swivel whale-tail back closures. Coated in anti-tarnish rhodium plating for enduring brilliance.",
    fabric: "High-grade Brass with Rhodium Plating",
    fit: "Fits all standard double French cuffs",
    care: "Wipe with soft microfiber cloth after wear.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },

  // --- ADDITIONAL COMPREHENSIVE PRODUCTS FOR CATALOG COMPLETION ---
  {
    id: "prod-105",
    name: "Sartorial Contrast Spread Collar Pinstripe Shirt",
    category: "formal-shirts",
    categoryName: "Formal Shirts",
    brand: "Usman Sartorial",
    price: 2099,
    originalPrice: 3699,
    discount: 43,
    rating: 4.8,
    reviewCount: 52,
    sku: "UMW-FSH-105",
    stock: 16,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy Stripe / White Collar", hex: "#223843" }
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The quintessential Wall Street banker look. Featuring a contrast white spread collar with subtle navy Bengal hairline stripes crafted from 100% fine cotton poplin.",
    fabric: "100% Pure Egyptian Poplin Cotton",
    fit: "Tailored Fit",
    care: "Machine wash warm, steam iron.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-205",
    name: "Safari Multi-Pocket Utility Casual Overshirt",
    category: "casual-shirts",
    categoryName: "Casual Shirts",
    brand: "Usman Casuals",
    price: 2299,
    originalPrice: 3999,
    discount: 42,
    rating: 4.9,
    reviewCount: 104,
    sku: "UMW-CSH-205",
    stock: 20,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Field Khaki", hex: "#C2B280" },
      { name: "Desert Sand", hex: "#EDC9AF" }
    ],
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Rugged yet polished overshirt styled with quad safari bellows pockets, horn buttons, and heavy twill cotton suitable as light outerwear.",
    fabric: "100% Heavy Twill Cotton (280 GSM)",
    fit: "Relaxed Layering Overshirt Fit",
    care: "Machine wash cold, tumble dry low.",
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: true,
    status: "active"
  },
  {
    id: "prod-304",
    name: "Zip-Neck Fine Gauge Merino Polo Sweater",
    category: "polo-tshirts",
    categoryName: "Polo T-Shirts",
    brand: "Usman Atelier",
    price: 2499,
    originalPrice: 4299,
    discount: 41,
    rating: 4.9,
    reviewCount: 68,
    sku: "UMW-POL-304",
    stock: 14,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Heather", hex: "#383E42" },
      { name: "Bordeaux", hex: "#4C1C24" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Knitted from extrafine 19.5-micron Merino wool with a luxury matte gunmetal quarter-zip pull. Soft against bare skin with natural thermo-regulating properties.",
    fabric: "100% Extrafine Australian Merino Wool",
    fit: "Fitted Smart Cut",
    care: "Dry clean or gentle cold wool wash.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-404",
    name: "Tokyo Neo-Vintage Calligraphy Back-Graphic Tee",
    category: "printed-tshirts",
    categoryName: "T-Shirts",
    brand: "Usman Casuals",
    price: 899,
    originalPrice: 1599,
    discount: 43,
    rating: 4.7,
    reviewCount: 220,
    sku: "UMW-TEE-404",
    stock: 48,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Olive", hex: "#4A5340" },
      { name: "Ink Black", hex: "#161616" }
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Japanese street style inspired oversized graphic tee featuring brushed Kanji lettering and minimalist geometric grids on the reverse.",
    fabric: "100% Combed Cotton 230 GSM",
    fit: "Loose Streetwear Fit",
    care: "Machine wash cold inside-out.",
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-505",
    name: "Distressed Edge Moto Tapered Dark Indigo Jeans",
    category: "jeans",
    categoryName: "Jeans",
    brand: "Usman Casuals",
    price: 2399,
    originalPrice: 4199,
    discount: 42,
    rating: 4.6,
    reviewCount: 94,
    sku: "UMW-JNS-505",
    stock: 24,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Deep Indigo Distressed", hex: "#1B2A4A" }
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Constructed with subtle laser abrasions, micro-distressed pocket edges, and curved moto knee paneling for a rugged rebel profile.",
    fabric: "98% Cotton Denim, 2% Stretch Elastane",
    fit: "Tapered Biker Fit",
    care: "Wash inside out in cold water.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-604",
    name: "Lightweight Venetian Wool Summer Slacks",
    category: "formal-trousers",
    categoryName: "Formal Trousers",
    brand: "Usman Sartorial",
    price: 2299,
    originalPrice: 3999,
    discount: 42,
    rating: 4.8,
    reviewCount: 82,
    sku: "UMW-FTR-604",
    stock: 18,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Pearl Grey", hex: "#CCCCCC" },
      { name: "Dark Navy", hex: "#132238" }
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Woven from breathable tropical-weight wool with a subtle natural luster. Features silk-lined interior waistband and curtain waistband construction.",
    fabric: "100% Tropical Lightweight Wool",
    fit: "Classic Straight Fit",
    care: "Dry clean only.",
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: false,
    status: "active"
  },
  {
    id: "prod-806",
    name: "Classic Silk Bow Tie & Cummerbund Black-Tie Set",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Usman Sartorial",
    price: 1599,
    originalPrice: 2899,
    discount: 44,
    rating: 4.9,
    reviewCount: 48,
    sku: "UMW-ACC-806",
    stock: 16,
    sizes: ["Adjustable Neck & Waist"],
    colors: [
      { name: "Formal Black Silk Satin", hex: "#000000" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=900&q=80"
    ],
    description: "The definitive tuxedo accessory pairing. Self-tie silk satin bow tie with adjustable slider clasp and matching 4-pleat silk cummerbund.",
    fabric: "100% High-Lustre Woven Silk Satin",
    fit: "Adjustable (Fits neck sizes 14 to 20 inches)",
    care: "Dry clean only.",
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    isSpecialOffer: false,
    status: "active"
  }
];

// Demo Coupons available in store
const INITIAL_COUPONS = [
  {
    code: "WELCOME10",
    discountPercent: 10,
    discountAmount: 0,
    minOrderValue: 999,
    description: "10% OFF on your first purchase above ₹999",
    expiryDate: "2027-12-31",
    isActive: true
  },
  {
    code: "SAVE200",
    discountPercent: 0,
    discountAmount: 200,
    minOrderValue: 1499,
    description: "Flat ₹200 OFF on orders above ₹1,499",
    expiryDate: "2027-12-31",
    isActive: true
  },
  {
    code: "FREESHIP",
    discountPercent: 0,
    discountAmount: 100, // covers ₹100 standard shipping
    isFreeShipping: true,
    minOrderValue: 799,
    description: "Free shipping on orders above ₹799",
    expiryDate: "2027-12-31",
    isActive: true
  },
  {
    code: "LUXURY25",
    discountPercent: 25,
    discountAmount: 0,
    minOrderValue: 2999,
    description: "25% OFF on luxury orders above ₹2,999",
    expiryDate: "2027-12-31",
    isActive: true
  }
];

// Product Repository / Manager
const ProductStore = {
  STORAGE_KEY: "umw_products",
  COUPONS_KEY: "umw_coupons",

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(this.COUPONS_KEY)) {
      localStorage.setItem(this.COUPONS_KEY, JSON.stringify(INITIAL_COUPONS));
    }
  },

  getAll() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  },

  getById(id) {
    const products = this.getAll();
    return products.find(p => p.id === id) || null;
  },

  saveProduct(product) {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...products[index], ...product };
    } else {
      products.unshift(product);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return product;
  },

  deleteProduct(id) {
    let products = this.getAll();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return true;
  },

  updateStock(id, newStock) {
    const products = this.getAll();
    const prod = products.find(p => p.id === id);
    if (prod) {
      prod.stock = Math.max(0, parseInt(newStock, 10));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      return prod;
    }
    return null;
  },

  getCoupons() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.COUPONS_KEY)) || INITIAL_COUPONS;
    } catch (e) {
      return INITIAL_COUPONS;
    }
  },

  saveCoupon(coupon) {
    const coupons = this.getCoupons();
    const index = coupons.findIndex(c => c.code.toUpperCase() === coupon.code.toUpperCase());
    if (index >= 0) {
      coupons[index] = { ...coupons[index], ...coupon };
    } else {
      coupons.push(coupon);
    }
    localStorage.setItem(this.COUPONS_KEY, JSON.stringify(coupons));
    return coupon;
  },

  deleteCoupon(code) {
    let coupons = this.getCoupons();
    coupons = coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase());
    localStorage.setItem(this.COUPONS_KEY, JSON.stringify(coupons));
    return true;
  }
};

// Initialize on file load
ProductStore.init();

