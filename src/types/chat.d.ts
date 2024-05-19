export type Role = 'user' | 'assistant';

export interface ChatMessage {
    _id: any;
    userId: string;
    friendId: string;
    role: Role;
    content: string;
    createdAt: Date;
  }