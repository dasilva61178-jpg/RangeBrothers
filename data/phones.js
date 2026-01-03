
// data/phones.js

// -----------------------------
// Sidebar Categories
// -----------------------------
export const categories = [
  { name: "iPhones", key: "iphone" },
  { name: "Samsung S Series", key: "sseries" },
  { name: "Samsung Fold / Flip", key: "foldflip" },
  { name: "Google Pixel", key: "pixel" }
];

// -----------------------------
// Phones Database
// -----------------------------
export const phones = [

  // -----------------------------
  // iPhone X
  // -----------------------------
  {
    id: "iphone-x",
    name: "iPhone X",
    category: "iphone",
    colors: ["Silver", "Space Gray"],
    images: {
      Silver: "/images/iphone-x/silver.png",
      "Space Gray": "/images/iphone-x/space-gray.png"
    },
    variants: [
      { storage: "64GB", price: 950000 },
      { storage: "256GB", price: 1100000 }
    ]
  },

  // -----------------------------
  // iPhone XR
  // -----------------------------
  {
    id: "iphone-xr",
    name: "iPhone XR",
    category: "iphone",
    colors: ["Black", "White", "Blue", "Yellow", "Coral", "Product Red"],
    images: {
      Black: "/images/iphone-xr/black.png",
      White: "/images/iphone-xr/white.png",
      Blue: "/images/iphone-xr/blue.png",
      Yellow: "/images/iphone-xr/yellow.png",
      Coral: "/images/iphone-xr/coral.png",
      "Product Red": "/images/iphone-xr/product-red.png"
    },
    variants: [
      { storage: "64GB", price: 1100000 },
      { storage: "128GB", price: 1250000 }
    ]
  },

  // -----------------------------
  // iPhone 11
  // -----------------------------
  {
    id: "iphone-11",
    name: "iPhone 11",
    category: "iphone",
    colors: ["Black", "White", "Green", "Yellow", "Purple", "Product Red"],
    images: {
      Black: "/images/iphone-11/black.png",
      White: "/images/iphone-11/white.png",
      Green: "/images/iphone-11/green.png",
      Yellow: "/images/iphone-11/yellow.png",
      Purple: "/images/iphone-11/purple.png",
      "Product Red": "/images/iphone-11/product-red.png"
    },
    variants: [
      { storage: "64GB", price: 1300000 },
      { storage: "128GB", price: 1400000 }
    ]
  },

  // -----------------------------
  // iPhone 11 Pro
  // -----------------------------
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    category: "iphone",
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    images: {
      "Space Gray": "/images/iphone-11-pro/space-gray.png",
      Silver: "/images/iphone-11-pro/silver.png",
      Gold: "/images/iphone-11-pro/gold.png",
      "Midnight Green": "/images/iphone-11-pro/midnight-green.png"
    },
    variants: [
      { storage: "64GB", price: 1550000 },
      { storage: "256GB", price: 1650000 }
    ]
  },

  // -----------------------------
  // iPhone 11 Pro Max
  // -----------------------------
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    category: "iphone",
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    images: {
      "Space Gray": "/images/iphone-11-pro-max/space-gray.png",
      Silver: "/images/iphone-11-pro-max/silver.png",
      Gold: "/images/iphone-11-pro-max/gold.png",
      "Midnight Green": "/images/iphone-11-pro-max/midnight-green.png"
    },
    variants: [
      { storage: "64GB", price: 1750000 },
      { storage: "256GB", price: 1850000 }
    ]
  },

  // -----------------------------
  // iPhone 12
  // -----------------------------
  {
    id: "iphone-12",
    name: "iPhone 12",
    category: "iphone",
    colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    images: {
      Black: "/images/iphone-12/black.png",
      White: "/images/iphone-12/white.png",
      Red: "/images/iphone-12/red.png",
      Green: "/images/iphone-12/green.png",
      Blue: "/images/iphone-12/blue.png",
      Purple: "/images/iphone-12/purple.png"
    },
    variants: [
      { storage: "64GB", price: 1400000 },
      { storage: "128GB", price: 1500000 }
    ]
  },

  // -----------------------------
  // iPhone 12 Pro
  // -----------------------------
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    category: "iphone",
    colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
    images: {
      Silver: "/images/iphone-12-pro/silver.png",
      Graphite: "/images/iphone-12-pro/graphite.png",
      Gold: "/images/iphone-12-pro/gold.png",
      "Pacific Blue": "/images/iphone-12-pro/pacific-blue.png"
    },
    variants: [
      { storage: "128GB", price: 1700000 },
      { storage: "256GB", price: 1800000 }
    ]
  },

  // -----------------------------
  // iPhone 12 Pro Max
  // -----------------------------
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    category: "iphone",
    colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
    images: {
      Silver: "/images/iphone-12-pro-max/silver.png",
      Graphite: "/images/iphone-12-pro-max/graphite.png",
      Gold: "/images/iphone-12-pro-max/gold.png",
      "Pacific Blue": "/images/iphone-12-pro-max/pacific-blue.png"
    },
    variants: [
      { storage: "128GB", price: 1800000 },
      { storage: "256GB", price: 1950000 },
      { storage: "512GB", price: 2000000 }
    ]
  },

  // -----------------------------
  // iPhone 13
  // -----------------------------
  {
    id: "iphone-13",
    name: "iPhone 13",
    category: "iphone",
    colors: ["Midnight", "Starlight", "Blue", "Pink", "Green", "Product Red"],
    images: {
      Midnight: "/images/iphone-13/midnight.png",
      Starlight: "/images/iphone-13/starlight.png",
      Blue: "/images/iphone-13/blue.png",
      Pink: "/images/iphone-13/pink.png",
      Green: "/images/iphone-13/green.png",
      "Product Red": "/images/iphone-13/product-red.png"
    },
    variants: [
      { storage: "128GB", price: 2050000 },
      { storage: "256GB", price: 2150000 }
    ]
  },

  // -----------------------------
  // iPhone 13 Pro
  // -----------------------------
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    category: "iphone",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    images: {
      Graphite: "/images/iphone-13-pro/graphite.png",
      Gold: "/images/iphone-13-pro/gold.png",
      Silver: "/images/iphone-13-pro/silver.png",
      "Sierra Blue": "/images/iphone-13-pro/sierra-blue.png",
      "Alpine Green": "/images/iphone-13-pro/alpine-green.png"
    },
    variants: [
      { storage: "128GB", price: 2400000 },
      { storage: "256GB", price: 2500000 },
      { storage: "512GB", price: 2600000 }
    ]
  },

  // -----------------------------
  // iPhone 13 Pro Max
  // -----------------------------
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    category: "iphone",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    images: {
      Graphite: "/images/iphone-13-pro-max/graphite.png",
      Gold: "/images/iphone-13-pro-max/gold.png",
      Silver: "/images/iphone-13-pro-max/silver.png",
      "Sierra Blue": "/images/iphone-13-pro-max/sierra-blue.png",
      "Alpine Green": "/images/iphone-13-pro-max/alpine-green.png"
    },
    variants: [
      { storage: "128GB", price: 2500000 },
      { storage: "256GB", price: 2700000 },
      { storage: "512GB", price: 2800000 },
      { storage: "1TB", price: 2900000 }
    ]
  },

  // -----------------------------
  // iPhone 14
  // -----------------------------
  {
    id: "iphone-14",
    name: "iPhone 14",
    category: "iphone",
    colors: ["Midnight", "Starlight", "Blue", "Purple", "Product Red", "Yellow"],
    images: {
      Midnight: "/images/iphone-14/midnight.png",
      Starlight: "/images/iphone-14/starlight.png",
      Blue: "/images/iphone-14/blue.png",
      Purple: "/images/iphone-14/purple.png",
      "Product Red": "/images/iphone-14/product-red.png",
      Yellow: "/images/iphone-14/yellow.png"
    },
    variants: [
      { storage: "128GB", price: 2400000 },
      { storage: "256GB", price: 2600000 }
    ]
  },


  // -----------------------------
  // iPhone 14 Plus
  // -----------------------------
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    category: "iphone",
    colors: ["Midnight", "Starlight", "Blue", "Purple", "Product Red", "Yellow"],
    images: {
      Midnight: "/images/iphone-14-plus/midnight.png",
      Starlight: "/images/iphone-14-plus/starlight.png",
      Blue: "/images/iphone-14-plus/blue.png",
      Purple: "/images/iphone-14-plus/purple.png",
      "Product Red": "/images/iphone-14-plus/product-red.png",
      Yellow: "/images/iphone-14-plus/yellow.png"
    },
    variants: [
      { storage: "128GB", price: 2600000 },
      { storage: "256GB", price: 2700000 }
    ]
  },
  // -----------------------------
  // iPhone 14 Pro
  // -----------------------------
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    category: "iphone",
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    images: {
      "Space Black": "/images/iphone-14-pro/space-black.png",
      Silver: "/images/iphone-14-pro/silver.png",
      Gold: "/images/iphone-14-pro/gold.png",
      "Deep Purple": "/images/iphone-14-pro/deep-purple.png"
    },
    variants: [
      { storage: "128GB", price: 2900000 },
      { storage: "256GB", price: 3000000 }
    ]
  },
  // -----------------------------
  // iPhone 14 Pro Max
  // -----------------------------
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    category: "iphone",
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    images: {
      "Space Black": "/images/iphone-14-pro-max/space-black.png",
      Silver: "/images/iphone-14-pro-max/silver.png",
      Gold: "/images/iphone-14-pro-max/gold.png",
      "Deep Purple": "/images/iphone-14-pro-max/deep-purple.png"
    },
    variants: [
      { storage: "128GB", price: 3200000 },
      { storage: "256GB", price: 3300000 },
      { storage: "512GB", price: 3400000 },
      { storage: "1TB", price: 3500000 }
    ]
  },  
