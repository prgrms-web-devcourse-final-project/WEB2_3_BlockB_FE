import Footer from "../components/common/Footer";
import loading from "../assets/icons/loading.svg";
import { useState } from "react";

export default function Signup() {
    const [isNicknameUniqueable, setIsNicnameUniqueable] = useState<boolean>(true);
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
    const [userDescription, setUserDescription] = useState<string>("");
    const [isUserDesInputVisible, setIsUserDesInputVisible] = useState<boolean>(true);
    
    const announcedMessages = [
        "중복된 닉네임인지 확인중입니다...",
        "고유한 닉네임입니다",
        "고유하지 않은 닉네임입니다. 다른 닉네임으로 변경해주세요"
    ];
    const [message, setMessage] = useState<string>(announcedMessages[0]);
    const originalID = "imaria0218"; // 임시 닉네임
    const [inputNickname, setInputNickname] = useState(originalID);

    const inputStyle = "w-full text-black01 font-bold placeholder:text-gray04 placeholder:font-light bg-transparent outline-none";
    const inputBoxStyle = "flex justify-between items-center w-[400px] h-[50px] px-[30px] py-[16px] bg-gray02 rounded-[10px]";

    return (
        <div className="flex flex-col justify-between min-h-screen font-pretendard text-[14px]">
            <section className="flex-grow flex flex-col justify-center items-center h-full gap-4">
                {/* 닉네임 중복 확인 혹은 새 닉네임 입력 */}
                <label className={inputBoxStyle}>
                    <input type="text" className={inputStyle} placeholder="새로운 닉네임을 입력해주세요" value={inputNickname} onChange={(e)=> setInputNickname(e.target.value)} />  
                    {isNicknameUniqueable && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#0060F0"/>
                        <path d="M15 7L8.57143 13L5 10.6" 
                                stroke="#FBFBFB" 
                                stroke-opacity="0.7" 
                                stroke-width="1.5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                stroke-dasharray="12" 
                                stroke-dashoffset="-12"> 
                            <animate attributeName="stroke-dashoffset" 
                                    from="-12" to="0" 
                                    dur="0.4s" 
                                    fill="freeze"
                                    calcMode="spline"
                                    keySplines="0.25 1 0.5 1" />
                        </path>
                    </svg>
                    }
                    {!isNicknameUniqueable && <img src={loading} alt="중복된 닉네임 확인중" className="w-[20px] h-[20px] animate-spin"/>}
                </label>
                {/* 한줄 소개 입력 */}
                {isUserDesInputVisible && 
                <>
                    <label className={inputBoxStyle}>
                        <input type="text" className={inputStyle} placeholder="한 줄 소개를 입력해주세요" value={userDescription}   onChange={(e) => setUserDescription(e.target.value)} />    
                        {userDescription.length > 0 && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#0060F0"/>
                            <path d="M15 7L8.57143 13L5 10.6" 
                                    stroke="#FBFBFB" 
                                    stroke-opacity="0.7" 
                                    stroke-width="1.5" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                    stroke-dasharray="12" 
                                    stroke-dashoffset="-12"> 
                                <animate attributeName="stroke-dashoffset" 
                                        from="-12" to="0" 
                                        dur="0.4s" 
                                        fill="freeze"
                                        calcMode="spline"
                                        keySplines="0.25 1 0.5 1" />
                            </path>
                        </svg>
                        }
                    </label>
                    <div className="flex justify-between w-[400px]">
                        <button className="border-b border-gray04 text-gray04">다음에 추가하겠습니다</button>
                        <button className={`${isNicknameUniqueable && userDescription.length > 0 ? "text-black01 bg-gray02 w-[54px] h-[20px] text-center px-auto py-auto rounded-[5px] shadow animate-slide-up-fast" : "invisible"}`}>완료</button>
                    </div>
                </>
                }
                {/* 안내 메시지 */}
                {isMessageVisible && <h1 className="text-black01 animate-slide-up-fast">{message}</h1>}
            </section>
            <Footer status="default" />
        </div>
    );
}
