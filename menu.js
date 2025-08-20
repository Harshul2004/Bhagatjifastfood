// Show the scroll-to-top button when the user scrolls down 20px from the top of the document
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//------------------------------------------------------------------//
//---------------------CART WITH STORAGE FUNCTIONALITY--------------//
//------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const openCartButton = document.querySelector('.open-cart');
    const closeCartButton = document.querySelector('.close-cart');
    const proceedToCheckoutButton = document.querySelector('.proceed-to-checkout');
    const cartElement = document.querySelector('.cart');
    const cartItemsElement = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');
    const searchInput = document.getElementById('searchInput');
    const searchingInput = document.getElementById('searchingInput');
    const cartCountElement = document.createElement('span');

    // Add a cart count badge to the open-cart button
    cartCountElement.classList.add('cart-count');
    cartCountElement.textContent = '0';
    openCartButton.appendChild(cartCountElement);

    let cartItems = [];
    let total = 0;

    if (!openCartButton) {
        console.error('openCartButton not found in the DOM.');
    } else {
        openCartButton.addEventListener('click', function () {
            cartElement.classList.toggle('open');
        });
    }

    if (!closeCartButton) {
        console.error('closeCartButton not found in the DOM.');
    } else {
        closeCartButton.addEventListener('click', function () {
            cartElement.classList.remove('open');
        });
    }

    if (!proceedToCheckoutButton) {
        console.warn('proceedToCheckoutButton not found in the DOM. Skipping its functionality.');
    } else {
        proceedToCheckoutButton.addEventListener('click', function () {
            storeCartItems(); // Store cart items in localStorage
            window.location.href = 'checkout.html'; // Navigate to checkout page
        });
    }

    if (!cartElement) {
        console.error('cartElement not found in the DOM.');
    }

    if (!cartItemsElement) {
        console.error('cartItemsElement not found in the DOM.');
    }

    if (!totalElement) {
        console.error('totalElement not found in the DOM.');
    }

    if (!searchInput) {
        console.error('searchInput not found in the DOM.');
    } else {
        setupSearchFunctionality(searchInput);
    }

    if (!searchingInput) {
        console.error('searchingInput not found in the DOM.');
    } else {
        setupSearchFunctionality(searchingInput);
    }

    if (addToCartButtons.length === 0) {
        console.warn('No add-to-cart buttons found in the DOM.');
    } else {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const title = button.parentElement.dataset.title;
                const price = parseFloat(button.getAttribute('data-price'));

                const existingItemIndex = cartItems.findIndex(item => item.title === title);
                if (existingItemIndex !== -1) {
                    cartItems[existingItemIndex].quantity++;
                } else {
                    cartItems.push({ title, price, quantity: 1 });
                }
                total += price;

                updateCartCount();
                renderCart();
            });
        });
    }

    function setupSearchFunctionality(inputElement) {
        inputElement.addEventListener('input', function () {
            const searchQuery = inputElement.value.toLowerCase().trim();
            const products = document.querySelectorAll('.product');
            const categoryNames = document.querySelectorAll('.category-name');

            if (searchQuery === '') {
                // Show all products and categories when search is cleared
                products.forEach(product => product.style.display = 'flex');
                categoryNames.forEach(category => category.style.display = 'block');
                return;
            }

            // Hide all category names
            categoryNames.forEach(category => category.style.display = 'none');

            // Show only matching products
            products.forEach(product => {
                const productName = product.dataset.title?.toLowerCase() || '';
                product.style.display = productName.includes(searchQuery) ? 'flex' : 'none';
            });
        });
    }

    function updateCartCount() {
        const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }

    function renderCart() {
        if (!cartItemsElement || !totalElement) return;

        cartItemsElement.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span>${item.title}: ₹${item.price}</span>
                <div>
                    <input type="number" min="1" value="${item.quantity}" class="item-quantity">
                    <button class="remove-item">Remove</button>
                </div>
            `;
            cartItemsElement.appendChild(li);

            const quantityInput = li.querySelector('.item-quantity');
            quantityInput.addEventListener('change', function () {
                const newQuantity = parseInt(quantityInput.value);
                if (newQuantity <= 0) {
                    cartItems = cartItems.filter(cartItem => cartItem.title !== item.title);
                    total -= item.price * item.quantity;
                } else {
                    total += item.price * (newQuantity - item.quantity);
                    item.quantity = newQuantity;
                }
                totalElement.textContent = total.toFixed(2);
                updateCartCount();
            });
        });

        totalElement.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const title = button.parentElement.parentElement.querySelector('span').textContent.split(':')[0];
                const removedItem = cartItems.find(item => item.title === title);
                total -= removedItem.price * removedItem.quantity;
                cartItems = cartItems.filter(item => item.title !== title);
                renderCart();
                updateCartCount();
            });
        });
    }

    function storeCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});

// NAVBAR COLLAPSE SYSTEM

const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.navul');
    const header = document.getElementById('header');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    document.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 250) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
