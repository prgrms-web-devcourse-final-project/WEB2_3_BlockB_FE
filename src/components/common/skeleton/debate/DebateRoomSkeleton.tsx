export default function DebateRoomSkeleton() {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="border-b animate-pulse">
            <td className="p-3 text-center">
              <div className="h-6 bg-gray-300 rounded w-[70px]"></div>
            </td>
            <td className="p-3">
              <div className="h-6 bg-gray-300 rounded w-[250px]"></div>
            </td>
            <td className="p-3 text-center">
              <div className="h-6 bg-gray-300 rounded w-[50px]"></div>
            </td>
            <td className="p-3 text-center">
              <div className="h-6 bg-gray-300 rounded w-[60px]"></div>
            </td>
            <td className="p-3 text-center">
              <div className="h-6 bg-gray-300 rounded w-[80px]"></div>
            </td>
            <td className="p-3 flex justify-end space-x-2">
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
              <div className="h-8 bg-gray-300 rounded w-[60px]"></div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  