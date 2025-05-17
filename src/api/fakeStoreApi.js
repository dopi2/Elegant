// src/api/fakeStoreApi.js
const API_BASE = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    const data = await response.json();
    // Enhance the product data with additional fields we need
    return data.map(product => ({
      ...product,
      colors: ['Black', 'White', 'Blue', 'Red', 'Green'].slice(0, Math.floor(Math.random() * 3) + 1),
      sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 3) + 2),
      priceRange: getPriceRange(product.price),
      category: capitalizeFirstLetter(product.category),
      rating: Math.floor(product.rating.rate),
      isNew: Math.random() > 0.7,
      isBestSeller: Math.random() > 0.8
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const product = await response.json();
    // Enhance the single product data
    return {
      ...product,
      colors: ['Black', 'White', 'Blue', 'Red', 'Green'].slice(0, Math.floor(Math.random() * 3) + 1),
      sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 3) + 2),
      priceRange: getPriceRange(product.price),
      category: capitalizeFirstLetter(product.category),
      rating: Math.floor(product.rating.rate),
      isNew: Math.random() > 0.7,
      isBestSeller: Math.random() > 0.8,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const getPriceRange = (price) => {
  if (price < 50) return "$0 - $50";
  if (price < 100) return "$50 - $100";
  if (price < 200) return "$100 - $200";
  return "$200+";
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};