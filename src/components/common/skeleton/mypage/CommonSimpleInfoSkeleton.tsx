export default function CommonSimpleInfoSkeleton() {
  return (
    <div className="flex justify-between w-full mb-[30px] animate-pulse">
      <div className="flex text-[16px] items-center">
        <div className="w-[68px] h-7 mr-[18px] bg-gray03 rounded-[10px]" />
        <div className="h-5 bg-gray03 rounded w-[300px]" />
      </div>
      <div className="h-5 bg-gray03 rounded w-[100px]" />
    </div>
  );
}
