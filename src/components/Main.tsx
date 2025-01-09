import HeaderNav from "./HeaderNav";
import Project from "./Project";
import About from "./About";
import SideNav from "./SideNav";

interface MainProps {
  changeState: (name: string) => void;
  currentState: string;
}

const Main = ({ changeState, currentState }: MainProps) => {
  return (
    <div className="main-section h-[100%]">
      <div className="header-nav-container">
        <HeaderNav currentState = {currentState} changeNav={changeState}></HeaderNav>
      </div>
      <div className="main-content w-screen pl-3 ">
        {currentState === "About" ? (
            <About></About>
        ) : currentState === "Projects" ? (
          <SideNav changeNav={changeState}></SideNav>
        ) : (
          <Project currentRepo={currentState}></Project>
        )}
      </div>
    </div>
  );
};

export default Main;
