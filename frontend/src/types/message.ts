export type CreateMessagePayload = {
  roomId: string;
  content: string;
  mediaUrl?: string;
  replyToId?: string;
};