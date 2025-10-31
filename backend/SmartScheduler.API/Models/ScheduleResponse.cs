namespace SmartScheduler.API.Models;

public class ScheduleResponse
{
    public string ProjectId { get; set; } = string.Empty;
    public List<string> RecommendedOrder { get; set; } = new();
    public int TotalHours { get; set; }
}