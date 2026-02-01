import { createContext, useContext, ReactNode, useState } from "react";
import { ModalType, ModalContextType, InviteModalData, ModalData } from "./modalTypes";

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  const openModal = (type: ModalType["type"], data?: ModalData) => {
    setCurrentModal({ type, data });
    setModalData(data);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalData(undefined);
  };

  const showInviteModal = (data?: InviteModalData) => {
    setCurrentModal({ type: "invite", data });
    setModalData(data);
  };

  const closeInviteModal = () => {
    if (currentModal?.type === "invite") {
      setCurrentModal(null);
      setModalData(undefined);
    }
  };

  const openInviteModal = (data?: InviteModalData) => {
    showInviteModal(data);
  };

  const showCreateRoomModal = () => {
    setCurrentModal({ type: "create" });
  };

  const showJoinRoomModal = () => {
    setCurrentModal({ type: "join" });
  };

  return (
    <ModalContext.Provider value={{ 
      currentModal, 
      openModal, 
      closeModal, 
      modalData,
      showInviteModal,
      closeInviteModal,
      openInviteModal,
      inviteModalData: modalData as InviteModalData | undefined,
      showCreateRoomModal,
      showJoinRoomModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};