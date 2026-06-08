
const urlBase =
    "https://sakuraconnect.online/LAMPAPI";

let userId =
    localStorage.getItem("userId");

let firstName =
    localStorage.getItem("firstName");

let lastName =
    localStorage.getItem("lastName");

let contacts = [];

let editingContactId = 0;

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
    contacts = results;
    
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
                console.log("SHOWING EMPTY STATE");
                document.getElementById(
                    "contactsGrid"
                ).innerHTML = "";

                console.log("EMPTY STATE CODE RUNNING");
                document.getElementById(
                    "emptyState"
                ).style.display = "block";

                return;
            }

            document.getElementById(
                "emptyState"
            ).style.display = "none";

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
            showMessage(
                "Contact Added!"
            );
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
            showMessage(
                "Contact Deleted!"
            );

            searchContact();
        }
    };

    xhr.send(
        jsonPayload
    );

}
function editContact(id)
{
    editingContactId = id;
    let contact = contacts.find(c => c.ID == id);

    if(!contact)
    {
        alert("Contact not found");
        return;
    }

    document.getElementById(
        "editPanel"
    ).style.display = "flex";

    document.getElementById(
        "editFirstName"
    ).value =
        contact.FirstName;

    document.getElementById(
        "editLastName"
    ).value =
        contact.LastName;

    document.getElementById(
        "editPhoneNumber"
    ).value =
        contact.PhoneNumber;

    document.getElementById(
        "editEmailAddress"
    ).value =
        contact.EmailAddress;


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

function saveEdit()
{
    let tmp =
    {
        id:
            editingContactId,

        userId:
            parseInt(userId),

        newFirstName:
            document.getElementById(
                "editFirstName"
            ).value,

        newLastName:
            document.getElementById(
                "editLastName"
            ).value,

        phoneNumber:
            document.getElementById(
                "editPhoneNumber"
            ).value,

        emailAddress:
            document.getElementById(
                "editEmailAddress"
            ).value
    };

    let xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        urlBase + "/UpdateContact.php",
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
            showMessage(
                "Contact Updated!"
            );

            document.getElementById(
                "editPanel"
            ).style.display =
                "none";

            searchContact();
        }
    };

    xhr.send(
        JSON.stringify(tmp)
    );
}
