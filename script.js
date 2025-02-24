// QUESTION TOGGLES
document.addEventListener('sharedLayoutLoaded', function() {
  let icon = document.querySelector('.fa-circle-question');

  icon.addEventListener('click', function() {
      this.classList.toggle('active');
  });
});


//NAVBAR 
document.addEventListener('sharedLayoutLoaded', () => {
// NAVBAR
let menu = document.getElementById("navbar");
let openNav = document.getElementById("open");
let closeNav = document.getElementById("close");
let filterToggle = document.querySelector(".filter-toggle"); // Select the filter-toggle element

const handleResize = () => {
  const isSmallScreen = window.innerWidth <= 600;

  // Show filter-toggle only when the menu is closed on small screens
  if (!menu.classList.contains("open") && isSmallScreen) {
    filterToggle.style.display = "block";
  } else {
    filterToggle.style.display = "none";
  }
};

openNav.addEventListener('click', function () {
  if (menu.classList.contains("closing") || !menu.classList.contains("open")) {
    menu.classList.remove("closing");
    menu.classList.add("open");
    menu.style.visibility = "visible"; // Ensure it's visible

    // Hide the filter-toggle when the menu is opened
    if (filterToggle) {
      filterToggle.style.display = "none";
    }
  }
});

closeNav.addEventListener('click', function () {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("closing");

    // Use a timeout to hide the element after the animation completes
    setTimeout(function () {
      menu.style.visibility = "hidden";

      // Show filter-toggle only on small screens when the menu is closed
      handleResize();
    }, 500); // Match this to the duration of your CSS transition
  }
});

// Check screen size on resize
window.addEventListener("resize", handleResize);

// Initial check on page load
handleResize();
});




//CART SETTINGS
document.addEventListener('sharedLayoutLoaded', () => {
  const cartIcon = document.getElementById('fa-cart-shopping');
  const cartList = document.getElementById('cartList');
  const closeCartBtn = document.getElementById('closecartbtn');

  cartIcon.addEventListener('click', () => {
      cartList.classList.remove('close'); // Remove the close animation class if it exists
      cartList.classList.add('open');
      cartList.style.display = 'flex';
  });

  closeCartBtn.addEventListener('click', () => {
      cartList.classList.remove('open'); // Remove the open animation class if it exists
      cartList.classList.add('close');
      
      // Wait for the animation to finish before hiding the cart list
      setTimeout(() => {
          cartList.style.display = 'none';
      }, 300); // Duration of the slideOut animation
  });
});


//REGISTER USER TOGGLE
document.addEventListener('sharedLayoutLoaded', () => {
const formContainer = document.querySelector(".form-container");

// Toggle form visibility when the register button is clicked
document.querySelector(".register").addEventListener("click", () => {
  formContainer.classList.toggle("active");
});

// Close form functionality
const closeFormButton = document.querySelector(".close-form");
closeFormButton.addEventListener("click", () => {
  formContainer.classList.remove("active"); // Hide the form by removing the active class
});

// REGISTER USER SCRIPT
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const gender = document.getElementById("gender").value;
  const messageContainer = document.getElementById("registerMessage");
  const spinner = document.getElementById("spinner");

  spinner.style.display = "block"; // Show the spinner

  // Clear previous messages
  messageContainer.textContent = "";
  messageContainer.className = "";

  if (!name || !email || !password || !gender) {
    spinner.classList.add("hiddenSpin"); // Hide spinner
    messageContainer.textContent = "All fields are required!";
    messageContainer.className = "error-message"; // Add red styling
    return;
  }

  try {
    const response = await fetch("https://ecommerce-deploy-pwez.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, gender }),
    });

    const result = await response.json();
    if (response.ok) {
      messageContainer.textContent = result.message || "Registration successful!";
      messageContainer.className = "success-message"; // Add green styling
      document.getElementById("registerForm").reset();
      // Add the fade-out class after 3 seconds
      setTimeout(() => {
        messageContainer.classList.add("fade-out");

        // Reset after fade-out animation completes
        setTimeout(() => {
          messageContainer.textContent = "";
          messageContainer.className = ""; // Reset styling
        }, 1000); // Match the animation duration (1s)
      }, 3000); // Delay before fade-out starts
    } else {
      messageContainer.textContent = result.message || "Registration failed.";
      messageContainer.className = "error-message"; // Add red styling
      // Add the fade-out class after 3 seconds
      setTimeout(() => {
        messageContainer.classList.add("fade-out");

        // Reset after fade-out animation completes
        setTimeout(() => {
          messageContainer.textContent = "";
          messageContainer.className = ""; // Reset styling
        }, 1000); // Match the animation duration (1s)
      }, 3000); // Delay before fade-out starts
    }
  } catch (error) {
    console.error("Error:", error);
    messageContainer.textContent = "An error occurred. Please try again.";
    messageContainer.className = "error-message"; // Add red styling
    // Add the fade-out class after 3 seconds
    setTimeout(() => {
      messageContainer.classList.add("fade-out");

      // Reset after fade-out animation completes
      setTimeout(() => {
        messageContainer.textContent = "";
        messageContainer.className = ""; // Reset styling
      }, 1000); // Match the animation duration (1s)
    }, 3000); // Delay before fade-out starts
  } finally {
    // Hide spinner after completion
    spinner.style.display = "none";
  }
});
});






