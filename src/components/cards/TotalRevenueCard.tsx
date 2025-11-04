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
      <div className="single-card-two">
        <div className="card-icon-two bg-red-">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 20.75C0 20.3358 0.335786 20 0.75 20H18.75C19.1642 20 19.5 20.3358 19.5 20.75C19.5 21.1642 19.1642 21.5 18.75 21.5H0.75C0.335786 21.5 0 21.1642 0 20.75Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 8.13086C0 7.16665 0.785786 6.38086 1.75 6.38086H3.34998C4.31419 6.38086 5.09998 7.16665 5.09998 8.13086V16.7509C5.09998 17.7151 4.31419 18.5009 3.34998 18.5009H1.75C0.785786 18.5009 0 17.7151 0 16.7509V8.13086ZM1.75 7.88086C1.61421 7.88086 1.5 7.99507 1.5 8.13086V16.7509C1.5 16.8866 1.61421 17.0009 1.75 17.0009H3.34998C3.48576 17.0009 3.59998 16.8866 3.59998 16.7509V8.13086C3.59998 7.99507 3.48576 7.88086 3.34998 7.88086H1.75Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.19922 4.93945C7.19922 3.97524 7.98501 3.18945 8.94922 3.18945H10.5492C11.5134 3.18945 12.2992 3.97524 12.2992 4.93945V16.7495C12.2992 17.7137 11.5134 18.4995 10.5492 18.4995H8.94922C7.98501 18.4995 7.19922 17.7137 7.19922 16.7495V4.93945ZM8.94922 4.68945C8.81343 4.68945 8.69922 4.80367 8.69922 4.93945V16.7495C8.69922 16.8852 8.81343 16.9995 8.94922 16.9995H10.5492C10.685 16.9995 10.7992 16.8852 10.7992 16.7495V4.93945C10.7992 4.80367 10.685 4.68945 10.5492 4.68945H8.94922Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3984 1.75C14.3984 0.785786 15.1842 0 16.1484 0H17.7484C18.7126 0 19.4984 0.785786 19.4984 1.75V16.75C19.4984 17.7142 18.7126 18.5 17.7484 18.5H16.1484C15.1842 18.5 14.3984 17.7142 14.3984 16.75V1.75ZM16.1484 1.5C16.0127 1.5 15.8984 1.61421 15.8984 1.75V16.75C15.8984 16.8858 16.0127 17 16.1484 17H17.7484C17.8842 17 17.9984 16.8858 17.9984 16.75V1.75C17.9984 1.61421 17.8842 1.5 17.7484 1.5H16.1484Z"
              fill="white"
            />
          </svg>
        </div>
        <h6>Total revenue</h6>
        <h2>{loading ? 'Loading...' : `$${stats?.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}</h2>
        <p>
          <span className={isPositiveGrowth ? 'text-success' : 'text-danger'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.68903 3.49164C4.68903 3.25001 4.88491 3.05414 5.12653 3.05414L10.134 3.05414C10.2501 3.05414 10.3613 3.10023 10.4434 3.18228C10.5254 3.26433 10.5715 3.37561 10.5715 3.49164L10.5715 8.49913C10.5715 8.74076 10.3756 8.93663 10.134 8.93663C9.8924 8.93663 9.69653 8.74076 9.69653 8.49913L9.69653 3.92914L5.12653 3.92914C4.88491 3.92914 4.68903 3.73326 4.68903 3.49164Z"
                fill={isPositiveGrowth ? '#1A932E' : '#dc3545'}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.81717 10.8131C2.64632 10.6423 2.64632 10.3653 2.81717 10.1944L9.75919 3.2524C9.93005 3.08155 10.2071 3.08155 10.3779 3.2524C10.5488 3.42326 10.5488 3.70027 10.3779 3.87112L3.43589 10.8131C3.26504 10.984 2.98803 10.984 2.81717 10.8131Z"
                fill={isPositiveGrowth ? '#1A932E' : '#dc3545'}
              />
            </svg>
          </span>
          {isPositiveGrowth ? '+' : ''}{stats?.growthPercentage.toFixed(2) || '0'}% this month
        </p>
      </div>
    </div>
  );
};
export default TotalRevenueCard;
