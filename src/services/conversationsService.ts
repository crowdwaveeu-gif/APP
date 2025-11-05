import { 
  collection, 
  getDocs, 
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  text: string;
  timestamp: any;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
  deliveredTo?: string[];
  readBy?: string[];
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: { [key: string]: string };
  participantAvatars: { [key: string]: string | null };
  lastMessage?: ChatMessage;
  unreadCounts: { [key: string]: number };
  lastActivity: any;
  packageRequestId?: string;
  isActive: boolean;
}

class ConversationsService {
  private conversationsCollection = 'conversations';
  private messagesSubcollection = 'messages';

  /**
   * Get conversation between two specific users
   */
  async getConversationBetweenUsers(userId1: string, userId2: string): Promise<Conversation | null> {
    try {
      const conversationsRef = collection(db, this.conversationsCollection);
      
      // Query for conversations that contain both users
      const q = query(
        conversationsRef,
        where('participantIds', 'array-contains', userId1)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Find the conversation that includes both users
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data() as Conversation;
        if (data.participantIds.includes(userId2)) {
          return {
            ...data,
            id: docSnap.id,
          } as Conversation;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching conversation between users:', error);
      throw error;
    }
  }

  /**
   * Get all messages from a conversation
   */
  async getMessagesFromConversation(conversationId: string): Promise<ChatMessage[]> {
    try {
      const messagesRef = collection(
        db, 
        this.conversationsCollection, 
        conversationId, 
        this.messagesSubcollection
      );
      
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const messages: ChatMessage[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        } as ChatMessage);
      });
      
      return messages;
    } catch (error) {
      console.error('Error fetching messages from conversation:', error);
      throw error;
    }
  }

  /**
   * Get conversation and messages between two users (combined method)
   */
  async getChatHistoryBetweenUsers(
    userId1: string, 
    userId2: string
  ): Promise<{ conversation: Conversation | null; messages: ChatMessage[] }> {
    try {
      const conversation = await this.getConversationBetweenUsers(userId1, userId2);
      
      if (!conversation) {
        return { conversation: null, messages: [] };
      }
      
      const messages = await this.getMessagesFromConversation(conversation.id);
      
      return { conversation, messages };
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }

  /**
   * Get user details from Firestore
   */
  async getUserDetails(userId: string): Promise<{ name: string; email?: string; avatar?: string } | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          name: data.fullName || data.name || data.username || 'Unknown User',
          email: data.email || undefined,
          avatar: data.photoUrl || data.avatar || undefined,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  }

  /**
   * Format timestamp to readable date/time
   */
  formatMessageTimestamp(timestamp: any): string {
    if (!timestamp) return '';
    
    let date: Date;
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

const conversationsService = new ConversationsService();
export default conversationsService;
