window.onload = function()
{
    document.getElementById(
        "userName"
    ).innerHTML =
        localStorage.getItem("firstName") +
        " " +
        localStorage.getItem("lastName");
};