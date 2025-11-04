export interface TripData {
  id: string;
  traveler: string;
  origin: string;
  destination: string;
  date: string;
  status: 'Pending' | 'Completed' | 'In Progress' | 'Cancelled';
  transportMode?: 'flight' | 'train' | 'bus' | 'car' | 'motorcycle' | 'ship'; // Transport mode for trip
}

export const mockTripsData: TripData[] = [
  {
    id: 'TRP-001',
    traveler: 'John Doe',
    origin: 'New York',
    destination: 'Los Angeles',
    date: '2025-08-15',
    status: 'Pending',
    transportMode: 'flight'
  },
  {
    id: 'TRP-002',
    traveler: 'Jane Smith',
    origin: 'Chicago',
    destination: 'Miami',
    date: '2025-08-10',
    status: 'Completed',
    transportMode: 'flight'
  },
  {
    id: 'TRP-003',
    traveler: 'Mike Johnson',
    origin: 'Seattle',
    destination: 'Denver',
    date: '2025-08-12',
    status: 'In Progress',
    transportMode: 'car'
  },
  {
    id: 'TRP-004',
    traveler: 'Sarah Wilson',
    origin: 'Boston',
    destination: 'San Francisco',
    date: '2025-08-18',
    status: 'Pending',
    transportMode: 'train'
  },
  {
    id: 'TRP-005',
    traveler: 'David Brown',
    origin: 'Houston',
    destination: 'Phoenix',
    date: '2025-08-08',
    status: 'Completed',
    transportMode: 'bus'
  },
  {
    id: 'TRP-006',
    traveler: 'Lisa Davis',
    origin: 'Philadelphia',
    destination: 'Las Vegas',
    date: '2025-08-20',
    status: 'Pending',
    transportMode: 'car'
  },
  {
    id: 'TRP-007',
    traveler: 'Robert Miller',
    origin: 'Detroit',
    destination: 'Orlando',
    date: '2025-08-14',
    status: 'In Progress',
    transportMode: 'motorcycle'
  },
  {
    id: 'TRP-008',
    traveler: 'Emily Garcia',
    origin: 'Portland',
    destination: 'Atlanta',
    date: '2025-08-05',
    status: 'Completed',
    transportMode: 'ship'
  }
];
