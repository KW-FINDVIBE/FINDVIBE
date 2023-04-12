import IndexIdea from "../../assets/Img/IndexIdea.png";
import { useNavigate } from "react-router-dom";

const IndexIntro: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative col-span-6 tablet:col-start-2 tablet:col-end-6 text-justify tablet:top-[64px] tablet:-order-2 tablet:my-[4em]">
        <div className="font-pretendardBold text-[5.7vw] maxwidth:text-[6em] ">{`추억을 찾는\n강력한 도구`}</div>
        <div className="text-gray">
          추억의 장소, 궁금한 장소, 신기한 사진 등. FINDVIBE와 함께 쉽고 빠르게
          추억의 장소를 찾아보세요.
        </div>
        <div className="w-full break-keep flex justify-between grid grid-cols-4 gap-[20px] text-[0.8em] maxwidth:text-[1em] my-[1em]">
          <div className="col-span-2 w-full bg-gradient-to-r from-deeporange to-shalloworange rounded-full p-[2px]">
            <button
              className="w-full  bg-white px-4 py-2 rounded-full flex items-center text-deeporange justify-center font-pretendardBold"
              onClick={() => navigate("/hotplace")}
            >
              인기장소 보기
            </button>
          </div>
          <button
            className="col-span-2 bg-gradient-to-r w-full from-deeporange to-shalloworange px-4 py-2 rounded-full text-white flex items-center justify-center font-pretendardBold"
            onClick={() => navigate("/findvibe")}
          >
            잃은추억 찾기
          </button>
        </div>
      </div>
      <div className="col-span-6 tablet:col-start-7 tablet:col-end-12 relative top-[64px] -order-1 tablet:top-[8em]">
        <img className="w-full" alt="" src={IndexIdea}></img>
      </div>
    </>
  );
};

export default IndexIntro;
