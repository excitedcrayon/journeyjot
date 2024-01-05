window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    animateMenuIconAndNavigation();
    animateSearchForm();
});

const animateMenuIconAndNavigation = () => {

    const menuBurgerIcon = document.querySelector('.menu_burger_icon');
    const nav = document.querySelector('nav');
    const content = document.querySelector('.content');

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

            document.body.classList.toggle('overflow_hidden');
        });
    }
}

const animateSearchForm = () => {
    const searchForm = document.querySelector('.search_form');
    const searchFormInput = document.querySelector('.search_form [name="search"]');
    const menuSearchIconButton = document.querySelector('.menu_search_icon button');
    const searchFormCloseButton = document.querySelector('.search_form_close_button button');

    if ( menuSearchIconButton != undefined ) {
        menuSearchIconButton.addEventListener('click', () => {
            searchForm.classList.add('active_search_form');
        });

        searchFormCloseButton.addEventListener('click', () => {
            searchForm.classList.remove('active_search_form');
            searchFormInput.value = '';
        });
    }
}