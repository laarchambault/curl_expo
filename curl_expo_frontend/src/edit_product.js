const editButton = document.querySelector('#edit-product-button')
const editDiv = document.querySelector('#edit-product')
const ingredientDatalist = document.querySelector('#ingredient-options')
const newIngredientForm = document.querySelector('#new-ingredient')

function editButtonCallback() {
    clearDetails()
    renderEditSection()
}

function newIngredientCallback(e) {
    e.preventDefault()
    let ingObj = {
        name: e.target.name.value,
        product_id: e.target.dataset.id
    }
    e.target.reset()
    fetch(`${baseURL}/ingredients`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingObj)
    })
    .then(r => r.json())
    .then(data => {
        displayProductDetails(data.product.id)
    })
}

function loadDatalistIngredients() {
    fetch(`${baseURL}/ingredients`)
    .then(r => r.json())
    .then(products => {
        products.forEach(createDatalistOption);
        
    })
}

function createDatalistOption(product) {
    let option = document.createElement('option')
    option.value = product.name
    ingredientDatalist.append(option)
}

