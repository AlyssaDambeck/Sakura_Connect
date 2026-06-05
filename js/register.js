function doRegister()
{
    let firstName =
        document.getElementById("firstName").value;

    let lastName =
        document.getElementById("lastName").value;

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(
        firstName === "" ||
        lastName === "" ||
        username === "" ||
        password === ""
    )
    {
        alert("Please fill out all fields.");
        return;
    }

    console.log("Registering User");

    /*
        API CODE GOES HERE
    */

    alert("Account Created!");

    window.location.href = "index.html";
}