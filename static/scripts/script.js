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
let addProductModal = document.querySelector(".addProductModal");

function showAddForm() {
	addProductModal.classList.add("showForm");
}

addProductBtn.addEventListener("click", showAddForm);


let cancelAddBtn = document.querySelector(".cancelAddBtn");

function hideAddForm() {
	addProductModal.classList.remove("showForm");
}

cancelAddBtn.addEventListener("click", hideAddForm);

let editProductBtns = document.querySelectorAll(".editProductBtn");

for (var i = 0; i < editProductBtns.length; i++) {
	editProductBtns[i].addEventListener("click", removeDisabled);

	function removeDisabled() {
		this.style.display = "none";
		let parentDiv = this.parentNode;
		let inputNodes = parentDiv.getElementsByTagName("INPUT");
		for (var j = 0; j < inputNodes.length; j++) {
			inputNodes[j].disabled = false;
		}
		let btns = parentDiv.querySelectorAll(".cancelEditBtn, .saveEditBtn");
		for (var k = 0; k < btns.length; k++) {
					btns[k].style.display = "block";

					function addDisabled() {
						console.log(inputNodes[j])
						inputNodes[j].disabled = true;
						console.log(btns[k]);
						btns[k].style.display = "none";	
					}
					console.log(btns[k].getElementsByTagName("A"))
				}		
	}
}