import Hero from "./_components/Hero"
import AboutUs from "./_components/AboutUs"
import ProofSection from "./_components/Proof"
import HowWeWork from "./_components/HowWeWork"
import Testimonials from "./_components/Testimonials"
import Advert from "./_components/Advert"
import FAQ from "./_components/Faq"
import Services from "./_components/Services"

interface IProps {
  params: {
    lang: string
  }
}

export default function Page({ params }: IProps) {
  return (
    <main className="  duration-700 [&_*]:scroll-smooth animate-fade-in">
      <Hero params={params}/>
      <AboutUs params={params} />
      <ProofSection params={params} />
      <HowWeWork params={params} />
      <Services params={params} />
      <Testimonials params={params} />
      <Advert params={params} />
      <FAQ params={params} />
    </main>
  )
}