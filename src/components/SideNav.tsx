import { useEffect, useState } from "react";
import GitHubRepo from "../resources/Interfaces";
import getRepos from "../resources/GitHubInfo";

const SideNav = () => {
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

  return (
    <div className="side-nav">
      <div className="side-nav-content">
        <h2>Projects</h2>
        {repos.length != 0 ? (
          repos.map((repo, index) => (
            <li key={index}>
              <button>{repo.name}</button>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SideNav;
