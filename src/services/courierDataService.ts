// Data service layer for fetching courier/delivery data from Firebase
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our courier system data
export interface Order {
  id: string;
  customerName: string;
  deliveryAddress: string;
  pickupAddress: string;
  packageDetails: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: Timestamp;
  deliveredAt?: Timestamp;
  driverId?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  rating: number;
  totalDeliveries: number;
  status: 'active' | 'inactive';
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryStats {
  totalOrders: number;
  totalDelivered: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageDeliveryTime: number;
}

export interface ChartData {
  date: string;
  orders: number;
  delivered: number;
  revenue: number;
}

// Service class for courier data operations
class CourierDataService {
  
  // Get all orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const ordersRef = collection(db, 'orders');
      const snapshot = await getDocs(ordersRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  // Get orders by status
  async getOrdersByStatus(status: string): Promise<Order[]> {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('status', '==', status));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
      return [];
    }
  }

  // Get recent orders
  async getRecentOrders(limitCount: number = 10): Promise<Order[]> {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limitCount));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      return [];
    }
  }

  // Get delivery statistics
  async getDeliveryStats(): Promise<DeliveryStats> {
    try {
      const orders = await this.getAllOrders();
      
      const totalOrders = orders.length;
      const deliveredOrders = orders.filter(order => order.status === 'delivered');
      const totalDelivered = deliveredOrders.length;
      const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'confirmed' || order.status === 'in_transit').length;
      const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
      
      // Calculate average delivery time (in hours)
      const deliveredWithTimes = deliveredOrders.filter(order => order.deliveredAt && order.createdAt);
      const averageDeliveryTime = deliveredWithTimes.length > 0 
        ? deliveredWithTimes.reduce((sum, order) => {
            const createdTime = order.createdAt.toMillis();
            const deliveredTime = order.deliveredAt!.toMillis();
            return sum + (deliveredTime - createdTime);
          }, 0) / (deliveredWithTimes.length * 1000 * 60 * 60) // Convert to hours
        : 0;

      return {
        totalOrders,
        totalDelivered,
        pendingOrders,
        cancelledOrders,
        totalRevenue,
        averageDeliveryTime
      };
    } catch (error) {
      console.error('Error calculating delivery stats:', error);
      return {
        totalOrders: 0,
        totalDelivered: 0,
        pendingOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
        averageDeliveryTime: 0
      };
    }
  }

  // Get chart data for the last 30 days
  async getChartData(days: number = 30): Promise<ChartData[]> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);

      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('createdAt', '>=', Timestamp.fromDate(startDate)),
        where('createdAt', '<=', Timestamp.fromDate(endDate))
      );
      
      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));

      // Group orders by date
      const dataByDate: { [key: string]: ChartData } = {};
      
      // Initialize all dates with zero values
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(endDate.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dataByDate[dateStr] = {
          date: dateStr,
          orders: 0,
          delivered: 0,
          revenue: 0
        };
      }

      // Populate with actual data
      orders.forEach(order => {
        const orderDate = order.createdAt.toDate().toISOString().split('T')[0];
        if (dataByDate[orderDate]) {
          dataByDate[orderDate].orders++;
          dataByDate[orderDate].revenue += order.amount || 0;
          if (order.status === 'delivered') {
            dataByDate[orderDate].delivered++;
          }
        }
      });

      return Object.values(dataByDate).sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return [];
    }
  }

  // Get all active drivers
  async getActiveDrivers(): Promise<Driver[]> {
    try {
      const driversRef = collection(db, 'drivers');
      const q = query(driversRef, where('status', '==', 'active'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Driver));
    } catch (error) {
      console.error('Error fetching active drivers:', error);
      return [];
    }
  }

  // Real-time listener for orders
  subscribeToOrders(callback: (orders: Order[]) => void): () => void {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      callback(orders);
    }, (error) => {
      console.error('Error in orders subscription:', error);
    });
  }

  // Real-time listener for delivery stats
  subscribeToStats(callback: (stats: DeliveryStats) => void): () => void {
    return this.subscribeToOrders(async (orders) => {
      const stats = await this.calculateStatsFromOrders(orders);
      callback(stats);
    });
  }

  // Helper method to calculate stats from orders array
  private async calculateStatsFromOrders(orders: Order[]): Promise<DeliveryStats> {
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    const totalDelivered = deliveredOrders.length;
    const pendingOrders = orders.filter(order => ['pending', 'confirmed', 'in_transit'].includes(order.status)).length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    
    // Calculate average delivery time
    const deliveredWithTimes = deliveredOrders.filter(order => order.deliveredAt && order.createdAt);
    const averageDeliveryTime = deliveredWithTimes.length > 0 
      ? deliveredWithTimes.reduce((sum, order) => {
          const createdTime = order.createdAt.toMillis();
          const deliveredTime = order.deliveredAt!.toMillis();
          return sum + (deliveredTime - createdTime);
        }, 0) / (deliveredWithTimes.length * 1000 * 60 * 60)
      : 0;

    return {
      totalOrders,
      totalDelivered,
      pendingOrders,
      cancelledOrders,
      totalRevenue,
      averageDeliveryTime
    };
  }
}

// Create and export service instance
export const courierDataService = new CourierDataService();
export default courierDataService;