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

document.querySelector(".hamburger").addEventListener("click", () => {document.querySelector(".sidebar").classList.toggle("sidebarShow");});