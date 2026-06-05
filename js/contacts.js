
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
        firstName +
        " " +
        lastName;

    searchContact();
};

function doLogout()
{
    localStorage.clear();

    window.location.href =
        "index.html";
}

function displayContacts(results)
{
    let grid =
        document.getElementById(
            "contactsGrid"
        );

    grid.innerHTML = "";

    for(let i = 0; i < results.length; i++)
    {
        let contact =
            results[i];

        grid.innerHTML +=
        `
        <div class="contact-card">

            <h3>
                ${contact.FirstName}
                ${contact.LastName}
            </h3>

            <p>
                ${contact.PhoneNumber}
            </p>

            <p>
                ${contact.EmailAddress}
            </p>

            <div class="actions">

                <button
                    onclick="editContact(${contact.ID})">
                    Edit
                </button>

                <button
                    onclick="deleteContact(${contact.ID})">
                    Delete
                </button>

            </div>

        </div>
        `;
    }
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

            displayContacts(
                jsonObject.results
            );
        }
    };

    xhr.send(jsonPayload);
}

function addContact()
{
    let firstName =
        prompt(
            "First Name"
        );

    let lastName =
        prompt(
            "Last Name"
        );

    let phoneNumber =
        prompt(
            "Phone Number"
        );

    let emailAddress =
        prompt(
            "Email Address"
        );

    let tmp =
    {
        firstName:
            firstName,

        lastName:
            lastName,

        phoneNumber:
            phoneNumber,

        emailAddress:
            emailAddress,

        userId:
            parseInt(userId)
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

    xhr.onreadystatechange =
    function()
    {
        if(
            this.readyState == 4 &&
            this.status == 200
        )
        {
            searchContact();
        }
    };

    xhr.send(
        jsonPayload
    );
}

function deleteContact(id)
{
    let tmp =
    {
        id: id,
        userId:
            parseInt(userId)
    };

    let jsonPayload =
        JSON.stringify(tmp);

    let url =
        urlBase +
        "/DeleteContact.php";

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

    xhr.onreadystatechange =
    function()
    {
        if(
            this.readyState == 4 &&
            this.status == 200
        )
        {
            searchContact();
        }
    };

    xhr.send(
        jsonPayload
    );
}