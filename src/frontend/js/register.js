$(document).ready(function () {
    $("#registerform").submit(function (event) {
        event.preventDefault();
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const errorMessage = $("#error-message");
        $.ajax({
            url: '/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email: email, password: password }),
            success: function (response) {
                if(response.success){
                    console.log("Signup successful! About to redirect to /frontend/pages/verify.html");
                    sessionStorage.setItem("token",JSON.stringify({verificationToken:response.verificationToken}));
                    // window.location.href = "../pages/verify.html";
                    setTimeout(() => window.location.href = "verify.html", 1000);
                }
            },
            error: function (xhr, status, error) {
                console.error("Register error:", xhr);
                errorMessage.text("Register error check credentials");
            }
        });
    });
});