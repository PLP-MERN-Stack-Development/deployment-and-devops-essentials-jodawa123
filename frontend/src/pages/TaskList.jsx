import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './TaskList.css';

const TaskList = () => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [editingTask, setEditingTask] = useState(null);

  const { data: tasksData, isLoading } = useQuery('tasks', async () => {
    const response = await api.get('/tasks');
    return response.data;
  });

  const tasks = tasksData?.data || [];

  const createMutation = useMutation(
    (newTask) => api.post('/tasks', newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        setShowForm(false);
        setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, ...data }) => api.put(`/tasks/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        setEditingTask(null);
        setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
      },
    }
  );

  const deleteMutation = useMutation(
    (id) => api.delete(`/tasks/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateMutation.mutate({ id: editingTask._id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#27ae60';
      case 'in-progress':
        return '#3498db';
      case 'pending':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-list">
      <header className="task-header">
        <div>
          <h1>Task Management</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {showForm && (
        <div className="task-form-container">
          <form onSubmit={handleSubmit} className="task-form">
            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-submit" disabled={createMutation.isLoading || updateMutation.isLoading}>
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        </div>
      )}

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-header-card">
                  <h3>{task.title}</h3>
                  <div className="task-badges">
                    <span
                      className="badge"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                    <span
                      className="badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                {task.description && <p className="task-description">{task.description}</p>}
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
                <div className="task-date">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;


