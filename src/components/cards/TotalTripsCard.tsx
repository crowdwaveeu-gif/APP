import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTripStats, TripStats } from '../../services/dataService';

const TotalTripsCard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<TripStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getTripStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching trip stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleClick = () => {
    navigate('/trips');
  };

  if (loading) {
    return (
      <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <p>Total Trips</p>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4 className="mb-0 me-4">Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p>Total Trips</p>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h4 className="mb-0 me-4">{stats?.totalTrips.toLocaleString() || 0}</h4>
        <span className="badge bg-success">{stats?.activeTrips || 0} Active</span>
      </div>
      <small className="text-muted mt-2">
        {stats?.completedTrips || 0} completed • {stats?.cancelledTrips || 0} cancelled
      </small>
    </div>
  );
};

export default TotalTripsCard;
