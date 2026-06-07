const urlBase =
    "https://sakuraconnect.online/LAMPAPI";

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
    let login =
        document.getElementById("loginName").value;

    let password =
        document.getElementById("loginPassword").value;

    let tmp =
    {
        login: login,
        password: password
    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase + "/Login.php";

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
            let jsonObject =
                JSON.parse(xhr.responseText);

            if(jsonObject.id < 1)
            {
                alert(jsonObject.error);
                return;
            }

            userId =
                jsonObject.id;

            firstName =
                jsonObject.firstName;

            lastName =
                jsonObject.lastName;

            localStorage.setItem(
                "userId",
                userId
            );

            localStorage.setItem(
                "firstName",
                firstName
            );

            localStorage.setItem(
                "lastName",
                lastName
            );

            window.location.href =
                "contacts.html";
        }
    };

    xhr.send(jsonPayload);
}

document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("loginPassword")
        .addEventListener("keypress", function(event)
    {
        if(event.key === "Enter")
        {
            doLogin();
        }
    });

    document.getElementById("loginName")
        .addEventListener("keypress", function(event)
    {
        if(event.key === "Enter")
        {
            doLogin();
        }
    });
});