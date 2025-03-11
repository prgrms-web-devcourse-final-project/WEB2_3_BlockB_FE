export default function AdminTab({tab, setTab}: {tab: AdminTab; setTab: (updatedTab: AdminTab) => void}) {
  return (
              <div className="flex border-b-[1px] border-gray03 border-solid text-[16px] font-bold my-5">
                <button
                  onClick={() => setTab("미처리")}
                  className={`${
                    tab==="미처리"
                      ? "mr-4 border-b-2 border-solid border-blue01 text-blue03"
                      : "text-gray04"
                  }`}
                >
                  미처리
                </button>
                <button
                  onClick={() => setTab("처리 완료")}
                  className={`${
                    tab === "미처리"
                      ? "text-gray04"
                      : "ml-4 border-b-2 border-solid border-blue01 text-blue03"
                  }`}
                >
                  처리 완료
                </button>
              </div>
  )
}
