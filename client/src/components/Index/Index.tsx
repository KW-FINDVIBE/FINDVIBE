import GridLayout from "../Layout/GridLayout";
import IndexIntro from "./IndexIntro";
import IndexCompareImg from "./IndexCompareImg";
import Footer from "../Footer/Footer";
import IndexRecord from "./IndexRecord";
import IndexRecommend from "./IndexRecommand";

const Index: React.FunctionComponent = () => {
  return (
    <main className="relative w-full top-[64px] min-h-[calc(100vh-64px)]">
      <GridLayout>
        <IndexIntro />
        <IndexCompareImg />
        <IndexRecommend />
        <IndexRecord />
      </GridLayout>
      <Footer />
    </main>
  );
};

export default Index;
