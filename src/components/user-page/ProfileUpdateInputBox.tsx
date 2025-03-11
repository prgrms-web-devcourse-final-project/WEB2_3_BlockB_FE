export default function ProfileUpdateInputBox({
  label,
  value,
  setNewValue,
}: {
  label: string;
  value: string;
  setNewValue: (newvalue: string) => void;
}) {
  const maxLength = label === "닉네임 변경" ? 10 : 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setNewValue(e.target.value);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex md:items-center items-start justify-between max-md:flex-col">
        <span className="md:text-[18px] text-[16px] md:mr-3 mb-1">{label}</span>
        <input
          type="text"
          value={value}
          placeholder="변경하실 닉네임을 입력해주세요."
          onChange={handleChange}
          className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
        />
      </div>
      <div className="flex justify-end text-[10px] mt-[2px]">
        <p>
          <span>{value.length}</span>
          <span>/{maxLength}</span>
        </p>
      </div>
    </div>
  );
}
