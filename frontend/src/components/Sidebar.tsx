import React from "react";
import RoomList from "./RoomList";
import useGetUserRooms from "../hooks/useGetUserRooms";

const Sidebar: React.FC = () => {
  const { data, isLoading, isError, error } = useGetUserRooms();
  if (isLoading) {
    return (
      <div className="col-span-3 md:col-span-2 ml-3">
        <h2 className="font-krylon text-xl font-extralight">Rooms</h2>
        <div className="">
          <div className="rounded-xl min-w-[90%] shine p-1 mr-auto bg-slate-600/30">
            <div className="bg-slate-400/50 rounded-xl m-1 w-fit text-transparent">
              roomName
            </div>
            <div className="bg-slate-100/50 m-1 rounded-xl w-4/5 text-transparent">
              description
            </div>
          </div>
          <div className="rounded-xl min-w-[90%] shine p-1 mr-auto bg-slate-600/30">
            <div className="bg-slate-400/50 rounded-xl m-1 w-fit text-transparent">
              roomName
            </div>
            <div className="bg-slate-100/50 m-1 rounded-xl w-4/5 text-transparent">
              description
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-3 md:col-span-2 ml-3">
        <h2 className="font-krylon text-xl font-extralight">Rooms</h2>
        <div className="text-red-800 max-w-fit">Error loading rooms</div>
      </div>
    );
  }

  return <RoomList rooms={data} isError={isError} error={error ?? null} />;
};

export default Sidebar;
