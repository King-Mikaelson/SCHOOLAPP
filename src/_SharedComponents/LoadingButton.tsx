// import LinearProgress from '@mui/material/LinearProgress';
// import s from "./LoadingButton.module.scss";

type TProps = {
  children: any,
  loading: boolean,
  sucess?: boolean,
  successText?: string
  type?: ("submit" | "button"),
  className?: string,
  onClick?: () => void,
  style?: any
}

export default function LoadingButton({children, loading, successText, sucess, type, className, onClick, style}: TProps) {
  return (
    <button 
      type={type}
      style={style}
      onClick={onClick}
      className={`flex align-center h-max max-h-m relative justify-center btn ${className} ${sucess && "!bg-green-500"}`}
    >
        <div className={`${!loading && "!hidden"} absolute left-[50%] translate-x-[-20px] h-[18px] w-[40px] top-0 bottom-0 my-auto`}>
          <div className={`animate-oscillate h-full w-[20px] !bg-white absolute translate-y-[-50%]`} />
        </div>
        <span className={`${loading && "invisible"}`}>{(sucess && successText) ? successText : children}</span>
    </button>
  )
}