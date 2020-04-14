document.addEventListener('DOMContentLoaded', () => {

    clearDetails()
    signUpButton.addEventListener('click', signUpButtonCallback())
    signUpForm.addEventListener('submit', e => signUpFormCallback(e))
    loginButton.addEventListener('click', loginButtonCallback())
    loginForm.addEventListener('submit', e => loginCallback(e))
    
    renderProductsSidebar()
    
    ////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    //////////////         PICK UP HERE
    //addEventListeners to #sign-up-button and #login-button
    

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
const mainWindowContainer = document.querySelector('#detail')












////////////////////////////////////////////////
//         render methods
function clearDetails() {
    mainWindowContainer.innerHTML = ""
    clearSignUp()
    clearLogin()
}

function clearSidebar() {
    productSidebar.innerHTML = ""
}

function clearReviews() {
    allReviews.innerHTML = ""
    stageReviewDiv()
}

function clearSignUp() {
    signUpDiv.style.display = "none";
}

function clearLogin() {
    loginDiv.style.display = "none";
}

function renderSignUp() {
    signUpDiv.style.display = "block";
}

function renderLogin() {
    loginDiv.style.Display = "block";
}


function greetUser() {
    document.querySelector('#greeting').textContent = `Welcome ${currentUser.username}`
}