// Toggle between forms
document.addEventListener('sharedLayoutLoaded', () => {
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm"); // Assuming registerForm exists

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active-tab");
  registerTab.classList.remove("active-tab");
  loginForm.style.display = "block";
  if (registerForm) registerForm.style.display = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active-tab");
  loginTab.classList.remove("active-tab");
  if (registerForm) registerForm.style.display = "block";
  loginForm.style.display = "none";
});

// Handle login submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const messageContainer = document.getElementById("loginMessage");
  const spinnerLogin = document.getElementById("loginSpinner");

  spinnerLogin.style.display = "block"; // Show the spinner

  // Clear messages
  messageContainer.textContent = "";
  messageContainer.className = "";

  if (!email || !password) {
    messageContainer.textContent = "Both fields are required!";
    messageContainer.className = "error-message";
    spinnerLogin.classList.add("hiddenSpin"); // Hide spinner
    addFadeOutEffect(messageContainer); // Add fade-out effect
    return;
  }

  try {
    const response = await fetch("https://ecommerce-deploy-pwez.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userId", result.user.id);

      messageContainer.textContent = "Login successful!";
      messageContainer.className = "success-message";
      addFadeOutEffect(messageContainer); // Add fade-out effect
      loginForm.reset(); // Reset the login form fields

      // Redirect or other logic can be added here
    } else {
      messageContainer.textContent = result.message || "Login failed!";
      messageContainer.className = "error-message";
      addFadeOutEffect(messageContainer); // Add fade-out effect
    }
  } catch (error) {
    console.error("Error:", error);
    messageContainer.textContent = "An error occurred. Please try again.";
    messageContainer.className = "error-message";
    addFadeOutEffect(messageContainer); // Add fade-out effect
  } finally {
    // Hide spinner after completion
    spinnerLogin.style.display = "none";
  }
});

/**
 * Adds a fade-out effect to the message container.
 * @param {HTMLElement} element - The message container element.
 */
function addFadeOutEffect(element) {
  setTimeout(() => {
    element.classList.add("fade-out");
    // Remove the message completely after the animation ends
    setTimeout(() => {
      element.textContent = "";
      element.className = ""; // Reset styling
      element.classList.remove("fade-out");
    }, 1000); // Match the animation duration (1s)
  }, 3000); // Delay before fade-out starts
}
});



