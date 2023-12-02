export interface Chat {
  id: number;
  created: Date;
  title?: string;
  image: string;
  updated: string;
  is_deleted: boolean;
  readonly: boolean;
  chatMessages: ChatMessage[];
  participants: Participant[];
}

export interface Participant {
  id: number;
  fullName: string;
  picture?: string;
  isTeacher: boolean;
}

export interface ChatMessage {
  id: number;
  chatId: number;

  created: Date;
  updated: string;
  message: string;
  isTeacher: boolean;
  sender: Sender;
  isOur: boolean;
}

export interface Sender {
  id: number;
  fullName: string;
  isTeacher: boolean;
  email: string;
  picture?: any;
}