import { useState } from "react";
import SELECTEDTIME from "./SelectedTime";

const HotPlaceMainBox: React.FunctionComponent = () => {
  const [selectedTime, setSelectedTime] = useState<SELECTEDTIME>(
    SELECTEDTIME.DAY
  );
  const test = [
    [
      ["남산타워", 812],
      ["광운대학교", 555],
    ],
    [
      ["63빌딩", 523],
      ["아쿠아리움", 321],
    ],
    [
      ["샤로수길", 231],
      ["엄청나게길어서한번에부르기힘든지명", 123],
      ["명동", 100],
      ["종로구", 100],
      ["종로구", 100],
      ["종로구", 10],
      ["종로구", 10],
      ["종로구", 10],
    ],
  ];
  return (
    <div className="col-span-6 tablet:col-start-3 tablet:col-end-11 bg-white rounded-[15px] drop-shadow-xl flex flex-col items-center p-8">
      <p className="text-gray text-center">{`요즘 핫한 포토존은?
FINDVIBE가 모은 순위`}</p>
      <div className="flex-row items-center my-4">
        {["일별", "주별", "월별"].map((date, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTime(idx)}
            className="px-8 py-2"
            style={{
              backgroundColor: selectedTime === idx ? "white" : "#e0e0e0",
              color: selectedTime === idx ? "black" : "gray",
              boxShadow: selectedTime === idx ? "0 0 0 2px #a0a0a0 inset" : "",
            }}
          >
            {date}
          </button>
        ))}
      </div>
      <table className="w-full table-auto text-right">
        <thead className="items-end">
          <tr>
            <th className="w-[20%]">순위</th>
            <th className="w-[60%]">장소명</th>
            <th className="w-[20%]">검색량</th>
          </tr>
        </thead>
        <tbody>
          {test[selectedTime].map((row, idx) => (
            <tr key={idx}>
              <td className="py-2" key={idx}>
                {idx + 1}
              </td>
              {row.map((item, idx) => (
                <td key={idx}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotPlaceMainBox;
