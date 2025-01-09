import { useContext, useEffect, useState } from "react";
import { GitHubRepo } from "../resources/Interfaces";
import { getRepos } from "../resources/GitHubInfo";
import { ReposContext } from "../context/reposContext";
import FilterSection from "./FilterSection";

interface NavProps {
  changeNav: (name: string) => void;
}

const SideNav = ({ changeNav }: NavProps) => {
  const reposContext = useContext(ReposContext);

  if (!reposContext) {
    throw new Error(
      "ChildComponent must be used within a ReposContext.Provider"
    );
  }

  const { contextRepos } = reposContext;
  const [currentRepo, setCurrentRepo] = useState<string>("");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  if (!reposContext) {
    throw new Error(
      "ChildComponent must be used within a ReposContext.Provider"
    );
  }

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repoList: GitHubRepo[] = await getRepos();
        setRepos(
          contextRepos === "all"
            ? repoList
            : repoList.filter((repo) => contextRepos.includes(repo.name))
        );
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      }
    };
    fetchRepos();
  }, [contextRepos]);

  const onClickRepo =
    (name: string): (() => void) =>
    () => {
      setCurrentRepo(name);
      return changeNav(name);
    };

  return (
    <div className="side-nav">
      <div className="side-nav-content">
        <h2>Projects</h2>
        {repos.length != 0 ? (
          <ul>
            {repos.map((repo, index) => (
              <li key={index}>
                <button
                  className={`${
                    currentRepo === repo.name ? "current-repo" : "repo"
                  }`}
                  onClick={onClickRepo(repo.name)}
                >
                  {repo.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>Filters</h2>
        <FilterSection></FilterSection>
      </div>
    </div>
  );
};

export default SideNav;