// PASSWORD TOGGLE
document.addEventListener('sharedLayoutLoaded', () => {
// PASSWORD TOGGLE
const passwordToggles = document.querySelectorAll(".toggle-password");

passwordToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    const passwordField = e.target.closest('.password-container').querySelector('input');
    const isPasswordVisible = passwordField.type === "text";
    
    // Toggle password field type
    passwordField.type = isPasswordVisible ? "password" : "text";
    
    // Toggle the icon based on the new visibility state
    if (passwordField.type === "text") {
      e.target.classList.remove("fa-eye");
      e.target.classList.add("fa-eye-slash");
    } else {
      e.target.classList.remove("fa-eye-slash");
      e.target.classList.add("fa-eye");
    }
  });
});
});



// Handle Add to Cart button click
document.addEventListener('sharedLayoutLoaded', () => {
document.querySelector('.product-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = event.target.dataset.productId;
    const productName = event.target.dataset.name;
    const productImage = event.target.dataset.image;
    const productPrice = event.target.parentElement.previousElementSibling.textContent.replace('$', '');
    const quantity = 1;

    if (!productId) {
      alert('Product ID is missing!');
      return;
    }

    // Optimistically update the cart product count
    const cartProductCount = document.querySelector('#cart-product');
    const currentCount = parseInt(cartProductCount.textContent, 10) || 0;
    cartProductCount.textContent = currentCount + 1;
    // Retrieve authToken from localStorage
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('You need to be logged in to add items to the cart.');
      return;
    }

    fetch('https://ecommerce-deploy-pwez.onrender.com/add-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`, // Add the token to the Authorization header
      },
      body: JSON.stringify({
        productId,
        name: productName,
        image: productImage,
        price: parseFloat(productPrice),
        quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed to add product to cart');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.cart) {
          updateCartUI(data.cart);
        } else {
          alert(data.message || 'Unexpected response from server');
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error.message);
        alert(error.message || 'An error occurred while adding to cart.');

        // Revert UI changes in case of an error
        cartProductCount.textContent = currentCount;
      });
  }
});
});


// Handle Increment and Decrement button clicks inside the cart
document.addEventListener('sharedLayoutLoaded', () => {
document.querySelector('#cartItems').addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.classList.contains('fa-plus') || event.target.classList.contains('fa-minus')) {
    const productId = event.target.dataset.productId;
    const action = event.target.classList.contains('fa-plus') ? 'increment' : 'decrement';
    const quantitySpan = event.target.classList.contains('fa-plus')
      ? event.target.nextElementSibling
      : event.target.previousElementSibling;
    const currentQuantity = parseInt(quantitySpan.textContent, 10);

    if (!productId) {
      alert('Product ID is missing!');
      return;
    }
    // Retrieve authToken from localStorage
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('You need to be logged in to update the cart.');
      return;
    }


    // Optimistically update the UI
    const newQuantity = action === 'increment' ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);
    quantitySpan.textContent = newQuantity;

    const endpoint = action === 'increment' ? '/add-cart' : '/cart-decrease';
    const payload = { productId };
    if (action === 'increment') payload.quantity = 1;

    fetch(`https://ecommerce-deploy-pwez.onrender.com${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`, 
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed to update cart');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.cart) {
          updateCartUI(data.cart);
        } else {
          alert('Unexpected response from server. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating cart:', error.message);
        alert(error.message || 'An error occurred while updating the cart.');

        // Revert the UI if the operation fails
        quantitySpan.textContent = currentQuantity;
      });
  }
});
});



// Function to dynamically update the cart UI
function updateCartUI(cart) {
const cartItemsContainer = document.querySelector('#cartItems'); 
const cartProductCount = document.querySelector('#cart-product'); 
cartItemsContainer.textContent = 'Shopping Cart'; 
let totalPrice = 0; 
let totalItems = 0;


if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
  cartItemsContainer.textContent = 'Your cart is empty.'; 
  document.getElementById('cartTotal').textContent = '0.00'; 
  cartProductCount.textContent = '0'; 
  return;
} 

