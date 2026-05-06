const API = "https://api.freeapi.app/api/v1/public/randomproducts";

const container = document.getElementById("products");
const loading = document.getElementById("loading");

async function fetchProducts() {
  try {
    const res = await fetch(API);
    const json = await res.json();

    console.log("API Response:", json); // DEBUG IMPORTANT

    // ✅ FIX: nested structure handle
    const products = json?.data?.data || json?.data || [];

    if (!products.length) {
      loading.innerText = "No products found";
      return;
    }

    loading.style.display = "none";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" />
        <div class="title">${product.title}</div>
        <div class="desc">${product.description?.slice(0, 60) || ""}...</div>
        <div class="price">₹ ${product.price}</div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.log("Error:", error);
    loading.innerText = "Failed to load products";
  }
}

fetchProducts();