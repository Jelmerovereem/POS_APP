let deleteBtns = document.querySelectorAll(".deleteProductBtn");
let deleteForms = document.querySelectorAll(".removeForm");

for (var i = 0; i < deleteBtns.length; i++) {
	deleteBtns[i].addEventListener("click", askToDelete);

	function askToDelete() {
	let parentDiv = this.parentNode;
	parentDiv.children.namedItem("removeFormID").classList.add("showForm");
	function closeModal() {
		parentDiv.children.namedItem("removeFormID").classList.remove("showForm");
	}



	parentDiv.children.namedItem("removeFormID").children[0].children[1].children.namedItem("cancelBtn").addEventListener("click", closeModal);	
}
}

let addProductBtn = document.querySelector(".addProductBtn");
let addProductForm = document.querySelector(".addProductForm");

function showAddForm() {
	addProductForm.classList.add("showForm");
}

addProductBtn.addEventListener("click", showAddForm);


let cancelAddBtn = document.querySelector(".cancelAddBtn");

function hideAddForm() {
	addProductForm.classList.remove("showForm");
}

cancelAddBtn.addEventListener("click", hideAddForm);