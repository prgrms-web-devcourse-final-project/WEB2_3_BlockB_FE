import React from "react";
import { useRoomStore } from "../../../stores/roomStateStore";

export default function TurnProgress() {
  const { roomSettings } = useRoomStore();
  return (
    <div className="w-auto flex justify-center md:block hidden md:mx-[20px] mx-[10px]">
      <div className="flex items-center w-auto h-7 bg-neutral-50/30 rounded-bl-2xl rounded-br-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-x border-zinc-100 px-[20px] py-[15px] gap-[10px]">
        <p className="text-white font-jersey text-[14px]">
          <span className="mr-1">Total</span>
          <span>01:21</span>
        </p>
        {/* progress dots */}
        <div className="flex gap-[5px]">
          {Array.from({ length: roomSettings.turn || 0 }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="w-4 h-4 relative">
                <div className="w-4 h-4 left-0 top-0 absolute bg-zinc-700 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-neutral-50 rounded-full shadow-[0px_1px_4px_0px_rgba(251,251,251,1.00)]" />
              </div>
              <div className="w-4 h-4 relative">
                <div className="w-4 h-4 left-0 top-0 absolute bg-blue-600 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-neutral-50 rounded-full shadow-[0px_1px_4px_0px_rgba(251,251,251,1.00)]" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
