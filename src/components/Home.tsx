// import reposLookup from "../resources/reposInfoLookup.json";
import FilterSection from "./FilterSection";
const Home = () => {
  return (
    <div className="h-[100%] p-5 border overflow-x-hidden overflow-y-hidden ">
      <div className="h-[70%] flex flex-wrap items-center justify-center overflow-y-visible">
        <div className="h-[10%] flex-col justify-center items-baseline">
          <div className="flex justify-center">
          </div>
          <div className="flex justify-center text-pretty text-lg">
            Filter Projects
          </div>
          <FilterSection></FilterSection>
        </div>
      </div>
    </div>
  );
};

export default Home;
