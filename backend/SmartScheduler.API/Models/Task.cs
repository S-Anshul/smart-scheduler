namespace SmartScheduler.API.Models;

public class TaskItem
{
    public string Title { get; set; } = string.Empty;
    public int EstimatedHours { get; set; }
    public string DueDate { get; set; } = string.Empty;
    public List<string> Dependencies { get; set; } = new();
}