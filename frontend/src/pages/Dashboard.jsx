import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const { data: tasksData, isLoading } = useQuery(
    'tasks',
    async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  const tasks = tasksData?.data || [];
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <p>Manage your tasks efficiently</p>
        </div>
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">{tasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number stat-completed">{completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p className="stat-number stat-progress">{inProgressTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number stat-pending">{pendingTasks}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/tasks" className="btn-primary">
            Manage Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