// Iterate through each item in the cart
cart.items.forEach((item) => {
  const product = item.productId; 

  
  if (!product || !product.image || !product.name || typeof item.price !== 'number') {
    console.warn('Skipping invalid cart item:', item);
    return; 
  }

  // Create a container for the cart item
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('cartList-products');


  const roundedPrice = item.price.toFixed(2)

  itemDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h4>${product.name}</h4>
    <p>$${roundedPrice}</p>
    <div class="productList-buttons">
      <i class="fa-solid fa-plus" data-product-id="${product._id}"></i>
      <span>${item.quantity}</span>
      <i class="fa-solid fa-minus" data-product-id="${product._id}"></i>
    </div>
  `;

  cartItemsContainer.appendChild(itemDiv); 
  totalPrice += parseFloat(roundedPrice); 
  totalItems += item.quantity; 
});

// Update the total price in the UI, rounded to 2 decimal places
document.getElementById('cartTotal').textContent = totalPrice.toFixed(2);

// Update the total product count in the UI
cartProductCount.textContent = totalItems.toString();
}



//FETCH Retrieve CARTS 
const fetchCart = async () => {
try {
  //  authToken from localStorage
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.warn('User is not logged in, cart will not be fetched.');
    return; // Exit gracefully without making the fetch request
  }

  const response = await fetch('https://ecommerce-deploy-pwez.onrender.com/cart', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`, // Include authToken for authentication
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Check if the error is related to being logged out
    if (errorData.message === 'You are not logged in') {
      console.warn('User is not logged in, cart will not be fetched.');
      return; // Exit gracefully without showing an alert
    }
    throw new Error(errorData.message || 'Failed to fetch cart');
  }

  const data = await response.json(); // Get the cart data
  if (data.cart) {
    updateCartUI(data.cart); // Call the existing function to update the UI with the fetched cart data
  }
} catch (error) {
  console.error('Error fetching cart:', error.message);
  // Show a less intrusive message or log the error
  if (error.message !== 'You are not logged in') {
    // alert(error.message || 'An error occurred while fetching the cart.');
  }
}
};

document.addEventListener('DOMContentLoaded', () => {
fetchCart();
});



//CLEAR CART 
document.addEventListener('sharedLayoutLoaded', () => {
document.getElementById('clearCart').addEventListener('click', async () => {
try {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.warn('User is not logged in, cart will not be fetched.');
    return; // Exit gracefully without making the fetch request
  }
    // Send DELETE request to clear cart API
    const response = await fetch('https://ecommerce-deploy-pwez.onrender.com/clear-cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Include authToken for authentication
        }
    });

    const result = await response.json();
    console.log('Response:', response); // Debugging response
    console.log('Result:', result); // Debugging result

    if (response.ok) {
        // Clear the cart items in the UI
        document.getElementById('cartItems').textContent = `
            Your cart is empty
          
        `;
        // Reset the total price in the UI
        document.getElementById('cartTotal').textContent = '0';

        document.getElementById('cart-product').textContent = '0';

        // Notify the user of success
        console.log('Cart cleared successfully!');
    } else {
        // Handle failed request
        // alert(result.message || 'Failed to clear cart.');
    }
} catch (error) {
    console.error('Error clearing cart:', error); 
}
});
});



