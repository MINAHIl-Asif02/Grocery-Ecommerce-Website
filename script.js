let searchForm=document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    navBar.classList.remove('active');
    Addtocart.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');
document.querySelector('#user-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navBar.classList.remove('active');
    Addtocart.classList.remove('active');
}





let navBar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navBar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    Addtocart.classList.remove('active');
}

let Addtocart = document.querySelector('.cart-tab');
document.querySelector('#cart-btn').onclick = () => {
    Addtocart.classList.toggle('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
    navBar.classList.remove('active');
}



window.onscroll=()=>{
    Addtocart.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navBar.classList.remove('active');
    closeCart.classList.remove('active');
}


var swiper = new Swiper(".products-slider",

{
    loop:true,
    spaceBetween:20,
    autoplay:{
        display:7500,
        disableOnInteraction:false,
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:2,
        },
        1020:{
            slidesPerView:3,
        },
    },
});

let close = document.querySelector('.close');
close.onclick=()=>{
    close.classList.toggle('active');
    Addtocart.classList.remove('active');
}






document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById("cart-btn");
  const cartTab = document.querySelector(".cart-tab");
  const closeButton = document.querySelector(".close");
  const checkoutButton = document.querySelector(".check-out");
  const cartItemsContainer = document.querySelector(".listCart");
  const cartCount = cartButton.querySelector("span");
  const productContainer = document.querySelector(".swiper-wrapper"); // Container for products

  let cart = [];

  // Add event listeners to existing "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".swiper-slide");
      const productName = productCard.querySelector("h1").textContent;
      const productPrice = parseFloat(
        productCard.querySelector(".price").textContent.split("$")[1]
      );
      const productImage = productCard.querySelector("img").src;

      addToCart({ name: productName, price: productPrice, image: productImage });
    });
  });

  // Add product to cart
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCart();
  }

  // Update cart UI
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity; // Update total price for each item

      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      cartItem.innerHTML = `
        <div class="image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="name">
          <h4>${item.name}</h4>
        </div>
        <div class="price">
          <h4>$${(item.price * item.quantity).toFixed(2)}</h4> <!-- Updated price -->
        </div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${item.quantity}</span>
          <span class="plus">></span>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);

      // Update quantity buttons
      cartItem.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart = cart.filter((cartItem) => cartItem.name !== item.name);
        }
        updateCart();
      });

      cartItem.querySelector(".plus").addEventListener("click", () => {
        item.quantity++;
        updateCart();
      });
    });

    cartCount.textContent = totalItems;

    // Update total price display in cart
    const totalPriceContainer = document.getElementById("total-price");
    totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Show/Hide cart tab
  cartButton.addEventListener("click", () => {
    cartTab.classList.toggle("open");
  });

  closeButton.addEventListener("click", () => {
    cartTab.classList.remove("open");
  });

  checkoutButton.addEventListener("click", () => {
    alert("Proceeding to Checkout");
  });

  // Dynamically add products
  function addProduct({ name, price, image }) {
    const productCard = document.createElement("div");
    productCard.classList.add("swiper-slide", "box");

    productCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <h1>${name}</h1>
      <div class="price">$${price.toFixed(2)}</div>
      <div class="stars">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-half"></i>
      </div>
      <a href="#" class="cart-btn">ADD TO CART</a>
    `;

    productContainer.appendChild(productCard);

    // Add event listener for the "Add to Cart" button
    productCard.querySelector(".cart-btn").addEventListener("click", (e) => {
      e.preventDefault();
      addToCart({ name, price, image });
    });
  }

  // Example: Add a new product dynamically
  addProduct({
    name: "Fresh Potato",
    price: 5.99,
    image: "image/product-5.png", // Update to a valid image path
  });
addProduct({
    name: "Fresh Meat",
    price: 5.99,
    image: "image/product-3.png", // Update to a valid image path
  });
    
    addProduct({
    name: "Fresh Onion",
    price: 5.99,
    image: "image/product-2.png", // Update to a valid image path
  });
  addProduct({
    name: "Fresh Orange",
    price: 7.99,
    image: "image/product-1.png", // Update to a valid image path
  });
});
