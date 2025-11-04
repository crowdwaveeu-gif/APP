import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDisputeStats, DisputeStats } from '../../services/dataService';

const TotalDisputesCard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DisputeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getDisputeStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dispute stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleClick = () => {
    navigate('/disputes');
  };

  if (loading) {
    return (
      <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <p>Total Disputes</p>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4 className="mb-0 me-4">Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p>Total Disputes</p>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h4 className="mb-0 me-4">{stats?.totalDisputes.toLocaleString() || 0}</h4>
        <span className="badge bg-warning">{stats?.openDisputes || 0} Open</span>
      </div>
      <small className="text-muted mt-2">
        {stats?.inProgressDisputes || 0} in progress • {stats?.resolvedDisputes || 0} resolved
      </small>
    </div>
  );
};

export default TotalDisputesCard;
