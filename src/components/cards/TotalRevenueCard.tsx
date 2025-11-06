import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRevenueStats, RevenueStats } from '../../services/dataService';

const TotalRevenueCard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getRevenueStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching revenue stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const isPositiveGrowth = stats && stats.growthPercentage >= 0;

  const handleClick = () => {
    navigate('/packages'); // Navigate to packages page to see revenue-generating bookings
  };

  return (
    <div className="card-2 bg-white full-height" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="single-card-two" style={{ marginTop: '8px' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div style={{ marginTop: '22px' }}>
            <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Total revenue</p>
            <h2 className="mb-0">{loading ? 'Loading...' : `€${stats?.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}</h2>
          </div>
          <div className="d-flex flex-column align-items-end" style={{ marginTop: '22px' }}>
            <span className={`badge ${isPositiveGrowth ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
              {isPositiveGrowth ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ marginRight: '4px', verticalAlign: 'middle' }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.68903 3.49164C4.68903 3.25001 4.88491 3.05414 5.12653 3.05414L10.134 3.05414C10.2501 3.05414 10.3613 3.10023 10.4434 3.18228C10.5254 3.26433 10.5715 3.37561 10.5715 3.49164L10.5715 8.49913C10.5715 8.74076 10.3756 8.93663 10.134 8.93663C9.8924 8.93663 9.69653 8.74076 9.69653 8.49913L9.69653 3.92914L5.12653 3.92914C4.88491 3.92914 4.68903 3.73326 4.68903 3.49164Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.81717 10.8131C2.64632 10.6423 2.64632 10.3653 2.81717 10.1944L9.75919 3.2524C9.93005 3.08155 10.2071 3.08155 10.3779 3.2524C10.5488 3.42326 10.5488 3.70027 10.3779 3.87112L3.43589 10.8131C3.26504 10.984 2.98803 10.984 2.81717 10.8131Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ marginRight: '4px', verticalAlign: 'middle' }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.68903 10.5084C4.68903 10.75 4.88491 10.9459 5.12653 10.9459L10.134 10.9459C10.2501 10.9459 10.3613 10.8998 10.4434 10.8177C10.5254 10.7357 10.5715 10.6244 10.5715 10.5084L10.5715 5.50087C10.5715 5.25924 10.3756 5.06337 10.134 5.06337C9.8924 5.06337 9.69653 5.25924 9.69653 5.50087L9.69653 10.0709L5.12653 10.0709C4.88491 10.0709 4.68903 10.2667 4.68903 10.5084Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.81717 3.18689C2.64632 3.35775 2.64632 3.63475 2.81717 3.80561L9.75919 10.7476C9.93005 10.9185 10.2071 10.9185 10.3779 10.7476C10.5488 10.5767 10.5488 10.2997 10.3779 10.1289L3.43589 3.18689C3.26504 3.01603 2.98803 3.01603 2.81717 3.18689Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {isPositiveGrowth ? '+' : ''}{stats?.growthPercentage.toFixed(2) || '0'}%
            </span>
            <small className="text-muted mt-2">
              {isPositiveGrowth ? 'Growth' : 'Decline'} this month
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TotalRevenueCard;
