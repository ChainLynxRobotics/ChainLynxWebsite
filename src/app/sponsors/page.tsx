import Footer from "../components/Footer";
import { getConfig, parseMD, parseMDInline } from "../util/configReader";


export default function Sponsors() {

  const config = getConfig('sponsors.yml');

  return (
    <main className="flex flex-col items-center justify-between p-4 pt-8 sm:p-12 pb-0 sm:pb-0 relative">
      <div className="max-w-4xl flex flex-col items-center markdown">
          <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
          <div className="text-center" dangerouslySetInnerHTML={parseMD(config.subtitle)}></div>
      </div>
      <div className="max-w-4xl flex flex-wrap justify-center my-8">
        {config.sponsors.map((sponsor: any, i: number)=>
          <a href={sponsor.url} target="_blank" key={i} className="m-4">
            <img className="w-32 sm:w-64 mb-4" alt={sponsor.name} src={sponsor.logo}></img>
          </a>
        )}
      </div>
      <Footer />
    </main>
  )
}
