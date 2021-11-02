const menuBtn = document.querySelector('.mobile-menu-btn.menu');
const closeBtn = document.querySelector('.mobile-menu-btn.close');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', (event) => {
    navMenu.classList.add('menu-open');
})

closeBtn.addEventListener('click', (event) => {
    navMenu.classList.remove('menu-open')
})