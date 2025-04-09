let addBtn = document.querySelector(".add-btn");
let input = document.querySelector(".input");
let taskContainer = document.querySelector(".task-list");

addBtn.addEventListener("click", function () {
	const taskText = input.value.trim();

	if (taskText === "") {
		alert("You must type something.");
	} else {
		// New task structure
		let newTask = document.createElement("div");
		newTask.classList.add("new-task");

		// Left section (icon + text)
		let leftDiv = document.createElement("div");
		leftDiv.classList.add("left");

		let checkImg = document.createElement("img");
		checkImg.src = "img/unchecked.png";
		checkImg.alt = "unchecked";
		checkImg.classList.add("unchecked");

		let taskP = document.createElement("p");
		taskP.classList.add("task-value");
		taskP.textContent = taskText;

		leftDiv.appendChild(checkImg);
		leftDiv.appendChild(taskP);

		// Delete button
		let deleteBtn = document.createElement("span");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.innerHTML = "&times;";

		// Append everything
		newTask.appendChild(leftDiv);
		newTask.appendChild(deleteBtn);
		taskContainer.appendChild(newTask);
		saveTasks();

		// Clear input box
		input.value = "";

		// Toggle checkbox image on click
		newTask.addEventListener("click", () => {
			const isChecked = checkImg.src.includes("img/checked.png");

			if (isChecked) {
				checkImg.src = "img/unchecked.png";
				taskP.classList.remove("done");
			} else {
				checkImg.src = "img/checked.png";
				taskP.classList.add("done");
			}
		});

		// Delete task on delete icon click
		deleteBtn.addEventListener("click", () => {
			newTask.remove();
			saveTasks();
		});
	}
});

// AI GENERATED CODE FOR STORING AND LOADING THE DATA.................
// Saving data to local storage
function saveTasks() {
	localStorage.setItem("tasks", taskContainer.innerHTML);
}

// Loading data from the local storage
window.addEventListener("DOMContentLoaded", () => {
	taskContainer.innerHTML = localStorage.getItem("tasks") || "";

	// Reattach event listeners to restored tasks
	const leftSections = document.querySelectorAll(".left");
	const deleteButtons = document.querySelectorAll(".delete-btn");

	leftSections.forEach((leftDiv) => {
		const img = leftDiv.querySelector("img");
		const taskP = leftDiv.querySelector("p");

		leftDiv.addEventListener("click", () => {
			const isChecked = img.src.includes("checked.png");

			if (isChecked) {
				img.src = "img/unchecked.png";
				taskP.classList.remove("done");
			} else {
				img.src = "img/checked.png";
				taskP.classList.add("done");
			}

			saveTasks(); // Update storage
		});
	});

	deleteButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			saveTasks(); // Update storage
		});
	});
});

// Dark Mode Toggle
const body = document.querySelector("body");
const toggler = document.querySelector("#toggler");

toggler.addEventListener("click", function () {
	body.classList.toggle("dark-mode");
	this.classList.toggle("ri-moon-fill");
	this.classList.toggle("ri-sun-fill");
});

saveTasks();
