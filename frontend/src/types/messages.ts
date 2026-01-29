export type BaseMessage = {
  id: string;
  sender: {
    id: string;
    username: string;
  };
  timestamp: string;
  content: string;
  mediaUrl?: string | null;
  replyToId?: string | null;
};

export type SocketMessage = BaseMessage;

export type DatabaseMessage = BaseMessage & {
  roomId: string;
};
