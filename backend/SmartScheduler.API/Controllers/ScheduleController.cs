using Microsoft.AspNetCore.Mvc;
using SmartScheduler.API.Models;
using SmartScheduler.API.Services;

namespace SmartScheduler.API.Controllers;

[ApiController]
[Route("api/v1/projects")]
public class ScheduleController : ControllerBase
{
    private readonly TaskSchedulerService _schedulerService;
    private readonly ILogger<ScheduleController> _logger;

    public ScheduleController(
        TaskSchedulerService schedulerService,
        ILogger<ScheduleController> logger)
    {
        _schedulerService = schedulerService;
        _logger = logger;
    }

    [HttpPost("{projectId}/schedule")]
    public IActionResult CreateSchedule(string projectId, [FromBody] ScheduleRequest request)
    {
        try
        {
            // Validation
            if (request.Tasks == null || !request.Tasks.Any())
            {
                return BadRequest(new { error = "Tasks array is required" });
            }

            _logger.LogInformation("Creating schedule for project {ProjectId}", projectId);

            // Sort tasks
            var recommendedOrder = _schedulerService.SortTasks(request.Tasks);
            var totalHours = _schedulerService.CalculateTotalHours(request.Tasks);

            var response = new ScheduleResponse
            {
                ProjectId = projectId,
                RecommendedOrder = recommendedOrder,
                TotalHours = totalHours
            };

            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Error creating schedule");
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "OK", timestamp = DateTime.UtcNow });
    }
}   