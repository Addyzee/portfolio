import { useState, useEffect, useContext } from "react";
import UpArrow from "../assets/up-arrow.svg";
import DownArrow from "../assets/down-arrow.svg";
import TickMark from "../assets/tick-mark.svg";
import ReposLookup from "../resources/reposInfoLookup.json";
import { ReposContext } from "../context/reposContext";

interface FilterComponentProps {
  filterItem: string;
  filterChoices: Record<string, string[]>;
  index: number;
  showFilters: boolean[];
  toggleFilters: (num: number) => void;
}

const FilterComponent = ({
  filterItem,
  filterChoices,
  index,
  showFilters,
  toggleFilters,
}: FilterComponentProps) => {
  const reposContext = useContext(ReposContext);

  if (!reposContext) {
    throw new Error(
      "ChildComponent must be used within a ReposContext.Provider"
    );
  }

  const { setContextRepos } = reposContext;

  const updateContextRepo = () => {
    setContextRepos([...new Set(currentRepos)]);
  };

  const filterCategory =
    filterItem.charAt(0).toUpperCase() + filterItem.slice(1);
  const filterChoicesList = Object.keys(filterChoices);
  filterChoicesList.splice(0, 0, "All");

  const filtersLength = filterChoicesList.length;
  const [filterCheck, setFilterCheck] = useState<boolean[]>(
    Array(filtersLength).fill(true)
  );
  const Repos = Object(ReposLookup);
  const [currentRepos, setCurrentRepos] = useState<string[]>(
    (Object.values(Repos[filterItem]).flat() as string[]).sort()
  );
  const checkAll = (index: number) => {
    const allChecked = filterCheck[index];
    setFilterCheck((prev) => prev.map(() => !allChecked));
    if (!allChecked)
      setCurrentRepos(
        (Object.values(Repos[filterItem]).flat() as string[]).sort()
      );
    else setCurrentRepos([]);
    updateContextRepo();
  };

  const toggleCheck = (index: number) => {
    if (filterChoicesList[index] === "All") checkAll(index);
    else {
      const allIndex = filterChoicesList.indexOf("All");

      setFilterCheck((prev) => {
        const newFilterCheck = prev.map((value, i) =>
          i === allIndex && value ? !value : i === index ? !value : value
        );
        newFilterCheck[allIndex] =
          newFilterCheck.filter((value) => !value).length === 1 ? true : false;
        return newFilterCheck;
      });
      const chosenCategory = filterChoicesList[index];
      const affectedRepos = Repos[filterItem][chosenCategory];

      if (filterCheck[index]) {
        const indexToRemove: number[] = [];
        affectedRepos.forEach((value: string) => {
          indexToRemove.push(currentRepos.indexOf(value));
        });
        indexToRemove.sort();
        for (let i = indexToRemove.length - 1; i >= 0; i--) {
          setCurrentRepos((prev) => {
            const updated = [...prev].sort();
            updated.splice(indexToRemove[i], 1);
            return updated;
          });
        }
      } else {
        affectedRepos.forEach((value: string) => {
          setCurrentRepos((prev) => [value, ...prev].sort());
        });
      }
      updateContextRepo();
    }
  };
  useEffect(() => {
    setContextRepos(currentRepos);
  }, [currentRepos, setContextRepos]);

  return (
    <div>
      <button className="mr-2 w-full" onClick={() => toggleFilters(index)}>
        <div className="filter-topic">
          <p className="text-md pr-2">
            {`${filterCategory}`}
            {filterCheck.includes(false) ? `` : `: All`}
          </p>
          <img
            src={showFilters[index] ? DownArrow : UpArrow}
            className="border-0"
            alt=""
          />
        </div>
      </button>

      {showFilters[index] && (
        <div className="filter-categories-container ">
          {filterChoicesList.map((choice, idx) => (
            <div className="">
            <button className="w-full" onClick={() => toggleCheck(idx)}>
              <div className="flex items-center hover:bg-slate-200" key={idx}>
                <div className="filter-tick-mark">
                  {filterCheck[idx] && (
                    <img
                      className="border-0 w-3 h-3"
                      src={TickMark}
                      alt="Checked"
                    />
                  )}
                </div>
                <div>
                  <p>{choice}</p>
                </div>
              </div>
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
