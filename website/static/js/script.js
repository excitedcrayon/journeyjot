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

            let navMobilePadding = nav.getAttribute('data-mobile-padding');

            nav.classList.toggle('active_nav');

            if (nav.style.maxHeight){
                nav.style.maxHeight = null;
                nav.style.paddingBottom = 0;
            }else{
                nav.style.maxHeight = `${nav.scrollHeight}px`;
                nav.style.paddingBottom = `${parseInt(navMobilePadding)}rem`;
            }
        });
    }
}