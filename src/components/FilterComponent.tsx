import { useState, useRef, useEffect, useContext } from "react";
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
  const filterChoicesList = Object.keys(filterChoices).sort();

  const filtersLength = filterChoicesList.length;
  const [filterCheck, setFilterCheck] = useState<boolean[]>(
    Array(filtersLength).fill(true)
  );
  const Repos = Object(ReposLookup);
  const [currentRepos, setCurrentRepos] = useState<string[]>(
    (Object.values(Repos[filterItem]).flat() as string[]).sort()
  );

  const toggleCheck = (index: number) => {
    setFilterCheck((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
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
  };
  useEffect(() => {
    setContextRepos(currentRepos);
  }, [currentRepos, setContextRepos]);

  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFilters[index] && dropdownRef.current) {
      const maxWidth = Math.max(
        ...Array.from(dropdownRef.current.children).map(
          (child: Element) => (child as HTMLElement).offsetWidth
        )
      );
      setDropdownWidth(maxWidth + 10);
    }
  }, [filterChoicesList, showFilters, index]);

  return (
    <div>
      <div
        className="filter-topic"
        style={{ width: `${dropdownWidth || "auto"}px` }}
      >
        <p className="text-sm pr-2">{`${filterCategory}: All`}</p>
        <button onClick={() => toggleFilters(index)}>
          <img
            src={showFilters[index] ? DownArrow : UpArrow}
            className="border-0"
            alt=""
          />
        </button>
      </div>
      {showFilters[index] && (
        <div  ref={dropdownRef} className="filter-categories-container">
          {filterChoicesList.map((choice, idx) => (
            <div className="flex items-center" key={idx}>
              <button onClick={() => toggleCheck(idx)}>
                <div className="filter-tick-mark">
                  {filterCheck[idx] && (
                    <img
                      className="border-0 w-3 h-3"
                      src={TickMark}
                      alt="Checked"
                    />
                  )}
                </div>
              </button>
              <div>
                <p>{choice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default FilterComponent;
