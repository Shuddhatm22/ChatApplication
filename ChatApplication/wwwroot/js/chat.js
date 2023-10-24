var chatRoomForm = document.getElementById("chatRoomForm");
var roomOptionInput = document.getElementById("roomOption");
var roomNameContainer = document.getElementById("roomNameContainer");
var existingRoomsDiv = document.getElementById("existingRooms");
var roomNameInput = document.getElementById("roomname");
var userNameInput = document.getElementById("username");
var roomSelectInput = document.getElementById("roomSelect");
var createRoom = false;


// room options
roomOptionInput.addEventListener('change', () => {
    var selectedOption = roomOptionInput.value;

    if (selectedOption === "join") {
        // Show existing room options
        createRoom = false;
        existingRoomsDiv.style.display = "block";
        roomNameContainer.style.display = "none"; // Hide room name input field
    } else if (selectedOption === "create") {
        // Show room name input field and hide existing room buttons
        createRoom = true;
        roomNameContainer.style.display = "block";
        existingRoomsDiv.style.display = "none";
    }
});

// creating a room
chatRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var usernameValue = userNameInput.value;

    if (createRoom) {
        var roomNameValue = roomNameInput.value;
        console.log("hello " + usernameValue);
        window.location.href = `/chat/${roomNameValue}/create`;
    }
    else {
        var roomNameValue = roomSelectInput.value;
        console.log("hello " + usernameValue);
        window.location.href = `/chat/${roomNameValue}/join`;
    }
});








