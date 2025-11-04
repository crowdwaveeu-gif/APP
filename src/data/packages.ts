export interface PackageData {
  id: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Out for Delivery' | 'Returned';
  trackingNumber: string;
  dateShipped: string;
  estimatedDelivery: string;
  preferredTransportModes?: string[]; // Transport modes preferred for this package
}

export const mockPackagesData: PackageData[] = [
  {
    id: 'PKG-001',
    sender: 'Alice Cooper',
    recipient: 'Bob Wilson',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    weight: '2.5 lbs',
    dimensions: '12x8x4 inches',
    status: 'In Transit',
    trackingNumber: 'TRK123456789',
    dateShipped: '2025-08-08',
    estimatedDelivery: '2025-08-12',
    preferredTransportModes: ['flight', 'train']
  },
  {
    id: 'PKG-002',
    sender: 'Charlie Brown',
    recipient: 'Diana Prince',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    weight: '1.8 lbs',
    dimensions: '10x6x3 inches',
    status: 'Delivered',
    trackingNumber: 'TRK987654321',
    dateShipped: '2025-08-05',
    estimatedDelivery: '2025-08-09',
    preferredTransportModes: ['flight']
  },
  {
    id: 'PKG-003',
    sender: 'Eva Martinez',
    recipient: 'Frank Miller',
    origin: 'Seattle, WA',
    destination: 'Denver, CO',
    weight: '3.2 lbs',
    dimensions: '15x10x6 inches',
    status: 'Out for Delivery',
    trackingNumber: 'TRK456789123',
    dateShipped: '2025-08-07',
    estimatedDelivery: '2025-08-11',
    preferredTransportModes: ['bus', 'car']
  },
  {
    id: 'PKG-004',
    sender: 'Grace Lee',
    recipient: 'Henry Davis',
    origin: 'Boston, MA',
    destination: 'San Francisco, CA',
    weight: '0.9 lbs',
    dimensions: '8x5x2 inches',
    status: 'Pending',
    trackingNumber: 'TRK789123456',
    dateShipped: '2025-08-10',
    estimatedDelivery: '2025-08-15',
    preferredTransportModes: ['flight']
  },
  {
    id: 'PKG-005',
    sender: 'Ivan Rodriguez',
    recipient: 'Julia Thompson',
    origin: 'Houston, TX',
    destination: 'Phoenix, AZ',
    weight: '4.1 lbs',
    dimensions: '18x12x8 inches',
    status: 'In Transit',
    trackingNumber: 'TRK321654987',
    dateShipped: '2025-08-06',
    estimatedDelivery: '2025-08-10',
    preferredTransportModes: ['car', 'train']
  },
  {
    id: 'PKG-006',
    sender: 'Kevin White',
    recipient: 'Luna Garcia',
    origin: 'Philadelphia, PA',
    destination: 'Las Vegas, NV',
    weight: '2.3 lbs',
    dimensions: '11x7x4 inches',
    status: 'Returned',
    trackingNumber: 'TRK654987321',
    dateShipped: '2025-08-04',
    estimatedDelivery: '2025-08-08',
    preferredTransportModes: ['bus']
  },
  {
    id: 'PKG-007',
    sender: 'Maria Gonzalez',
    recipient: 'Nathan Johnson',
    origin: 'Detroit, MI',
    destination: 'Orlando, FL',
    weight: '1.5 lbs',
    dimensions: '9x6x3 inches',
    status: 'Delivered',
    trackingNumber: 'TRK852741963',
    dateShipped: '2025-08-03',
    estimatedDelivery: '2025-08-07',
    preferredTransportModes: ['flight', 'train', 'bus']
  },
  {
    id: 'PKG-008',
    sender: 'Oliver Smith',
    recipient: 'Paula Anderson',
    origin: 'Portland, OR',
    destination: 'Atlanta, GA',
    weight: '5.7 lbs',
    dimensions: '20x14x10 inches',
    status: 'In Transit',
    trackingNumber: 'TRK741963852',
    dateShipped: '2025-08-09',
    estimatedDelivery: '2025-08-14',
    preferredTransportModes: ['car']
  }
];
