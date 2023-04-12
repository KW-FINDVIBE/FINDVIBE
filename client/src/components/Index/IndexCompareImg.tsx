import 포토아일랜드 from "../../assets/Img/포토아일랜드.jpg";
import 남산타워 from "../../assets/Img/남산타워.jpg";
import RightArrowSvg from "../../assets/Svg/RightArrowSvg";

const IndexCompareImg: React.FunctionComponent = () => {
  return (
    <>
      <div className="my-[4em] col-span-6 tablet:col-span-12 flex flex-col items-end">
        <p className="font-pretendardBold text-[2em]">사진의 촬영장소 탐색</p>
        <p>
          사진 안 속에 있는 대상의 장소가 아닌, 사진이 촬영된 장소를
          알려드립니다.
        </p>
      </div>
      <div className="col-span-6 tablet:col-start-2 tablet:col-end-12 grid grid-cols-6 tablet:grid-cols-10 place-items-center">
        <img
          alt=""
          src={남산타워}
          className="col-start-1 col-end-3 tablet:col-end-5"
        ></img>
        <div className="col-start-3 col-end-5 tablet:col-start-5 tablet:col-end-7 flex items-center justify-center">
          <RightArrowSvg width="50%" />
        </div>
        <img
          alt=""
          src={포토아일랜드}
          className="col-start-5 col-end-7 tablet:col-start-7 tablet:col-end-12 object-cover"
        ></img>
      </div>
    </>
  );
};

export default IndexCompareImg;
