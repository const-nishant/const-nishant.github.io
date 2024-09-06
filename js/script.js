

const menuIcon = document.getElementById('menu-icon');
const navbarMobile = document.getElementsByClassName('navbar-mobile')[0];
const navbarLinks = document.querySelectorAll('.navbar-mobile a');

// Add event listener to the menu icon
menuIcon.addEventListener('click', function () {
    // Check current display status using computed styles
    const currentDisplay = window.getComputedStyle(navbarMobile).display;

    // Toggle display of the mobile navbar
    if (currentDisplay === 'none') {
        navbarMobile.style.display = 'flex';
    } else {
        navbarMobile.style.display = 'none';
    }
});

// Add event listeners to all navbar links to hide the navbar after click
navbarLinks.forEach(link => {
    link.addEventListener('click', function () {
        navbarMobile.style.display = 'none';
    });
});


