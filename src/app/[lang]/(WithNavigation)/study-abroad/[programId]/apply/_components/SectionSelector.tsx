
import { memo } from "react";

interface IProps {
  filters: Array<string>
  formSection: number
  setFormSection: React.Dispatch<React.SetStateAction<number>>
  className?: string
  reverse?: boolean
}

const SectionSelector: React.FC<IProps> = memo(({ filters, className, reverse, setFormSection, formSection }) => {

  return (
    <ul className={`grid grid-flow-row gap-1 flex-col ${className}`}>
      {
        filters.map((filter: string, index: number) => (
          <li key={index} className={`border-l-4 py-3 pl-[7%]  pr-[5%]  ${index <= formSection ? "border-l-blue-400" : "border-l-white"}`}>
            <button onClick={() => setFormSection(index)} className={`text-slate-500 min-w-max w-full hover:cursor-pointer flex font-light ${reverse ? "flex-row-reverse justify-between" : "flex-row"} items-center gap-x-2`}>
              <input id={filter} checked={index <= formSection ? true : false}  type="checkbox" className="accent-primary h-[20px] w-[20px]" />
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