import React from 'react';

function TaskList({ tasks, onRemoveTask, onClearAll }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No tasks added yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h3>📋 Your Tasks ({tasks.length})</h3>
        <button onClick={onClearAll} className="btn-clear">
          🗑️ Clear All
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-header">
              <h4>{task.title}</h4>
              <button 
                onClick={() => onRemoveTask(index)}
                className="btn-remove"
                aria-label="Remove task"
              >
                ✕
              </button>
            </div>
            
            <div className="task-details">
              <span className="task-badge">⏱️ {task.estimatedHours}h</span>
              <span className="task-badge">📅 {task.dueDate}</span>
            </div>
            
            {task.dependencies.length > 0 && (
              <div className="task-dependencies">
                <strong>Depends on:</strong> {task.dependencies.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;