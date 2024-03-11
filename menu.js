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

    let cartItems = [];
    let total = 0;

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

            renderCart();
        });
    });

    openCartButton.addEventListener('click', function () {
        cartElement.classList.toggle('open');
    });

    closeCartButton.addEventListener('click', function () {
        cartElement.classList.remove('open');
    });

    proceedToCheckoutButton.addEventListener('click', function () {
        storeCartItems(); // Store cart items in localStorage
        window.location.href = 'checkout.html'; // Navigate to checkout page
    });

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productName = product.dataset.title.toLowerCase();
            if (productName.includes(searchQuery)) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    });
    searchingInput.addEventListener('input', function () {
        const searchQuery = searchingInput.value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productName = product.dataset.title.toLowerCase();
            if (productName.includes(searchQuery)) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    });

    function renderCart() {
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
            });
        });
    }

    // Function to store cart items in localStorage
    function storeCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});




// NAVBAR COLLAPSE SYSTEM

document.querySelector('.toggle-btn').addEventListener('click', function () {
    document.querySelector('.navul').classList.toggle('active');
    document.querySelector('.navbar-overlay').classList.toggle('active');
});

document.querySelector('.navbar-close-btn').addEventListener('click', function () {
    document.querySelector('.navul').classList.remove('active');
    document.querySelector('.navbar-overlay').classList.remove('active');
});