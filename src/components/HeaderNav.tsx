import { useState } from "react";
import BurgerMenu from "../assets/burger-menu.svg";
import ProfileIcon from "../assets/profile.svg";

interface NavProps {
  changeNav: (name: string) => void;
  currentState: string;
}

const HeaderNav = ({ changeNav, currentState }: NavProps) => {
  const [currentPage, setCurrentPage] = useState("About");

  const handleNavChange = (name: string) => {
    setCurrentPage(name);
    changeNav(name);
  };

  const isAboutPage = currentPage === "About";
  const inProjects = currentState != "About" && currentState != "Projects";

  return (
    <div className="w-full md:w-[80%] flex border-b justify-end gap-5">
      {/* About/projects page while in About/All projects page */}
      <button
        onClick={() => handleNavChange(isAboutPage ? "Projects" : "About")}
      >
        <img
          src={isAboutPage ? BurgerMenu : ProfileIcon}
          className="border-0 md:hidden"
          width="50px"
          height="50px"
          alt={isAboutPage ? "Open Projects Menu" : "Go to About Page"}
        />
      </button>

      {/* All projects page when in a single project page */}
      {inProjects && (
        <button onClick={() => handleNavChange("Projects")}>
          <img
            src={BurgerMenu}
            className="border-0 md:hidden"
            width="50px"
            height="50px"
            alt={isAboutPage ? "Open Projects Menu" : "Go to About Page"}
          />
        </button>
      )}
      {/* About Button on desktop screens */}
      {inProjects && (
        <button onClick={() => handleNavChange("About")}>
          <img
            src={ProfileIcon}
            className="border-0 hidden md:block"
            width="50px"
            height="50px"
            alt={isAboutPage ? "Open Projects Menu" : "Go to About Page"}
          />
        </button>
      )}
    </div>
  );
};

export default HeaderNav;
