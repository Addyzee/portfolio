import { useEffect, useState } from "react";
import { GitHubRepo } from "../resources/Interfaces";
import { getRepos } from "../resources/GitHubInfo";

interface NavProps {
  changeNav: (name: string) => void;
}

const SideNav = ({ changeNav }: NavProps) => {
  const [currentRepo, setCurrentRepo] = useState<string>("");

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repoList: GitHubRepo[] = await getRepos();
        setRepos(repoList);
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      }
    };
    fetchRepos();
  }, []);

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
    </div>
  );
};

export default SideNav;
