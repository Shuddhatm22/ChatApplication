namespace ChatApplication.Data
{
    public static class SD
    {
        public static Dictionary<string, List<string>> messages { get; set; }

        static SD()
        {
            messages = new Dictionary<string, List<string>>();
        }
    }
}
