import { useState } from "react";
import JoinRoomIcon from "../utils/JoinRoomIcon";
import JoinRoomModal from "./JoinRoomModal";

type ButtonStyleProps = { style: "compact" | "full" };

const JoinRoomButton = ({ style }: ButtonStyleProps) => {
  const [showModal, setShowModal] = useState(false);

  if (style === "compact") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="cursor-pointer rounded-full w-fit h-fit p-2 hover:bg-[#9796F0]/30"
        >
          <JoinRoomIcon iconType={style} />
        </button>
        <JoinRoomModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="cursor-pointer flex gap-1 rounded-md p-2 items-center justify-center max-w-fit hover:bg-slate-600/30 hover:bg-backdrop-blur-xl"
      >
        <JoinRoomIcon iconType={style} />
        <div>Join </div>
      </button>
      <JoinRoomModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default JoinRoomButton;

