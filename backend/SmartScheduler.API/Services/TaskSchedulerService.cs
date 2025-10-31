namespace SmartScheduler.API.Services;

using SmartScheduler.API.Models;

public class TaskSchedulerService
{
    public List<string> SortTasks(List<TaskItem> tasks)
    {
        var taskMap = tasks.ToDictionary(t => t.Title, t => t);
        var sorted = new List<string>();
        var visited = new HashSet<string>();
        var visiting = new HashSet<string>();

        void Visit(string taskTitle)
        {
            if (visited.Contains(taskTitle))
                return;

            if (visiting.Contains(taskTitle))
                throw new InvalidOperationException("Circular dependency detected!");

            visiting.Add(taskTitle);

            if (taskMap.TryGetValue(taskTitle, out var task))
            {
                foreach (var dependency in task.Dependencies)
                {
                    if (taskMap.ContainsKey(dependency))
                    {
                        Visit(dependency);
                    }
                }
            }

            visiting.Remove(taskTitle);
            visited.Add(taskTitle);
            sorted.Add(taskTitle);
        }

        foreach (var task in tasks)
        {
            Visit(task.Title);
        }

        return sorted;
    }

    public int CalculateTotalHours(List<TaskItem> tasks)
    {
        return tasks.Sum(t => t.EstimatedHours);
    }
}