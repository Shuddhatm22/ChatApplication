// create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/testhub").build();


function fufilled() {
    console.log("connection to test hu established");
}

function rejected() {

}

connection.start().then(fufilled, rejected);