// Select the search input, product container, and loading overlay
document.addEventListener('sharedLayoutLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const productListContainer = document.querySelector('.product-list'); 
  const clearSearchBtn = document.querySelector('.clear-search-btn');
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  // Create a single instance of loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.classList.add('loading-overlay');
  loadingOverlay.innerHTML = `<div class="search-spinner"></div>`;
  document.body.appendChild(loadingOverlay);

  // Show and hide loading overlay functions
  function showLoadingOverlay() { loadingOverlay.style.display = 'flex'; }
  function hideLoadingOverlay() { loadingOverlay.style.display = 'none'; }

  // Fetch filtered products
  const fetchFilteredProducts = async (query) => {
    try {
      showLoadingOverlay();
      const response = await fetch(`https://ecommerce-deploy-pwez.onrender.com/products?name=${encodeURIComponent(query)}`);
      const data = await response.json();
      hideLoadingOverlay();

      if (data?.data?.length) {
        displayProducts(data.data);
        attachHeartListeners();
        if (authToken) fetchLikedProducts();
        productListContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        productListContainer.innerHTML = '<p>No products found</p>';
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      hideLoadingOverlay();
      productListContainer.innerHTML = '<p>Something went wrong. Please try again.</p>';
    }
  };

  // Event listener for the Clear Search button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    fetchAllProducts();
  });

  // Display products with wishlist functionality
  function displayProducts(products) {
    productListContainer.innerHTML = ''; 
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('clothes');
      productDiv.innerHTML = `
        <div class="heart-icon" data-product-id="${product._id}">
          <i class="fa-regular fa-heart"></i>
        </div>
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <div>
          <button class="add-to-cart-btn" 
                  data-product-id="${product._id}" 
                  data-name="${product.name}" 
                  data-image="${product.image}" 
                  data-price="${product.price}">
            Add To Cart
          </button>
        </div>`;
      productListContainer.appendChild(productDiv);
    });
  }

  // Event listener for the search bar (Enter key)
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) fetchFilteredProducts(query);
    }
  });

  // Fetch all products
  function fetchAllProducts() {
    showLoadingOverlay();
    fetch('https://ecommerce-deploy-pwez.onrender.com/products')
      .then(response => response.json())
      .then(data => {
        hideLoadingOverlay();
        if (data?.data?.length) {
          displayProducts(data.data);
          attachHeartListeners();
          if (authToken) fetchLikedProducts();
        } else {
          productListContainer.innerHTML = '<p>No products available.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productListContainer.innerHTML = '<p>Something went wrong. Please try again.</p>';
        hideLoadingOverlay();
      });
  }

  // Navigate to checkout page
  document.querySelector('.checkcartbtn button').addEventListener('click', () => {
    window.location.href = '/checkout.html';
  });

  fetchAllProducts();

  // -------------------------------
  // Wishlist Functions
  // -------------------------------

  async function fetchLikedProducts() {
    try {
      const response = await fetch("https://ecommerce-deploy-pwez.onrender.com/get-likes", {
        headers: { "Authorization": `Bearer ${authToken}` }
      });

      if (!response.ok) throw new Error("Failed to fetch liked products");
      const likedProducts = await response.json();

      document.querySelectorAll(".heart-icon i").forEach(heartIcon => {
        const productId = heartIcon.closest(".heart-icon").dataset.productId;
        if (likedProducts.includes(productId)) {
          heartIcon.classList.replace("fa-regular", "fa-solid");
        } else {
          heartIcon.classList.replace("fa-solid", "fa-regular");
        }
      });
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  }

  function attachHeartListeners() {
    document.querySelectorAll(".heart-icon").forEach(heartContainer => {
      heartContainer.addEventListener("click", async () => {
        if (!authToken) {
          alert("You need to log in to like products.");
          return;
        }

        const productId = heartContainer.dataset.productId;
        const heartIcon = heartContainer.querySelector("i");

        try {
          const response = await fetch(`https://ecommerce-deploy-pwez.onrender.com/productlike/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            }
          });

          if (!response.ok) throw new Error("Failed to like/unlike product");
          const data = await response.json();

          if (data.likes.includes(userId)) {
            heartIcon.classList.replace("fa-regular", "fa-solid");
          } else {
            heartIcon.classList.replace("fa-solid", "fa-regular");
          }
        } catch (error) {
          console.error("Error liking/unliking product:", error);
        }
      });
    });
  }
});

 
// FOR FILTERING PRODUCTS
document.addEventListener('DOMContentLoaded', () => {
  // Selectors
  const productList = document.querySelector('.product-list');
  const categoryFilters = document.querySelectorAll('#category-filters input[type="checkbox"]');
  const brandFilter = document.getElementById('brand-filter');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  const resetFiltersButton = document.getElementById('reset-filters');

  // Loading overlay setup
  const loadingOverlay = document.createElement('div');
  const loadingIndicator = document.createElement('div');
  loadingOverlay.classList.add('loading-overlay');
  loadingIndicator.classList.add('search-spinner');
  loadingOverlay.appendChild(loadingIndicator);
  document.body.appendChild(loadingOverlay);

  function showLoadingOverlay() {
    loadingOverlay.style.display = 'flex';
  }

  function hideLoadingOverlay() {
    loadingOverlay.style.display = 'none';
  }

  const fetchProducts = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.categories?.length) {
        queryParams.set('category', filters.categories[0]);
      }

      if (filters.brands?.length) {
        queryParams.set('brand', filters.brands[0]);
      }

      if (filters.maxPrice) {
        queryParams.set('price', `0-${filters.maxPrice}`);
      }

      const queryString = queryParams.toString();
      const url = `https://ecommerce-deploy-pwez.onrender.com/products${queryString ? `?${queryString}` : ''}`;

      showLoadingOverlay();

      const response = await fetch(url);
      const data = await response.json();

      hideLoadingOverlay();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch products');

      return data.data;
    } catch (error) {
      hideLoadingOverlay();
      throw error;
    }
  };

  // -------------------------------
  // Wishlist Functions (for filtering section)
  // -------------------------------
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  async function fetchLikedProducts() {
    try {
      const response = await fetch("https://ecommerce-deploy-pwez.onrender.com/get-likes", {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (!response.ok) throw new Error("Failed to fetch liked products");

      const likedProducts = await response.json(); // Array of product IDs

      document.querySelectorAll(".heart-icon i").forEach(heartIcon => {
        const productId = heartIcon.closest(".heart-icon").dataset.productId;
        if (likedProducts.includes(productId)) {
          heartIcon.classList.replace("fa-regular", "fa-solid");
        }
      });
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  }

  function attachHeartListeners() {
    document.querySelectorAll(".heart-icon").forEach(heartContainer => {
      const heartIcon = heartContainer.querySelector("i");
      const productId = heartContainer.dataset.productId;
      heartContainer.addEventListener("click", async () => {
        if (!authToken) {
          alert("You need to log in to like products.");
          return;
        }
        try {
          const response = await fetch(`https://ecommerce-deploy-pwez.onrender.com/productlike/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            }
          });
          if (!response.ok) throw new Error("Failed to like/unlike product");
          const data = await response.json();
          // Toggle heart icon based on response
          if (data.likes.includes(userId)) {
            heartIcon.classList.replace("fa-regular", "fa-solid");
          } else {
            heartIcon.classList.replace("fa-solid", "fa-regular");
          }
        } catch (error) {
          console.error("Error liking/unliking product:", error);
        }
      });
    });
  }

  // Modified displayProducts to include wishlist feature
  const displayProducts = (products) => {
    productList.innerHTML = '';

    if (!products?.length) {
      productList.innerHTML = '<div class="no-results">No products found</div>';
      return;
    }

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('clothes');
      productDiv.innerHTML = `
        <div class="heart-icon" data-product-id="${product._id}">
          <i class="fa-regular fa-heart"></i>
        </div>
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <div>
          <button class="add-to-cart-btn" 
                  data-product-id="${product._id}" 
                  data-name="${product.name}" 
                  data-image="${product.image}" 
                  data-price="${product.price}">
            Add To Cart
          </button>
        </div>
      `;
      productList.appendChild(productDiv);
    });

    // Attach wishlist functionality for filtered products
    attachHeartListeners();
    if (authToken) fetchLikedProducts();
  };

  const updateProducts = async () => {
    try {
      const filters = {
        categories: Array.from(categoryFilters)
          .filter(cb => cb.checked)
          .map(cb => cb.value),
        brands: Array.from(brandFilter.selectedOptions)
          .map(opt => opt.value),
        maxPrice: priceFilter.value || 5000
      };

      const products = await fetchProducts(filters);
      displayProducts(products);
    } catch (error) {
      console.error('Update error:', error);
      productList.innerHTML = `
        <div class="error">
          Error loading products: ${error.message}
          <br>
          Please try again later.
        </div>
      `;
    }
  };

  // Attach event listeners for filters
  categoryFilters.forEach(cb => cb.addEventListener('change', updateProducts));
  brandFilter.addEventListener('change', updateProducts);
  priceFilter.addEventListener('input', () => {
    priceValue.textContent = `$${priceFilter.value}`;
  });
  priceFilter.addEventListener('change', updateProducts);
   resetFiltersButton.addEventListener('click', () => {
     categoryFilters.forEach(cb => cb.checked = false);
     brandFilter.value = '';
     priceFilter.value = 5000;
     priceValue.textContent = '$10 - $5000';
     updateProducts();
});
});


document.addEventListener('DOMContentLoaded', () => {
const filterToggle = document.getElementById('filterToggle');
const sidebar = document.querySelector('.sidebar');

filterToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !filterToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// ... existing code ...
});


document.addEventListener("sharedLayoutLoaded", () => {
const toggleSearchBtn = document.getElementById("toggleSearch");
const searchContainer = document.getElementById("searchContainer");
const closeSearchBtn = document.getElementById("closeSearch");
const header = document.querySelector(".headerSearch");

// Toggle search container
toggleSearchBtn.addEventListener("click", () => {
  searchContainer.classList.add("active");
  header.classList.add("toggled"); // Move the header to the left
});

// Close search container
closeSearchBtn.addEventListener("click", () => {
  searchContainer.classList.remove("active");
  header.classList.remove("toggled"); // Reset header position
});

// Close search when clicking outside
document.addEventListener("click", (event) => {
  if (
    !searchContainer.contains(event.target) &&
    !toggleSearchBtn.contains(event.target)
  ) {
    searchContainer.classList.remove("active");
    header.classList.remove("toggled"); // Reset header position
  }
});
});


//FLUTTERWAVE
document.addEventListener('sharedLayoutLoaded', () => {
const cartTotalElement = document.getElementById('cartTotal');
const checkoutTotalElement = document.getElementById('checkoutTotal');
const payNowButton = document.getElementById('pay-now-btn');
const shipElement = document.getElementById('shipping');

const shippingPrice = 5;

if (cartTotalElement && checkoutTotalElement && payNowButton) {
  function updateCheckoutTotal() {
    const cartTotal = parseFloat(cartTotalElement.textContent.replace('$', ''));
    if (!isNaN(cartTotal)) {
      const totalWithShipping = cartTotal + shippingPrice;
      checkoutTotalElement.textContent = `$${totalWithShipping.toFixed(2)}`;

      if (shipElement) {
        shipElement.innerHTML = `+$${shippingPrice.toFixed(2)}`;
      }
    }
  }

  updateCheckoutTotal();

  const observer = new MutationObserver(updateCheckoutTotal);
  observer.observe(cartTotalElement, { childList: true, subtree: true });

  payNowButton.addEventListener('click', async () => {
    const checkoutTotal = parseFloat(checkoutTotalElement.textContent.replace('$', ''));
    if (!isNaN(checkoutTotal)) {
      const paymentDetails = {
        amount: checkoutTotal,
        currency: "NGN",
        email: document.getElementById('userEmail')?.value || 'Unknown',
        phone: document.getElementById('phone')?.value || 'Unknown',
        fullName: document.getElementById('fullName')?.value || 'Unknown',
        address: document.getElementById('address')?.value || 'Unknown',
        country: document.getElementById('country')?.value || 'Unknown',
        zip: document.getElementById('zip')?.value || 'Unknown',
      };

      try { 
        const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.warn('User is not logged in, cart will not be fetched.');
    return; // Exit gracefully without making the fetch request
  }

        const response = await fetch('https://ecommerce-deploy-pwez.onrender.com/initiate-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(paymentDetails),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.checkoutUrl) {
            window.location.href = result.checkoutUrl;
          } else {
            alert('Payment initiated successfully! Please complete the payment.');
          }
        } else {
          alert('Failed to initiate payment. Please try again.');
        }
      } catch (error) {
        alert('An error occurred while processing your payment. Please try again.');
      }
    }
  });
}
});






















