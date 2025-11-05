import { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { getRevenueStats, RevenueStats } from '../../services/dataService';

const RevenueChart = () => {
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ApexCharts | null>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!loading && stats && chartRef.current) {
      const chartOptions = {
        series: [
          {
            name: 'Revenue',
            data: stats.monthlyData.map((item) => item.revenue),
          },
        ],
        chart: {
          height: 300,
          type: 'bar',
          fontFamily: 'Poppins, sans-serif',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#4bc0c0'],
        xaxis: {
          categories: stats.monthlyData.map((item) => item.month),
        },
        yaxis: {
          labels: {
            formatter: function (value: number) {
              return '€' + value.toLocaleString();
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (value: number) {
              return '€' + value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            },
          },
        },
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new ApexCharts(chartRef.current, chartOptions);
      chartInstanceRef.current.render();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [loading, stats]);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  if (loading || !stats) {
    return (
      <div className="card shipment-statistic-card">
        <div className="mb-4 shipment-statistic-header flex-wrap d-flex align-items-center justify-content-between row-gap-2">
          <h5 className="mb-0">Revenue Analytics</h5>
        </div>
        <div className="text-center py-5">
          <p>Loading revenue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shipment-statistic-card">
      <div className="mb-4 shipment-statistic-header flex-wrap d-flex align-items-center justify-content-between row-gap-2">
        <h5 className="mb-0">Revenue Analytics</h5>

        <div className="dropdown ms-xl-3 ms-0 dropstart" ref={dropdownRef}>
          <button
            className={`btn pe-0 ${activeDropdown ? 'show' : ''}`}
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12C1 10.6193 2.11929 9.5 3.5 9.5C4.88071 9.5 6 10.6193 6 12C6 13.3807 4.88071 14.5 3.5 14.5C2.11929 14.5 1 13.3807 1 12ZM9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12ZM20.5 9.5C19.1193 9.5 18 10.6193 18 12C18 13.3807 19.1193 14.5 20.5 14.5C21.8807 14.5 23 13.3807 23 12C23 10.6193 21.8807 9.5 20.5 9.5Z"
                fill="#605F76"
              />
            </svg>
          </button>
          <ul className={`dropdown-menu ${activeDropdown ? 'show' : ''}`}>
            <li>
              <a className="dropdown-item" href="#">
                <i className="ti ti-refresh"></i>
                Refresh
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="ti ti-download"></i>
                Export
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div ref={chartRef} style={{ height: '300px' }}></div>
    </div>
  );
};

export default RevenueChart;
