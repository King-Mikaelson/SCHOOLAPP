
import { memo } from "react";

interface IProps {
  filters: Array<string>
  selected?: string
  setSelected?: React.Dispatch<React.SetStateAction<string>>
  selectionGroup?: Array<string>
  setSelectionGroup?: React.Dispatch<React.SetStateAction<Array<string>>>
  className?: string
  reverse?: boolean
  
}

const SectionSelector: React.FC<IProps> = memo(({ filters, selected, setSelected, selectionGroup, setSelectionGroup, className, reverse }) => {
  const handleSelectClick = (arg: string): void => {
    console.log(arg);
    if (selectionGroup && setSelectionGroup) {
      if (selectionGroup.includes(arg)) {
        const temp = selectionGroup.filter((intArg: string) => intArg !== arg);
        setSelectionGroup(temp);
      } else {
        setSelectionGroup([ ...selectionGroup, arg ]);
      }
    }
  }

  return (
    <ul className={`grid grid-flow-row gap-1 flex-col ${className}`}>
      {
        filters.map((filter: string, index: number) => (
          <li key={index} className={`border-l-4 py-3 pl-[7%]  pr-[5%]  ${selected || selectionGroup?.includes(filter) ? "border-l-blue-400" : "border-l-white"}`}>
            <button onClick={() => handleSelectClick(filter)} className={`text-slate-500 min-w-max w-full hover:cursor-pointer flex font-light ${reverse ? "flex-row-reverse justify-between" : "flex-row"} items-center gap-x-2`}>
              <input id={filter} checked={(selected || selectionGroup?.includes(filter)) ? true : false}  type="checkbox" className="accent-primary h-[20px] w-[20px]" />
              {filter}
            </button>
          </li>
        ))
      }
    </ul>
  )
})

SectionSelector.displayName = "SectionSelector";
export default SectionSelector;

export const degreeFilter = [
  "Bachelor's Degree", "Master's Degree", "Associate's Degree", "Ph.D"
]