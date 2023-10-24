using ChatApplication.Data;
using Microsoft.AspNetCore.SignalR;

namespace ChatApplication.Hubs
{
    public class ChatHub : Hub
    {
        // join a room
        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            Console.WriteLine($"{Context.ConnectionId} has joined the room {roomName}");
            await Clients.Group(roomName).SendAsync($"{Context.ConnectionId} has joined the room");
        }

        // leave a room
        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            Console.WriteLine($"{Context.ConnectionId} has left the room {roomName}");
            await Clients.Group(roomName).SendAsync($"{Context.ConnectionId} has left the room");
        }

        // send message to a room
        public async Task SendMessageToRoom(string roomName, string message)
        {
            string fullMsg = $"{Context.ConnectionId} : {message}";
            SD.messages[roomName].Add(fullMsg);
            Console.WriteLine($"{roomName} : message from {Context.ConnectionId} : {message}");
            await Clients.Group(roomName).SendAsync("updateMessages", fullMsg);
        }

        public List<string> GetAllMessages(string roomName)
        {
            if(!SD.messages.ContainsKey(roomName))
            {
                SD.messages.Add(roomName, new List<string>());
            }
            return SD.messages[roomName];
        }
    }
}
