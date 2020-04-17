let currentUser = {};
const signUpButton = document.querySelector('#sign-up-button')
const signUpDiv = document.querySelector('#new-user')
const signUpForm = document.querySelector('#new-user-form')
const loginButton = document.querySelector('#login-button')
const loginDiv = document.querySelector('#login')
const loginForm = document.querySelector('#login-form')
const editProfileBtn = document.querySelector('#edit-profile-button')
const logoutBtn = document.querySelector('#logout-button')
const logoutYes = document.querySelector('#logout-yes')
const logoutNo = document.querySelector('#logout-no')
const logoutDiv = document.querySelector('#logout-div')
const editUserDiv = document.querySelector('#edit-user')
const editUserForm = document.querySelector('#edit-user-form')


//////////////////////////////////////////////
//          event listener callback
function signUpButtonCallback() {
    clearDetails()
    renderSignUp()
}

function signUpFormCallback(e) {
    e.preventDefault()
        let t = e.target
        let userObj = createUserObj(t)
        t.reset()
        fetchNewUser(userObj)
        .then(user => {
            currentUser = user
            toggleAcctBtns()
            greetUser()
        })
}

function toggleAcctBtns() {
    if (currentUser.username) {
        signUpButton.style.display = "none"
        loginButton.style.display = "none"
        editProfileBtn.style.display = "block"
        logoutBtn.style.display = "block"
        favBtn.style.display = "block"
        toTryBtn.style.display = "block"

    } else {
        signUpButton.style.display = "block"
        loginButton.style.display = "block"
        editProfileBtn.style.display = "none"
        logoutBtn.style.display = "none"
        favBtn.style.display = "none"
        toTryBtn.style.display = "none"
    }
}

function loginButtonCallback() {
    clearDetails();
    renderLogin();
}

function loginCallback(e) {
    e.preventDefault()
    let t = e.target
    //change email field from string to email
    //convert to lowercase for comparison
    //password "check" (fake authorization) (can add password to find_by in controller)
    let loginObj = createLoginObj(t)
    fetchLogin(loginObj)
    .then( user => {
        t.reset()
        currentUser = user
        if (currentUser.username) {
            greetUser()
            toggleAcctBtns()
        }
        //re-render details to include review form
    })
}

///////////////////////////////////////////
//          fetches

//    'POST' /users    ///////////////////
//bodyObj
function createUserObj(t) {
    return {
        username: t.username.value,
        email: t.email.value,
        password: t.password.value,
        hair_type: t.hair_type.value,
        hair_width: t.hair_width.value,
        hair_porosity: t.hair_porosity.value,
        hair_density: t.hair_density.value
    }
}
//fetch
function fetchNewUser(userObj) {
    return fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(r => r.json())
}

//    'POST' /login    ///////////////////
//bodyObj
function createLoginObj(t) {
    return {
        username: t.username.value,
        email: t.email.value,
        password: t.password.value
    }
}

//fetch
function fetchLogin(loginObj) {
    return fetch(`${baseURL}/login`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginObj)
    })
    .then(r => r.json())
}

function editProfileCallback() {
    clearDetails();
    editUserDiv.style.display = "block";
    addValuesToEditForm();
}

function editProfileFormCallback(e) {
    e.preventDefault()
    let t = e.target
    let editObj = {
        username: t.username.value,
        email: t.email.value,
        password: t.password.value,
        hair_type: t.hair_type.value,
        hair_width: t.hair_width.value,
        hair_porosity: t.hair_porosity.value,
        hair_density: t.hair_density.value,
    }
    fetch(`${baseURL}/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editObj)
    })
    .then(r => r.json())
    .then(user => {
        currentUser = user
        alert("Profile Updated!")
        greetUser()
    })
}


function addValuesToEditForm() {
    editUserForm.querySelector('#e-name').value = currentUser.username
    editUserForm.querySelector('#e-email').value = currentUser.email
    editUserForm.querySelector('#e-pass').value = currentUser.password
    editUserForm.querySelector('#e-type').value = currentUser.hair_type
    editUserForm.querySelector('#e-width').value = currentUser.hair_width
    editUserForm.querySelector('#e-porosity').value = currentUser.hair_porosity
    editUserForm.querySelector('#e-density').value = currentUser.hair_density
    
}

function logoutCallback() {
    clearDetails()
    logoutDiv.style.display = "block"
}

function logoutYesCallback() {
    currentUser = {};
    clearDetails();
    toggleAcctBtns();
    document.querySelector('#greeting').textContent = 'Welcome';
    displayWelcome();
}

function logoutNoCallback() {
    displayWelcome()
}