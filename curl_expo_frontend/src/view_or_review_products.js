////////////////////////////////////////////////
//       selectors
const productSidebar = document.querySelector('#products-container')
const reviewFilterButton = document.querySelector('#reviews button')
const dropdownDiv = document.querySelector('#myDropdown')
const reviewFilter = document.querySelector('#reviews div.dropdown')
const productFacts = document.querySelector('#product-facts')
const reviewForm = document.querySelector('#score-form')
const allReviews = document.querySelector('#review-container')
const plsSignIn = document.querySelector('#pls-sign-in')
const avgScoreSpan = document.querySelector('#avg-score-disp')

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
    li.addEventListener('click', e => displayProductDetails(e.target.dataset.id))
    productSidebar.append(li)
    return li.dataset.id
}

function displayProductDetails(id) {
    clearDetails()
    newIngredientForm.dataset.id = id
    productDetail.dataset.id = id
    productDetail.style.display = "block"
    productFetch(id)
    .then(productData => {
        fillDetailElements(productData)
        if (currentUser.username) {
            reviewForm.style.display = "block"
            plsSignIn.style.display = "none"
            reviewForm.dataset.id = productData.id
        } else {
            reviewForm.style.display = "none"
            plsSignIn.style.display = "block"
        }
        loadAllReviews(productData.id.toString())
    })
}

function fillDetailElements(productData) {
    productFacts.querySelector('img').src = productData.image || "";
    productFacts.querySelector('img').alt = productData.name || "";
    productFacts.querySelector('h1').textContent = productData.name || "";
    productFacts.querySelector('p').textContent = `Product Company: ${productData.brand}`
    let ingList = productData.ingredients
    
    if (ingList.length) {
        let ingNames = ingList.map(ing => ing.name)
        let ingredientStr = ingNames.reduce((acc, name) => {
            return acc + `, ${name}`
        })
    productFacts.querySelector('p#ingred').textContent  = ingredientStr
    } else {
        productFacts.querySelector('p#ingred').textContent = ""
    }
}


///////////////////////////////////////////////
//         reviews


function loadAllReviews(productId) {
    productFetch(productId)
    .then( productData => {
        clearReviews();
        productData.reviews.forEach(review => {
            addReview(review)
        })
        displayedReviewScoreAvg()
    }
)}

function reviewFilterCallback(e) {
    if (e.target.nodeName === 'P') {
        let currentReviews = allReviews.querySelectorAll('ul')
        if (currentReviews.length > 0) {
            if (e.target.innerText === 'All') {
                currentReviews.forEach( review => {
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
        displayedReviewScoreAvg()
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

function addReview(review) {
    let ul = document.createElement('ul')
    let user = review.user
    ul.dataset.userHairType = user.hair_type
    ul.dataset.score = review.score
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
    ul.dataset.score = review.score
    let header = document.createElement('h3')
    header.textContent = `${user.username} (${user.hair_type}) says:`
    let score = document.createElement('li')
    score.textContent = `${review.score} out of 10`
    let content = document.createElement('li')
    content.textContent = review.content
    ul.append(header, score, content)
    allReviews.append(ul)
}

function displayedReviewScoreAvg() {
    let reviews = [].slice.call(allReviews.querySelectorAll("ul"));
    let dispReviews = reviews.filter(rev => rev.style.display !== "none")
    if (dispReviews.length) {
        let scores = []
        dispReviews.forEach(review => {
            scores.push(review.dataset.score)
        })
        let intScores = scores.map(score => Number.parseInt(score, 10) )
        let total = intScores.reduce( (acc, cur) => acc + cur)
        avgScoreSpan.textContent = (total/(intScores.length)).toFixed(1)
    } else {
        avgScoreSpan.textContent = ""
    }

}

function reviewFormCallback(e) {
    e.preventDefault()
    let t = e.target
    let reviewObj = createReviewObj(t)
    t.reset()
    fetchNewReview(reviewObj)
    .then(review => {
        addNewReview(review.user, review)
        displayedReviewScoreAvg()
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