const newProductButton = document.querySelector('#new-product-button')
const newProductForm = document.querySelector('#new-product-form')
const newProductDiv = document.querySelector('#new-product')
//eventListener callback for product submission
function newProductCallback() {
    clearDetails();
    renderProductForm();
}

function productFormCallback(e) {
    e.preventDefault()
    let t = e.target
    let productObj = createProductObj(t)
    t.reset()
    fetchNewProduct(productObj)
    .then(product => {
        displayProductDetails(createProductLi(product))
    })
}

function createProductObj(t) {
    return {
        name: t.name.value,
        brand: t.brand.value,
        image: t.image.value
    }
}

function fetchNewProduct(productObj) {
    return fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productObj)
    })
    .then(r => r.json())
}