import axios from 'axios';
import fs from 'fs';
import path, { dirname } from 'path';

const rawBaseURL = `https://raw.githubusercontent.com/Addyzee`;
const branchURL = `refs/heads/master`;
const docsLocation = `PROJECT/DOCS`;
const repos = [
  "campus-network",
  "risk-awareness-streamlit",
  "romanian-travel",
  "ecoverde-scrape",
  "0X",
  "spectf-dt",
  "CogSkills-SelfLearn",
];
const __dirname = import.meta.dirname;


(async () => {
  try {
    const fetchPromises = repos.map(async (repo) => {
      const infoURL = `${rawBaseURL}/${repo}/${branchURL}/${docsLocation}/info.json`;

      const response = await axios.get(infoURL);
      return { ...response.data, repo };
    });

    const results = await Promise.all(fetchPromises);
    const validResults = results.filter((result) => result !== null);



    const outputPath = path.join(__dirname, '../src/resources/reposInfo.json');
    fs.writeFileSync(outputPath, JSON.stringify(validResults, null, 2));
    console.log(`Repo info ${outputPath}`);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
})();
