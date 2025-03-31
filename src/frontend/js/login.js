$(document).ready(function () {
    $("#loginform").submit(function (event) {
        event.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();
        const errorMessage = $("#error-message");
        errorMessage.text("");
        $.ajax({
            url: '/auth/signin',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                console.log("Signin successful! About to redirect to /dashboard.html");
                localStorage.setItem('jwtToken', data.token);
                $.ajax({
                    url: '/dashboard.html',
                    type:'GET',
                    headers:{'Authorization':'Bearer '+data.token},
                    success: function(){
                        window.location.href = "/dashboard.html";
                    },
                    error: function(xhr){
                        console.error("Dashboard access error:",xhr);
                        errorMessage.text("Failed to access dashboard!")
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Signin error:", xhr.responseJSON?.message || "Invalid credentials error!");
                errorMessage.text(xhr.responseJSON?.message||"Invalid email or password");
            }
        });
    });
});