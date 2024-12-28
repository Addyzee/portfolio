import Markdown from "markdown-to-jsx";
import { getREADME } from "../resources/GitHubInfo";
import { useEffect, useState } from "react";

interface ProjectProps{
    currentRepo : string | null
}

const Project = ({currentRepo} : ProjectProps) => {
  const [markdown, setMarkDown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchREADME = async () => {
      if (currentRepo) {
        try {
          const data = await getREADME(currentRepo);
          setMarkDown(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };
    fetchREADME();
  }, [currentRepo]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : markdown ? (
        <Markdown>{markdown}</Markdown>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Project;
