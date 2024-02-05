import Footer from "@SharedComponents/Footer"
import NavBar from "@SharedComponents/Navbar"

interface IProps {
  children: React.ReactNode
    params: {
    lang: string
  }
}

export default function Page({ children, params }: IProps) {
  return (
    <main className="">
      <NavBar params={params} />
      <>{children}</>
      <Footer params={params} />
    </ main>
  )
}