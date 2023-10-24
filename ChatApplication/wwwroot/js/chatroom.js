var messageForm = document.getElementById("messageForm");
var chatBox = document.getElementById('chat-box');

// Retrieve the connection object from session storage
var roomName = extractRoomNameFromURL();
var connection;
connectAndJoin(roomName);


messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;
    messageInput.value = "";

    await SendMessageToHub(message);

})

//handle notifications from hub
connection.on("updateMessages", (msg) => {
    console.log("Message received from hub: " + msg);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = msg;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
})

async function windowLoadedClient() {
    connection.invoke("GetAllMessages", roomName).then((msgs) => {

        // Loop through msgs and append each message to the chat-box div
        msgs.forEach(function (message) {
            var messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            chatBox.appendChild(messageDiv);
        });

        // Scroll to the bottom to show the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
}

async function connectAndJoin(chatRoomValue) {
    try {
        connection = new signalR.HubConnectionBuilder().withUrl("/hubs/chathub").build();
        await connection.start();

        // Join the chat room
        await joinChatRoom(chatRoomValue);
        await windowLoadedClient();

    } catch (error) {
        console.error("Connection error: ", error);
    }
}

async function joinChatRoom(roomName) {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.send("JoinRoom", roomName);
            console.log(`Joined chat room: ${roomName}`);
        } catch (error) {
            console.error("Error joining chat room: ", error);
        }
    }
}

function extractRoomNameFromURL() {
    const currentURL = window.location.href;
    const roomNameRegex = /\/chat\/(.+)/;
    const match = currentURL.match(roomNameRegex);

    if (match && match.length > 1) {
        return match[1]; // Return the captured group as the room name
    } else {
        console.error("Room name not found in the URL.");
        return null; // Or handle the absence of room name according to your needs
    }
}

async function SendMessageToHub(message) {
    try {
        await connection.invoke("SendMessageToRoom", roomName, message);
        console.log(`Sent message to hub`);
    } catch (error) {
        console.error("Error sending message to hub ", error);
    }
    
}
