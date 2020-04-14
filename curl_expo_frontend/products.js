////////////////////////////////////////////////
//       selectors
const productSidebar = document.querySelector('#products-container')

let allReviews = document.createElement('div');

function stageReviewDiv() {
    allReviews.id = 'reviews';
    let header = document.createElement('h1')
    header.textContent = "Product Reviews"
    allReviews.append(header)
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
    li.addEventListener('click', e => displayProductDetails(e))
    productSidebar.append(li)
}

function displayProductDetails(e) {
    let id = e.target.dataset.id
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
        productData.reviews.forEach(review => {
            mainWindowContainer.append(allReviews)
            addReview(productData, review)
        }
    )}
)}
//add "Reviews" h1 before all reviews and before new review
function addReview(productData, review) {
    let ul = document.createElement('ul')
    let header = document.createElement('h3')
    let user = productData.users.find( user => (user.id === review.user_id))
    header.textContent = `${user.username} says:`
    let score = document.createElement('li')
    score.textContent = `${review.score} out of 10`
    let content = document.createElement('li')
    content.textContent = review.content
    ul.append(header, score, content)
    allReviews.append(ul)
}

function addNewReview(user, review) {
    let ul = document.createElement('ul')
    let header = document.createElement('h3')
    header.textContent = `${user.username} says:`
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