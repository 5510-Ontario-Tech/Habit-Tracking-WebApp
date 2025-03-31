document.addEventListener("DOMContentLoaded",function(){
    const userToken = JSON.parse(sessionStorage.getItem("token"));
    if(userToken && userToken.verificationToken){
        document.getElementById("verify-email").addEventListener("click", function(){
            $.ajax({
                url: 'auth/verify-email',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({verificationToken:userToken.verificationToken}),
                success: function(response){
                    if(response.success){
                        alert("User is verified! Please wait for a few seconds!");
                    }
                },
                error: function (xhr,status,error){
                    console.error("Error updating click: ",xhr);
                }
            });
        });
    }
    else{
        console.log("No User Entry found!");
    }
});