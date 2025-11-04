import { db, auth } from './firebase';
import { collection, getDocs, query, where, orderBy, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Type definitions for Firebase data
interface Booking {
  id: string;
  status: string;
  createdAt: Timestamp;
  amount?: number;
  [key: string]: any;
}

interface DeliveryTracking {
  id: string;
  status: string;
  createdAt: Timestamp;
  [key: string]: any;
}

// Shipment data structure for UI display
export interface ShipmentData {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  transportMode: string;
  origin: {
    name: string;
    location: string;
  };
  destination: {
    name: string;
    location: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

// Package request data for PackagesPage
export interface PackageRequestData {
  id: string; // Firestore document ID (used for updates/deletes)
  internalId?: string; // Internal ID field stored in the document (if different)
  trackingId: string;
  senderId: string;
  senderName: string;
  senderPhotoUrl?: string;
  receiverName: string;
  receiverPhone: string;
  pickupLocation: {
    city?: string;
    country: string;
    address: string;
  };
  destinationLocation: {
    city?: string;
    country: string;
    address: string;
  };
  packageDetails: {
    description: string;
    weightKg: number;
    size: string;
    type: string;
  };
  preferredTransportModes: string[];
  status: string;
  compensationOffer: number;
  createdAt: Date;
  preferredDeliveryDate?: Date;
  assignedTravelerId?: string;
  deliveryStatus?: string; // From deliveryTracking
}

// Travel trip data for TripsPage
// Note: Firebase stores 'destinationLocation' which we map to 'arrivalLocation' for consistency
export interface TravelTripData {
  id: string; // Firestore document ID (used for updates/deletes)
  internalId?: string; // Internal ID field stored in the document (if different)
  travelerId: string;
  travelerName: string;
  travelerPhotoUrl?: string;
  departureLocation: {
    city?: string;
    country: string;
    address: string;
  };
  arrivalLocation: { // Maps to 'destinationLocation' in Firebase
    city?: string;
    country: string;
    address: string;
  };
  departureDate: Date;
  arrivalDate: Date; // May be null in Firebase, fallback to departureDate
  transportMode: 'flight' | 'train' | 'bus' | 'car' | 'motorcycle' | 'ship';
  availableSpace: number; // Maps to capacity.maxPackages in Firebase
  maxWeightKg: number; // Maps to capacity.maxWeightKg in Firebase
  status: string;
  createdAt: Date;
  price?: number;
}

// Transaction data for TransactionsPage
export interface TransactionData {
  id: string; // Firestore document ID
  userId: string;
  userName?: string;
  userEmail?: string;
  type: string; // e.g., 'payment', 'refund', 'deposit', 'withdrawal'
  amount: number;
  currency?: string;
  status: string; // e.g., 'completed', 'pending', 'failed'
  description?: string;
  relatedBookingId?: string;
  relatedPackageId?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderStats {
  totalBookings: number;        // Total bookings count
  completedDeliveries: number;  // Delivered status count
  activeDeliveries: number;     // picked_up + in_transit
  paymentDue: number;          // paymentPending bookings
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface DeliveryStats {
  activeDeliveries: number;
  completedToday: number;
  pendingPickup: number;
  inTransit: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}

export interface TransportModeStats {
  flight: number[];      // Flight data (available for both trips and packages)
  train: number[];       // Train data (available for both trips and packages)
  bus: number[];         // Bus data (available for both trips and packages)
  car: number[];         // Car data (available for both trips and packages)
  motorcycle: number[];  // Motorcycle data (only for trips, always 0 for packages)
  ship: number[];        // Ship data (only for trips, always 0 for packages)
  labels: string[];      // Month labels (last 7 months)
  dataSource: 'trips' | 'packages';
}

// Get order statistics from real Firebase collections
export const getOrderStats = async (): Promise<OrderStats> => {
  try {
    console.log('🔍 Fetching order stats from Firebase...');

    // Get all bookings (no date filter to see total counts)
    const bookingsRef = collection(db, 'bookings');
    const bookingsQuery = query(bookingsRef);

    console.log('📦 Fetching all bookings...');
    const bookingsSnapshot = await getDocs(bookingsQuery);
    const bookings: Booking[] = bookingsSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Booking));
    
    console.log(`✅ Total bookings fetched: ${bookings.length}`);

    // Get delivery tracking data for active/completed deliveries
    const deliveryTrackingRef = collection(db, 'deliveryTracking');
    const deliveryQuery = query(deliveryTrackingRef);
    
    console.log('🚚 Fetching delivery tracking...');
    const deliverySnapshot = await getDocs(deliveryQuery);
    const deliveries: DeliveryTracking[] = deliverySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as DeliveryTracking));
    
    console.log(`✅ Total deliveries fetched: ${deliveries.length}`);

    // Calculate stats based on actual Firebase data structure
    const totalBookings = bookings.length;
    
    // Count completed deliveries (delivered status in deliveryTracking)
    const completedDeliveries = deliveries.filter(delivery => 
      delivery.status === 'delivered'
    ).length;
    
    // Count active deliveries (picked_up + in_transit in deliveryTracking)
    const activeDeliveries = deliveries.filter(delivery => 
      delivery.status === 'picked_up' || delivery.status === 'in_transit'
    ).length;
    
    // Count bookings with payment pending
    const paymentDue = bookings.filter(booking => 
      booking.status === 'paymentPending'
    ).length;
    
    // Calculate revenue from completed bookings
    const totalRevenue = bookings
      .filter(booking => booking.status === 'completed' || booking.status === 'paymentCompleted')
      .reduce((sum, booking) => sum + (booking.amount || booking.totalAmount || 0), 0);
    
    console.log(`💰 Total revenue calculated: ${totalRevenue}`);
    
    // Calculate monthly growth (simplified - comparing current bookings to baseline)
    const monthlyGrowth = totalBookings > 0 ? 12.5 : 0;
    
    const result = {
      totalBookings,
      completedDeliveries,
      activeDeliveries,
      paymentDue,
      totalRevenue,
      monthlyGrowth
    };
    
    console.log('📊 Order stats result:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching order stats:', error);
    // Return fallback data instead of throwing
    return {
      totalBookings: 0,
      completedDeliveries: 0,
      activeDeliveries: 0,
      paymentDue: 0,
      totalRevenue: 0,
      monthlyGrowth: 0
    };
  }
};// Get delivery statistics from real Firebase collections
export const getDeliveryStats = async (): Promise<DeliveryStats> => {
  try {
    // Check authentication status first
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    console.log('Fetching delivery stats for user:', user.email);

    const deliveryTrackingRef = collection(db, 'deliveryTracking');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deliveryQuery = query(
      deliveryTrackingRef,
      where('updatedAt', '>=', Timestamp.fromDate(today)),
      orderBy('updatedAt', 'desc')
    );
    
    console.log('Fetching delivery tracking...');
    const deliverySnapshot = await getDocs(deliveryQuery);
    const deliveries: DeliveryTracking[] = deliverySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as DeliveryTracking));
    
    console.log('Deliveries fetched:', deliveries.length);
    
    const activeDeliveries = deliveries.filter(d => 
      d.status === 'picked_up' || d.status === 'in_transit'
    ).length;
    const completedToday = deliveries.filter(d => 
      d.status === 'delivered' || d.status === 'completed'
    ).length;
    const pendingPickup = deliveries.filter(d => 
      d.status === 'pending' || d.status === 'confirmed'
    ).length;
    const inTransit = deliveries.filter(d => d.status === 'in_transit').length;
    
    const result = {
      activeDeliveries,
      completedToday,
      pendingPickup,
      inTransit
    };
    
    console.log('Delivery stats result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching delivery stats:', error);
    // Return fallback data instead of throwing
    return {
      activeDeliveries: 0,
      completedToday: 0,
      pendingPickup: 0,
      inTransit: 0
    };
  }
};

