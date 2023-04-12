interface IndexRecommendProps {
  title: string;
  width: string;
  count: number;
  opacity: number;
}

const IndexRecommendItem: React.FunctionComponent<IndexRecommendProps> = ({
  title,
  width,
  count,
  opacity,
}) => {
  return (
    <>
      <div className="text-[10px] tablet:text-[1em] tablet:col-start-2 tablet:col-span-2 self-center">
        {title}
      </div>
      <div className="col-span-4 tablet:col-start-4 tablet:col-end-10">
        <div
          className="bg-[#FF7B54] h-[2em]"
          style={{
            width: width,
            opacity: opacity + "%",
          }}
        ></div>
      </div>
      <div className="tablet:col-start-10 tablet:col-end-12 justify-self-end self-center text-gray">
        {count + "회"}
      </div>
    </>
  );
};

export default IndexRecommendItem;
