import { useState } from "react";
import FilterComponent from "./FilterComponent";
import reposLookup from "../resources/reposInfoLookup.json";

const FilterSection = () => {
  const filtersToInclude = ["year", "languages/tools", "category", "keywords"];
  const filtersNumber = Object.keys(reposLookup).length;
  const [showFilters, setShowFilters] = useState<boolean[]>(
    Array(filtersNumber).fill(false)
  );
  const toggleFilters = (index: number) => {
    setShowFilters((prev: boolean[]) =>
      prev.map((value, i) => (i === index ? !value : false))
    );
  };

  return (
    <div className="flex-col gap-10 justify-center pt-2">
      {Object.entries(reposLookup).map(
        ([filter, filterChoices], index) =>
          filtersToInclude.includes(filter) && (
            <FilterComponent
              key={index}
              filterItem={filter}
              filterChoices={filterChoices}
              index={index}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
            ></FilterComponent>
          )
      )}
    </div>
  );
};

export default FilterSection;
