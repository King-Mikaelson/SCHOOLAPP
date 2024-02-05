interface IProps {
  cols: number
}

export default function TableLoader({ cols }:IProps) {
  return (
    Array.from({ length: 21 }).map((_, index: number) => (
      <tr key={index} style={{ animationDelay: `${(index / 8)}s`}} className={`odd:bg-neutral-200 h-4 w-full  rounded-xl animate-pulse`}>
        { Array.from({ length: cols }).map((_, innerIndex: number) => (
          <td key={innerIndex} className=""><span className="invisible">f</span></td>
        ))}
      </tr>
    ))
  )
}