export interface DisputeData {
  id: string;
  disputeId: string;
  customer: string;
  order: string;
  issue: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Escalated';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dateCreated: string;
  lastUpdated: string;
  assignedTo: string;
  reporterId?: string;
  reportedUserId?: string;
  bookingId?: string;
  // New fields from Flutter app
  reporterName?: string;
  reporterEmail?: string;
  reportedUserName?: string;
  reportedUserEmail?: string;
  evidence?: string[];
  evidenceCount?: number;
}

export const mockDisputesData: DisputeData[] = [
  {
    id: '1',
    disputeId: 'DSP-001',
    customer: 'Jane Smith',
    order: 'ORD-12345',
    issue: 'Package Damaged',
    description: 'Package arrived with visible damage to the contents. Several items were broken.',
    status: 'Open',
    priority: 'High',
    dateCreated: '2025-08-07',
    lastUpdated: '2025-08-07',
    assignedTo: 'Support Team A'
  },
  {
    id: '2',
    disputeId: 'DSP-002',
    customer: 'John Doe',
    order: 'ORD-12346',
    issue: 'Wrong Item Delivered',
    description: 'Received completely different item than what was ordered. Need replacement.',
    status: 'In Progress',
    priority: 'Medium',
    dateCreated: '2025-08-06',
    lastUpdated: '2025-08-08',
    assignedTo: 'Sarah Wilson'
  },
  {
    id: '3',
    disputeId: 'DSP-003',
    customer: 'Mike Johnson',
    order: 'ORD-12347',
    issue: 'Package Not Delivered',
    description: 'Package marked as delivered but never received. Checked with neighbors.',
    status: 'Escalated',
    priority: 'Critical',
    dateCreated: '2025-08-05',
    lastUpdated: '2025-08-09',
    assignedTo: 'David Brown'
  },
  {
    id: '4',
    disputeId: 'DSP-004',
    customer: 'Emily Garcia',
    order: 'ORD-12348',
    issue: 'Late Delivery',
    description: 'Package was delivered 5 days late, causing inconvenience for event.',
    status: 'Resolved',
    priority: 'Medium',
    dateCreated: '2025-08-04',
    lastUpdated: '2025-08-07',
    assignedTo: 'Lisa Davis'
  },
  {
    id: '5',
    disputeId: 'DSP-005',
    customer: 'Robert Miller',
    order: 'ORD-12349',
    issue: 'Billing Error',
    description: 'Charged incorrect amount for shipping. Need refund for overcharge.',
    status: 'In Progress',
    priority: 'Low',
    dateCreated: '2025-08-03',
    lastUpdated: '2025-08-06',
    assignedTo: 'Support Team B'
  },
  {
    id: '6',
    disputeId: 'DSP-006',
    customer: 'Alice Cooper',
    order: 'ORD-12350',
    issue: 'Missing Items',
    description: 'Only received 2 out of 3 items ordered. Missing item worth $50.',
    status: 'Open',
    priority: 'High',
    dateCreated: '2025-08-08',
    lastUpdated: '2025-08-08',
    assignedTo: 'Support Team A'
  },
  {
    id: '7',
    disputeId: 'DSP-007',
    customer: 'Charlie Brown',
    order: 'ORD-12351',
    issue: 'Quality Issue',
    description: 'Product quality not as described. Item appears to be used/returned.',
    status: 'Closed',
    priority: 'Medium',
    dateCreated: '2025-08-02',
    lastUpdated: '2025-08-05',
    assignedTo: 'Frank Miller'
  },
  {
    id: '8',
    disputeId: 'DSP-008',
    customer: 'Diana Prince',
    order: 'ORD-12352',
    issue: 'Delivery Address',
    description: 'Package delivered to wrong address despite correct shipping info.',
    status: 'In Progress',
    priority: 'High',
    dateCreated: '2025-08-09',
    lastUpdated: '2025-08-10',
    assignedTo: 'Grace Lee'
  }
];
