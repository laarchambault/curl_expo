let currentUser = {};
const signUpButton = document.querySelector('#sign-up-button')
const signUpDiv = document.querySelector('#new-user')
const signUpForm = document.querySelector('#new-user-form')
const loginButton = document.querySelector('#sign-up-button')
const loginDiv = document.querySelector('#login')
const loginForm = document.querySelector('#login-form')


//new user form: on "create" click, #new-user style.display = "block"
//login button: on click, #login.style.display = "block"
//signUpForm.addEventListener('submit', e => newUserFormCallback(e))
//loginForm.addEventListener('submit', e => loginCallback(e))

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
            greetUser()
        })
}

function loginButtonCallback() {
    clearDetails()
    renderLogin()
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