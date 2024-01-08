window.addEventListener('DOMContentLoaded', () => {

    animateMenuIconAndNavigation();
    animateSearchForm();
    validateUploadForm();
    profileApiData();
    profileApiDataSearchFilter();
    activeCurrentMenuLink();
    homepage();

});

const Constants = {
    URL: location.origin,
    INTERVAL: 1000
}

const getGlobalUserId = () => {
    if ( document.querySelector('[name="globalUserId"]') != undefined ) {
        return document.querySelector('[name="globalUserId"]').value;
    }
}

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

const validateUploadForm = () => {
    const uploadForm = document.querySelector('form#uploadForm');
    const uploadFormButton = document.querySelector('form#uploadForm button[type="submit"]');
    const uploadFile = document.querySelector('[name="file"]');

    if ( uploadFormButton != undefined ) {
        uploadFile.addEventListener('change', (e) => {
            //console.log(e.target.files);
        });

        uploadFormButton.addEventListener('click', (e) => {
            //e.preventDefault();
        });
    }
}

const profileApiData = () => {

    const profileUploadedResultsCount = document.querySelector('.profile_uploaded_results_count');
    const profileUploadedData =  document.querySelector('.profile_uploaded_data');

    let postPKMap = new Map();
    let uploadsMap = new Map();
    let totalNumberOfPosts = [];
    let profileDataRow = undefined;
    let profileDataRowMediaSet = undefined;
    let counter = 0;

    if ( profileUploadedData != undefined ) {

        generatePageSpinner(profileUploadedData);
        generatePageSpinner(profileUploadedResultsCount);

        fetch(`${Constants.URL}/api-profile`)
        .then(res => res.json())
        .then(data => {

            setTimeout(() => {

                removePageSpinner(profileUploadedData);
                removePageSpinner(profileUploadedResultsCount);

                for(let i = 0; i < data.length; i++){

                    let model = data[i]['model'];
    
                    // title and description of posts
                    if ( model.includes('post') ){

                        totalNumberOfPosts.push(data[i]);
    
                        postPKMap.set(data[i]['pk'], data[i]['pk']);
    
                        profileDataRow = document.createElement('div');
                        profileDataRow.className = 'profile_data_row';
                        profileDataRow.setAttribute('data-post-id', `${data[i]['pk']}`);
                        profileDataRow.innerHTML = `
                            <div class="profile_data_row_content">
                                <div class="profile_data_title">
                                    <strong>${data[i]['fields']['title']}</strong>
                                    <a href="/profile/edit-post/${data[i]['pk']}" title="Edit post ${data[i]['fields']['title']}">
                                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </a>
                                    ${data[i]['fields']['post_status'] === 0 ? `<small>archived</small>` : ``}
                                </div>
                                ${data[i]['fields']['description'].length > 0 
                                ? `<span>${data[i]['fields']['description'].length >= 100 ? `${data[i]['fields']['description'].substring(0,100)}...` : data[i]['fields']['description']}</span>`
                                : ''}
                            </div>
                            <div class="profile_data_row_media"></div>
                        `;
    
                        profileUploadedData.appendChild(profileDataRow);
    
                    }
    
                    // media of the post
                    if ( model.includes('uploads') ) {

                        let uploadKey = data[i]['fields']['post'];

                        if ( !uploadsMap.has(uploadKey) ) {
                            uploadsMap.set(uploadKey, []);
                        }

                        uploadsMap.get(data[i]['fields']['post']).push(data[i]['fields']['file_path']);

                        profileDataRowMediaSet = Array.from(new Set([...document.querySelectorAll('.profile_data_row_media')]));
    
                    }

                }

                //console.log(profileDataRowMediaSet);
                //console.log(uploadsMap);

                const profileDataRows = document.querySelectorAll('.profile_data_row');
                profileDataRows.forEach(dataRow => {
                    let dataPostId = parseInt(dataRow.getAttribute('data-post-id'));
                    if ( uploadsMap.get(dataPostId) ){
                        //console.log(dataRow);
                        uploadsMap.forEach((values, key) => {
                            if (dataPostId === key) {
                                for(let j = 0; j < values.length; j++){
                                    //console.log(values[j]);
                                    if ( !values[j].includes('.mp4') ){
                                        let image = new Image();
                                        image.src = `${Constants.URL}/${values[j]}`;
                                        dataRow.childNodes[3].appendChild(image);
                                    } else if (values[j].includes('.mp4')) {
                                        let video = document.createElement('video');
                                        video.src = `${Constants.URL}/${values[j]}`;
                                        video.setAttribute('controls', 'controls');
                                        video.setAttribute('controlsList','nodownload');
                                        dataRow.childNodes[3].appendChild(video);
                                    }
                                }
                            }
                        });
                    }
                });

                profileUploadedResultsCount.innerHTML = `
                    <span>Showing <strong>${totalNumberOfPosts.length}</strong> results</span>
                `;

            }, Constants.INTERVAL);
        })
        .catch(err => console.log(err));
    }
}

