export default function ReportTable({
  headers,
  bodys,
  unHeaders,
  unBodys,
  check,
  onCheck,
  recover,
  onRecover,
  isProcessed,
  onProcess,
  isEdited,
  onEdit,
}: {
  headers: string[];
  bodys: Report[];
  unHeaders: string[];
  unBodys: Report[];
  check: boolean;
  onCheck: (value: boolean) => void;
  recover: boolean;
  onRecover: (value: boolean) => void;
  isProcessed: boolean;
  onProcess: (value: boolean) => void;
  isEdited: boolean;
  onEdit: (value: boolean) => void;
}) {
  return (
    <table className="w-full  font-pretendard md:text-[18px] text-[9px] sm:text-[14px]">
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
              onCheck(!check);
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
                  onProcess(!isProcessed);
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
              onRecover(!recover);
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
              {body.createdAt}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid font-bold">
              <button
                className="w-10 h-6 md:w-20 md:h-9 sm:w-20 sm:h-9  rounded-[10px] bg-blue05 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(!isEdited);
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
