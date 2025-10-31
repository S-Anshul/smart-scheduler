namespace SmartScheduler.API.Models;

public class ScheduleRequest
{
    public List<TaskItem> Tasks { get; set; } = new();
}