
const urlBase =
    "https://sakuraconnect.online/LAMPAPI";

let userId =
    localStorage.getItem("userId");

let firstName =
    localStorage.getItem("firstName");

let lastName =
    localStorage.getItem("lastName");

let contacts = [];

window.onload = function()
{
    document.getElementById(
        "userName"
    ).innerHTML =
        "Welcome Back<br>" +
        firstName +
        " " +
        lastName;
};

function doLogout()
{
    localStorage.clear();

    window.location.href =
        "index.html";
}

function searchContact()
{
    let search =
        document.getElementById(
            "searchText"
        ).value;

    let tmp =
    {
        search: search,
        userId: parseInt(userId)
    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase +
        "/SearchContacts.php";

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

            console.log(jsonObject.results);
        }
    };

    xhr.send(jsonPayload);
}

function addContact()
{
    alert("Add Contact clicked.");

    /*
        MODAL OR API CODE HERE
    */
}