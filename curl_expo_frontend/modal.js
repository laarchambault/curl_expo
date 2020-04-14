// Leave this here! 
// Show the form
const loginModal = document.querySelector("#login-modal")
document.querySelector("#make-bake-button").addEventListener("click", () => {
  loginModal.style.display = "block"
})
// Hide the form
loginModal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    loginModal.style.display = "none"
  }
})

// // Leave this here! 
// // Show the form
// const userModal = document.querySelector("#user-modal")
// document.querySelector("#make-bake-button").addEventListener("click", () => {
//   userModal.style.display = "block"
// })
// // Hide the form
// userModal.addEventListener("click", e => {
//   if (e.target.dataset.action === "close") {
//     userModal.style.display = "none"
//   }
// })

// Leave this here! 
// Show the form
const modal = document.querySelector("#modal")
document.querySelector("#make-bake-button").addEventListener("click", () => {
  modal.style.display = "block"
})
// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})