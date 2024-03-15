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

// LOGIN PAGE

function togglePopup() {
    var overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
}

function closePopup() {
    var overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
}

function showSignUp() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
    document.getElementById('login').classList.remove('active'); // Ensure login form is not active
    document.getElementById('signup').classList.add('active'); // Activate signup form
    var overlay = document.getElementById('overlay');
    overlay.classList.add('active'); // Ensure overlay is active
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('signup').classList.remove('active'); // Ensure signup form is not active
    document.getElementById('login').classList.add('active'); // Activate login form
    var overlay = document.getElementById('overlay');
    overlay.classList.add('active'); // Ensure overlay is active
}

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('signupUsername').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    for (var i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].username === username) {
            alert("Username already exists! Please choose another one.");
            return;
        }
    }

    var newUser = { username: username, email: email, password: password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert("User registered successfully!");
    document.getElementById('signup-form').reset();
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    for (var i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].username === username && existingUsers[i].password === password) {
            alert("Login successful!");
            // window.location.href = 'index.html';
            document.getElementById("login-button").style.display = "none";
            return;
        }
    }

    alert("Invalid username or password!");
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

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
