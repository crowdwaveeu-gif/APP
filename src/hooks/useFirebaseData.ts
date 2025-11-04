// React hooks for Firebase data fetching and state management
import { useState, useEffect } from 'react';
import { getOrderStats, getDeliveryStats, getTransportModeStats, OrderStats, DeliveryStats, TransportModeStats } from '../services/dataService';

// Hook for order statistics
export const useOrderStats = () => {
  const [data, setData] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await getOrderStats();
        setData(stats);
      } catch (err) {
        console.error('Error fetching order stats:', err);
        setError('Failed to fetch order statistics');
        // Set fallback data if Firebase fails
        setData({
          totalBookings: 0,
          completedDeliveries: 0,
          activeDeliveries: 0,
          paymentDue: 0,
          totalRevenue: 0,
          monthlyGrowth: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStats();
  }, []);

  return { data, loading, error };
};

// Hook for delivery statistics  
export const useDeliveryStats = () => {
  const [data, setData] = useState<DeliveryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await getDeliveryStats();
        setData(stats);
      } catch (err) {
        console.error('Error fetching delivery stats:', err);
        setError('Failed to fetch delivery statistics');
        // Set fallback data if Firebase fails
        setData({
          activeDeliveries: 0,
          completedToday: 0,
          pendingPickup: 0,
          inTransit: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryStats();
  }, []);

  return { data, loading, error };
};

// Hook for transport mode statistics
export const useTransportModeStats = (source: 'trips' | 'packages' = 'trips') => {
  const [data, setData] = useState<TransportModeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransportModeStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await getTransportModeStats(source);
        setData(stats);
      } catch (err) {
        console.error('Error fetching transport mode stats:', err);
        setError('Failed to fetch transport mode statistics');
        // Set fallback data if Firebase fails
        setData({
          flight: [0, 0, 0, 0, 0, 0, 0],
          train: [0, 0, 0, 0, 0, 0, 0],
          bus: [0, 0, 0, 0, 0, 0, 0],
          car: [0, 0, 0, 0, 0, 0, 0],
          motorcycle: [0, 0, 0, 0, 0, 0, 0],
          ship: [0, 0, 0, 0, 0, 0, 0],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          dataSource: source,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransportModeStats();
  }, [source]);

  return { data, loading, error };
};