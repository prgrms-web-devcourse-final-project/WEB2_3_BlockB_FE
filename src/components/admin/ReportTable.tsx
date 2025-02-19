export default function ReportTable({
  headers,
  bodys,
  unHeaders,
  unBodys,
  check,
  onCheck,
  recover,
  onRecover,
  process,
  onProcess,
  edit,
  onEdit,
}: {
  headers: string[];
  bodys: {
    reson: string;
    reporter: string;
    name: string;
    date: string;
    action: string;
  }[];
  unHeaders: string[];
  unBodys: {
    option: string;
    name: string;
    admin: string;
    reason: string;
    date: string;
    action: string;
  }[];
  check: boolean;
  onCheck: (value: boolean) => void;
  recover: boolean;
  onRecover: (value: boolean) => void;
  process: boolean;
  onProcess: (value: boolean) => void;
  edit: boolean;
  onEdit: (value: boolean) => void;
}) {
  return (
    <table className="w-full  font-pretendard text-[18px]">
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
        {bodys.map((body, index) => (
          <tr
            className="h-[75px] font-medium"
            key={index}
            onClick={() => {
              onCheck(!check);
            }}
          >
            <td className="text-center border-b-[1px] border-blue07 border-solid ">
              {body.reson}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.reporter}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.name}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.date}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid font-bold">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProcess(!process);
                }}
                className="w-20 h-9 rounded-[10px] bg-blue05 text-white"
              >
                {body.action}
              </button>
            </td>
          </tr>
        ))}

        {unBodys.map((body, index) => (
          <tr
            className="h-[75px] font-medium"
            key={index}
            onClick={() => {
              onRecover(!recover);
            }}
          >
            <td className="text-center border-b-[1px] border-blue07 border-solid ">
              {body.option}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.name}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.admin}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.reason}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid">
              {body.date}
            </td>
            <td className="text-center border-b-[1px] border-blue07 border-solid font-bold">
              <button
                className="w-20 h-9 rounded-[10px] bg-blue05 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(!edit);
                }}
              >
                {body.action}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
