import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPackageStats, PackageStats } from '../../services/dataService';

const TotalPackagesCard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<PackageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getPackageStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching package stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleClick = () => {
    navigate('/packages');
  };

  if (loading) {
    return (
      <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <p>Total Packages</p>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4 className="mb-0 me-4">Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="card cta-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p>Total Packages</p>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h4 className="mb-0 me-4">{stats?.totalPackages.toLocaleString() || 0}</h4>
        <span className="badge bg-info">{stats?.pendingPackages || 0} Pending</span>
      </div>
      <small className="text-muted mt-2">
        {stats?.inTransitPackages || 0} in transit • {stats?.deliveredPackages || 0} delivered
      </small>
    </div>
  );
};

export default TotalPackagesCard;
