import React from 'react';

function Results({ result, error, onReset }) {
  if (error) {
    return (
      <div className="result-container error">
        <div className="error-content">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <button onClick={onReset} className="btn-secondary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="result-container success">
      <div className="result-header">
        <h2>✅ Schedule Generated Successfully!</h2>
        <button onClick={onReset} className="btn-secondary">
          Create New Schedule
        </button>
      </div>

      <div className="result-content">
        <div className="result-section">
          <h3>📊 Recommended Task Order</h3>
          <ol className="recommended-order">
            {result.recommendedOrder.map((task, index) => (
              <li key={index}>
                <span className="step-number">{index + 1}</span>
                <span className="step-title">{task}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="result-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{result.recommendedOrder.length}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <span className="stat-label">Total Hours</span>
              <span className="stat-value">{result.totalHours}h</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-label">Project ID</span>
              <span className="stat-value">{result.projectId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;