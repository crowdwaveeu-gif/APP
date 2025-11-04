// KYC Service for managing KYC applications
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface KYCDocument {
  images: {
    selfie: string; // base64
    front: string; // base64
    back: string; // base64
  };
  type: string;
}

export interface KYCPersonalInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface KYCAudit {
  submittedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface KYCApplication {
  userId: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  document: KYCDocument;
  personalInfo: KYCPersonalInfo;
  audit: KYCAudit;
  rejectionReason?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  photoUrl?: string; // Alternative field for profile picture in Firebase
  phoneNumber?: string;
  city?: string;
  country?: string;
  address?: string;
  dateOfBirth?: string;
  role: string;
  createdAt: string;
  isBlocked: boolean;
  verificationStatus?: {
    emailVerified: boolean;
    phoneVerified: boolean;
    identityVerified: boolean;
    identitySubmittedAt?: string;
    identityVerifiedAt?: string;
    rejectionReason?: string;
  };
}

export interface OTPCode {
  id: string;
  userId: string;
  email: string;
  otp: string;
  type: string;
  used: boolean;
  createdAt: any;
  expiresAt: any;
  usedAt?: any;
}

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  status: string;
  createdAt: any;
  [key: string]: any;
}

export interface PackageRequest {
  id: string;
  senderId: string;
  senderName: string;
  status: string;
  compensationOffer: number;
  finalPrice?: number;
  createdAt: string;
  destinationLocation: any;
  pickupLocation: any;
  [key: string]: any;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
  lastUpdated: any;
  [key: string]: any;
}

export interface TravelTrip {
  id: string;
  travelerId: string;
  status: string;
  departureLocation: any;
  arrivalLocation: any;
  departureDate: string;
  arrivalDate: string;
  createdAt: string;
  [key: string]: any;
}

export interface Booking {
  id: string;
  senderId: string;
  travelerId: string;
  status: string;
  totalAmount: number;
  createdAt: any;
  packageId: string;
  [key: string]: any;
}

class KYCService {
  private kycCollection = 'kyc_applications';
  private usersCollection = 'users';
  private otpCollection = 'otp_codes';

  // Fetch all KYC applications
  async getAllKYCApplications(): Promise<KYCApplication[]> {
    try {
      const kycRef = collection(db, this.kycCollection);
      const querySnapshot = await getDocs(kycRef);
      
      const applications: KYCApplication[] = [];
      querySnapshot.forEach((doc) => {
        applications.push({
          userId: doc.id,
          ...doc.data()
        } as KYCApplication);
      });
      
      // Sort by submittedAt in memory (newest first)
      applications.sort((a, b) => {
        const dateA = new Date(a.audit.submittedAt).getTime();
        const dateB = new Date(b.audit.submittedAt).getTime();
        return dateB - dateA;
      });
      
      return applications;
    } catch (error) {
      console.error('Error fetching KYC applications:', error);
      throw error;
    }
  }

