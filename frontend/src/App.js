import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Results from './components/Results';
import './App.css';

function App() {
  const [projectId, setProjectId] = useState('');
  const [tasks, setTasks] = useState([
    {
      title: 'Design API',
      estimatedHours: 5,
      dueDate: '2025-10-25',
      dependencies: []
    },
    {
      title: 'Implement Backend',
      estimatedHours: 12,
      dueDate: '2025-10-28',
      dependencies: ['Design API']
    },
    {
      title: 'Build Frontend',
      estimatedHours: 10,
      dueDate: '2025-10-30',
      dependencies: ['Design API']
    },
    {
      title: 'End-to-End Test',
      estimatedHours: 8,
      dueDate: '2025-10-31',
      dependencies: ['Implement Backend', 'Build Frontend']
    }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001';

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

const handleGenerateSchedule = async () => {
  // Validation
  if (!projectId.trim()) {
    setError('Please enter a Project ID');
    return;
  }

  if (tasks.length === 0) {
    setError('Please add at least one task');
    return;
  }

  setLoading(true);
  setError('');
  setResult(null);

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/projects/${projectId}/schedule`,
      { tasks },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    setResult(response.data);
    
    // Scroll to results
    setTimeout(() => {
      document.querySelector('.result-container')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);

  } catch (err) {
    console.error('Error:', err);
    
    if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else if (err.code === 'ERR_NETWORK') {
      setError('Cannot connect to server. Make sure the backend is running.');
    } else if (err.message) {
      setError(`Error: ${err.message}`);
    } else {
      setError('Failed to generate schedule. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        {!result && (
          <>
            <div className="project-section">
              <label htmlFor="projectId">🎯 Project ID *</label>
              <input
                id="projectId"
                type="text"
                placeholder="Enter your project ID (e.g., PROJECT-001)"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="project-input"
              />
            </div>

            <TaskInput onAddTask={handleAddTask} />
            
            <TaskList
              tasks={tasks}
              onRemoveTask={handleRemoveTask}
              onClearAll={handleClearAll}
            />

            {error && (
              <div className="inline-error">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleGenerateSchedule}
              disabled={loading || tasks.length === 0}
              className="btn-generate"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Schedule...
                </>
              ) : (
                <>
                  🚀 Generate Schedule
                </>
              )}
            </button>
          </>
        )}

        <Results 
          result={result} 
          error={error && !loading ? error : null}
          onReset={handleReset}
        />
      </main>

      <footer className="footer">
        <p>Made with ❤️ using React & .NET 8</p>
      </footer>
    </div>
  );
}

export default App;