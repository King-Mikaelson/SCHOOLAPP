import { Gluten } from 'next/font/google'
import { universityImages } from '../data'
import Image from 'next/image'
import { getDictionary } from '../../dictionaries'


interface IProps {
  params: {
    lang: string
  }
}

const gluten = Gluten({ subsets: ['latin'], })

export default async function ProofSection({ params }: IProps) {
  const dict = await getDictionary(params.lang)

  return (
    <section className="my-[clamp(2rem,10vmin,8rem)] px-3 md:px-4 lg:px-5">
      <div className="container mx-auto shadow-xl duration-500 hover:shadow-2xl max-w-screen-lg p-4 rounded-md lg:rounded-xl">
        <h3 className={`${gluten.className} font-semi-bold text-center`}>
          {dict.proofSection.title}
        </h3>
        <ul className="flex flex-row gap-4 md:gap-5 mt-7 lg:gap-5 flex-wrap justify-center">
          {universityImages.map((uni: typeof universityImages[0], index: number) => (
            <li key={index} className="flex items-center">
              <Image alt={String(index)} src={uni} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}