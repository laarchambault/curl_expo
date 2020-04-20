const viewFavBtn = document.querySelector('#view-favorites-btn')
const viewToTryBtn = document.querySelector('#view-to-try-btn')
const favBtn = document.querySelector('#fav-btn')
const toTryBtn = document.querySelector('#to-try-btn')
const favDiv = document.querySelector('#fav-container')


function viewFavBtnCallback() {
    clearDetails()
    favDiv.style.display = "block"
    fetch(`${baseURL}/users/${currentUser.id}`)
    .then(r => r.json())
    .then( userData => {
        favDiv.querySelector('h1').textContent = "Your Favorite Products"
        favs = userData.favorites.filter(f => f.category === "Favorite")
        favs.forEach(displayFavorites)
    })
}

//event listener: toTryBtn
function viewToTryCallback() {
    clearDetails()
    favDiv.style.display = "block"
    fetch(`${baseURL}/users/${currentUser.id}`)
    .then(r => r.json())
    .then( userData => {
        favDiv.querySelector('h1').textContent = "Products to Try"
        favs = userData.favorites.filter(f => f.category === "To Try")
        favs.forEach(displayFavorites)
        favDiv.addEventListener('click', e => deleteFavCallback(e))
    })
}

function deleteFavCallback(e) {
    if (e.target.nodeName === "BUTTON") {
        //fetch delete to favorite/:id
        const favId = e.target.closest('div').dataset.id
        fetch(`${baseURL}/favorites/${favId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        //routes & controller to delete
        .then(r => r.json())
        .then( r => {
            console.log(r)
            e.target.closest('div').remove()
        })
        //.then remove closest('div')
    } else {}
}

function displayFavorites(favorite) {
    let parDiv = document.createElement('div')
    parDiv.dataset.id = favorite.id
    parDiv.className = "favDiv"
    let img = document.createElement('img')
    img.src = favorite.product.image
    img.alt = favorite.product.name
    img.className = "favThumbnail"
    let p = document.createElement('p')
    p.innerText = favorite.product.name
    p.className = "favList"
    let remove = document.createElement('button');
    remove.innerText = "Remove"
    remove.id = "fav-del-btn"
    let br = document.createElement("BR");
    let br1 = document.createElement("BR");
    parDiv.append(img, p, remove, br, br1)
    favDiv.querySelector('ul').append(parDiv)
}

//event listener: favBtn
function favoriteCallback() {
    //send POST '/favorites'
    let favObj = {
        user_id: currentUser.id,
        product_id: productDetail.dataset.id,
        category: "Favorite"
    }
    fetch(`${baseURL}/favorites`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favObj)
    })
    .then(r => r.json())
    .then(favorite => {
        alert("Saved!")
    })//.then change styling on button
}


//event listener: toTryBtn
function toTryCallback() {
    let favObj = {
        user_id: currentUser.id,
        product_id: productDetail.dataset.id,
        category: "To Try"
    }
    fetch(`${baseURL}/favorites`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favObj)
    })
    .then(r => r.json())
    .then(favorite => {
        alert("Saved!")
    })//.then change styling on button
}