import HeaderNav from "./HeaderNav";
import Project from "./Project";
import About from "./About";
import Home from "./Home";

interface MainProps {
  changeState:  (name : string) => void
  currentState: null | string;
}

const Main = ({ changeState, currentState }: MainProps) => {
  return (
    <div className="main-section">
      <div className="header-nav-container">
        <HeaderNav changeNav={changeState}></HeaderNav>
      </div>
      <div className="main-content">
        {currentState === "About" ? (
          <About></About>
        ) : currentState === "Home" ? (
          <Home></Home>
        ) : (
          <Project currentRepo={currentState}></Project>
        )}
      </div>
    </div>
  );
};

export default Main;
