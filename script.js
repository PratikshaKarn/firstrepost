// Check if there are goals in local storage
let goals = JSON.parse(localStorage.getItem('goals')) || [];

const goalForm = document.getElementById('goal-form');
const goalList = document.getElementById('goal-list');
const editGoalModal = document.getElementById('editGoalModal');
const editGoalForm = document.getElementById('editGoalForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// Render goals
function renderGoals() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const goalElement = document.createElement('div');
        goalElement.classList.add('goal');
        if (goal.completed) {
            goalElement.classList.add('completed');
        }
        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p>Deadline: ${goal.deadline}</p>
            <button onclick="toggleCompletion(${index})">${goal.completed ? 'Mark as Incomplete' : 'Mark as Completed'}</button>
            <button onclick="openEditModal(${index})">Edit</button>
            <button onclick="deleteGoal(${index})">Delete</button>
        `;
        goalList.appendChild(goalElement);
    });
}

// Open the edit modal
function openEditModal(index) {
    const goal = goals[index];
    document.getElementById('newTitle').value = goal.title;
    document.getElementById('newDescription').value = goal.description;
    document.getElementById('newDeadline').value = goal.deadline;
    editGoalModal.style.display = 'block';
    // Submit edited goal when the form is submitted
    editGoalForm.onsubmit = function(event) {
        event.preventDefault();
        const newTitle = document.getElementById('newTitle').value;
        const newDescription = document.getElementById('newDescription').value;
        const newDeadline = document.getElementById('newDeadline').value;
        goals[index] = {
            title: newTitle,
            description: newDescription,
            deadline: newDeadline,
            completed: goals[index].completed
        };
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals();
        editGoalModal.style.display = 'none';
    };
    // Close the edit modal when the cancel button is clicked
    cancelEditBtn.onclick = function() {
        editGoalModal.style.display = 'none';
    };
}

// Close the edit modal when the close button is clicked
document.getElementsByClassName('close')[0].onclick = function() {
    editGoalModal.style.display = 'none';
}

// Close the edit modal when clicking outside the modal
window.onclick = function(event) {
    if (event.target == editGoalModal) {
        editGoalModal.style.display = 'none';
    }
}

// Function to add a goal
function addGoal(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const goal = {
        title,
        description,
        deadline,
        completed: false
    };
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
    goalForm.reset();
}

// Function to toggle completion of a goal
function toggleCompletion(index) {
    goals[index].completed = !goals[index].completed;
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
}

// Function to delete a goal
function deleteGoal(index) {
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
}

goalForm.addEventListener('submit', addGoal);

renderGoals();
