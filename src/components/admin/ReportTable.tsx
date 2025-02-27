export default function ReportTable({
  headers,
  bodys,
  unHeaders,
  unBodys,
  setCheckModalOpen,
  setRecoverModalOpen,
  setProcessModalOpen,
  setEditModalOpen,
}: {
  headers: string[];
  bodys: Report[];
  unHeaders: string[];
  unBodys: Report[];
  setCheckModalOpen: (value: boolean, reportId: number) => void;
  setRecoverModalOpen: (value: boolean, reportId: number) => void;
  setProcessModalOpen: (value: boolean, reportId: number) => void;
  setEditModalOpen: (value: boolean, reportId: number) => void;
}) {
  return (
    <table className="w-full  font-pretendard md:text-[14px] text-[9px] sm:text-[14px]">
      <thead className="h-[54px] bg-blue04">
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          {unHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {unBodys.map((body, index) => (
          <tr
            className="h-[75px] font-medium"
            key={index}
            onClick={() => {
              setCheckModalOpen(true, body.id);
            }}
          >
            <td className="text-center border-b-[1px] border-blue07 border-solid ">
              {body.reportType}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.nickname}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.targetNickname}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.createdAt}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid font-bold">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProcessModalOpen(true, body.id);
                }}
                className="w-10 h-6 md:w-20 md:h-9 sm:w-20 sm:h-9 rounded-[10px] bg-blue05 text-white"
              >
                처리하기
              </button>
            </td>
          </tr>
        ))}

        {bodys.map((body, index) => (
          <tr
            className="h-[75px] font-medium"
            key={index}
            onClick={() => {
              setRecoverModalOpen(true, body.id);
            }}
          >
            <td className="text-center border-b-[1px] border-blue07 border-solid ">
              {body.reportResult}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.targetNickname}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              처리자 이름
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.reportedAt || "알 수 없음"}
              {/* TODO: 백엔드 배포 후 다시 확인 */}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid font-bold">
              <button
                className="w-10 h-6 md:w-20 md:h-9 sm:w-20 sm:h-9  rounded-[10px] bg-blue05 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalOpen(true, body.id);
                }}
              >
                변경하기
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
