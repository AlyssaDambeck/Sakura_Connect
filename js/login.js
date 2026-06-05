const urlBase = "http://sakuraconnect.online/LAMPAPI";

function doLogin()
{
    let username =
        document.getElementById("loginName").value;

    let password =
        document.getElementById("loginPassword").value;

    if(username === "" || password === "")
    {
        alert("Please enter a username and password.");
        return;
    }

    console.log("Login Attempt");
    console.log(username);
    console.log(password);

    /*
        API CODE GOES HERE
    */

    window.location.href = "contacts.html";
}