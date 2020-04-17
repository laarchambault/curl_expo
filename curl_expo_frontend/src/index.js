document.addEventListener('DOMContentLoaded', () => {
    displayWelcome()//doesn't seem to work
    logo.addEventListener('click', () => displayWelcome())
    signUpButton.addEventListener('click', () => signUpButtonCallback())
    signUpForm.addEventListener('submit', e => signUpFormCallback(e))
    loginButton.addEventListener('click', () => loginButtonCallback())
    loginForm.addEventListener('submit', e => loginCallback(e))
    newProductButton.addEventListener('click', () => newProductCallback())
    newProductForm.addEventListener('submit', e => productFormCallback(e))
    reviewFilterButton.addEventListener('click', () => {dropdownDiv.classList.toggle("show")})
    reviewFilter.addEventListener('click', (e) => reviewFilterCallback(e))
    reviewForm.addEventListener('submit', e => reviewFormCallback(e));
    editButton.addEventListener('click', () => editButtonCallback())
    newIngredientForm.addEventListener('submit', e => newIngredientCallback(e))
    favBtn.addEventListener('click', () => favoriteCallback())
    viewFavBtn.addEventListener('click', () => viewFavBtnCallback())
    toTryBtn.addEventListener('click', () => toTryCallback())
    viewToTryBtn.addEventListener('click', () => viewToTryCallback())
    editProfileBtn.addEventListener('click', () => editProfileCallback())
    logoutBtn.addEventListener('click', () => logoutCallback())
    logoutYes.addEventListener('click', () => logoutYesCallback())
    logoutNo.addEventListener('click', () => logoutNoCallback())
    editUserForm.addEventListener('submit', e => editProfileFormCallback(e))
    

    renderProductsSidebar()
    window.addEventListener('click', e => console.log(e.target))

//**************** MEGA REFACTORING
//Add Ingredients and Ingredient form

})//dom load closure
///////////////////////////////////////////////
//         selectors and global vars
const baseURL = "http://localhost:3000"
const productDetail = document.querySelector('#productDetail')
const logo = document.querySelector('#logo')
const landing = document.querySelector('#landing')
const welcome = document.querySelector('#welcome')


////////////////////////////////////////////////
//         render methods
function displayWelcome() {
    clearDetails();
    welcome.style.display = "block"
}

function clearDetails() {
    clearProduct()
    clearReviews()
    clearSignUp()
    clearLogin()
    clearWelcome()
    clearLanding()
    clearProductForm()
    clearEditSection()
    clearFavorites()
    clearLogout()
    clearEditProfile()

    //simplify the clear details function
    //iterate through divs and set display to none
    //also remove reviews
}
function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function clearSidebar() {
    clearChildren(productSidebar)
}

function clearReviews() {
    clearChildren(allReviews)
}
function clearProduct() {
    productDetail.style.display = "none"
}
function clearWelcome() {
    welcome.style.display = "none"
}
function clearLanding() {
    landing.style.display = "none"
}
function clearSignUp() {
    signUpDiv.style.display = "none";
}

function clearLogin() {
    loginDiv.style.display = "none";
}

function clearLogout() {
    logoutDiv.style.display = "none";
}

function clearProductForm() {
    newProductDiv.style.display = "none";
}

function clearEditProfile() {
    editUserDiv.style.display = "none";
}

function clearEditSection() {
    clearChildren(ingredientDatalist)
    editDiv.style.display = "none"
}

function clearFavorites() {
    clearChildren(favDiv.querySelector('ul'))
    favDiv.style.display = "none"
}

function renderSignUp() {
    signUpDiv.style.display = "block";
}

function renderLogin() {
    loginDiv.style.display = "block";
}
function renderWelcome() {
    welcome.style.display = "block"
}
function renderLanding() {
    landing.style.display = "block"
}
function renderProductForm() {
    newProductDiv.style.display = "block"
}

function renderEditSection() {
    editDiv.style.display = "block";
    loadDatalistIngredients()
}


function greetUser() {
    document.querySelector('#greeting').textContent = `Welcome ${currentUser.username}`
    clearDetails();
    renderLanding();
}








