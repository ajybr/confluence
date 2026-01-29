import { useState } from "react";
import CreateRoomIcon from "../utils/CreateRoomIcon";
import CreateRoomModal from "./CreateRoomModal";

type ButtonStyleProps = { style: "compact" | "full" };

const CreateRoomButton = ({ style }: ButtonStyleProps) => {
  const [showModal, setShowModal] = useState(false);
  if (style === "compact") {
    return (
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer rounded-full w-fit h-fit p-2  hover:bg-[#9796F0]/30"
        >
          <CreateRoomIcon iconType={style} />
        </button>
        {showModal && <CreateRoomModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="cursor-pointer flex rounded-md p-2 items-center justify-center max-w-fit hover:bg-slate-600/30  hover:bg-backdrop-blur-xl"
      >
        <CreateRoomIcon iconType={style} /> Create{" "}
      </button>
      {showModal && <CreateRoomModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CreateRoomButton;
