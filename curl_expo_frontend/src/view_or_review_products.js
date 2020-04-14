////////////////////////////////////////////////
//       selectors
const productSidebar = document.querySelector('#products-container')

let allReviews = document.createElement('div');

function stageReviewDiv() {
    allReviews.id = 'reviews';
    let header = document.createElement('h1')
    header.textContent = "Product Reviews"
    allReviews.append(header, reviewFilter)
    reviewFilter.addEventListener('click', (e) => reviewFilterCallback(e))
}
////////////////////////////////////////////////
//      products

function renderProductsSidebar() {
    clearSidebar();
    sidebarFetch()
    .then(products => {
        products.forEach(product => createProductLi(product))
    })
}

function createProductLi(product) {
    let li = document.createElement('li')
    li.textContent = product.name
    li.className = "item"
    li.dataset.id = product.id
    li.addEventListener('click', e => displayProductDetails(e.target))
    productSidebar.append(li)
    return li
}

function displayProductDetails(li) {
    let id = li.dataset.id
    clearDetails()
    clearReviews()
    productFetch(id)
    .then(productData => {
        produceDetailElements(productData)
        if (currentUser.username) {
            produceReviewFormElements(productData)
        } else {
            let h = document.createElement('h1')
            h.textContent = "Sign in to leave a review"
            mainWindowContainer.append(h)
        }
        loadAllReviews(productData.id.toString())
    })
}

function produceDetailElements(productData) {
    let image = document.createElement('img');
    image.src = productData.image;
    image.alt = productData.name;
    let header = document.createElement('h1');
    header.textContent = productData.name;
    let p = document.createElement('p')
    p.className = "description"
    p.textContent = `Product Company: ${productData.brand}`
    mainWindowContainer.append(image, header, p)
}

function produceReviewFormElements(productData) {
    let header = document.createElement('h1')
    header.textContent = "Review This Product"
    let form = document.createElement('form')
    form.id = "score-form"
    form.dataset.id = productData.id
    let score = document.createElement('input')
    score.type = "number"
    score.name = "score"
    score.min = "0"
    score.max = "10"
    score.step = "0"
    let content = document.createElement('textarea')
    content.name = "content"
    let formSubmit = document.createElement('input');
    formSubmit.type = 'submit';
    formSubmit.value = "Submit Review";
    form.append(score, content, formSubmit);
    form.addEventListener('submit', e => reviewFormCallback(e));
    mainWindowContainer.append(header, form)
}

///////////////////////////////////////////////
//         reviews


function loadAllReviews(productId) {
    productFetch(productId)
    .then( productData => {
        clearReviews();
        mainWindowContainer.append(allReviews)
        productData.reviews.forEach(review => {
            addReview(productData, review)
        }
    )}
)}

function reviewFilterCallback(e) {
    if (e.target.nodeName === 'P') {
        let currentReviews = allReviews.querySelectorAll('ul')
        if (currentReviews.length > 0) {
            if (e.target.innerText === 'All') {
                currentReviews.forEach( review => {
                    //if "All" all display: block
                    review.style.display = "block"
                })
            } else {
                currentReviews.forEach( review => {
                    if (review.dataset.userHairType === e.target.innerText) {
                        review.style.display = "block"
                    } else {
                        review.style.display = "none"
                    }
                })
            }
        }

        //else if dataset.hair_type === p.value, display: block
        //else display: none
    }
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
        }
    }

function addReview(productData, review) {
    let ul = document.createElement('ul')
    let user = productData.users.find( user => (user.id === review.user_id))
    ul.dataset.userHairType = user.hair_type
    let header = document.createElement('h3')
    header.textContent = `${user.username} (${user.hair_type}) says:`
    let score = document.createElement('li')
    score.textContent = `${review.score} out of 10`
    let content = document.createElement('li')
    content.textContent = review.content
    ul.append(header, score, content)
    allReviews.append(ul)
}

function addNewReview(user, review) {
    let ul = document.createElement('ul')
    ul.dataset.userHairType = user.hair_type
    let header = document.createElement('h3')
    header.textContent = `${user.username} (${user.hair_type}) says:`
    let score = document.createElement('li')
    score.textContent = `${review.score} out of 10`
    let content = document.createElement('li')
    content.textContent = review.content
    ul.append(header, score, content)
    allReviews.append(ul)
}

function reviewFormCallback(e) {
    e.preventDefault()
    let t = e.target
    let reviewObj = createReviewObj(t)
    t.reset()
    fetchNewReview(reviewObj)
    .then(review => {
        addNewReview(review.user, review)
    })
}

function createReviewObj(t) {
    return {
        user_id: currentUser.id,
        product_id: t.dataset.id,
        score: t.score.value,
        content: t.content.value
    }
}

///////////////////////////////////////////////
//      fetches

//    'GET' /products    ///////////////////
function sidebarFetch() {
    return fetch(`${baseURL}/products`)
    .then(r => r.json())
}

//    'GET' /products/id    ///////////////////
function productFetch(id) {
    return fetch(`${baseURL}/products/${id}`)
    .then(response => response.json())
}

//    'POST' /reviews    ///////////////////
function fetchNewReview(reviewObj) {
    return fetch(`${baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
    .then(r => r.json())  
}