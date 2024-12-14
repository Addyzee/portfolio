import axios from "axios";
import GitHubRepo from "./Interfaces";

const rawBaseURL = `https://raw.githubusercontent.com/Addyzee`;
const apiURL = `https://api.github.com/users/addyzee/repos`;
const branchURL = `refs/heads/master`;

export const getRepos = async (): Promise<GitHubRepo[]> => {
  const reposToInclude = ["spectf-dt", "romanian-travel", "0X"];

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
  const url = `${rawBaseURL}/${repo}/${branchURL}/README.md`;
  try {
    const response = await axios.get<string>(url);
    const markdown = handleLinks(response.data, repo);
    return markdown;
  } catch (error) {
    console.error("Error fetching info", error);
    throw new Error("Failed to fetch the repository data");
  }
};

const handleLinks = (markdown: string, repo: string) => {
  const newMarkdown = markdown
    .replace(/\]\(/g, `](${rawBaseURL}/${repo}/${branchURL}/`)
    .replace(/<br>/g, "");
  return newMarkdown;
};