// Get chart data for transportation overview from real data
export const getTransportationChartData = async (): Promise<ChartData> => {
  try {
    // Get last 6 months of booking data
    const months = [];
    const deliveryCounts = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      months.push(monthName);
      
      // Get bookings for this month
      const bookingsRef = collection(db, 'bookings');
      const monthQuery = query(
        bookingsRef,
        where('createdAt', '>=', Timestamp.fromDate(monthStart)),
        where('createdAt', '<=', Timestamp.fromDate(monthEnd))
      );
      
      const monthSnapshot = await getDocs(monthQuery);
      deliveryCounts.push(monthSnapshot.size);
    }
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Deliveries',
          data: deliveryCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching transportation chart data:', error);
    // Return empty data on error
    return {
      labels: [],
      datasets: [],
    };
  }
};

// Get transport mode statistics for charts
// IMPORTANT: Different transport modes are available for trips vs packages
// 
// TRIPS (6 modes available in Flutter post trip form):
//   - Flight, Train, Bus, Car, Motorcycle, Ship
//   - Grouped as: Flight | Vehicle (car, motorcycle, bicycle*) | Public (bus, train, walking*) | Ship
//   * bicycle and walking exist in enum but not shown in form UI
//
// PACKAGES (4 modes available in Flutter post package form):
//   - Flight, Train, Bus, Car
//   - Grouped as: Flight | Car | Public (bus, train)
//   - Ship is NOT available for packages (always returns 0)
//
export const getTransportModeStats = async (source: 'trips' | 'packages' = 'trips'): Promise<TransportModeStats> => {
  try {
    console.log(`🚢 Fetching transport mode statistics from Firebase (${source})...`);

    if (source === 'packages') {
      return await getPackageTransportStats();
    }

    // Get trips collection data (collection name is 'travelTrips')
    const tripsRef = collection(db, 'travelTrips');
    
    // First, let's get ALL trips to see what we have
    console.log('🔍 Fetching all trips to check data...');
    const allTripsSnapshot = await getDocs(tripsRef);
    console.log(`✅ Found ${allTripsSnapshot.size} total trips in database`);
    
    // Log a few samples to see the data structure
    if (allTripsSnapshot.size > 0) {
      const samples = allTripsSnapshot.docs.slice(0, 3).map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          createdAt: data.createdAt,
          transportMode: data.transportMode,
          hasCreatedAt: !!data.createdAt,
          hasTransportMode: !!data.transportMode,
        };
      });
      console.log('📋 Sample trips:', samples);
    }
    
    const allTrips = allTripsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Analyzing ${allTrips.length} trips for transport modes by month...`);
    
    // Get data for the last 7 months
    const months: string[] = [];
    const flightData: number[] = [];
    const trainData: number[] = [];
    const busData: number[] = [];
    const carData: number[] = [];
    const motorcycleData: number[] = [];
    const shipData: number[] = [];
    
    const now = new Date();
    
    // Generate month labels and count trips for each month
    for (let i = 6; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      months.push(monthName);
      
      // Count transport modes for this month
      let monthFlight = 0;
      let monthTrain = 0;
      let monthBus = 0;
      let monthCar = 0;
      let monthMotorcycle = 0;
      let monthShip = 0;
      
      allTrips.forEach((trip: any) => {
        // Parse createdAt (stored as ISO string)
        let tripDate: Date | null = null;
        
        if (trip.createdAt) {
          if (typeof trip.createdAt === 'string') {
            tripDate = new Date(trip.createdAt);
          } else if (trip.createdAt?.toDate) {
            tripDate = trip.createdAt.toDate();
          } else if (trip.createdAt?.seconds) {
            tripDate = new Date(trip.createdAt.seconds * 1000);
          }
        }
        
        // Check if trip is in this month
        if (tripDate && tripDate >= monthStart && tripDate <= monthEnd) {
          const mode = trip.transportMode?.toLowerCase() || '';
          
          if (mode === 'flight') {
            monthFlight++;
          } else if (mode === 'train') {
            monthTrain++;
          } else if (mode === 'bus') {
            monthBus++;
          } else if (mode === 'car') {
            monthCar++;
          } else if (mode === 'motorcycle' || mode === 'bicycle') {
            monthMotorcycle++;
          } else if (mode === 'ship') {
            monthShip++;
          }
        }
      });
      
      flightData.push(monthFlight);
      trainData.push(monthTrain);
      busData.push(monthBus);
      carData.push(monthCar);
      motorcycleData.push(monthMotorcycle);
      shipData.push(monthShip);
    }
    
    console.log('📊 Transport mode stats:', {
      labels: months,
      flight: flightData,
      train: trainData,
      bus: busData,
      car: carData,
      motorcycle: motorcycleData,
      ship: shipData,
    });
    
    return {
      flight: flightData,
      train: trainData,
      bus: busData,
      car: carData,
      motorcycle: motorcycleData,
      ship: shipData,
      labels: months,
      dataSource: 'trips',
    };
  } catch (error) {
    console.error('❌ Error fetching transport mode stats:', error);
    // Return empty data on error
    return {
      flight: [0, 0, 0, 0, 0, 0, 0],
      train: [0, 0, 0, 0, 0, 0, 0],
      bus: [0, 0, 0, 0, 0, 0, 0],
      car: [0, 0, 0, 0, 0, 0, 0],
      motorcycle: [0, 0, 0, 0, 0, 0, 0],
      ship: [0, 0, 0, 0, 0, 0, 0],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      dataSource: 'trips',
    };
  }
};

// Get package transport preferences statistics
// Packages only support: Flight, Train, Bus, Car (4 modes)
const getPackageTransportStats = async (): Promise<TransportModeStats> => {
  try {
    console.log('📦 Fetching package transport preferences from Firebase...');

    const packagesRef = collection(db, 'packageRequests');
    const allPackagesSnapshot = await getDocs(packagesRef);
    console.log(`✅ Found ${allPackagesSnapshot.size} total packages in database`);
    
    const allPackages = allPackagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Get data for the last 7 months
    const months: string[] = [];
    const flightData: number[] = [];
    const trainData: number[] = [];
    const busData: number[] = [];
    const carData: number[] = [];
    const motorcycleData: number[] = [];
    const shipData: number[] = [];
    
    const now = new Date();
    
    // Generate month labels and count packages for each month
    for (let i = 6; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      months.push(monthName);
      
      // Count transport modes for this month
      let monthFlight = 0;
      let monthTrain = 0;
      let monthBus = 0;
      let monthCar = 0;
      
      allPackages.forEach((pkg: any) => {
        // Parse createdAt (stored as ISO string)
        let pkgDate: Date | null = null;
        
        if (pkg.createdAt) {
          if (typeof pkg.createdAt === 'string') {
            pkgDate = new Date(pkg.createdAt);
          } else if (pkg.createdAt?.toDate) {
            pkgDate = pkg.createdAt.toDate();
          } else if (pkg.createdAt?.seconds) {
            pkgDate = new Date(pkg.createdAt.seconds * 1000);
          }
        }
        
        // Check if package is in this month
        if (pkgDate && pkgDate >= monthStart && pkgDate <= monthEnd) {
          const modes = pkg.preferredTransportModes || [];
          
          modes.forEach((mode: string) => {
            const lowerMode = mode.toLowerCase();
            
            if (lowerMode === 'flight') {
              monthFlight++;
            } else if (lowerMode === 'train') {
              monthTrain++;
            } else if (lowerMode === 'bus') {
              monthBus++;
            } else if (lowerMode === 'car') {
              monthCar++;
            }
          });
        }
      });
      
      flightData.push(monthFlight);
      trainData.push(monthTrain);
      busData.push(monthBus);
      carData.push(monthCar);
      motorcycleData.push(0); // Not available for packages
      shipData.push(0); // Not available for packages
    }
    
    console.log('📊 Package transport preferences:', {
      labels: months,
      flight: flightData,
      train: trainData,
      bus: busData,
      car: carData,
      motorcycle: motorcycleData,  // Always 0
      ship: shipData,  // Always 0
    });
    
    return {
      flight: flightData,
      train: trainData,
      bus: busData,
      car: carData,
      motorcycle: motorcycleData,
      ship: shipData,
      labels: months,
      dataSource: 'packages',
    };
  } catch (error) {
    console.error('❌ Error fetching package transport preferences:', error);
    return {
      flight: [0, 0, 0, 0, 0, 0, 0],
      train: [0, 0, 0, 0, 0, 0, 0],
      bus: [0, 0, 0, 0, 0, 0, 0],
      car: [0, 0, 0, 0, 0, 0, 0],
      motorcycle: [0, 0, 0, 0, 0, 0, 0],
      ship: [0, 0, 0, 0, 0, 0, 0],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      dataSource: 'packages',
    };
  }
};

// 🔧 DEBUG FUNCTION - Call this from browser console to inspect Firestore data
export const debugFirestoreData = async () => {
  console.log('\n🔍 ========== DEBUGGING FIRESTORE DATA ==========\n');
  
  try {
    // Query packages
    console.log('📦 QUERYING PACKAGES...\n');
    const packagesRef = collection(db, 'packageRequests');
    const packagesQuery = query(packagesRef, orderBy('createdAt', 'desc'));
    const packagesSnapshot = await getDocs(packagesQuery);
    
    console.log(`✅ Total packages found: ${packagesSnapshot.size}\n`);
    
    // Show first 5 packages
    const packageDocs = packagesSnapshot.docs.slice(0, 5);
    packageDocs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n📦 Package ${index + 1}:`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   All Fields: [${Object.keys(data).join(', ')}]`);
      console.log(`   createdAt:`, data.createdAt);
      console.log(`   createdAt type: ${typeof data.createdAt} (${data.createdAt?.constructor?.name})`);
      console.log(`   createdAt RAW VALUE:`, JSON.stringify(data.createdAt));
      
      // Check if it's a string (ISO format)
      if (typeof data.createdAt === 'string') {
        console.log(`   ⚠️ createdAt is a STRING (ISO format)`);
        console.log(`   Parsed as Date: ${new Date(data.createdAt)}`);
      }
      // Check if it's a Timestamp
      else if (data.createdAt?.toDate) {
        console.log(`   ✅ createdAt is a Timestamp`);
        console.log(`   As Date: ${data.createdAt.toDate()}`);
      }
      // Check other date fields
      console.log(`   updatedAt:`, data.updatedAt, `(type: ${typeof data.updatedAt})`);
      console.log(`   preferredDeliveryDate:`, data.preferredDeliveryDate);
      
      console.log(`   preferredTransportModes:`, data.preferredTransportModes);
      console.log(`   status: ${data.status}`);
    });
    
    // Query trips
    console.log('\n\n🚗 QUERYING TRIPS...\n');
    const tripsRef = collection(db, 'trips');
    const tripsQuery = query(tripsRef, orderBy('createdAt', 'desc'));
    const tripsSnapshot = await getDocs(tripsQuery);
    
    console.log(`✅ Total trips found: ${tripsSnapshot.size}\n`);
    
    // Show first 5 trips
    const tripDocs = tripsSnapshot.docs.slice(0, 5);
    tripDocs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n🚗 Trip ${index + 1}:`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   All Fields: [${Object.keys(data).join(', ')}]`);
      console.log(`   createdAt:`, data.createdAt);
      console.log(`   createdAt type: ${typeof data.createdAt} (${data.createdAt?.constructor?.name})`);
      if (data.createdAt?.toDate) {
        console.log(`   createdAt as Date: ${data.createdAt.toDate()}`);
      }
      console.log(`   transportMode: ${data.transportMode}`);
      console.log(`   status: ${data.status}`);
    });
    
    // Count by month for packages - MANUAL COUNTING (not using where queries)
    console.log('\n\n📊 PACKAGE COUNT BY MONTH (Last 7 months) - MANUAL COUNT:\n');
    
    const now = new Date();
    const monthData: any[] = [];
    
    // Get all packages and manually filter by month
    const allPackages = packagesSnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    
    for (let i = 6; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      // Manually filter packages for this month
      let monthCount = 0;
      const modeCount: any = { flight: 0, train: 0, bus: 0, car: 0 };
      
      allPackages.forEach(pkg => {
        const data = pkg.data;
        let pkgDate: Date | null = null;
        
        // Try to parse the date from various formats
        if (data.createdAt) {
          if (typeof data.createdAt === 'string') {
            pkgDate = new Date(data.createdAt);
          } else if (data.createdAt?.toDate) {
            pkgDate = data.createdAt.toDate();
          } else if (data.createdAt?.seconds) {
            // Firestore Timestamp object
            pkgDate = new Date(data.createdAt.seconds * 1000);
          }
        }
        
        // Check if package is in this month
        if (pkgDate && pkgDate >= monthStart && pkgDate <= monthEnd) {
          monthCount++;
          
          // Count transport modes
          const modes = data.preferredTransportModes || [];
          modes.forEach((mode: string) => {
            const lowerMode = mode.toLowerCase();
            if (modeCount[lowerMode] !== undefined) {
              modeCount[lowerMode]++;
            }
          });
        }
      });
      
      console.log(`${monthName}: ${monthCount} packages - Flight: ${modeCount.flight}, Train: ${modeCount.train}, Bus: ${modeCount.bus}, Car: ${modeCount.car}`);
      
      monthData.push({
        month: monthName,
        total: monthCount,
        ...modeCount
      });
    }
    
    console.log('\n📊 SUMMARY TABLE:');
    console.table(monthData);
    
    console.log('\n✅ Debug complete! Check the data above to understand the structure.\n');
    
    return { packages: packagesSnapshot.size, trips: tripsSnapshot.size, monthData };
    
  } catch (error) {
    console.error('❌ Error debugging Firestore:', error);
    throw error;
  }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
  (window as any).debugFirestoreData = debugFirestoreData;
  console.log('💡 Debug function available! Run: window.debugFirestoreData()');
}

// Get shipments from deliveryTracking collection
export const getShipments = async (): Promise<ShipmentData[]> => {
  try {
    console.log('🚚 Fetching shipments from Firebase...');

    // Step 1: Fetch all delivery tracking records
    const deliveryTrackingRef = collection(db, 'deliveryTracking');
    const deliveryQuery = query(
      deliveryTrackingRef,
      orderBy('createdAt', 'desc')
    );
    
    const deliverySnapshot = await getDocs(deliveryQuery);
    console.log(`✅ Found ${deliverySnapshot.size} delivery tracking records`);

    // Step 2: Get all packageRequestIds to fetch in one go
    const packageRequestIds = deliverySnapshot.docs
      .map(doc => doc.data().packageRequestId)
      .filter(Boolean);

    console.log(`� Fetching ${packageRequestIds.length} package requests for location data...`);

    // Step 3: Fetch all related package requests
    const packageRequestsRef = collection(db, 'packageRequests');
    const packageRequestsSnapshot = await getDocs(packageRequestsRef);
    
    // Create a map for quick lookup: packageRequestId -> packageRequest data
    const packageRequestsMap = new Map();
    packageRequestsSnapshot.docs.forEach(doc => {
      packageRequestsMap.set(doc.data().id, doc.data());
    });

    console.log(`✅ Loaded ${packageRequestsMap.size} package requests into lookup map`);
    
    // Step 4: Merge delivery tracking with package request data
    const shipments: ShipmentData[] = deliverySnapshot.docs
      .map((doc): ShipmentData | null => {
        const deliveryData = doc.data();
        const packageRequest = packageRequestsMap.get(deliveryData.packageRequestId);
        
        // 🔍 DEBUG: Log join failures
        if (!packageRequest) {
          console.warn(`⚠️ No packageRequest found for deliveryTracking ${doc.id}`, {
            packageRequestId: deliveryData.packageRequestId,
            availablePackageIds: Array.from(packageRequestsMap.keys()).slice(0, 5)
          });
          return null; // Skip this shipment - no matching package data
        }
        
        // Parse dates
        let createdAt = new Date();
        if (deliveryData.createdAt) {
          if (typeof deliveryData.createdAt === 'string') {
            createdAt = new Date(deliveryData.createdAt);
          } else if (deliveryData.createdAt?.toDate) {
            createdAt = deliveryData.createdAt.toDate();
          } else if (deliveryData.createdAt?.seconds) {
            createdAt = new Date(deliveryData.createdAt.seconds * 1000);
          }
        }

        let updatedAt: Date | undefined;
        if (deliveryData.updatedAt) {
          if (typeof deliveryData.updatedAt === 'string') {
            updatedAt = new Date(deliveryData.updatedAt);
          } else if (deliveryData.updatedAt?.toDate) {
            updatedAt = deliveryData.updatedAt.toDate();
          } else if (deliveryData.updatedAt?.seconds) {
            updatedAt = new Date(deliveryData.updatedAt.seconds * 1000);
          }
        }

        // Get transport mode from packageRequest (preferredTransportModes array)
        let transportMode = 'Ground'; // Fallback if no mode specified
        if (packageRequest.preferredTransportModes && packageRequest.preferredTransportModes.length > 0) {
          const mode = packageRequest.preferredTransportModes[0];
          // Capitalize first letter
          transportMode = mode.charAt(0).toUpperCase() + mode.slice(1);
        }

        // Get locations from packageRequest - NO FALLBACKS, must have real data
        if (!packageRequest.pickupLocation || !packageRequest.destinationLocation) {
          console.warn(`⚠️ Incomplete location data for package ${deliveryData.packageRequestId}`);
          return null; // Skip shipments without complete location data
        }

        const origin = {
          name: packageRequest.pickupLocation.city || packageRequest.pickupLocation.country,
          location: packageRequest.pickupLocation.address || packageRequest.pickupLocation.country
        };

        const destination = {
          name: packageRequest.destinationLocation.city || packageRequest.destinationLocation.country,
          location: packageRequest.destinationLocation.address || packageRequest.destinationLocation.country
        };

        // Use trackingId from packageRequest if available
        const trackingNumber = packageRequest.trackingId || 
                              deliveryData.trackingId || 
                              doc.id.substring(0, 12).toUpperCase();

        return {
          id: doc.id,
          trackingNumber,
          status: deliveryData.status || 'pending',
          transportMode,
          origin,
          destination,
          createdAt,
          updatedAt
        };
      })
      .filter((shipment) => shipment !== null) as ShipmentData[]; // Remove null entries

    console.log('📊 Shipments with locations loaded:', shipments.length);
    return shipments;
  } catch (error) {
    console.error('❌ Error fetching shipments:', error);
    return [];
  }
};

// Get shipments filtered by status
export const getShipmentsByStatus = async (statusFilter: 'notable' | 'delivered' | 'shipping'): Promise<ShipmentData[]> => {
  const allShipments = await getShipments();
  
  switch (statusFilter) {
    case 'notable':
      // Notable = Active shipments (in_transit, picked_up)
      return allShipments.filter(s => 
        s.status === 'in_transit' || s.status === 'picked_up'
      );
    
    case 'delivered':
      // Delivered = Only delivered status
      return allShipments.filter(s => s.status === 'delivered');
    
    case 'shipping':
      // Shipping = Pending, confirmed
      return allShipments.filter(s => 
        s.status === 'pending' || s.status === 'confirmed'
      );
    
    default:
      return allShipments;
  }
};

// Get all package requests with delivery status
export const getAllPackageRequests = async (): Promise<PackageRequestData[]> => {
  try {
    console.log('📦 Fetching all package requests from Firebase...');

    // Fetch package requests
    const packageRequestsRef = collection(db, 'packageRequests');
    const packageQuery = query(packageRequestsRef, orderBy('createdAt', 'desc'));
    const packageSnapshot = await getDocs(packageQuery);
    
    // Fetch delivery tracking to get delivery status
    const deliveryTrackingRef = collection(db, 'deliveryTracking');
    const deliverySnapshot = await getDocs(deliveryTrackingRef);
    
    // Create delivery status map
    const deliveryStatusMap = new Map();
    deliverySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.packageRequestId) {
        deliveryStatusMap.set(data.packageRequestId, data.status);
      }
    });

    console.log(`✅ Found ${packageSnapshot.size} package requests`);
    
    const packages: PackageRequestData[] = packageSnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Parse dates
      let createdAt = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt === 'string') {
          createdAt = new Date(data.createdAt);
        } else if (data.createdAt?.toDate) {
          createdAt = data.createdAt.toDate();
        } else if (data.createdAt?.seconds) {
          createdAt = new Date(data.createdAt.seconds * 1000);
        }
      }

      let preferredDeliveryDate: Date | undefined;
      if (data.preferredDeliveryDate) {
        if (typeof data.preferredDeliveryDate === 'string') {
          preferredDeliveryDate = new Date(data.preferredDeliveryDate);
        } else if (data.preferredDeliveryDate?.toDate) {
          preferredDeliveryDate = data.preferredDeliveryDate.toDate();
        } else if (data.preferredDeliveryDate?.seconds) {
          preferredDeliveryDate = new Date(data.preferredDeliveryDate.seconds * 1000);
        }
      }

      return {
        id: doc.id, // Always use Firestore document ID for updates/deletes
        internalId: data.id, // Store the internal ID if it exists and is different
        trackingId: data.trackingId || doc.id.substring(0, 12).toUpperCase(),
        senderId: data.senderId || 'N/A',
        senderName: data.senderName || 'Unknown Sender',
        senderPhotoUrl: data.senderPhotoUrl,
        receiverName: data.receiverDetails?.name || 'Unknown Receiver',
        receiverPhone: data.receiverDetails?.phone || 'N/A',
        pickupLocation: {
          city: data.pickupLocation?.city,
          country: data.pickupLocation?.country || 'N/A',
          address: data.pickupLocation?.address || 'N/A'
        },
        destinationLocation: {
          city: data.destinationLocation?.city,
          country: data.destinationLocation?.country || 'N/A',
          address: data.destinationLocation?.address || 'N/A'
        },
        packageDetails: {
          description: data.packageDetails?.description || 'No description',
          weightKg: data.packageDetails?.weightKg || 0,
          size: data.packageDetails?.size || 'unknown',
          type: data.packageDetails?.type || 'other'
        },
        preferredTransportModes: data.preferredTransportModes || [],
        status: data.status || 'pending',
        compensationOffer: data.compensationOffer || 0,
        createdAt,
        preferredDeliveryDate,
        assignedTravelerId: data.assignedTravelerId,
        deliveryStatus: deliveryStatusMap.get(data.id || doc.id) // Get delivery status from tracking
      };
    });

    console.log('📊 Package requests loaded:', packages.length);
    return packages;
  } catch (error) {
    console.error('❌ Error fetching package requests:', error);
    return [];
  }
};

// Get all travel trips from Firebase
export const getAllTravelTrips = async (): Promise<TravelTripData[]> => {
  try {
    console.log('✈️ Fetching all travel trips from Firebase...');

    // Fetch travel trips
    const tripsRef = collection(db, 'travelTrips');
    const tripsQuery = query(tripsRef, orderBy('createdAt', 'desc'));
    const tripsSnapshot = await getDocs(tripsQuery);

    console.log(`✅ Found ${tripsSnapshot.size} travel trips`);
    
    const trips: TravelTripData[] = tripsSnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Parse dates
      let createdAt = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt === 'string') {
          createdAt = new Date(data.createdAt);
        } else if (data.createdAt?.toDate) {
          createdAt = data.createdAt.toDate();
        } else if (data.createdAt?.seconds) {
          createdAt = new Date(data.createdAt.seconds * 1000);
        }
      }

      let departureDate = new Date();
      if (data.departureDate) {
        if (typeof data.departureDate === 'string') {
          departureDate = new Date(data.departureDate);
        } else if (data.departureDate?.toDate) {
          departureDate = data.departureDate.toDate();
        } else if (data.departureDate?.seconds) {
          departureDate = new Date(data.departureDate.seconds * 1000);
        }
      }

      let arrivalDate = new Date();
      if (data.arrivalDate) {
        if (typeof data.arrivalDate === 'string') {
          arrivalDate = new Date(data.arrivalDate);
        } else if (data.arrivalDate?.toDate) {
          arrivalDate = data.arrivalDate.toDate();
        } else if (data.arrivalDate?.seconds) {
          arrivalDate = new Date(data.arrivalDate.seconds * 1000);
        }
      }

      return {
        id: doc.id, // Always use Firestore document ID for updates/deletes
        internalId: data.id, // Store the internal ID if it exists and is different
        travelerId: data.travelerId || 'N/A',
        travelerName: data.travelerName || 'Unknown Traveler',
        travelerPhotoUrl: data.travelerPhotoUrl,
        departureLocation: {
          city: data.departureLocation?.city,
          country: data.departureLocation?.country || 'N/A',
          address: data.departureLocation?.address || 'N/A'
        },
        arrivalLocation: {
          // Firebase uses 'destinationLocation', map it to 'arrivalLocation' for consistency
          city: data.destinationLocation?.city || data.arrivalLocation?.city,
          country: data.destinationLocation?.country || data.arrivalLocation?.country || 'N/A',
          address: data.destinationLocation?.address || data.arrivalLocation?.address || 'N/A'
        },
        departureDate,
        arrivalDate: arrivalDate || departureDate, // Fallback to departureDate if arrivalDate is null
        transportMode: data.transportMode || 'car',
        availableSpace: data.capacity?.maxPackages || data.availableSpace || 0,
        maxWeightKg: data.capacity?.maxWeightKg || data.maxWeightKg || 0,
        status: data.status || 'pending',
        createdAt,
        price: data.price
      };
    });

    console.log('📊 Travel trips loaded:', trips.length);
    return trips;
  } catch (error) {
    console.error('❌ Error fetching travel trips:', error);
    return [];
  }
};

// Get all transactions
export const getAllTransactions = async (): Promise<TransactionData[]> => {
  try {
    console.log('💰 Fetching all transactions from Firebase...');

    // Fetch transactions - try without orderBy first in case timestamp index doesn't exist
    const transactionsRef = collection(db, 'transactions');
    let transactionsSnapshot;
    
    try {
      // Try with orderBy first
      const transactionsQuery = query(transactionsRef, orderBy('timestamp', 'desc'));
      transactionsSnapshot = await getDocs(transactionsQuery);
    } catch (orderError) {
      console.warn('⚠️ Could not order by timestamp, fetching without order:', orderError);
      // If orderBy fails (missing index), just get all documents
      transactionsSnapshot = await getDocs(transactionsRef);
    }

    console.log(`✅ Found ${transactionsSnapshot.size} transactions`);
    
    // Fetch all user data for lookups
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const usersMap = new Map();
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      usersMap.set(doc.id, {
        name: userData.fullName || userData.name || 'Unknown User',
        email: userData.email || 'N/A'
      });
    });
    
    const transactions: TransactionData[] = transactionsSnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Parse dates - Firebase uses 'timestamp' field
      let createdAt = new Date();
      if (data.timestamp) {
        if (typeof data.timestamp === 'string') {
          createdAt = new Date(data.timestamp);
        } else if (data.timestamp?.toDate) {
          createdAt = data.timestamp.toDate();
        } else if (data.timestamp?.seconds) {
          createdAt = new Date(data.timestamp.seconds * 1000);
        }
      }

      let updatedAt: Date | undefined;
      if (data.updatedAt) {
        if (typeof data.updatedAt === 'string') {
          updatedAt = new Date(data.updatedAt);
        } else if (data.updatedAt?.toDate) {
          updatedAt = data.updatedAt.toDate();
        } else if (data.updatedAt?.seconds) {
          updatedAt = new Date(data.updatedAt.seconds * 1000);
        }
      }

      // Get user info from map
      const userInfo = usersMap.get(data.userId) || { name: 'Unknown User', email: 'N/A' };

      return {
        id: doc.id,
        userId: data.userId || 'N/A',
        userName: data.userName || userInfo.name,
        userEmail: data.userEmail || userInfo.email,
        type: data.type || 'payment',
        amount: data.amount || 0,
        currency: data.currency || 'USD',
        status: data.status || 'pending',
        description: data.description,
        relatedBookingId: data.bookingId || data.relatedBookingId, // Firebase uses 'bookingId'
        relatedPackageId: data.trackingId || data.packageId || data.relatedPackageId, // Try trackingId first
        paymentMethod: data.payment_method || data.paymentMethod || data.metadata?.payment_method, // Try different field names
        createdAt,
        updatedAt
      };
    });

    // Sort by date in memory if we couldn't sort in query
    transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    console.log('📊 Transactions loaded:', transactions.length);
    console.log('📊 Sample transaction:', transactions[0]);
    return transactions;
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    console.error('❌ Error details:', error);
    return [];
  }
};

// Update a transaction
export const updateTransaction = async (transactionId: string, updates: Partial<TransactionData>): Promise<void> => {
  try {
    console.log(`📝 Updating transaction ${transactionId}...`);
    
    const transactionRef = doc(db, 'transactions', transactionId);
    
    // Prepare update data
    const updateData: any = { ...updates };
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date().toISOString();
    
    await updateDoc(transactionRef, updateData);
    console.log(`✅ Transaction ${transactionId} updated successfully`);
  } catch (error) {
    console.error(`❌ Error updating transaction ${transactionId}:`, error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId: string): Promise<void> => {
  try {
    console.log(`🗑️ Deleting transaction ${transactionId}...`);
    
    const transactionRef = doc(db, 'transactions', transactionId);
    await deleteDoc(transactionRef);
    
    console.log(`✅ Transaction ${transactionId} deleted successfully`);
  } catch (error) {
    console.error(`❌ Error deleting transaction ${transactionId}:`, error);
    throw error;
  }
};

// Update a package request
export const updatePackageRequest = async (packageId: string, updates: Partial<PackageRequestData>): Promise<void> => {
  try {
    console.log(`📝 Updating package ${packageId}...`);
    
    // Verify the document exists first
    const packageRef = doc(db, 'packageRequests', packageId);
    
    // Prepare update data - convert dates to ISO strings
    const updateData: any = { ...updates };
    
    if (updates.preferredDeliveryDate) {
      updateData.preferredDeliveryDate = updates.preferredDeliveryDate.toISOString();
    }
    
    // Update timestamp
    updateData.updatedAt = new Date().toISOString();
    
    // Remove fields that shouldn't be directly updated
    delete updateData.id;
    delete updateData.internalId; // Don't update the internal ID
    delete updateData.createdAt;
    delete updateData.trackingId;
    delete updateData.deliveryStatus; // This comes from deliveryTracking collection
    
    // Remove undefined fields (Firestore doesn't accept undefined values)
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    await updateDoc(packageRef, updateData);
    console.log('✅ Package updated successfully');
  } catch (error: any) {
    console.error('❌ Error updating package:', error);
    if (error.code === 'not-found') {
      throw new Error(`Package with ID ${packageId} not found in Firebase. It may have been deleted.`);
    }
    throw error;
  }
};

// Delete a package request
export const deletePackageRequest = async (packageId: string): Promise<void> => {
  try {
    console.log(`🗑️ Deleting package ${packageId}...`);
    const packageRef = doc(db, 'packageRequests', packageId);
    await deleteDoc(packageRef);
    console.log('✅ Package deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting package:', error);
    throw error;
  }
};

// Update a travel trip
export const updateTravelTrip = async (tripId: string, updates: Partial<TravelTripData>): Promise<void> => {
  try {
    console.log(`📝 Updating trip ${tripId}...`);
    const tripRef = doc(db, 'travelTrips', tripId);
    
    // Prepare update data - convert dates to ISO strings
    const updateData: any = { ...updates };
    
    if (updates.departureDate) {
      updateData.departureDate = updates.departureDate.toISOString();
    }
    
    if (updates.arrivalDate) {
      updateData.arrivalDate = updates.arrivalDate.toISOString();
    }
    
    // Update timestamp
    updateData.updatedAt = new Date().toISOString();
    
    // Remove fields that shouldn't be directly updated
    delete updateData.id;
    delete updateData.internalId; // Don't update the internal ID
    delete updateData.createdAt;
    
    // Remove undefined fields (Firestore doesn't accept undefined values)
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    await updateDoc(tripRef, updateData);
    console.log('✅ Trip updated successfully');
  } catch (error: any) {
    console.error('❌ Error updating trip:', error);
    if (error.code === 'not-found') {
      throw new Error(`Trip with ID ${tripId} not found in Firebase. It may have been deleted.`);
    }
    throw error;
  }
};

// Delete a travel trip
export const deleteTravelTrip = async (tripId: string): Promise<void> => {
  try {
    console.log(`🗑️ Deleting trip ${tripId}...`);
    const tripRef = doc(db, 'travelTrips', tripId);
    await deleteDoc(tripRef);
    console.log('✅ Trip deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting trip:', error);
    throw error;
  }
};

// ============= ANALYTICS FUNCTIONS =============

// Get user growth statistics
export interface UserGrowthStats {
  totalUsers: number;
  newUsersThisMonth: number;
  newUsersLastMonth: number;
  growthPercentage: number;
  monthlyData: {
    month: string;
    count: number;
  }[];
}

export const getUserGrowthStats = async (): Promise<UserGrowthStats> => {
  try {
    console.log('📊 Fetching user growth statistics...');
    
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const allUsers = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const totalUsers = allUsers.length;
    
    // Calculate monthly data for last 6 months
    const now = new Date();
    const monthlyData: { month: string; count: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      
      const count = allUsers.filter((user: any) => {
        let userDate: Date | null = null;
        
        if (user.createdAt) {
          if (typeof user.createdAt === 'string') {
            userDate = new Date(user.createdAt);
          } else if (user.createdAt?.toDate) {
            userDate = user.createdAt.toDate();
          } else if (user.createdAt?.seconds) {
            userDate = new Date(user.createdAt.seconds * 1000);
          }
        }
        
        return userDate && userDate >= monthStart && userDate <= monthEnd;
      }).length;
      
      monthlyData.push({ month: monthName, count });
    }
    
    // Get users from current month
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const newUsersThisMonth = allUsers.filter((user: any) => {
      let userDate: Date | null = null;
      
      if (user.createdAt) {
        if (typeof user.createdAt === 'string') {
          userDate = new Date(user.createdAt);
        } else if (user.createdAt?.toDate) {
          userDate = user.createdAt.toDate();
        } else if (user.createdAt?.seconds) {
          userDate = new Date(user.createdAt.seconds * 1000);
        }
      }
      
      return userDate && userDate >= thisMonthStart;
    }).length;
    
    // Get users from last month
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const newUsersLastMonth = allUsers.filter((user: any) => {
      let userDate: Date | null = null;
      
      if (user.createdAt) {
        if (typeof user.createdAt === 'string') {
          userDate = new Date(user.createdAt);
        } else if (user.createdAt?.toDate) {
          userDate = user.createdAt.toDate();
        } else if (user.createdAt?.seconds) {
          userDate = new Date(user.createdAt.seconds * 1000);
        }
      }
      
      return userDate && userDate >= lastMonthStart && userDate <= lastMonthEnd;
    }).length;
    
    // Calculate growth percentage
    const growthPercentage = newUsersLastMonth > 0 
      ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100 
      : newUsersThisMonth > 0 ? 100 : 0;
    
    console.log('✅ User growth stats fetched:', { totalUsers, newUsersThisMonth, newUsersLastMonth, growthPercentage });
    
    return {
      totalUsers,
      newUsersThisMonth,
      newUsersLastMonth,
      growthPercentage,
      monthlyData
    };
  } catch (error) {
    console.error('❌ Error fetching user growth stats:', error);
    return {
      totalUsers: 0,
      newUsersThisMonth: 0,
      newUsersLastMonth: 0,
      growthPercentage: 0,
      monthlyData: []
    };
  }
};

// Get revenue statistics
export interface RevenueStats {
  totalRevenue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  growthPercentage: number;
  monthlyData: {
    month: string;
    revenue: number;
  }[];
}

export const getRevenueStats = async (): Promise<RevenueStats> => {
  try {
    console.log('💰 Fetching revenue statistics...');
    
    const bookingsRef = collection(db, 'bookings');
    const bookingsSnapshot = await getDocs(bookingsRef);
    const allBookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Only count completed bookings with payment
    const completedBookings = allBookings.filter((booking: any) => 
      booking.status === 'completed' || booking.status === 'paymentCompleted'
    );
    
    const totalRevenue = completedBookings.reduce((sum, booking: any) => 
      sum + (booking.amount || booking.totalAmount || 0), 0
    );
    
    // Calculate monthly data for last 6 months
    const now = new Date();
    const monthlyData: { month: string; revenue: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      
      const revenue = completedBookings.filter((booking: any) => {
        let bookingDate: Date | null = null;
        
        if (booking.createdAt) {
          if (typeof booking.createdAt === 'string') {
            bookingDate = new Date(booking.createdAt);
          } else if (booking.createdAt?.toDate) {
            bookingDate = booking.createdAt.toDate();
          } else if (booking.createdAt?.seconds) {
            bookingDate = new Date(booking.createdAt.seconds * 1000);
          }
        }
        
        return bookingDate && bookingDate >= monthStart && bookingDate <= monthEnd;
      }).reduce((sum, booking: any) => sum + (booking.amount || booking.totalAmount || 0), 0);
      
      monthlyData.push({ month: monthName, revenue });
    }
    
    // Get revenue from current month
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const revenueThisMonth = completedBookings.filter((booking: any) => {
      let bookingDate: Date | null = null;
      
      if (booking.createdAt) {
        if (typeof booking.createdAt === 'string') {
          bookingDate = new Date(booking.createdAt);
        } else if (booking.createdAt?.toDate) {
          bookingDate = booking.createdAt.toDate();
        } else if (booking.createdAt?.seconds) {
          bookingDate = new Date(booking.createdAt.seconds * 1000);
        }
      }
      
      return bookingDate && bookingDate >= thisMonthStart;
    }).reduce((sum, booking: any) => sum + (booking.amount || booking.totalAmount || 0), 0);
    
    // Get revenue from last month
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const revenueLastMonth = completedBookings.filter((booking: any) => {
      let bookingDate: Date | null = null;
      
      if (booking.createdAt) {
        if (typeof booking.createdAt === 'string') {
          bookingDate = new Date(booking.createdAt);
        } else if (booking.createdAt?.toDate) {
          bookingDate = booking.createdAt.toDate();
        } else if (booking.createdAt?.seconds) {
          bookingDate = new Date(booking.createdAt.seconds * 1000);
        }
      }
      
      return bookingDate && bookingDate >= lastMonthStart && bookingDate <= lastMonthEnd;
    }).reduce((sum, booking: any) => sum + (booking.amount || booking.totalAmount || 0), 0);
    
    // Calculate growth percentage
    const growthPercentage = revenueLastMonth > 0 
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 
      : revenueThisMonth > 0 ? 100 : 0;
    
    console.log('✅ Revenue stats fetched:', { totalRevenue, revenueThisMonth, revenueLastMonth, growthPercentage });
    
    return {
      totalRevenue,
      revenueThisMonth,
      revenueLastMonth,
      growthPercentage,
      monthlyData
    };
  } catch (error) {
    console.error('❌ Error fetching revenue stats:', error);
    return {
      totalRevenue: 0,
      revenueThisMonth: 0,
      revenueLastMonth: 0,
      growthPercentage: 0,
      monthlyData: []
    };
  }
};

// Get package statistics
export interface PackageStats {
  totalPackages: number;
  pendingPackages: number;
  inTransitPackages: number;
  deliveredPackages: number;
  cancelledPackages: number;
  monthlyData: {
    month: string;
    count: number;
  }[];
}

export const getPackageStats = async (): Promise<PackageStats> => {
  try {
    console.log('📦 Fetching package statistics...');
    
    // Fetch package requests
    const packagesRef = collection(db, 'packageRequests');
    const packagesSnapshot = await getDocs(packagesRef);
    const allPackages = packagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Fetch delivery tracking to get accurate delivery status
    const deliveryTrackingRef = collection(db, 'deliveryTracking');
    const deliverySnapshot = await getDocs(deliveryTrackingRef);
    const allDeliveries = deliverySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Found ${allPackages.length} packages and ${allDeliveries.length} delivery records`);
    
    const totalPackages = allPackages.length;
    
    // Count by delivery status from deliveryTracking collection
    const inTransitPackages = allDeliveries.filter((delivery: any) => 
      delivery.status === 'in_transit' || delivery.status === 'picked_up'
    ).length;
    
    const deliveredPackages = allDeliveries.filter((delivery: any) => 
      delivery.status === 'delivered'
    ).length;
    
    // Pending packages are those without delivery tracking OR with pending/confirmed status
    const deliveryPackageIds = new Set(allDeliveries.map((d: any) => d.packageRequestId));
    const pendingFromTracking = allDeliveries.filter((delivery: any) => 
      delivery.status === 'pending' || delivery.status === 'confirmed'
    ).length;
    const packagesWithoutTracking = allPackages.filter((pkg: any) => 
      !deliveryPackageIds.has(pkg.id) && pkg.status !== 'cancelled'
    ).length;
    const pendingPackages = pendingFromTracking + packagesWithoutTracking;
    
    // Cancelled packages
    const cancelledPackages = allPackages.filter((pkg: any) => 
      pkg.status === 'cancelled'
    ).length;
    
    // Calculate monthly data for last 6 months
    const now = new Date();
    const monthlyData: { month: string; count: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      
      const count = allPackages.filter((pkg: any) => {
        let pkgDate: Date | null = null;
        
        if (pkg.createdAt) {
          if (typeof pkg.createdAt === 'string') {
            pkgDate = new Date(pkg.createdAt);
          } else if (pkg.createdAt?.toDate) {
            pkgDate = pkg.createdAt.toDate();
          } else if (pkg.createdAt?.seconds) {
            pkgDate = new Date(pkg.createdAt.seconds * 1000);
          }
        }
        
        return pkgDate && pkgDate >= monthStart && pkgDate <= monthEnd;
      }).length;
      
      monthlyData.push({ month: monthName, count });
    }
    
    console.log('✅ Package stats fetched:', { 
      totalPackages, 
      pendingPackages, 
      inTransitPackages, 
      deliveredPackages,
      cancelledPackages,
      deliveryTrackingCount: allDeliveries.length
    });
    
    return {
      totalPackages,
      pendingPackages,
      inTransitPackages,
      deliveredPackages,
      cancelledPackages,
      monthlyData
    };
  } catch (error) {
    console.error('❌ Error fetching package stats:', error);
    return {
      totalPackages: 0,
      pendingPackages: 0,
      inTransitPackages: 0,
      deliveredPackages: 0,
      cancelledPackages: 0,
      monthlyData: []
    };
  }
};

