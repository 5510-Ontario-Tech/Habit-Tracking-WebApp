async function requestRegister() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('message');
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        });

        const result = await response.json();
        message.textContent = result.message;

        if (response.ok) {
            localStorage.removeItem('jwtToken');
            window.location.href = "/homepage.html";
        }
    } catch (error) {
        console.error('Error requesting login:', error);
        msg.textContent = 'An error occurred. Please try again.';
    }
}

async function requestAppLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; // Get the password
    const msg = document.getElementById('message');
    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password }) // Send email and password
        });

        const result = await response.json();
        message.textContent = result.message;

        if (response.ok) {
            localStorage.setItem('jwtToken', result.token);
            window.location.href = "/homepage.html";
        } else {
            msg.textContent = result.message;
        }
    } catch (error) {
        console.error('Error requesting login:', error);
        msg.textContent = 'An error occurred. Please try again.';
    }
}
async function checkUserLoginStatus() {
    
}