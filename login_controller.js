async function login(event) {
    // THis is a terrible way to handle login
    // logins are NOT safe!
    // passwords are in cleartext in a json file!!
    // You should never handle this application side like this!
    // Fix later!

    event.preventDefault(); // Prevent page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const users = await getData("/data/user.json")
    const user = users.find(e => e.username === username);

    if (user && user.password === password) {
        sessionStorage.setItem("loggedInUser", user.username);
        window.location.href = "/index.html";
    } else {
        // TODO: handlel failed login
    }
}

