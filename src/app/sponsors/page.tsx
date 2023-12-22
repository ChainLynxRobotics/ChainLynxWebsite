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
      <div className="max-w-7xl flex flex-wrap justify-center items-center my-8 gap-12">
        {config.sponsors.map((sponsor: any, i: number)=>
          <a href={sponsor.url} target="_blank" title={sponsor.name} key={i} className="m-4">
            <img className="w-64 sm:w-80 mb-4 dark:hidden" alt={sponsor.name} src={sponsor.logo}></img>
            <img className="w-64 sm:w-80 mb-4 hidden dark:block" alt={sponsor.name} src={sponsor.logo_dark}></img>
          </a>
        )}
      </div>
      <Footer />
    </main>
  )
}