  // Fetch KYC applications by status
  async getKYCApplicationsByStatus(status: string): Promise<KYCApplication[]> {
    try {
      const kycRef = collection(db, this.kycCollection);
      const q = query(
        kycRef, 
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      
      const applications: KYCApplication[] = [];
      querySnapshot.forEach((doc) => {
        applications.push({
          userId: doc.id,
          ...doc.data()
        } as KYCApplication);
      });
      
      // Sort by submittedAt in memory (newest first)
      applications.sort((a, b) => {
        const dateA = new Date(a.audit.submittedAt).getTime();
        const dateB = new Date(b.audit.submittedAt).getTime();
        return dateB - dateA;
      });
      
      return applications;
    } catch (error) {
      console.error('Error fetching KYC applications by status:', error);
      throw error;
    }
  }

  // Get single KYC application
  async getKYCApplication(userId: string): Promise<KYCApplication | null> {
    try {
      const docRef = doc(db, this.kycCollection, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          userId: docSnap.id,
          ...docSnap.data()
        } as KYCApplication;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching KYC application:', error);
      throw error;
    }
  }

  // Approve KYC application
  async approveKYC(userId: string, reviewedBy: string): Promise<void> {
    try {
      const kycRef = doc(db, this.kycCollection, userId);
      const userRef = doc(db, this.usersCollection, userId);
      
      const now = new Date().toISOString();
      
      // Update KYC application
      await updateDoc(kycRef, {
        status: 'approved',
        'audit.reviewedAt': now,
        'audit.reviewedBy': reviewedBy,
        'audit.updatedAt': now,
        rejectionReason: null
      });
      
      // Update user verification status
      await updateDoc(userRef, {
        'verificationStatus.identityVerified': true,
        'verificationStatus.identityVerifiedAt': now,
        'verificationStatus.rejectionReason': null
      });
      
      console.log(`KYC approved for user: ${userId}`);
    } catch (error) {
      console.error('Error approving KYC:', error);
      throw error;
    }
  }

  // Reject KYC application
  async rejectKYC(userId: string, reason: string, reviewedBy: string): Promise<void> {
    try {
      const kycRef = doc(db, this.kycCollection, userId);
      const userRef = doc(db, this.usersCollection, userId);
      
      const now = new Date().toISOString();
      
      // Update KYC application
      await updateDoc(kycRef, {
        status: 'rejected',
        rejectionReason: reason,
        'audit.reviewedAt': now,
        'audit.reviewedBy': reviewedBy,
        'audit.updatedAt': now
      });
      
      // Update user verification status
      await updateDoc(userRef, {
        'verificationStatus.identityVerified': false,
        'verificationStatus.rejectionReason': reason
      });
      
      console.log(`KYC rejected for user: ${userId}`);
    } catch (error) {
      console.error('Error rejecting KYC:', error);
      throw error;
    }
  }

  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    try {
      const usersRef = collection(db, this.usersCollection);
      const querySnapshot = await getDocs(usersRef);
      
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        } as User);
      });
      
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const docRef = doc(db, this.usersCollection, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Block/Unblock user
  async toggleUserBlock(userId: string, isBlocked: boolean): Promise<void> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      await updateDoc(userRef, {
        isBlocked
      });
      
      console.log(`User ${userId} ${isBlocked ? 'blocked' : 'unblocked'}`);
    } catch (error) {
      console.error('Error toggling user block:', error);
      throw error;
    }
  }

  // Create a new user
  async createUser(userData: Partial<User>): Promise<string> {
    try {
      const timestamp = new Date().toISOString();
      const newUser = {
        fullName: userData.fullName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || null,
        avatar: userData.avatar || null,
        photoUrl: userData.avatar || null,
        city: userData.city || null,
        country: userData.country || null,
        address: userData.address || null,
        role: userData.role || 'sender',
        isBlocked: false,
        isOnline: false,
        createdAt: timestamp,
        lastActiveAt: timestamp,
        dateOfBirth: userData.dateOfBirth || null,
        username: userData.email?.split('@')[0] || '',
        name: userData.fullName || '',
        fcmToken: '',
        stripeAccountId: null,
        verificationDocuments: [],
        verificationStatus: {
          emailVerified: false,
          phoneVerified: false,
          identityVerified: false,
          identitySubmittedAt: null,
          identityVerifiedAt: null,
          rejectionReason: null,
          submittedDocuments: []
        },
        preferences: {
          preferredLanguage: 'en',
          preferredCurrency: 'USD',
          allowsNotifications: true,
          allowsSMSNotifications: true,
          allowsEmailMarketing: false,
          autoAcceptMatches: false,
          maxDetourKm: 10,
          preferredTransportModes: []
        },
        stats: {
          totalPackagesSent: 0,
          totalEarnings: 0,
          totalSpent: 0,
          totalDeliveries: 0,
          completedTrips: 0,
          onTimeDeliveries: 0,
          lateDeliveries: 0,
          lastDelivery: null,
          reliabilityScore: 100
        },
        ratings: {
          averageRating: 0,
          totalRatings: 0,
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
          recentReviews: []
        }
      };

      const docRef = await addDoc(collection(db, this.usersCollection), newUser);
      console.log('User created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user details
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      
      // Prepare update data - only include fields that are provided
      const updateData: any = {};
      
      if (userData.fullName !== undefined) {
        updateData.fullName = userData.fullName;
        updateData.name = userData.fullName; // Keep name in sync
      }
      if (userData.email !== undefined) updateData.email = userData.email;
      if (userData.phoneNumber !== undefined) updateData.phoneNumber = userData.phoneNumber;
      if (userData.avatar !== undefined) {
        updateData.avatar = userData.avatar;
        updateData.photoUrl = userData.avatar; // Keep photoUrl in sync
      }
      if (userData.city !== undefined) updateData.city = userData.city;
      if (userData.country !== undefined) updateData.country = userData.country;
      if (userData.role !== undefined) updateData.role = userData.role;
      if (userData.isBlocked !== undefined) updateData.isBlocked = userData.isBlocked;
      if (userData.dateOfBirth !== undefined) updateData.dateOfBirth = userData.dateOfBirth;
      
      await updateDoc(userRef, updateData);
      console.log(`User ${userId} updated successfully`);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      await deleteDoc(userRef);
      console.log(`User ${userId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Convert base64 to viewable image URL
  base64ToImageUrl(base64String: string): string {
    if (base64String.startsWith('data:image')) {
      return base64String;
    }
    return `data:image/jpeg;base64,${base64String}`;
  }

  // Get OTP codes for a user
  async getUserOTPs(userId: string): Promise<OTPCode[]> {
    try {
      const otpRef = collection(db, this.otpCollection);
      const q = query(otpRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const otps: OTPCode[] = [];
      querySnapshot.forEach((doc) => {
        otps.push({
          id: doc.id,
          ...doc.data()
        } as OTPCode);
      });
      
      // Sort by createdAt (newest first)
      otps.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      
      return otps;
    } catch (error) {
      console.error('Error fetching user OTPs:', error);
      throw error;
    }
  }

  // Get user transactions
  async getUserTransactions(userId: string): Promise<Transaction[]> {
    try {
      const transactionsRef = collection(db, 'transactions');
      const q = query(transactionsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const transactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        transactions.push({
          id: doc.id,
          ...doc.data()
        } as Transaction);
      });
      
      // Sort by createdAt (newest first)
      transactions.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      
      return transactions;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  }

  // Get user package requests (as sender)
  async getUserPackageRequests(userId: string): Promise<PackageRequest[]> {
    try {
      const packagesRef = collection(db, 'packageRequests');
      const q = query(packagesRef, where('senderId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const packages: PackageRequest[] = [];
      querySnapshot.forEach((doc) => {
        packages.push({
          id: doc.id,
          ...doc.data()
        } as PackageRequest);
      });
      
      // Sort by createdAt (newest first)
      packages.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
      
      return packages;
    } catch (error) {
      console.error('Error fetching user package requests:', error);
      throw error;
    }
  }

  // Get user wallet
  async getUserWallet(userId: string): Promise<Wallet | null> {
    try {
      const walletRef = doc(db, 'wallets', userId);
      const walletSnap = await getDoc(walletRef);
      
      if (walletSnap.exists()) {
        return {
          id: walletSnap.id,
          ...walletSnap.data()
        } as Wallet;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user wallet:', error);
      throw error;
    }
  }

  // Get user travel trips
  async getUserTravelTrips(userId: string): Promise<TravelTrip[]> {
    try {
      const tripsRef = collection(db, 'travelTrips');
      const q = query(tripsRef, where('travelerId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const trips: TravelTrip[] = [];
      querySnapshot.forEach((doc) => {
        trips.push({
          id: doc.id,
          ...doc.data()
        } as TravelTrip);
      });
      
      // Sort by createdAt (newest first)
      trips.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
      
      return trips;
    } catch (error) {
      console.error('Error fetching user travel trips:', error);
      throw error;
    }
  }

  // Get user bookings (as sender or traveler)
  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const bookingsRef = collection(db, 'bookings');
      
      // Query for bookings where user is sender
      const qSender = query(bookingsRef, where('senderId', '==', userId));
      const senderSnapshot = await getDocs(qSender);
      
      // Query for bookings where user is traveler
      const qTraveler = query(bookingsRef, where('travelerId', '==', userId));
      const travelerSnapshot = await getDocs(qTraveler);
      
      const bookings: Booking[] = [];
      const bookingIds = new Set<string>();
      
      senderSnapshot.forEach((doc) => {
        if (!bookingIds.has(doc.id)) {
          bookings.push({
            id: doc.id,
            ...doc.data()
          } as Booking);
          bookingIds.add(doc.id);
        }
      });
      
      travelerSnapshot.forEach((doc) => {
        if (!bookingIds.has(doc.id)) {
          bookings.push({
            id: doc.id,
            ...doc.data()
          } as Booking);
          bookingIds.add(doc.id);
        }
      });
      
      // Sort by createdAt (newest first)
      bookings.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      
      return bookings;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }
}

export default new KYCService();
