// Liste des produits du site.
// Chaque produit a EXACTEMENT les mêmes champs, pour que
// ProductCard, ProductDetail et le panier fonctionnent pour tous.
export const products = [
  // ---------- PC portables ----------
  {
    id: 1,
    name: "Laptop Pro 15",
    category: "PC portables",
    price: 450000,
    image: "/images/laptop-pro.jpg",
    description: "Intel Core i7, 16 Go RAM, SSD 512 Go, écran 15,6 pouces Full HD.",
    stock: 12,
  },
  {
    id: 2,
    name: "Laptop Essentiel 14",
    category: "PC portables",
    price: 280000,
    image: "/images/laptop-essentiel.jpg",
    description: "Intel Core i3, 8 Go RAM, SSD 256 Go, idéal pour les études.",
    stock: 20,
  },
  {
    id: 3,
    name: "Laptop Gamer X17",
    category: "PC portables",
    price: 750000,
    image: "/images/laptop-gamer.jpg",
    description: "Intel Core i7, 16 Go RAM, RTX 4050, écran 144 Hz.",
    stock: 6,
  },

  // ---------- PC de bureau ----------
  {
    id: 4,
    name: "PC Bureau Office",
    category: "PC de bureau",
    price: 220000,
    image: "/images/pc-office.jpg",
    description: "Intel Core i5, 8 Go RAM, SSD 256 Go, pour le travail de bureau.",
    stock: 10,
  },
  {
    id: 5,
    name: "PC Bureau Gamer",
    category: "PC de bureau",
    price: 620000,
    image: "/images/pc-gamer.jpg",
    description: "Ryzen 5, 16 Go RAM, RTX 4060, SSD 1 To, boîtier RGB.",
    stock: 5,
  },
  {
    id: 6,
    name: "Mini PC Compact",
    category: "PC de bureau",
    price: 190000,
    image: "/images/mini-pc.jpg",
    description: "Format ultra compact, Intel N100, 8 Go RAM, SSD 256 Go.",
    stock: 14,
  },

  // ---------- Composants ----------
  {
    id: 7,
    name: "SSD 1 To NVMe",
    category: "Composants",
    price: 65000,
    image: "/images/ssd-1to.jpg",
    description: "Vitesse de lecture jusqu'à 3500 Mo/s.",
    stock: 25,
  },
  {
    id: 8,
    name: "Barrette RAM 16 Go DDR4",
    category: "Composants",
    price: 45000,
    image: "/images/ram-16go.jpg",
    description: "Mémoire DDR4 3200 MHz pour PC de bureau.",
    stock: 30,
  },
  {
    id: 9,
    name: "Disque dur externe 2 To",
    category: "Composants",
    price: 55000,
    image: "/images/disque-externe.jpg",
    description: "USB 3.0, compatible Windows et Mac.",
    stock: 18,
  },

  // ---------- Accessoires ----------
  {
    id: 10,
    name: "Souris sans fil X1",
    category: "Accessoires",
    price: 8000,
    image: "/images/souris-x1.jpg",
    description: "Souris optique sans fil, 1600 DPI.",
    stock: 40,
  },
  {
    id: 11,
    name: "Clavier mécanique RGB",
    category: "Accessoires",
    price: 28000,
    image: "/images/clavier-rgb.jpg",
    description: "Switches rouges, rétroéclairage RGB, format AZERTY.",
    stock: 22,
  },
  {
    id: 12,
    name: "Casque Gaming USB",
    category: "Accessoires",
    price: 22000,
    image: "/images/casque-gaming.jpg",
    description: "Son surround 7.1, micro antibruit.",
    stock: 16,
  },
  {
    id: 13,
    name: "Sac à dos pour ordinateur",
    category: "Accessoires",
    price: 15000,
    image: "/images/sac-pc.jpg",
    description: "Compatible jusqu'à 15,6 pouces, résistant à l'eau.",
    stock: 35,
  },

  // ---------- Écrans ----------
  {
    id: 14,
    name: "Écran 24 pouces Full HD",
    category: "Écrans",
    price: 95000,
    image: "/images/ecran-24.jpg",
    description: "Dalle IPS, 75 Hz, entrées HDMI et VGA.",
    stock: 15,
  },
  {
    id: 15,
    name: "Écran Gamer 27 pouces 144 Hz",
    category: "Écrans",
    price: 185000,
    image: "/images/ecran-27.jpg",
    description: "Résolution 2K, temps de réponse 1 ms.",
    stock: 8,
  },

  // ---------- Électronique ----------
  {
    id: 16,
    name: "Smartphone Nova 128 Go",
    category: "Électronique",
    price: 150000,
    image: "/images/smartphone-nova.jpg",
    description: "Écran AMOLED 6,5 pouces, 6 Go RAM, double SIM.",
    stock: 20,
  },
  {
    id: 17,
    name: "Tablette Tab 10",
    category: "Électronique",
    price: 120000,
    image: "/images/tablette.jpg",
    description: "Écran 10 pouces, 4 Go RAM, 64 Go de stockage.",
    stock: 12,
  },
  {
    id: 18,
    name: "Enceinte Bluetooth Boom",
    category: "Électronique",
    price: 25000,
    image: "/images/enceinte.jpg",
    description: "Étanche, 12 heures d'autonomie.",
    stock: 28,
  },
];

// Liste des catégories SANS doublons, calculée automatiquement.
// .map() récupère la catégorie de chaque produit,
// new Set() supprime les doublons,
// [...] retransforme le Set en tableau.
export const categories = [...new Set(products.map((p) => p.category))];