using ChatApplication.Data;
using ChatApplication.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ChatApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("/chat")]
        public IActionResult Chat()
        {
            var allRooms = SD.messages.Keys.ToList();
            ViewData["rooms"] = allRooms;
            return View();
        }

        [HttpGet]
        [Route("/chat/{chatRoomName}/create")]
        public IActionResult CreateChatRoom(string chatRoomName)
        {
            SD.messages.Add(chatRoomName, new List<string>());
            return RedirectToAction("ChatRoom", new { chatRoomName = chatRoomName});
        }

        [Route("/chat/{chatRoomName}/join")]
        public IActionResult ChatRoom(string chatRoomName)
        {
            ViewData["ChatRoomName"] = chatRoomName;
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}