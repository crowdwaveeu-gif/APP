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
      <p>Total Users</p>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h4 className="mb-0 me-4">{stats?.totalUsers.toLocaleString() || 0}</h4>
        <span className={isPositiveGrowth ? 'text-success' : 'text-danger'}>
          {isPositiveGrowth ? '+' : ''}{stats?.growthPercentage.toFixed(2)}% 
          <i className={`ti ti-trending-${isPositiveGrowth ? 'up' : 'down'}`}></i>
        </span>
      </div>
      <small className="text-muted mt-2">{stats?.newUsersThisMonth || 0} new this month</small>
    </div>
  );
};

export default UserGrowthCard;
