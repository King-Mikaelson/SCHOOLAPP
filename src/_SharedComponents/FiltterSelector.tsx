import { memo } from "react";

interface IProps {
  filters: Array<string>
  selected?: string
  setSelected?: React.Dispatch<React.SetStateAction<string>>
  selectionGroup?: Array<string>
  setSelectionGroup?: React.Dispatch<React.SetStateAction<Array<string>>>
  className?: string
  reverse?: boolean
  params: {
    lang: string;
  };
}

const FilterSelector: React.FC<IProps> = memo(({ filters, selected, setSelected, selectionGroup, setSelectionGroup, className, reverse, params }) => {
  const handleSelectClick = (arg: string): void => {
    if (selectionGroup && setSelectionGroup) {
      if (selectionGroup.includes(arg)) {
        const temp = selectionGroup.filter((intArg: string) => intArg !== arg);
        setSelectionGroup(temp);
      } else {
        setSelectionGroup([ ...selectionGroup, arg ]);
      }
    }

    // if (selected && setSelected) {
    //   if (arg === selected) {

    //   }
    // }
  }

  return (
    <ul className={`flex flex-col items- gap-y-2 ${className}`}>
      {
        filters.map((filter: string, index: number) => (
          <li key={index} className="">
            <button onClick={() => handleSelectClick(filter)} className={`text-slate-500 w-full hover:cursor-pointer flex font-light ${reverse ? "flex-row-reverse justify-between" : "flex-row"} items-center text-left justify-start gap-x-2`}>
              <input id={filter} checked={(selected || selectionGroup?.includes(filter)) ? true : false}  type="checkbox" className="accent-primary h-[20px] w-[20px]" />
              {filter}
            </button>
          </li>
        ))
      }
    </ul>
  )
})

FilterSelector.displayName = "FilterSelector";
export default FilterSelector;

// export const degreeFilter = [
//   "Bachelor's Degree", "Master's Degree", "Associate's Degree", "Ph.D"
// ]

export const degreeFilter = [
  "High school", "Undergraduate Diploma", "U.G Advanced Diploma", "Associate Degree",
  "Bachelor’s Degree", "PostGraduate Certificate", "Master’s Degree", "Doctoral Degree (Ph.D)"
]