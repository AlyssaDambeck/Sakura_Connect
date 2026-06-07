const urlBase =
    "https://sakuraconnect.online/LAMPAPI";

window.onload = function()
{
    document.getElementById(
        "userName"
    ).innerHTML =
        localStorage.getItem("firstName") +
        " " +
        localStorage.getItem("lastName");
};

function saveContact()
{
    let tmp =
    {
        FirstName:
            document.getElementById("firstName").value,

        LastName:
            document.getElementById("lastName").value,

        PhoneNumber:
            document.getElementById("phoneNumber").value,

        EmailAddress:
            document.getElementById("emailAddress").value,

        UserID:
            parseInt(
                localStorage.getItem("userId")
            )
    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase +
        "/AddContact.php";

    let xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        url,
        true
    );

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
            console.log(xhr.responseText);
            let jsonObject =
                JSON.parse(
                    xhr.responseText
                );

            if(jsonObject.error != "")
            {
                alert(
                    jsonObject.error
                );

                return;
            }

            showMessage(
                "Contact Added!"
            );

            document.getElementById(
                "firstName"
            ).value = "";

            document.getElementById(
                "lastName"
            ).value = "";

            document.getElementById(
                "phoneNumber"
            ).value = "";

            document.getElementById(
                "emailAddress"
            ).value = "";
        }
    };

    xhr.send(
        jsonPayload
    );
}

function showMessage(message)
{
    let box =
        document.getElementById(
            "messageBox"
        );

    box.innerHTML =
        message;

    box.style.display =
        "block";

    setTimeout(
        function()
        {
            box.style.display =
                "none";
        },
        3000
    );
}