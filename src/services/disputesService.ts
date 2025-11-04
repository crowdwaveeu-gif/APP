import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Dispute {
  id: string;
  disputeId: string;
  bookingId: string;
  reporterId: string;
  reportedUserId: string;
  reason: 'noShow' | 'damagedPackage' | 'lateDelivery' | 'inappropriateBehavior' | 'paymentIssue' | 'fraudulentActivity' | 'safetyConcern' | 'other';
  description: string;
  evidence: string[];
  status: 'pending' | 'underReview' | 'resolved' | 'dismissed' | 'escalated';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  createdAt: any;
  resolvedAt?: any;
  adminId?: string;
  adminNotes?: string;
  resolution?: string;
  resolutionType?: 'favorReporter' | 'favorReported' | 'partialRefund' | 'fullRefund' | 'warningIssued' | 'accountSuspended' | 'dismissed';
  
  // Additional fields for admin UI compatibility
  customer?: string;
  order?: string;
  issue?: string;
  lastUpdated?: any;
  assignedTo?: string;
}

class DisputesService {
  private collectionName = 'disputes';

  /**
   * Get all disputes from Firestore
   */
  async getAllDisputes(): Promise<Dispute[]> {
    try {
      const disputesRef = collection(db, this.collectionName);
      const q = query(disputesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const disputes: Dispute[] = [];
      querySnapshot.forEach((doc) => {
        disputes.push({
          id: doc.id,
          ...doc.data(),
        } as Dispute);
      });
      
      return disputes;
    } catch (error) {
      console.error('Error fetching disputes:', error);
      throw error;
    }
  }

  /**
   * Get a single dispute by ID
   */
  async getDisputeById(disputeId: string): Promise<Dispute | null> {
    try {
      const disputeRef = doc(db, this.collectionName, disputeId);
      const disputeSnap = await getDoc(disputeRef);
      
      if (disputeSnap.exists()) {
        return {
          id: disputeSnap.id,
          ...disputeSnap.data(),
        } as Dispute;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching dispute:', error);
      throw error;
    }
  }

  /**
   * Get disputes by user ID (as reporter or reported)
   */
  async getDisputesByUser(userId: string): Promise<Dispute[]> {
    try {
      const disputesRef = collection(db, this.collectionName);
      
      // Get disputes where user is the reporter
      const reporterQuery = query(
        disputesRef,
        where('reporterId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      // Get disputes where user is reported
      const reportedQuery = query(
        disputesRef,
        where('reportedUserId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const [reporterSnapshot, reportedSnapshot] = await Promise.all([
        getDocs(reporterQuery),
        getDocs(reportedQuery)
      ]);
      
      const disputes: Dispute[] = [];
      const disputeIds = new Set<string>();
      
      reporterSnapshot.forEach((doc) => {
        if (!disputeIds.has(doc.id)) {
          disputeIds.add(doc.id);
          disputes.push({
            id: doc.id,
            ...doc.data(),
          } as Dispute);
        }
      });
      
      reportedSnapshot.forEach((doc) => {
        if (!disputeIds.has(doc.id)) {
          disputeIds.add(doc.id);
          disputes.push({
            id: doc.id,
            ...doc.data(),
          } as Dispute);
        }
      });
      
      return disputes.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
    } catch (error) {
      console.error('Error fetching user disputes:', error);
      throw error;
    }
  }

  /**
   * Get disputes by booking ID
   */
  async getDisputesByBooking(bookingId: string): Promise<Dispute[]> {
    try {
      const disputesRef = collection(db, this.collectionName);
      const q = query(
        disputesRef,
        where('bookingId', '==', bookingId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const disputes: Dispute[] = [];
      
      querySnapshot.forEach((doc) => {
        disputes.push({
          id: doc.id,
          ...doc.data(),
        } as Dispute);
      });
      
      return disputes;
    } catch (error) {
      console.error('Error fetching booking disputes:', error);
      throw error;
    }
  }

  /**
   * Get disputes by status
   */
  async getDisputesByStatus(status: string): Promise<Dispute[]> {
    try {
      const disputesRef = collection(db, this.collectionName);
      const q = query(
        disputesRef,
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const disputes: Dispute[] = [];
      
      querySnapshot.forEach((doc) => {
        disputes.push({
          id: doc.id,
          ...doc.data(),
        } as Dispute);
      });
      
      return disputes;
    } catch (error) {
      console.error('Error fetching disputes by status:', error);
      throw error;
    }
  }

  /**
   * Create a new dispute
   */
  async createDispute(disputeData: Omit<Dispute, 'id'>): Promise<string> {
    try {
      const disputesRef = collection(db, this.collectionName);
      const docRef = await addDoc(disputesRef, {
        ...disputeData,
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
        status: disputeData.status || 'pending',
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating dispute:', error);
      throw error;
    }
  }

  /**
   * Update dispute status and admin notes
   */
  async updateDisputeStatus(
    disputeId: string,
    status: Dispute['status'],
    adminNotes?: string,
    resolution?: string,
    resolutionType?: Dispute['resolutionType'],
    adminId?: string
  ): Promise<void> {
    try {
      const disputeRef = doc(db, this.collectionName, disputeId);
      const updateData: any = {
        status,
        lastUpdated: Timestamp.now(),
      };
      
      if (adminNotes) updateData.adminNotes = adminNotes;
      if (resolution) updateData.resolution = resolution;
      if (resolutionType) updateData.resolutionType = resolutionType;
      if (adminId) updateData.adminId = adminId;
      
      if (status === 'resolved' || status === 'dismissed') {
        updateData.resolvedAt = Timestamp.now();
      }
      
      await updateDoc(disputeRef, updateData);
    } catch (error) {
      console.error('Error updating dispute status:', error);
      throw error;
    }
  }

  /**
   * Update dispute details
   */
  async updateDispute(disputeId: string, updates: Partial<Dispute>): Promise<void> {
    try {
      const disputeRef = doc(db, this.collectionName, disputeId);
      await updateDoc(disputeRef, {
        ...updates,
        lastUpdated: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating dispute:', error);
      throw error;
    }
  }

  /**
   * Delete a dispute
   */
  async deleteDispute(disputeId: string): Promise<void> {
    try {
      const disputeRef = doc(db, this.collectionName, disputeId);
      await deleteDoc(disputeRef);
    } catch (error) {
      console.error('Error deleting dispute:', error);
      throw error;
    }
  }

  /**
   * Assign dispute to admin
   */
  async assignDispute(disputeId: string, adminId: string, adminName: string): Promise<void> {
    try {
      const disputeRef = doc(db, this.collectionName, disputeId);
      await updateDoc(disputeRef, {
        adminId,
        assignedTo: adminName,
        status: 'underReview',
        lastUpdated: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error assigning dispute:', error);
      throw error;
    }
  }

  /**
   * Get dispute statistics
   */
  async getDisputeStats(): Promise<{
    total: number;
    pending: number;
    underReview: number;
    resolved: number;
    escalated: number;
    dismissed: number;
  }> {
    try {
      const disputes = await this.getAllDisputes();
      
      return {
        total: disputes.length,
        pending: disputes.filter(d => d.status === 'pending').length,
        underReview: disputes.filter(d => d.status === 'underReview').length,
        resolved: disputes.filter(d => d.status === 'resolved').length,
        escalated: disputes.filter(d => d.status === 'escalated').length,
        dismissed: disputes.filter(d => d.status === 'dismissed').length,
      };
    } catch (error) {
      console.error('Error fetching dispute stats:', error);
      throw error;
    }
  }

  /**
   * Generate dispute ID
   */
  generateDisputeId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `DSP-${timestamp}-${random}`;
  }

  /**
   * Convert Firebase dispute to admin UI format
   */
  convertToAdminFormat(dispute: Dispute): Dispute {
    return {
      ...dispute,
      // Map to admin UI expected fields
      customer: dispute.reporterId, // Would need to fetch user name
      order: dispute.bookingId,
      issue: this.getReasonDisplayText(dispute.reason),
      lastUpdated: dispute.lastUpdated || dispute.createdAt,
    };
  }

  /**
   * Get display text for dispute reason
   */
  private getReasonDisplayText(reason: Dispute['reason']): string {
    const reasonMap: Record<Dispute['reason'], string> = {
      noShow: 'No Show',
      damagedPackage: 'Damaged Package',
      lateDelivery: 'Late Delivery',
      inappropriateBehavior: 'Inappropriate Behavior',
      paymentIssue: 'Payment Issue',
      fraudulentActivity: 'Fraudulent Activity',
      safetyConcern: 'Safety Concern',
      other: 'Other',
    };
    return reasonMap[reason] || 'Unknown';
  }
}

const disputesService = new DisputesService();
export default disputesService;
