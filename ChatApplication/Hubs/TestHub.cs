using Microsoft.AspNetCore.SignalR;

namespace ChatApplication.Hubs
{
    public class TestHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine($"Connected to client - {Context.ConnectionId}");
            return base.OnConnectedAsync();
        }
    }
}
