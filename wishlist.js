document.addEventListener("DOMContentLoaded", async () => {
    const wishlistContainer = document.getElementById("wishlist-items");
    let authToken = localStorage.getItem("authToken");

    if (!authToken) {
        wishlistContainer.innerHTML = "<p>Please log in to view your wishlist.</p>";
        return;
    }

    try {
        const [wishlistResponse, allProductsResponse] = await Promise.all([
            fetch("https://ecommerce-deploy-pwez.onrender.com/get-likes", {
                headers: { "Authorization": `Bearer ${authToken}` }
            }),
            fetch("https://ecommerce-deploy-pwez.onrender.com/products")
        ]);

        if (wishlistResponse.status === 401) {
            localStorage.removeItem("authToken"); // Remove expired token
            wishlistContainer.innerHTML = "<p>Your session has expired. Please log in again.</p>";
            return;
        }

        if (!wishlistResponse.ok || !allProductsResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const likedProducts = await wishlistResponse.json();
        const allProductsData = await allProductsResponse.json();

        if (!Array.isArray(likedProducts)) {
            throw new Error("Invalid response format"); 
        }

        if (!likedProducts.length) {
            wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
            return;
        }

        if (!allProductsData?.data) throw new Error("Invalid product data");

        const wishlistProducts = allProductsData.data.filter(product => likedProducts.includes(product._id));

        wishlistContainer.innerHTML = wishlistProducts.map(product => `
            <div class="wishlist-item" data-id="${product._id}">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
                <button class="remove-btn" data-product-id="${product._id}">Remove</button>
            </div>
        `).join("");

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const productId = event.target.dataset.productId;
                try {
                    const removeResponse = await fetch(`https://ecommerce-deploy-pwez.onrender.com/productlike/${productId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`
                        }
                    });

                    if (removeResponse.status === 401) {
                        localStorage.removeItem("authToken"); // Remove expired token
                        alert("Your session has expired. Please log in again.");
                        return;
                    } 

                    if (!removeResponse.ok) throw new Error("Failed to remove item");

                    document.querySelector(`.wishlist-item[data-id='${productId}']`).remove();

                    if (!document.querySelector(".wishlist-item")) {
                        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
                    }
                } catch (error) {
                    console.error("Error removing item:", error);
                    alert("Failed to remove item. Please try again.");
                }
            });
        });
    } catch (error) {
        console.error("Error loading wishlist:", error);
        wishlistContainer.innerHTML = "<p>Failed to load wishlist. Please try again.</p>";
    }
});

// Ensure users are logged in before liking a product
function addToWishlist(productId) {
    let authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Please log in to add items to your wishlist.");
        return;
    }

    fetch(`https://ecommerce-deploy-pwez.onrender.com/productlike/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    }).then(response => {
        if (response.status === 401) {
            localStorage.removeItem("authToken"); // Remove expired token
            alert("Your session has expired. Please log in again.");
            return;
        }

        if (!response.ok) throw new Error("Failed to add to wishlist");
        alert("Item added to wishlist");
    }).catch(error => {
        console.error("Error adding to wishlist:", error);
        alert("Failed to add item. Please try again.");
    });
}
