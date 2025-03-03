// TODO: option string 타입으로 임시 지정. 추후에 boolean 값으로 조건 넣고 싶다면 수정하십시오.
export default function LoadingSpinner({ option }: { option?: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 rounded-full border-gray03 border-t-game_blue01 animate-spin"></div>
    </div>
  );
}
