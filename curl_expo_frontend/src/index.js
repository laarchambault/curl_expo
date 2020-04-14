document.addEventListener('DOMContentLoaded', () => {
    displayWelcome()
    logo.addEventListener('click', () => displayWelcome())
    signUpButton.addEventListener('click', () => signUpButtonCallback())
    signUpForm.addEventListener('submit', e => signUpFormCallback(e))
    loginButton.addEventListener('click', () => loginButtonCallback())
    loginForm.addEventListener('submit', e => loginCallback(e))
    newProductButton.addEventListener('click', () => newProductCallback())
    newProductForm.addEventListener('submit', e => productFormCallback(e))
    
    renderProductsSidebar()
    window.addEventListener('click', e => console.log(e.target))
    

    //show sidebar and menu options. Default "About" with login/sign up buttons
    //remove modals, but maybe keep some formatting?
    //create .js page for each "window"
    //add event listeners to left menu. If products are clicked, main window shows detail logic.
    //if login is clicked, clear main window and show login form
    //if sign up is clicked, clear and show sign up form







})//dom load closure
///////////////////////////////////////////////
//         selectors and global vars
const baseURL = "http://localhost:3000"
const mainWindowContainer = document.querySelector('#productDetail')
const logo = document.querySelector('#logo')





////////////////////////////////////////////////
//         render methods
function displayWelcome() {
    clearDetails();
    mainWindowContainer.appendChild(welcomeText)
}

function clearDetails() {
    clearChildren(mainWindowContainer)
    clearSignUp()
    clearLogin()
    clearProductForm()
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
    stageReviewDiv()
}

function clearSignUp() {
    signUpDiv.style.display = "none";
}

function clearLogin() {
    loginDiv.style.display = "none";
}

function clearProductForm() {
    newProductDiv.style.display = "none";
}

function renderSignUp() {
    signUpDiv.style.display = "block";
}

function renderLogin() {
    loginDiv.style.display = "block";
}

function renderProductForm() {
    newProductDiv.style.display = "block"
}


function greetUser() {
    document.querySelector('#greeting').textContent = `Welcome ${currentUser.username}`
    clearDetails();
    mainWindowContainer.appendChild(landing)
}








