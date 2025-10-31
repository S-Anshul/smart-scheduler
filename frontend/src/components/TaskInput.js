import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dependencies, setDependencies] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !hours || !dueDate) {
      alert('Please fill all required fields');
      return;
    }

    const newTask = {
      title,
      estimatedHours: parseInt(hours),
      dueDate,
      dependencies: dependencies 
        ? dependencies.split(',').map(d => d.trim()).filter(d => d)
        : []
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setHours('');
    setDueDate('');
    setDependencies('');
  };

  return (
    <div className="task-input-container">
      <h3>➕ Add New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Task Title *</label>
          <input
            type="text"
            placeholder="e.g., Design API"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Estimated Hours *</label>
            <input
              type="number"
              placeholder="5"
              min="1"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date *</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dependencies (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g., Design API, Setup Database"
            value={dependencies}
            onChange={(e) => setDependencies(e.target.value)}
          />
          <small>Leave empty if no dependencies</small>
        </div>

        <button type="submit" className="btn-add">
          ➕ Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskInput;