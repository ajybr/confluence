export const generateInviteUrl = (roomId: string, baseUrl?: string): string => {
  const base = baseUrl || `${window.location.origin}`;
  return `${base}/join/${roomId}`;
};

export const generateRoomCodeInviteUrl = (roomCode: string, baseUrl?: string): string => {
  const base = baseUrl || `${window.location.origin}`;
  return `${base}/join/${roomCode}`;
};