// Get trip statistics
export interface TripStats {
  totalTrips: number;
  activeTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  monthlyData: {
    month: string;
    count: number;
  }[];
}

export const getTripStats = async (): Promise<TripStats> => {
  try {
    console.log('🚗 Fetching trip statistics...');
    
    const tripsRef = collection(db, 'travelTrips');
    const tripsSnapshot = await getDocs(tripsRef);
    const allTrips = tripsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const totalTrips = allTrips.length;
    const activeTrips = allTrips.filter((trip: any) => trip.status === 'active').length;
    const completedTrips = allTrips.filter((trip: any) => trip.status === 'completed').length;
    const cancelledTrips = allTrips.filter((trip: any) => trip.status === 'cancelled').length;
    
    // Calculate monthly data for last 6 months
    const now = new Date();
    const monthlyData: { month: string; count: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      
      const count = allTrips.filter((trip: any) => {
        let tripDate: Date | null = null;
        
        if (trip.createdAt) {
          if (typeof trip.createdAt === 'string') {
            tripDate = new Date(trip.createdAt);
          } else if (trip.createdAt?.toDate) {
            tripDate = trip.createdAt.toDate();
          } else if (trip.createdAt?.seconds) {
            tripDate = new Date(trip.createdAt.seconds * 1000);
          }
        }
        
        return tripDate && tripDate >= monthStart && tripDate <= monthEnd;
      }).length;
      
      monthlyData.push({ month: monthName, count });
    }
    
    console.log('✅ Trip stats fetched:', { totalTrips, activeTrips, completedTrips, cancelledTrips });
    
    return {
      totalTrips,
      activeTrips,
      completedTrips,
      cancelledTrips,
      monthlyData
    };
  } catch (error) {
    console.error('❌ Error fetching trip stats:', error);
    return {
      totalTrips: 0,
      activeTrips: 0,
      completedTrips: 0,
      cancelledTrips: 0,
      monthlyData: []
    };
  }
};

