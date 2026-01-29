import { create } from "zustand";

interface Room {
  id: string;
  roomName: string;
  description: string;
}

interface RoomStore {
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room) => void;
  clearSelectedRoom: () => void;
  isInRoom: () => boolean;
  updateRoomDetails: (updates: Partial<Room>) => void;
}

const useRoomStore = create<RoomStore>((set, get) => ({
  selectedRoom: null,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  clearSelectedRoom: () => set({ selectedRoom: null }),

  isInRoom: () => !!get().selectedRoom,

  updateRoomDetails: (updates) =>
    set((state) =>
      state.selectedRoom
        ? { selectedRoom: { ...state.selectedRoom, ...updates } }
        : state,
    ),
}));
export default useRoomStore;
