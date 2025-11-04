// Demo data creator for testing Firebase integration
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Sample order data
const sampleOrders = [
  {
    customerName: 'John Doe',
    deliveryAddress: '123 Main St, New York, NY',
    pickupAddress: '456 Oak Ave, Brooklyn, NY',
    packageDetails: 'Electronics package',
    amount: 45.50,
    status: 'delivered',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
    deliveredAt: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)), // 1 day ago
    driverId: 'driver1'
  },
  {
    customerName: 'Jane Smith',
    deliveryAddress: '789 Pine St, Queens, NY',
    pickupAddress: '321 Elm St, Manhattan, NY',
    packageDetails: 'Documents',
    amount: 15.00,
    status: 'in_transit',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)), // 1 day ago
    driverId: 'driver2'
  },
  {
    customerName: 'Bob Johnson',
    deliveryAddress: '555 Cedar Ave, Bronx, NY',
    pickupAddress: '777 Maple St, Staten Island, NY',
    packageDetails: 'Clothing package',
    amount: 32.75,
    status: 'pending',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 3 * 60 * 60 * 1000)), // 3 hours ago
  },
  {
    customerName: 'Alice Williams',
    deliveryAddress: '999 Birch Rd, Long Island, NY',
    pickupAddress: '111 Walnut St, Brooklyn, NY',
    packageDetails: 'Food delivery',
    amount: 28.90,
    status: 'delivered',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
    deliveredAt: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
    driverId: 'driver1'
  },
  {
    customerName: 'Charlie Brown',
    deliveryAddress: '222 Spruce St, Manhattan, NY',
    pickupAddress: '333 Ash Ave, Queens, NY',
    packageDetails: 'Gift package',
    amount: 67.25,
    status: 'cancelled',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)), // 4 days ago
  },
  {
    customerName: 'Diana Davis',
    deliveryAddress: '444 Poplar St, Bronx, NY',
    pickupAddress: '666 Cherry St, Brooklyn, NY',
    packageDetails: 'Books',
    amount: 22.40,
    status: 'confirmed',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000)), // 2 hours ago
  }
];

// Sample driver data
const sampleDrivers = [
  {
    name: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '+1-555-0101',
    vehicle: 'Toyota Prius',
    rating: 4.8,
    totalDeliveries: 156,
    status: 'active',
    location: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0102',
    vehicle: 'Honda Civic',
    rating: 4.9,
    totalDeliveries: 203,
    status: 'active',
    location: {
      latitude: 40.7589,
      longitude: -73.9851
    }
  },
  {
    name: 'Tom Anderson',
    email: 'tom@example.com',
    phone: '+1-555-0103',
    vehicle: 'Ford Transit',
    rating: 4.6,
    totalDeliveries: 89,
    status: 'inactive',
    location: {
      latitude: 40.6782,
      longitude: -73.9442
    }
  }
];

// Function to create demo data
export const createDemoData = async () => {
  try {
    console.log('Creating demo orders...');
    
    // Add sample orders
    for (const order of sampleOrders) {
      await addDoc(collection(db, 'orders'), order);
      console.log('Added order for:', order.customerName);
    }
    
    console.log('Creating demo drivers...');
    
    // Add sample drivers
    for (const driver of sampleDrivers) {
      await addDoc(collection(db, 'drivers'), driver);
      console.log('Added driver:', driver.name);
    }
    
    console.log('Demo data created successfully!');
    return { success: true, message: 'Demo data created successfully!' };
  } catch (error) {
    console.error('Error creating demo data:', error);
    return { success: false, message: 'Failed to create demo data', error };
  }
};

// Function to create more orders for testing charts
export const createAdditionalOrdersForCharts = async (numberOfDays: number = 30) => {
  const statuses = ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'];
  const customers = ['Alex Chen', 'Maria Rodriguez', 'James Wilson', 'Lisa Park', 'David Kim'];
  const addresses = [
    '100 Broadway, NYC', '200 Park Ave, NYC', '300 5th Ave, NYC', 
    '400 Madison Ave, NYC', '500 Lexington Ave, NYC'
  ];
  
  try {
    console.log(`Creating additional orders for ${numberOfDays} days...`);
    
    for (let i = 0; i < numberOfDays; i++) {
      const ordersPerDay = Math.floor(Math.random() * 5) + 1; // 1-5 orders per day
      
      for (let j = 0; j < ordersPerDay; j++) {
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() - i);
        orderDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
        
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const deliveryAddr = addresses[Math.floor(Math.random() * addresses.length)];
        const pickupAddr = addresses[Math.floor(Math.random() * addresses.length)];
        
        const order = {
          customerName: customer,
          deliveryAddress: deliveryAddr,
          pickupAddress: pickupAddr,
          packageDetails: `Package ${j + 1} for day ${i + 1}`,
          amount: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          status: status,
          createdAt: Timestamp.fromDate(orderDate),
          ...(status === 'delivered' ? {
            deliveredAt: Timestamp.fromDate(new Date(orderDate.getTime() + Math.random() * 24 * 60 * 60 * 1000))
          } : {}),
          ...(Math.random() > 0.5 ? { driverId: `driver${Math.floor(Math.random() * 3) + 1}` } : {})
        };
        
        await addDoc(collection(db, 'orders'), order);
      }
    }
    
    console.log('Additional orders created successfully!');
    return { success: true, message: 'Additional orders created successfully!' };
  } catch (error) {
    console.error('Error creating additional orders:', error);
    return { success: false, message: 'Failed to create additional orders', error };
  }
};

// Export both functions
export default { createDemoData, createAdditionalOrdersForCharts };