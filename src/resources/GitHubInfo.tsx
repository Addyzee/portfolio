import axios from 'axios';
import  GitHubRepo  from './Interfaces';

const getRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await axios.get<GitHubRepo[]>("https://api.github.com/users/addyzee/repos");
    return response.data
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw new Error("Failed to fetch the repository data");
  }
};

export default getRepos;
