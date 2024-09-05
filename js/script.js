document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const menuIcon = document.querySelector('#menu-icon');
    const navbarMobile = document.querySelector('.navbar-mobile');

    // Ensure elements exist before adding event listeners
    if (menuIcon && navbarMobile) {
        // Event listener for menu icon
        menuIcon.addEventListener('click', () => {
            navbarMobile.classList.toggle('show');
        });

        // Close mobile menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!navbarMobile.contains(e.target) && !menuIcon.contains(e.target)) {
                navbarMobile.classList.remove('show');
            }
        });
    } else {
        console.error('Menu icon or mobile navbar not found');
    }
});
