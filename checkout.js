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
//---------------------GETTING INFO ABOUT THE CART------------------//
//------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    const cartElement = document.getElementById('cart');
    const subtotalElement = document.getElementById('subtotal');
    const placeOrderButton = document.querySelector('.place-order-button');

    if (storedCartItems && storedCartItems.length > 0) {
        let subtotal = 0;
        storedCartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span class="item-title">${item.title}</span>
                <span class="item-price">₹${item.price}</span>
                <input type="number" min="1" value="${item.quantity}" class="item-quantity">
                <button class="remove-item">Remove</button>
            `;

            cartElement.appendChild(itemElement);

            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = '₹' + subtotal.toFixed(2);

        // Add event listener to quantity inputs
        const quantityInputs = document.querySelectorAll('.item-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function () {
                const cartItem = input.parentElement;
                const title = cartItem.querySelector('.item-title').textContent;
                const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace('₹', ''));
                const quantity = parseInt(input.value);

                // Update storedCartItems with new quantity
                const updatedCartItem = storedCartItems.find(item => item.title === title && item.price === price);
                updatedCartItem.quantity = quantity;

                // Update localStorage with modified storedCartItems
                localStorage.setItem('cartItems', JSON.stringify(storedCartItems));

                // Recalculate subtotal
                let newSubtotal = 0;
                storedCartItems.forEach(item => {
                    newSubtotal += item.price * item.quantity;
                });
                subtotalElement.textContent = '₹' + newSubtotal.toFixed(2);
            });
        });

        // Add event listener to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const cartItem = button.parentElement;
                const title = cartItem.querySelector('.item-title').textContent;
                const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace('₹', ''));

                // Remove item from storedCartItems array
                storedCartItems.splice(storedCartItems.findIndex(item => item.title === title && item.price === price), 1);

                // Update localStorage with modified storedCartItems
                localStorage.setItem('cartItems', JSON.stringify(storedCartItems));

                // Remove cart item element from DOM
                cartItem.remove();

                // Recalculate subtotal
                subtotal -= price;
                subtotalElement.textContent = '₹' + subtotal.toFixed(2);
            });
        });

        // Add event listener to "Place Order" button
        placeOrderButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting

            // Check if all required fields are filled
            const form = document.querySelector('form');
            if (form.checkValidity()) {
                // Empty the cart
                localStorage.removeItem('cartItems');
                cartElement.textContent = 'Cart is empty';

                // Redirect to index.html
                window.location.href = 'index.html';

                // Show alert message
                alert('Your Order has been successfully placed.');
            } else {
                // If any required field is empty, display an error message or handle it accordingly
                alert('Please fill out all required fields before placing your order.');
            }
        });
    } else {
        cartElement.textContent = 'Cart is empty';
    }
});




// HIDES THE CART DETAILS WHEN CLICKED ON CASH OR POD



function toggleCardDetails() {
    var paymentMethod = document.getElementById("payment-method").value;
    var cardDetails = document.getElementById("card-details");

    if (paymentMethod === "card") {
        cardDetails.style.display = "block"; // Show card details
    } else {
        cardDetails.style.display = "none"; // Hide card details
    }
}

// Initially call toggleCardDetails() to set initial state
toggleCardDetails();