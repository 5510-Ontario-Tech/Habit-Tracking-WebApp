async function requestAppLogin() {
    const email = document.getElementById('email').value;
    const msg = document.getElementById('message');
    try {
        const response = await fetch('/api/request-login-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const result = await response.json();
        message.textContent = result.message;

        if (response.ok) {
            document.getElementById('email-form').style.display = 'none'; // Hide the form
        }
    } catch (error) {
        console.error('Error requesting login link:', error);
        message.textContent = 'An error occurred. Please try again.';
    }
}

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        try {
            const response = await fetch('/api/verify-jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('jwtToken', result.token);  //Store the JWT in Local Storage
                window.location.href = "/profile.html"  //Redirect to profile page
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            alert('An error occurred while verifying the link.');
        }
    }
};
$(document).ready(function() {
    // Elements from the DOM
    const $habitForm = $("#habit-form");
    const $habitInput = $("#habit-input");
    const $habitList = $("#habit-list");
    const $totalHabits = $("#total-habits");
    const $completedHabits = $("#completed-habits");
    const $habitProgress = $("#habit-progress");
    const $logoutButton = $("#logout-btn");

    // Arrays to store habit data
    let habits = [];

    // Function to update the dashboard
    function updateDashboard() {
        const total = habits.length;
        const completed = habits.filter(habit => habit.completed).length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update the dashboard stats
        $totalHabits.text(total);
        $completedHabits.text(completed);
        $habitProgress.text(`${progress}%`);
    }

    // Function to render the habit list
    function renderHabitList() {
        $habitList.empty();
        habits.forEach((habit, index) => {
            const $li = $("<li>").addClass("habit-item");
              

            const $span = $("<span>").text(habit.name);
            if (habit.completed) {
                $span.addClass("completed");
            }

            // Create a checkbox to mark as completed
            const $checkbox = $("<input>").attr("type", "checkbox").prop("checked", habit.completed);
            $checkbox.on("change", function() {
                habit.completed = $(this).prop("checked");
                updateDashboard();
                renderHabitList();
            });

            $li.append($checkbox).append($span);
            $habitList.append($li);
        });
    }

    // Handle the form submission to add a new habit
    $habitForm.on("submit", function(e) {
        e.preventDefault();

        // Add new habit to the array
        const newHabit = {
            name: $habitInput.val(),
            completed: false
        };
        habits.push(newHabit);

        // Clear the input field
        $habitInput.val("");

        // Update the dashboard and habit list
        updateDashboard();
        renderHabitList();
    });

    // Handle logout functionality 
    $logoutButton.on("click", function() {
        
        alert("Logging out...");
    });

    // Initialize dashboard
    updateDashboard();
    renderHabitList();
});