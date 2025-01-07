import axios from 'axios';
import fs from 'fs';
import path from 'path';

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
    let [lookup, lookupOutputPath] = reformatReposInfo(validResults);
    fs.writeFileSync(lookupOutputPath, JSON.stringify(lookup, null, 2));
  } catch (err) {
    console.error("Error fetching data:", err);
  }
})();

const reformatReposInfo = (repos) => {
  const formatted = {
    year: {},
    status: {},
    keywords: {},
    "languages/tools": {},
    contributors: {},
  };

  repos.forEach((repo) => {
    const { project_name, year, status, keywords, "languages/tools": tools, contributors } = repo;

    // Helper function to add to the object
    const addToCategory = (category, key, project) => {
      if (!formatted[category][key]) {
        formatted[category][key] = [];
      }
      formatted[category][key].push(project);
    };


    // Add to year
    addToCategory("year", year, project_name);

    // Add to status
    addToCategory("status", status, project_name);

    // Add to keywords
    keywords.forEach((keyword) => addToCategory("keywords", keyword, project_name));

    // Add to languages/tools
    const toolsArray = Array.isArray(tools) ? tools : [tools];
    toolsArray.forEach((tool) => addToCategory("languages/tools", tool, project_name));

    // Add to contributors
    const contributorsArray = Array.isArray(contributors) ? contributors : [contributors];
    contributorsArray.forEach((contributor) =>
      addToCategory("contributors", contributor, project_name)
    );
  });
  const outputPath = path.join(__dirname, "../src/resources/reposInfoLookup.json");


  return [formatted, outputPath];
};


