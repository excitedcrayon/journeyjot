window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    animateMenuIconAndNavigation();
});

const animateMenuIconAndNavigation = () => {
    const menuBurgerIcon = document.querySelector('.menu_burger_icon');
    const nav = document.querySelector('nav');

    if ( menuBurgerIcon != undefined ){
        menuBurgerIcon.addEventListener('click', () => {
            menuBurgerIcon.classList.toggle('icon_clicked');
        });
    }
}