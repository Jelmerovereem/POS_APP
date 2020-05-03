let deleteBtns = document.querySelectorAll(".deleteProductBtn"); //delete buttons for products
let deleteForms = document.querySelectorAll(".removeForm"); //the form to submit the remove/delete

for (var i = 0; i < deleteBtns.length; i++) {
	deleteBtns[i].addEventListener("click", askToDelete); //if one of the buttons gets clicked, fire askToDelete()

	function askToDelete() { // show the popup for confirming the remove/delete
	let parentDiv = this.parentNode;
	parentDiv.children.namedItem("removeFormID").classList.add("showForm"); //gives the popup the class "showForm". To set the display to "block"
	function closeModal() {
		parentDiv.children.namedItem("removeFormID").classList.remove("showForm"); //remove the "showForm" class so display goes back to "none"
	}
	parentDiv.children.namedItem("removeFormID").children[0].children[1].children.namedItem("cancelBtn").addEventListener("click", closeModal); //close the popup if user clicks on the cancel button	
}
}

let addProductBtn = document.querySelector(".addProductBtn"); //the add product button
let addProductForm = document.querySelector(".addProductForm"); //the form where user can add a product
let addProductModal = document.querySelector(".addProductModal"); //the popup to add a product

function showAddForm() {
	addProductModal.classList.add("showForm"); //give the popup the "showForm" class to set display to "block"
}

addProductBtn.addEventListener("click", showAddForm); //show the form when user clicks on the add product button


let cancelAddBtn = document.querySelector(".cancelAddBtn"); //the cancel button to close the add product popup

function hideAddForm() {
	addProductModal.classList.remove("showForm"); //remove the "showForm" class so display goes back to "none"
}

cancelAddBtn.addEventListener("click", hideAddForm); //when user clicks on cancel button, fire hideAddForm()

let editProductBtns = document.querySelectorAll(".editProductBtn"); //select the edit product buttons

for (var i = 0; i < editProductBtns.length; i++) { //loop through these buttons
	editProductBtns[i].addEventListener("click", removeDisabled); //when user clicks on a edit button, fire up removeDisabled(). This function removes the disablet attribute from the inputs

	function removeDisabled() {
		this.style.display = "none"; //hide the edit product button
		let parentDiv = this.parentNode;
		let inputNodes = parentDiv.getElementsByTagName("INPUT"); //get all the inputs
		for (var j = 0; j < inputNodes.length; j++) { //loop through these inputs
			inputNodes[j].disabled = false; //remove the disabled attribute from the inputs
			console.log(inputNodes[j]);
			function addDisabled() {
				document.querySelector(".editForm").reset();
				for (var a = 0; a < inputNodes.length; a++) {
					inputNodes[a].disabled = true;
				}
			}

		let btns = parentDiv.querySelectorAll(".cancelEditBtn, .saveEditBtn"); //get the cancel and save buttons
		for (var k = 0; k < btns.length; k++) { //loop through these buttons
					btns[k].style.display = "block"; //set the display of these buttons to "block"
					function hideBtns() {
						parentDiv.querySelector("a.cancelEditBtn").style.display = "none";
						parentDiv.querySelector("button").style.display = "none";	//set the display of these buttons back to "none";
						parentDiv.querySelector("a.editProductBtn").style.display = "inline-block";
					}
					
				}
				parentDiv.querySelector("a").addEventListener("click", () => {addDisabled(); hideBtns();} );
		}		
	}
}

let darkModeBtn = document.querySelector(".darkModeBtn");

darkModeBtn.addEventListener("click", () => {
	if (darkModeBtn.text === "Dark Mode") {
		darkModeBtn.text = "Light Mode"
	} else {
		darkModeBtn.text = "Dark Mode"
	};
	document.querySelector("body").classList.toggle("body-darkTheme");
	let productContainers = document.querySelectorAll(".productContainer");
	for (var q = 0; q < productContainers.length; q++) {
		productContainers[q].classList.toggle("container-darkTheme");
	}
	let inputs = document.querySelectorAll("input");
	for (var f = 0; f < inputs.length; f++) {
		inputs[f].classList.toggle("inputs-darkTheme");
	}
})

document.querySelector(".navTitle").addEventListener("click", () => {location.href = "/"; console.log("clicked")});

document.querySelector(".hamburger").addEventListener("click", () => {document.querySelector(".sidebar").classList.toggle("sidebarShow");});