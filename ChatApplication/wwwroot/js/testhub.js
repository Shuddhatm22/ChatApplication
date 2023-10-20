var usernameForm = document.getElementById("usernameForm");
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var usernameInput = document.getElementById("username");
    var userameValue = usernameInput.value;
    console.log("hello " + userameValue);
    testConnection();
})

function testConnection() {
    // create connection
    var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/testhub").build();
    connection.start().then(fufilled, rejected);
}


function fufilled() {
    console.log("connection to test hub established");
}

function rejected() {
    console.log("connection failed");
}

