export default function ProfileUpdateInputBox({label, value, setNewValue}: {label: string, value: string, setNewValue: (newvalue: string) => void}) {
  return (
    <div
    className="flex md:items-center items-start justify-between max-md:flex-col"
  >
    <span className="md:text-[18px] text-[16px] md:mr-3 mb-1">{label}</span>
    <input
      type="text"
      value={value}
      placeholder="변경하실 닉네임을 입력해주세요."
      onChange={(e)=> setNewValue(e.target.value)}
      className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
    />
  </div>
  )
}
{/* <div
className="flex md:items-center items-start justify-between max-md:flex-col"
>
<span className="md:text-[18px] text-[16px] md:mr-3 mb-1">자기소개 변경</span>
<input
  type="text"
  value={newIntroduction}
  placeholder="변경하실 소개글을 입력해주세요."
  onChange={(e) => setNewIntroduction(e.target.value)}
  className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
/>
</div> */}