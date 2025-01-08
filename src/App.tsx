import Main from "./components/Main";
import SideNav from "./components/SideNav";
import "./App.css";
import { useState } from "react";
import { ReposContext } from "./context/reposContext";

function App() {
  const [currentState, setCurrentState] = useState<string>("Home");
  const [currentRepos ] = useState<string | string[]>("all")
  const changeState = (name: string) => {
    setCurrentState(name);
  };

  return (
    <div className="flex app">
      <ReposContext.Provider value={currentRepos}>
        <SideNav changeNav={changeState}></SideNav>
        <Main changeState={changeState} currentState={currentState}></Main>
      </ReposContext.Provider>
    </div>
  );
}

export default App;
