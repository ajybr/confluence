import { useState } from "react";
import useJoinRoom from "../hooks/useJoinRoom";
import joinRoom from "../api/joinRoom";
import { useQueryClient } from "@tanstack/react-query";

interface AutoJoinRoomOptions {
  onSuccess?: (room: unknown) => void;
  onError?: (errorMessage: string) => void;
}

const useAutoJoinRoom = () => {
  const joinRoomMutation = useJoinRoom();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const autoJoinRoom = async (
    roomId: string,
    options: AutoJoinRoomOptions = {}
  ) => {
    try {
      setError(null);
      
      // Check if already joined by querying user rooms
      const response = await joinRoom(roomId);
      
      if (response.success) {
        // Invalidate user rooms query to refresh room list
        queryClient.invalidateQueries({ queryKey: ["userRooms"] });
        
        options.onSuccess?.(response.data || { 
          id: roomId, 
          roomName: "Joined Room" 
        });
      } else {
        const errorMessage = response.message || "Failed to join room";
        setError(errorMessage);
        options.onError?.(errorMessage);
      }
    } catch (err: unknown) {
      const errorMessage = 
        (err as { response?: { data?: { errMes?: string } } })?.response?.data?.errMes || 
        (err as { message?: string })?.message || 
        "Failed to join room. Please try again.";
      setError(errorMessage);
      options.onError?.(errorMessage);
    }
  };

  return {
    autoJoinRoom,
    error,
    isPending: joinRoomMutation.isPending,
  };
};

export default useAutoJoinRoom;