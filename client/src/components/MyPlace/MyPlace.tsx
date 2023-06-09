import Calendar from "react-calendar";
import GridLayout from "../Layout/GridLayout";
import "./Calender.css";
import { useEffect, useState } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";
import moment from "moment";
import axios from "axios";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";
import { sendGetLogRequest } from "../../API/predict";

interface PREDICT_RESPONSE {
  req_log_id: number;
  image_src: string;
  predict: PREDICT;
  res_time: string;
}

interface PREDICT {
  adr: string;
  ang: number;
  lat: number;
  lng: number;
}

interface POINT extends PREDICT {
  src: string;
}

interface MARK {
  [key: string]: POINT[][];
}

const MyPlace: React.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());
  const [marks, setMarks] = useState<MARK>({});
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const getAddressFromLatLng = async (latlng: { lat: number; lng: number }) => {
    try {
      const address = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`
      );
      return address.data.results;
    } catch {
      alert("주소를 가져오는데 실패했습니다.");
    }
  };

  const handleDateChange = (date: any) => {
    const selectedDate = new Date(date); // Value 형식을 Date 객체로 변환
    setDate(selectedDate);
  };

  const GetPredictLog = () => {
    sendGetLogRequest(undefined)
      .then((res) => {
        const resToMark: MARK = {};
        const response: PREDICT_RESPONSE[] = res.result;

        const transformedData: Record<string, Record<number, POINT[]>> = {};

        response.forEach((predict_item: PREDICT_RESPONSE) => {
          if (!transformedData[predict_item.res_time]) {
            transformedData[predict_item.res_time] = {};
          }
          if (
            !transformedData[predict_item.res_time][predict_item.req_log_id]
          ) {
            transformedData[predict_item.res_time][predict_item.req_log_id] =
              [];
          }
          transformedData[predict_item.res_time][predict_item.req_log_id].push({
            src: predict_item.image_src,
            ...predict_item.predict,
          });
        });

        Object.keys(transformedData).forEach((date) => {
          const points: POINT[][] = [];
          Object.keys(transformedData[date]).forEach((logId) => {
            points.push(transformedData[date][Number(logId)]);
          });
          resToMark[date] = points;
        });
        setMarks(resToMark);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  useEffect(() => {
    GetPredictLog();
  }, []);

  return (
    <main className="relative w-full top-[64px] min-h-[calc(100vh-64px)]">
      <GridLayout>
        <div className="col-start-1 col-end-7 tablet:col-start-2 tablet:col-end-7 mt-4 flex items-center justify-center h-[350px]">
          <Calendar
            onChange={handleDateChange}
            value={date}
            formatDay={(_, date) => moment(date).format("DD")}
            tileDisabled={({ date }) => {
              return !Object.keys(marks).find(
                (x) => x === moment(date).format("YYYY-MM-DD")
              );
            }}
            tileContent={({ date, view }) => {
              let html = [];
              if (
                Object.keys(marks).find(
                  (x) => x === moment(date).format("YYYY-MM-DD")
                )
              ) {
                html.push(<div className="dot" key={date.toString()}></div>);
              }
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
            }}
          />
        </div>
        <div className="col-start-1 col-end-7 tablet:col-start-7 mt-4 p-4 border border-gray h-[350px] overflow-y-scroll scrollbar-hide border-opacity-60 tablet:col-end-12 bg-white drop-shadow-lg rounded-[15px]">
          <div className="font-pretendardBold text-deeporange">
            {Object.keys(marks).find(
              (time) => time === moment(date as Date).format("YYYY-MM-DD")
            ) &&
              marks[moment(date as Date).format("YYYY-MM-DD")].map(
                (items, index) => (
                  <div key={index}>
                    {items.map((item, subIndex) => (
                      <div key={subIndex}>
                        <p>{item.adr}</p>
                        <img alt="" src={item.src} className="object-fit"></img>
                      </div>
                    ))}
                  </div>
                )
              )}
          </div>
        </div>
        <GoogleMapApi
          selectedLocationIndex={selectedLocationIndex}
          setSelectedLocationIndex={setSelectedLocationIndex}
          coordinate={
            (marks as any)[moment(date as Date).format("YYYY-MM-DD")] ?? []
          }
        />
      </GridLayout>
    </main>
  );
};

export default MyPlace;