const profileApiDataSearchFilter = () => {
    const profileSearchFilter = document.querySelector('[name="profileSearchFilter"]');

    if ( profileSearchFilter != undefined ) {
        
        profileSearchFilter.addEventListener('keyup', () => {

            if ( profileSearchFilter.value.length >= 2 ) {

                let searchValue = profileSearchFilter.value.toLowerCase();

                const profileDataRow = document.querySelectorAll('.profile_data_row');

                profileDataRow.forEach(row => {
                    if ( row.textContent.toLowerCase().indexOf(searchValue) > -1 ) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }
                });

            } else if ( profileSearchFilter.value.length === 0 ) {

                const profileDataRow = document.querySelectorAll('.profile_data_row');

                profileDataRow.forEach(row => {
                    row.style.display = "";
                });
            }
        });
    }
}

const generatePageSpinner = (element) => {
    return element.innerHTML = `
        <div class="page_loader">
            <div class="page_spinner"></div>
        </div>
    `;
}

const removePageSpinner = (element) => {
    return element.innerHTML = ``;
}

const pageLoader = () => {
    const element = document.createElement('div');
    element.className = 'page_loader';
    element.innerHTML = `
        <div class="page_spinner"></div>
    `;
    return element;
}

const activeCurrentMenuLink = () => {

    const menuLink = document.querySelectorAll('header .menu_link > span');

    if ( menuLink != undefined ) {
        menuLink.forEach(link => {

            let linkName = link.textContent.toLowerCase();

            link.parentElement.parentElement.classList.remove('active_link');

            if (linkName === 'home' && location.pathname === "/"){
                link.parentElement.parentElement.classList.add('active_link');
            } else if (location.href.includes(linkName)) {
                link.parentElement.parentElement.classList.add('active_link');
            }
        });
    }
}

const homepage = () => {

    const homepageContent = document.querySelector('.homepage_content');
    let start = 0;
    let end = 10;
    let increment = 10;

    if ( homepageContent != undefined ) {

        homepageApiData(start, end);

        window.addEventListener('scroll', () => {

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if ( scrollTop + clientHeight >= (scrollHeight - 3/4) ) {
                //console.log('Reached bottom of page');

                start += increment;
                end += increment;

                setTimeout(() => {
                    homepageApiData(start, end);
                }, Constants.INTERVAL);
            } 
        });

    }
}

const homepageApiData = (start, end) => {

    const homepageContent = document.querySelector('.homepage_content');
    const pageLoaderElement = pageLoader();

    if ( homepageContent != undefined ) {
        homepageContent.appendChild(pageLoaderElement);
    }

    fetch(`${Constants.URL}/api-homepage?` + new URLSearchParams({
        limitStart: start,
        limitEnd: end
    }))
    .then(res => res.json())
    .then(data => {

        console.log(data);

        if (data.length > 0){

            setTimeout(() => {

                if ( homepageContent != undefined ) {
                    homepageContent.removeChild(pageLoaderElement);
                }

                for(let i = 0; i < data.length; i++){
                    let model = data[i]['model'];

                    // posts
                    if ( model.includes('post') ){

                        let post = document.createElement('div');
                        post.className = 'post';
                        post.setAttribute(`data-post-id`,`${data[i]['pk']}`);
                        post.innerHTML = `
                            <div class="post_content">
                                <div class="post_media"></div>
                                <div class="post_title">${data[i]['fields']['title'].length > 0 ? data[i]['fields']['title'] : ''}</div>
                                <div class="post_description">${data[i]['fields']['description'].length > 0 ? data[i]['fields']['description'] : ''}</div>
                            </div>
                        `;

                        if ( homepageContent != undefined ) {
                            homepageContent.appendChild(post);
                        }

                    }

                    // uploads
                    if ( model.includes('uploads') ) {
                        let uploadKey = data[i]['fields']['post'];

                        console.log(uploadKey);
                    }

                }

            }, Constants.INTERVAL);
        }

    })
    .catch(err => console.log(err));
}
