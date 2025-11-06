import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserGrowthStats, UserGrowthStats } from '../../services/dataService';

const UserGrowthCard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserGrowthStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getUserGrowthStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching user growth stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleClick = () => {
    navigate('/users-management');
  };

  if (loading) {
    return (
      <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <p>Total Users</p>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4 className="mb-0 me-4">Loading...</h4>
        </div>
      </div>
    );
  }

  const isPositiveGrowth = stats && stats.growthPercentage >= 0;

  return (
    <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Total Users</p>
      <div className="d-flex align-items-start justify-content-between flex-wrap">
        <div>
          <h4 className="mb-0">{stats?.totalUsers.toLocaleString() || 0}</h4>
          <small className="text-muted mt-2" style={{ display: 'block' }}>
            <strong>{stats?.newUsersThisMonth || 0}</strong> new this month
          </small>
        </div>
        <div className="text-end">
          <span className={`badge ${isPositiveGrowth ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
            {isPositiveGrowth ? '+' : ''}{stats?.growthPercentage.toFixed(2)}% 
            <i className={`ti ti-trending-${isPositiveGrowth ? 'up' : 'down'} ms-1`}></i>
          </span>
          <small className="text-muted mt-1" style={{ display: 'block' }}>
            Growth this month
          </small>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthCard;
