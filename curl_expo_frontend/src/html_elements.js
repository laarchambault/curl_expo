const welcomeText = document.createElement('div')
welcomeText.innerHTML = 
"<h1>Welcome to Curl Expo</h1> " + 
"<p>At Curl Expo, we're all about helping you find the right product for your natural curls.</p>" +
"<p>Since curls come in all types, from coily to wavy, even the best curl product may not be a match for you. And we're dedicated to helping you find the right product for your amazing curls.</p>"

const landing = document.createElement('div')
landing.innerHTML =
"<h1>Welcome!</h1> " +
"<img alt='wink from girl with curly hair' src='src/curl_wink.png'>" +
"<p>Nice curls ;)  </p> "

//dropdown-filter reviews by hair type
const reviewFilter = document.createElement('div')
reviewFilter.className = "dropdown"
const reviewFilterButton = document.createElement('button')
reviewFilterButton.className="dropbtn"
reviewFilterButton.textContent="Filter by Hair Type"
const dropdownDiv = document.createElement('div')
dropdownDiv.id = "myDropdown"
dropdownDiv.className = "dropdown-content"
let wA = document.createElement('p')
wA.textContent = "2A"
let wB = document.createElement('p')
wB.textContent = "2B"
let wC = document.createElement('p')
wC.textContent = "2C"
let cA = document.createElement('p')
cA.textContent = "3A"
let cB = document.createElement('p')
cB.textContent = "3B"
let cC = document.createElement('p')
cC.textContent = "3C"
let coA = document.createElement('p')
coA.textContent = "4A"
let coB = document.createElement('p')
coB.textContent = "4B"
let coC = document.createElement('p')
coC.textContent = "4C"
let viewAll = document.createElement('p')
viewAll.textContent = "All"
dropdownDiv.append(wA, wB, wC, cA, cB, cC, coA, coB, coC, viewAll)
reviewFilter.append(reviewFilterButton, dropdownDiv)
reviewFilterButton.addEventListener('click', () => {dropdownDiv.classList.toggle("show")})