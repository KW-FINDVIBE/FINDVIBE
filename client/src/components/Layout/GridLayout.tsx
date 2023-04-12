interface GridLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const GridLayout: React.FunctionComponent<GridLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={"w-full flex justify-center " + className}>
      <div className="w-full max-w-maxwidth grid grid-cols-6 tablet:grid-cols-12 top-[64px] gap-[15px] tablet:gap-[20px] px-[20px] tablet:px-[40px] ">
        {children}
      </div>
    </div>
  );
};

export default GridLayout;
