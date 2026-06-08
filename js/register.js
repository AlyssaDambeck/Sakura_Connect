const urlBase =
    "https://sakuraconnect.online/LAMPAPI";

function doRegister()
{
    let firstName =
        document.getElementById("firstName").value;

    let lastName =
        document.getElementById("lastName").value;

    let login =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    
    let tmp =
    {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password
    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase + "/Register.php";

    let xhr =
        new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader(
        "Content-type",
        "application/json; charset=UTF-8"
    );

    xhr.onreadystatechange = function()
    {
        if(this.readyState == 4)
        {
            console.log(xhr.responseText);

            let jsonObject =
            JSON.parse(xhr.responseText);

            if(jsonObject.error != "")
            {
                alert(jsonObject.error);
                return;
            }

            alert("Account Created!");

            window.location.href =
                "index.html";
        }
    };

    xhr.send(jsonPayload);
}