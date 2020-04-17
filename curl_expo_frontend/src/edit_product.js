const editButton = document.querySelector('#edit-product-button')
const editDiv = document.querySelector('#edit-product')
const ingredientDatalist = document.querySelector('#ingredient-options')
const newIngredientForm = document.querySelector('#new-ingredient')
const editProductForm = document.querySelector('#edit-product-form')

function editButtonCallback() {
    clearDetails();
    renderEditSection();
}

function addProductToEditForm(id) {
    productFetch(id)
    .then(product => {
        editProductForm.querySelector('#product-name').value = product.name
        editProductForm.querySelector('#brand').value = product.brand
        editProductForm.querySelector('#edit-image').value = product.image
    })

};

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

function editProductCallback(e) {
    e.preventDefault();
    let t = e.target
    let editObj = {
        name: t.name.value,
        brand: t.brand.value,
        image: t.image.value,
    }
    fetch(`${baseURL}/products/${t.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editObj)
    })
    .then(r => r.json())
    .then(product => {
        alert("Product Updated!")
        displayProductDetails(product.id)
    })
}
