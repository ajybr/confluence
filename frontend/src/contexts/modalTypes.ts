export interface InviteModalData {
  roomId: string;
  roomName: string;
  roomCode?: string;
}

export type CreateRoomModalData = Record<string, never>;

export type JoinRoomModalData = Record<string, never>;

export type ModalData = InviteModalData | CreateRoomModalData | JoinRoomModalData;

export interface ModalType {
  type: "join" | "create" | "invite";
  data?: ModalData;
}

export interface ModalContextType {
  currentModal: ModalType | null;
  data?: ModalData;
  modalData?: ModalData;
  openModal: (type: ModalType["type"], data?: ModalData) => void;
  closeModal: () => void;
  showInviteModal: (data?: InviteModalData) => void;
  closeInviteModal: () => void;
  openInviteModal: (data?: InviteModalData) => void;
  showCreateRoomModal: () => void;
  showJoinRoomModal: () => void;
  inviteModalData?: InviteModalData;
}