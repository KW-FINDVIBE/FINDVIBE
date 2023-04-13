import { useEffect, useState } from "react";
import FindLocationGetImageBox from "./FindLocationGetImageBox";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";
import { Coordinate, sendSearchRequest } from "../../API/search";

const FindLocationImageHandle: React.FunctionComponent = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const [uploadedIndex, setUploadedIndex] = useState<number>();

  // 분석 결과 저장하는 state
  const [analyzeResultList, setAnalyzeResultList] = useState<Coordinate[]>([]);
  //analyzeResultList 의 형태를 {target:Coordinate, posList:Coordinate[]}[] 로 바꿔야함
  
  // 좌표 계산 함수 -> 분석 결과로 대체하기
  const getCoordinate = () => {
    return Array(Math.ceil(Math.random() * 3 + 1))
      .fill(0)
      .map(() => ({
        lat: Math.random() / 100 + 37.588556,
        lng: Math.random() / 100 + 127.019981,
      }));
  };

  useEffect(() => {
    if (!imageList.length) {
      return;
    }

    if (uploadedIndex == undefined) {
      console.log("first:" + imageList.length);
      sendSearchRequest(imageList).then((res) => {
        setUploadedIndex(imageList.length - 1);
        setAnalyzeResultList([...analyzeResultList, res.coordinate]);
      });
    } else {
      sendSearchRequest(imageList.slice(uploadedIndex + 1)).then((res) => {
        setUploadedIndex(imageList.length - 1);
        setAnalyzeResultList([...analyzeResultList, res.coordinate]);
      });
    }
  }, [imageList]);

  return (
    <>
      <FindLocationGetImageBox
        imageList={imageList}
        setImageList={setImageList}
      />
      <GoogleMapApi coordinate={imageList.map((_) => getCoordinate())} />
    </>
  );
};

export default FindLocationImageHandle;
