import Main from "./components/Main";
import "./App.css";
import { useState } from "react";
import { ReposContext } from "./context/reposContext";
import SideNav from "./components/SideNav";

function App() {
  const [currentState, setCurrentState] = useState<string>("About");
  const [contextRepos, setContextRepos] = useState<string | string[]>("all");
  const changeState = (name: string) => {
    setCurrentState(name);
  };

  return (
    <div className="flex app h-screen w-screen overflow-x-hidden">
      <ReposContext.Provider value={{ contextRepos, setContextRepos }}>
        <div className="hidden md:block md:h-[90%] md:border-r md:w-[18%]">
          <SideNav changeNav={changeState}></SideNav>
        </div>
        <div className="h-[100%] md:w-[80%] md:max-w-[80%]">
          <Main changeState={changeState} currentState={currentState}></Main>
        </div>
      </ReposContext.Provider>
    </div>
  );
}

export default App;
