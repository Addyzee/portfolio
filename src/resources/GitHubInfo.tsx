import axios from "axios";
import { GitHubRepo } from "./Interfaces";
import reposInfo from "./reposInfo.json";

const rawBaseURL = `https://raw.githubusercontent.com/Addyzee`;
const apiURL = `https://api.github.com/users/addyzee/repos`;
const branchURL = `refs/heads/master`;
const docsLocation = `PROJECT/DOCS`;
const reposToInclude = [
""
];

export const getRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await axios.get<GitHubRepo[]>(`${apiURL}`);
    let repos = response.data;
    repos = repos.filter((item) => reposToInclude.includes(item.name));

    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw new Error("Failed to fetch the repository data");
  }
};

export const getREADME = async (repo: string): Promise<string> => {
  const docsURL = `${rawBaseURL}/${repo}/${branchURL}/${docsLocation}`;
  const READMEURL = `${docsURL}/README.md`;
  try {
    const response = await axios.get<string>(READMEURL);
    const markdown = handleLinks(response.data, repo);
    return markdown;
  } catch (error) {
    console.error("Error fetching info", error);
    throw new Error("Failed to fetch the repository data");
  }
};

export const getInfoJSON = async() => {
  console.log(reposInfo);
};

const handleLinks = (markdown: string, repo: string) => {
  const docsURL = `${rawBaseURL}/${repo}/${branchURL}`;
  let newMarkdown = markdown;
  // Modify local links to point to the repository
  newMarkdown = newMarkdown
    .replace(
      /\]\((?!http)([^)]+)\)/g, // Matches links that don't start with 'http'
      `](${docsURL}/$1)`
    )
    // Modify YouTube links to embed the video
    .replace(
      /\[([^[]+)\]\(https:\/\/youtu.be\/([^)]+)\)/g,
      `<div className="w-full pt-1">
        <h2>$1</h2>
        <div className="border h-[150%]">
          <iframe width="560" height="500"
            src="https://www.youtube.com/embed/$2"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className="w-full">
          </iframe>
        </div>
      </div>`
    )
    // Further formatting
    .replace("---", "<br>");
  return newMarkdown;
};