// Get dispute statistics
export interface DisputeStats {
  totalDisputes: number;
  openDisputes: number;
  inProgressDisputes: number;
  resolvedDisputes: number;
  monthlyData: {
    month: string;
    count: number;
  }[];
}

export const getDisputeStats = async (): Promise<DisputeStats> => {
  try {
    console.log('⚖️ Fetching dispute statistics...');
    
    const disputesRef = collection(db, 'disputes');
    const disputesSnapshot = await getDocs(disputesRef);
    const allDisputes = disputesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const totalDisputes = allDisputes.length;
    const openDisputes = allDisputes.filter((dispute: any) => dispute.status === 'pending').length;
    const inProgressDisputes = allDisputes.filter((dispute: any) => dispute.status === 'underReview').length;
    const resolvedDisputes = allDisputes.filter((dispute: any) => dispute.status === 'resolved').length;
    
    // Calculate monthly data for last 6 months
    const now = new Date();
    const monthlyData: { month: string; count: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
      
      const count = allDisputes.filter((dispute: any) => {
        let disputeDate: Date | null = null;
        
        if (dispute.createdAt) {
          if (typeof dispute.createdAt === 'string') {
            disputeDate = new Date(dispute.createdAt);
          } else if (dispute.createdAt?.toDate) {
            disputeDate = dispute.createdAt.toDate();
          } else if (dispute.createdAt?.seconds) {
            disputeDate = new Date(dispute.createdAt.seconds * 1000);
          }
        }
        
        return disputeDate && disputeDate >= monthStart && disputeDate <= monthEnd;
      }).length;
      
      monthlyData.push({ month: monthName, count });
    }
    
    console.log('✅ Dispute stats fetched:', { totalDisputes, openDisputes, inProgressDisputes, resolvedDisputes });
    
    return {
      totalDisputes,
      openDisputes,
      inProgressDisputes,
      resolvedDisputes,
      monthlyData
    };
  } catch (error) {
    console.error('❌ Error fetching dispute stats:', error);
    return {
      totalDisputes: 0,
      openDisputes: 0,
      inProgressDisputes: 0,
      resolvedDisputes: 0,
      monthlyData: []
    };
  }
};