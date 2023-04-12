import IndexRecommendItem from "./IndexRecommendItem";

const IndexRecommend: React.FunctionComponent = () => {
  const tempData = [
    {
      title: "남산타워",
      count: 72,
    },
    {
      title: "63빌딩",
      count: 50,
    },
    {
      title: "숭례문",
      count: 22,
    },
    {
      title: "서울역",
      count: 27,
    },
    {
      title: "광운대",
      count: 47,
    },
  ];

  const maxCount = 72;
  return (
    <>
      <div className="col-span-6 tablet:col-start-2 tablet:col-end-12 mt-[4em] mb-[2em]">
        <p className="text-[2em] font-pretendardBold">인기 촬영지 제공</p>
        <p>누군가의 추억이 깃들어있는, 인기있는 장소를 알려드립니다.</p>
      </div>
      {tempData
        .sort((a, b) => b.count - a.count)
        .map((item, idx) => {
          return (
            <IndexRecommendItem
              key={idx}
              title={`${idx + 1}. ${item.title}`}
              count={item.count}
              width={`${(item.count / maxCount) * 100}%`}
              opacity={(10 - idx) * 10}
            />
          );
        })}
    </>
  );
};

export default IndexRecommend;