// -----------------------------
  // iPhone 15
  // -----------------------------
  {
    id: "iphone-15",
    name: "iPhone 15",
    category: "iphone",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    images: {
      Black: "/images/iphone-15/black.png",
      Blue: "/images/iphone-15/blue.png",
      Green: "/images/iphone-15/green.png",
      Yellow: "/images/iphone-15/yellow.png",
      Pink: "/images/iphone-15/pink.png"
    },
    variants: [
      { storage: "128GB", price: 2900000 },
      { storage: "256GB", price: 3100000 }
    ]
  },
  // -----------------------------
  // iPhone 15 Plus
  // -----------------------------
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    category: "iphone",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    images: {
      Black: "/images/iphone-15-plus/black.png",
      Blue: "/images/iphone-15-plus/blue.png",
      Green: "/images/iphone-15-plus/green.png",
      Yellow: "/images/iphone-15-plus/yellow.png",
      Pink: "/images/iphone-15-plus/pink.png"
    },
    variants: [
      { storage: "128GB", price: 3200000 },
      { storage: "256GB", price: 3400000 }
    ]
  },

  // -----------------------------
  // iPhone 15 Pro
  // -----------------------------
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "iphone",
    colors: ["Black Titanium", "White Titanium", "Blue Titanium", "Natural Titanium"],
    images: {
      "Black Titanium": "/images/iphone-15-pro/black-titanium.png",
      "White Titanium": "/images/iphone-15-pro/white-titanium.png",
      "Blue Titanium": "/images/iphone-15-pro/blue-titanium.png",
      "Natural Titanium": "/images/iphone-15-pro/natural-titanium.png"
    },
    variants: [
      { storage: "128GB", price: 3400000 },
      { storage: "256GB", price: 3600000 }
    ]
  },
  // -----------------------------
  // iPhone 15 Pro Max
  // -----------------------------
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iphone",
    colors: ["Black Titanium", "White Titanium", "Blue Titanium", "Natural Titanium"],
    images: {
      "Black Titanium": "/images/iphone-15-pro-max/black-titanium.png",
      "White Titanium": "/images/iphone-15-pro-max/white-titanium.png",
      "Blue Titanium": "/images/iphone-15-pro-max/blue-titanium.png",
      "Natural Titanium": "/images/iphone-15-pro-max/natural-titanium.png"
    },
    variants: [
      { storage: "256GB", price: 3900000 },
      { storage: "512GB", price: 4100000 },
      { storage: "1TB",   price: 4300000 }
    ]
  },
  // -----------------------------
  // iPhone 16
  // -----------------------------
  {
    id: "iphone-16",
    name: "iPhone 16",
    category: "iphone",
    colors: ["Black", "White", "Blue", "Green", "Pink"],
    images: {
      Black: "/images/iphone-16/black.png",
      White: "/images/iphone-16/white.png",
      Blue: "/images/iphone-16/blue.png",
      Green: "/images/iphone-16/green.png",
      Pink: "/images/iphone-16/pink.png"
    },
    variants: [
      { storage: "128GB", price: 3700000 },
      { storage: "256GB", price: 3900000 }
    ]
  },
  // -----------------------------
  // iPhone 16 Plus
  // -----------------------------
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    category: "iphone",
    colors: ["Black", "White", "Blue", "Green", "Pink"],
    images: {
      Black: "/images/iphone-16-plus/black.png",
      White: "/images/iphone-16-plus/white.png",
      Blue: "/images/iphone-16-plus/blue.png",
      Green: "/images/iphone-16-plus/green.png",
      Pink: "/images/iphone-16-plus/pink.png"
    },
    variants: [
      { storage: "128GB", price: 4000000 },
      { storage: "256GB", price: 4200000 }
    ]
  },
  // -----------------------------
  // iPhone 16 Pro
  // -----------------------------
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    category: "iphone",
    colors: ["Natural Titanium", "Black Titanium", "White Titanium", "Desert Titanium"],
    images: {
      "Natural Titanium": "/images/iphone-16-pro/natural-titanium.png",
      "Black Titanium": "/images/iphone-16-pro/black-titanium.png",
      "White Titanium": "/images/iphone-16-pro/white-titanium.png",
      "Desert Titanium": "/images/iphone-16-pro/desert-titanium.png"
    },
    variants: [
      { storage: "128GB", price: 4550000 },
      { storage: "256GB", price: 4750000 }
    ]
  },
  // -----------------------------
  // iPhone 16 Pro Max
  // -----------------------------
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    category: "iphone",
    colors: ["Natural Titanium", "Black Titanium", "White Titanium", "Desert Titanium"],
    images: {
      "Natural Titanium": "/images/iphone-16-pro-max/natural-titanium.png",
      "Black Titanium": "/images/iphone-16-pro-max/black-titanium.png",
      "White Titanium": "/images/iphone-16-pro-max/white-titanium.png",
      "Desert Titanium": "/images/iphone-16-pro-max/desert-titanium.png"
    },
    variants: [
      { storage: "256GB", price: 5400000 },
      { storage: "512GB", price: 5600000 }
    ]
  },

  // -----------------------------
  // Samsung S25 Ultra
  // -----------------------------
  {
    id: "s25-ultra",
    name: "Samsung S25 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // update later if needed
    images: {
      Black: "/images/s25-ultra/black.png",
      White: "/images/s25-ultra/white.png"
    },
    variants: [
      { storage: "256GB", price: 4400000 },
      { storage: "512GB", price: 4600000 }
    ]
  },
  // -----------------------------
  // Samsung S25+
  // -----------------------------
  {
    id: "s25-plus",
    name: "Samsung S25+",
    category: "sseries",
    colors: ["Black", "White"], // update official colors later
    images: {
      Black: "/images/s25-plus/black.png",
      White: "/images/s25-plus/white.png"
    },
    variants: [
      { storage: "256GB", price: 3500000 }
    ]
  },
  // -----------------------------
  // Samsung S25
  // -----------------------------
  {
    id: "s25",
    name: "Samsung S25",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors, can update later
    images: {
      Black: "/images/s25/black.png",
      White: "/images/s25/white.png"
    },
    variants: [
      { storage: "128GB", price: 3200000 }
    ]
  },
  // -----------------------------
  // Samsung S24 Ultra
  // -----------------------------
  {
    id: "s24-ultra",
    name: "Samsung S24 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // placeholder, update later
    images: {
      Black: "/images/s24-ultra/black.png",
      White: "/images/s24-ultra/white.png"
    },
    variants: [
      { storage: "256GB", price: 3700000 },
      { storage: "512GB", price: 3800000 }
    ]
  },
  // -----------------------------
  // Samsung S24+
  // -----------------------------
  {
    id: "s24-plus",
    name: "Samsung S24+",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors, update later
    images: {
      Black: "/images/s24-plus/black.png",
      White: "/images/s24-plus/white.png"
    },
    variants: [
      { storage: "256GB", price: 2900000 }
    ]
  },
  // -----------------------------
  // Samsung S24
  // -----------------------------
  {
    id: "s24",
    name: "Samsung S24",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors, update later
    images: {
      Black: "/images/s24/black.png",
      White: "/images/s24/white.png"
    },
    variants: [
      { storage: "128GB", price: 2500000 },
      { storage: "256GB", price: 2800000 }
    ]
  },
  // -----------------------------
  // Samsung S23 Ultra
  // -----------------------------
  {
    id: "s23-ultra",
    name: "Samsung S23 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // placeholder, update later
    images: {
      Black: "/images/s23-ultra/black.png",
      White: "/images/s23-ultra/white.png"
    },
    variants: [
      { storage: "256GB", price: 2800000 },
      { storage: "512GB", price: 3000000 }
    ]
  },
  // -----------------------------
  // Samsung S23+
  // -----------------------------
  {
    id: "s23-plus",
    name: "Samsung S23+",
    category: "sseries",
    colors: ["Black", "White"], // placeholder, update later
    images: {
      Black: "/images/s23-plus/black.png",
      White: "/images/s23-plus/white.png"
    },
    variants: [
      { storage: "256GB", price: 2300000 },
      { storage: "512GB", price: 2400000 }
    ]
  },
  // -----------------------------
  // Samsung S23
  // -----------------------------
  {
    id: "s23",
    name: "Samsung S23",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors, update later
    images: {
      Black: "/images/s23/black.png",
      White: "/images/s23/white.png"
    },
    variants: [
      { storage: "128GB", price: 2200000 },
      { storage: "256GB", price: 2350000 }
    ]
  },
  // -----------------------------
  // Samsung S22 Ultra
  // -----------------------------
  {
    id: "s22-ultra",
    name: "Samsung S22 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // placeholder, update later
    images: {
      Black: "/images/s22-ultra/black.png",
      White: "/images/s22-ultra/white.png"
    },
    variants: [
      { storage: "128GB", price: 2200000 },
      { storage: "256GB", price: 2400000 }
    ]
  },
  // -----------------------------
  // Samsung S22+
  // -----------------------------
  {
    id: "s22-plus",
    name: "Samsung S22+",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s22-plus/black.png",
      White: "/images/s22-plus/white.png"
    },
    variants: [
      { storage: "128GB", price: 1800000 },
      { storage: "256GB", price: 1900000 }
    ]
  },
  // -----------------------------
  // Samsung S22
  // -----------------------------
  {
    id: "s22",
    name: "Samsung S22",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s22/black.png",
      White: "/images/s22/white.png"
    },
    variants: [
      { storage: "128GB", price: 1700000 },
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung S21 Ultra
  // -----------------------------
  {
    id: "s21-ultra",
    name: "Samsung S21 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s21-ultra/black.png",
      White: "/images/s21-ultra/white.png"
    },
    variants: [
      { storage: "128GB", price: 2000000 },
      { storage: "256GB", price: 2150000 }
    ]
  },
  // -----------------------------
  // Samsung S21+
  // -----------------------------
  {
    id: "s21-plus",
    name: "Samsung S21+",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s21-plus/black.png",
      White: "/images/s21-plus/white.png"
    },
    variants: [
      { storage: "128GB", price: 1700000 },
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung S21
  // -----------------------------
  {
    id: "s21",
    name: "Samsung S21",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s21/black.png",
      White: "/images/s21/white.png"
    },
    variants: [
      { storage: "128GB", price: 1700000 },
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung S20 Ultra
  // -----------------------------
  {
    id: "s20-ultra",
    name: "Samsung S20 Ultra",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s20-ultra/black.png",
      White: "/images/s20-ultra/white.png"
    },
    variants: [
      { storage: "128GB", price: 1800000 },
      { storage: "256GB", price: 1900000 }
    ]
  },
  // -----------------------------
  // Samsung S20+
  // -----------------------------
  {
    id: "s20-plus",
    name: "Samsung S20+",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s20-plus/black.png",
      White: "/images/s20-plus/white.png"
    },
    variants: [
      { storage: "128GB", price: 1600000 },
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung S20
  // -----------------------------
  {
    id: "s20",
    name: "Samsung S20",
    category: "sseries",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/s20/black.png",
      White: "/images/s20/white.png"
    },
    variants: [
      { storage: "128GB", price: 1550000 },
      { storage: "256GB", price: 1650000 }
    ]
  },

  // -----------------------------
  // Samsung Galaxy Fold 7
  // -----------------------------
  {
    id: "fold-7",
    name: "Samsung Galaxy Fold 7",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/fold-7/black.png",
      White: "/images/fold-7/white.png"
    },
    variants: [
      { storage: "256GB", price: 6400000 },
      { storage: "512GB", price: 6600000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Fold 6
  // -----------------------------
  {
    id: "fold-6",
    name: "Samsung Galaxy Fold 6",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/fold-6/black.png",
      White: "/images/fold-6/white.png"
    },
    variants: [
      { storage: "256GB", price: 3900000 },
      { storage: "512GB", price: 4000000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Fold 5
  // -----------------------------
  {
    id: "fold-5",
    name: "Samsung Galaxy Fold 5",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/fold-5/black.png",
      White: "/images/fold-5/white.png"
    },
    variants: [
      { storage: "256GB", price: 3100000 },
      { storage: "512GB", price: 3300000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Fold 4
  // -----------------------------
  {
    id: "fold-4",
    name: "Samsung Galaxy Fold 4",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/fold-4/black.png",
      White: "/images/fold-4/white.png"
    },
    variants: [
      { storage: "256GB", price: 2700000 },
      { storage: "512GB", price: 2800000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Fold 3
  // -----------------------------
  {
    id: "fold-3",
    name: "Samsung Galaxy Fold 3",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/fold-3/black.png",
      White: "/images/fold-3/white.png"
    },
    variants: [
      { storage: "256GB", price: 2500000 },
      { storage: "512GB", price: 2600000 }
    ]
  },

  // -----------------------------
  // Samsung Galaxy Fold 2
  // -----------------------------
  {
    id: "fold-2",
    name: "Samsung Galaxy Fold 2",
    category: "foldflip",
    colors: ["Black", "Brown"], // placeholder colors
    images: {
      Black: "/images/fold-2/black.png",
      Brown: "/images/fold-2/brown.png"
    },
    variants: [
      { storage: "256GB", price: 2300000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 7
  // -----------------------------
  {
    id: "flip-7",
    name: "Samsung Galaxy Flip 7",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-7/black.png",
      White: "/images/flip-7/white.png"
    },
    variants: [
      { storage: "256GB", price: 3800000 }
    ]
  },

  // -----------------------------
  // Samsung Galaxy Flip 6
  // -----------------------------
  {
    id: "flip-6",
    name: "Samsung Galaxy Flip 6",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-6/black.png",
      White: "/images/flip-6/white.png"
    },
    variants: [
      { storage: "256GB", price: 2700000 },
      { storage: "512GB", price: 2800000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 5
  // -----------------------------
  {
    id: "flip-5",
    name: "Samsung Galaxy Flip 5",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-5/black.png",
      White: "/images/flip-5/white.png"
    },
    variants: [
      { storage: "256GB", price: 2300000 },
      { storage: "512GB", price: 2400000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 4
  // -----------------------------
  {
    id: "flip-4",
    name: "Samsung Galaxy Flip 4",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-4/black.png",
      White: "/images/flip-4/white.png"
    },
    variants: [
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 3
  // -----------------------------
  {
    id: "flip-3",
    name: "Samsung Galaxy Flip 3",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-3/black.png",
      White: "/images/flip-3/white.png"
    },
    variants: [
      { storage: "256GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 2
  // -----------------------------
  {
    id: "flip-2",
    name: "Samsung Galaxy Flip 2",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-2/black.png",
      White: "/images/flip-2/white.png"
    },
    variants: [
      { storage: "256GB", price: 1700000 }
    ]
  },
  // -----------------------------
  // Samsung Galaxy Flip 1
  // -----------------------------
  {
    id: "flip-1",
    name: "Samsung Galaxy Flip 1",
    category: "foldflip",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/flip-1/black.png",
      White: "/images/flip-1/white.png"
    },
    variants: [
      { storage: "256GB", price: 1683000 }
    ]
  },
  // -----------------------------
  // Google Pixel 9
  // -----------------------------
  {
    id: "pixel-9",
    name: "Google Pixel 9",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors for now
    images: {
      Black: "/images/pixel-9/black.png",
      White: "/images/pixel-9/white.png"
    },
    variants: [
      { storage: "128GB", price: 2900000 }
    ]
  },  // -----------------------------
  // Google Pixel 9 Pro
  // -----------------------------
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro",
    category: "pixel",
    colors: ["Black", "White"], // placeholder until images are added
    images: {
      Black: "/images/pixel-9-pro/black.png",
      White: "/images/pixel-9-pro/white.png"
    },
    variants: [
      { storage: "256GB", price: 3700000 }
    ]
  },
  // -----------------------------
  // Google Pixel 8A
  // -----------------------------
  {
    id: "pixel-8a",
    name: "Google Pixel 8A",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/pixel-8a/black.png",
      White: "/images/pixel-8a/white.png"
    },
    variants: [
      { storage: "128GB", price: 2300000 }
    ]
  },
  // -----------------------------
  // Google Pixel 8
  // -----------------------------
  {
    id: "pixel-8",
    name: "Google Pixel 8",
    category: "pixel",
    colors: ["Black", "White"], // temporary colors until images added
    images: {
      Black: "/images/pixel-8/black.png",
      White: "/images/pixel-8/white.png"
    },
    variants: [
      { storage: "128GB", price: 2500000 },
      { storage: "256GB", price: 2700000 }
    ]
  },
  // -----------------------------
  // Google Pixel 8 Pro
  // -----------------------------
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    category: "pixel",
    colors: ["Black", "White"], // placeholder until images added
    images: {
      Black: "/images/pixel-8-pro/black.png",
      White: "/images/pixel-8-pro/white.png"
    },
    variants: [
      { storage: "128GB", price: 2900000 },
      { storage: "256GB", price: 3000000 },
      { storage: "512GB", price: 3200000 }
    ]
  },
  // -----------------------------
  // Google Pixel 7
  // -----------------------------
  {
    id: "pixel-7",
    name: "Google Pixel 7",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors for now
    images: {
      Black: "/images/pixel-7/black.png",
      White: "/images/pixel-7/white.png"
    },
    variants: [
      { storage: "128GB", price: 1950000 },
      { storage: "256GB", price: 2100000 }
    ]
  },
  // -----------------------------
  // Google Pixel 7A
  // -----------------------------
  {
    id: "pixel-7a",
    name: "Google Pixel 7A",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/pixel-7a/black.png",
      White: "/images/pixel-7a/white.png"
    },
    variants: [
      { storage: "128GB", price: 1800000 }
    ]
  },
  // -----------------------------
  // Google Pixel 7 Pro
  // -----------------------------
  {
    id: "pixel-7-pro",
    name: "Google Pixel 7 Pro",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/pixel-7-pro/black.png",
      White: "/images/pixel-7-pro/white.png"
    },
    variants: [
      { storage: "128GB", price: 2100000 },
      { storage: "256GB", price: 2200000 }
    ]
  },


  // -----------------------------
  // Google Pixel 6
  // -----------------------------
  {
    id: "pixel-6",
    name: "Google Pixel 6",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/pixel-6/black.png",
      White: "/images/pixel-6/white.png"
    },
    variants: [
      { storage: "128GB", price: 1900000 },
      { storage: "256GB", price: 2000000 }
    ]
  },
  // -----------------------------
  // Google Pixel 6A
  // -----------------------------
  {
    id: "pixel-6a",
    name: "Google Pixel 6A",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors
    images: {
      Black: "/images/pixel-6a/black.png",
      White: "/images/pixel-6a/white.png"
    },
    variants: [
      { storage: "128GB", price: 1700000 }
    ]
  },
  // -----------------------------
  // Google Pixel 6 Pro
  // -----------------------------
  {
    id: "pixel-6-pro",
    name: "Google Pixel 6 Pro",
    category: "pixel",
    colors: ["Black", "White"], // placeholder colors until images added
    images: {
      Black: "/images/pixel-6-pro/black.png",
      White: "/images/pixel-6-pro/white.png"
    },
    variants: [
      { storage: "128GB", price: 2100000 },
      { storage: "256GB", price: 2200000 },
      { storage: "512GB", price: 2300600 }
    ]
  },
];














