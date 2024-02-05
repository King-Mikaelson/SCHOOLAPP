import Image from "next/image"
import { navRoutes } from "./data"
import { NavList } from "./_components/NavList";
import Link from "next/link";
import DashboardNav from "./_components/DashboardNav";

interface IProps {
  children: React.ReactNode|any
  params: any
}

export default function DashboardLayout({ children }: IProps) {
  return (
    <div className="grid fixed w-full grid-cols-1 lg:grid-cols-[max-content_1fr]">
      <aside className="hidden lg:block max-w-[270px] w-[20vw] min-w-[250px] h-screen border border-r-zinc-100">
        <Link href="/" className="px-4 py-3 flex flex-row items-center gap-x-2">
          <Image width={190} height={70} alt="Logo" src="/images/logo-and-text.svg" />
        </Link>

        <NavList route={navRoutes} />
      </aside>

      <main className="w-full relative overflow-scroll h-screen max-h-[100vh] min-h-max grid grid-rows-[max-content_1fr]">
        <DashboardNav />
        {children}
      </main>
    </div>
  ) 
}