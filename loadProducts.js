document.addEventListener('DOMContentLoaded', () => {
    fetch('https://shopnow.raynerd.com.ng/products')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          displayProducts(data.data); // Pass the actual products to the display function
        } else {
        //   alert('No products available');
          document.querySelector('.product-list').innerHTML = '<p>No products available.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Please try again later');
      });
  
    // Function to display products
    function displayProducts(products) {
      const productListContainer = document.querySelector('.product-list');
      productListContainer.innerHTML = ''; // Clear existing products
  
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('clothes');
  
        const productHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <div>
            <button class="add-to-cart-btn" 
                    data-product-id="${product._id}" 
                    data-name="${product.name}" 
                    data-image="${product.image}" 
                    data-price="${product.price}">Add To Cart</button>
          </div>
        `;
  
        productDiv.innerHTML = productHTML;
        productListContainer.appendChild(productDiv); // Add each product to the container
      });
    }
  });


  