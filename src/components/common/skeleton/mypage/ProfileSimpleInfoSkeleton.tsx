export default function ProfileSimpleInfoSkeleton() {
  return (
    <div className="w-[450px] h-[90px] border border-solid border-white02 bg-white rounded-[10px] flex items-center justify-between px-6 animate-pulse">
      <div className="flex items-center">
        <div className="w-[60px] h-[60px] bg-gray03 rounded-full mr-3" />
        <div>
          <div className="h-4 bg-gray03 rounded w-24 mb-2" />
          <div className="h-3 bg-gray03 rounded w-32" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="rounded-[5px] bg-gray03 w-12 h-5 mr-1" />
        <div className="w-4 h-4 bg-gray03 rounded" />
      </div>
    </div>
  );
}
