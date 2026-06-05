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
        /*
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password
        */
       
        "firstName":"Alyssa",
        "lastName":"Dambeck",
        "login":"alyssa",
        "password":"test123"

    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase + "/SignUp.php";

    let xhr =
        new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader(
        "Content-type",
        "application/json; charset=UTF-8"
    );

    xhr.onreadystatechange = function()
    {
        if(
            this.readyState == 4 &&
            this.status == 200
        )
        {
            alert(
                "Account Created!"
            );

            window.location.href =
                "index.html";
        }
    };

    xhr.send(jsonPayload);
}