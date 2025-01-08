// import reposLookup from "../resources/reposInfoLookup.json";
import FilterSection from "./FilterSection";
const Home = () => {
  return (
    <div className="h-[100%] p-5 border overflow-y-hidden">
      <div className="h-[70%] flex items-center justify-center overflow-y-visible">
        <div className="h-[10%] flex-col">
          <FilterSection></FilterSection>
        </div>
      </div>
    </div>
  );
};

export default Home;
