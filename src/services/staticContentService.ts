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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { StaticContent, StaticContentInput, StaticContentType } from '../types/staticContent';

const COLLECTION_NAME = 'staticContent';

export class StaticContentService {
  /**
   * Get all static content documents
   */
  static async getAllContent(): Promise<StaticContent[]> {
    try {
      const contentRef = collection(db, COLLECTION_NAME);
      const q = query(contentRef, orderBy('type', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
      })) as StaticContent[];
    } catch (error) {
      console.error('Error fetching static content:', error);
      throw error;
    }
  }

  /**
   * Get content by type
   */
  static async getContentByType(type: StaticContentType): Promise<StaticContent | null> {
    try {
      const contentRef = collection(db, COLLECTION_NAME);
      const q = query(
        contentRef,
        where('type', '==', type),
        where('isPublished', '==', true)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }

      const docData = snapshot.docs[0];
      return {
        id: docData.id,
        ...docData.data(),
        lastUpdated: docData.data().lastUpdated?.toDate() || new Date(),
      } as StaticContent;
    } catch (error) {
      console.error('Error fetching content by type:', error);
      throw error;
    }
  }

  /**
   * Get content by ID
   */
  static async getContentById(id: string): Promise<StaticContent | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        lastUpdated: docSnap.data().lastUpdated?.toDate() || new Date(),
      } as StaticContent;
    } catch (error) {
      console.error('Error fetching content by ID:', error);
      throw error;
    }
  }

  /**
   * Create new static content
   */
  static async createContent(
    input: StaticContentInput,
    userId: string
  ): Promise<string> {
    try {
      const contentRef = collection(db, COLLECTION_NAME);
      
      // Check if content of this type already exists
      const existingQuery = query(contentRef, where('type', '==', input.type));
      const existingSnapshot = await getDocs(existingQuery);
      
      if (!existingSnapshot.empty) {
        throw new Error(`Content of type '${input.type}' already exists. Please update it instead.`);
      }

      const newContent = {
        type: input.type,
        title: input.title,
        content: input.content,
        isPublished: input.isPublished,
        version: 1,
        updatedBy: userId,
        lastUpdated: serverTimestamp(),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(contentRef, newContent);
      return docRef.id;
    } catch (error) {
      console.error('Error creating static content:', error);
      throw error;
    }
  }

  /**
   * Update existing static content
   */
  static async updateContent(
    id: string,
    input: Partial<StaticContentInput>,
    userId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Content not found');
      }

      const currentVersion = docSnap.data().version || 1;

      const updateData: any = {
        ...input,
        version: currentVersion + 1,
        updatedBy: userId,
        lastUpdated: serverTimestamp(),
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating static content:', error);
      throw error;
    }
  }

  /**
   * Delete static content
   */
  static async deleteContent(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting static content:', error);
      throw error;
    }
  }

  /**
   * Publish/Unpublish content
   */
  static async togglePublish(id: string, userId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Content not found');
      }

      const isPublished = docSnap.data().isPublished || false;

      await updateDoc(docRef, {
        isPublished: !isPublished,
        updatedBy: userId,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }
  }
}
