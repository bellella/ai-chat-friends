export type Role = 'user' | 'assistant';

export interface ChatMessage {
    _id: string!;
    userId: string;
    friendId: string;
    role: Role;
    content: string;
    createdAt: Date;
  }