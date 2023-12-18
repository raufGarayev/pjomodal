const API_URL = "https://fakestoreapi.com";

const OpenModal = document.querySelector(".modal");
const productsContainer = document.querySelector(".products");

const fetchAllProducts = () => {
  const res = fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.setAttribute("data-id", product.id);
        productItem.classList = "products-item";
        productItem.innerHTML = `
                    <div class="products-item_img" data-id=${product.id}>
                        <img src=${product.image} alt=${product.title} data-id=${product.id}>
                    </div>

                    <p data-id=${product.id}>${product.title}</p>

                    <div class="products-item_bottom" data-id=${product.id}>
                        <span data-id=${product.id}>${product.category}</span>
                        <span data-id=${product.id}>${product.price} AZN</span>
                    </div>
                `;
        productsContainer.appendChild(productItem);

        productItem.addEventListener("click", function (e) {
          console.log(e.target);
          const productId = e.target.getAttribute("data-id");

          fetch(`${API_URL}/products/${productId}`)
            .then((res) => res.json())
            .then((productData) => {
              const modalContent = document.createElement("div");
              modalContent.innerHTML = `
                                <h2>${productData.title}</h2>
                                <img src="${productData.image}" alt="${productData.title}">
                                <p>${productData.description}</p>
                                <p>Price: ${productData.price} AZN</p>
                                <button class="close-modal">Close</button>
                            `;

              const modalOverlay = document.createElement("div");
              modalOverlay.classList.add("modal-overlay");
              modalOverlay.appendChild(modalContent);

              OpenModal.appendChild(modalOverlay);
              OpenModal.style.display = "block";

              const closeModalButton =
                modalContent.querySelector(".close-modal");
              closeModalButton.addEventListener("click", function () {
                OpenModal.removeChild(modalOverlay);
                OpenModal.style.display = "none";
              });
              console.log(productData);
            })
            .catch((error) => {
              console.error("Ürün getirme hatası:", error);
            });
        });
      });
    });
};

fetchAllProducts();
