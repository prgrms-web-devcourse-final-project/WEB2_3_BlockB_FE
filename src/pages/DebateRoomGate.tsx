import { useState } from "react"
import { useNavigate } from "react-router"

export default function DebateRoomGate() {
    const [roomId, setRoomId] = useState("")
    const [stance, setStance] = useState("")
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">토론방 입장</h2>
                <input 
                    type="text" 
                    value={roomId} 
                    onChange={(e) => setRoomId(e.target.value)} 
                    placeholder="룸 ID 입력"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                    name="stance" 
                    id="select-stance" 
                    onChange={(e) => setStance(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">입장 선택</option>
                    <option value="pro">찬성</option>
                    <option value="con">반대</option>
                </select>

                <button 
                    onClick={() => navigate(`/debate-zone/${roomId}`, { state: { stance: stance } })} 
                    disabled={!roomId || !stance}
                    className={`w-full p-2 rounded-lg text-white font-semibold transition ${
                        roomId && stance 
                        ? "bg-blue-500 hover:bg-blue-600" 
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    해당 룸으로 참여
                </button>
            </div>
        </div>
    )
}
