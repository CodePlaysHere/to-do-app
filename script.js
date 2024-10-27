// Select all custom checkboxes
const checkBoxList = document.querySelectorAll(".custom-checkbox");

// Select all goal input fields
const inputFields = document.querySelectorAll(".goal-input");

// Select the error label
const errorLabel = document.querySelector(".error-label");

// Select the progress label and progress bar elements
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

// Array of motivational quotes
const allQuotes = [
	"Raise the bar by completing your goals!",
	"Well begun is half done!",
	"Just a step away, keep going!",
	"Whoa! You just completed all the goals, time for chill dude.",
];

// Retrieve stored goals from local storage or initialize an empty object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// Calculate the number of completed goals
let completedGoalsCount = Object.values(allGoals).filter(
	(goal) => goal.completed
).length;

// Update the progress bar based on the number of completed goals
progressValue.style.width = `${
	(completedGoalsCount / inputFields.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

// Add click event listeners to each checkbox
checkBoxList.forEach((checkbox) => {
	checkbox.addEventListener("click", (e) => {
		// Check if all input fields have a value
		const allGoalsAdded = [...inputFields].every(function (input) {
			return input.value;
		});

		if (allGoalsAdded) {
			// Toggle the "completed" class on the checkbox's parent element
			checkbox.parentElement.classList.toggle("completed");

			// Get the ID of the associated input field
			const inputId = checkbox.nextElementSibling.id;

			// Toggle the completion status of the goal
			allGoals[inputId].completed = !allGoals[inputId].completed;

			// Recalculate the number of completed goals
			completedGoalsCount = Object.values(allGoals).filter(
				(goal) => goal.completed
			).length;

			// Update the progress bar and labels
			progressValue.style.width = `${
				(completedGoalsCount / inputFields.length) * 100
			}%`;
			progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
			progressLabel.innerText = allQuotes[completedGoalsCount];

			// Save the updated goals to local storage
			localStorage.setItem("allGoals", JSON.stringify(allGoals));
		} else {
			// Show the error message if not all input fields are filled
			progressBar.classList.add("show-error");
		}
	});
});

// Initialize input fields and add event listeners
inputFields.forEach((input) => {
	// Pre-fill input fields with stored values
	if (allGoals[input.id]) {
		input.value = allGoals[input.id].name;
		if (allGoals[input.id].completed) {
			input.parentElement.classList.add("completed");
		}
	}

	// Hide the error message when the user focuses on any input field
	input.addEventListener("focus", () => {
		progressBar.classList.remove("show-error");
	});

	// Update goals in real-time as the user types
	input.addEventListener("input", (e) => {
		if (allGoals[input.id] && allGoals[input.id].completed) {
			input.value = allGoals[input.id].name;
			return;
		}
		if (allGoals[input.id]) {
			allGoals[input.id].name = input.value;
		} else {
			allGoals[input.id] = { name: input.value, completed: false };
		}
		localStorage.setItem("allGoals", JSON.stringify(allGoals));
	});
});
