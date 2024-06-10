import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import { getConfig, parseMDInline } from "./util/configReader"

export default function Home() {

  const config = getConfig('index.yml');
  const globalConfig = getConfig('global.yml');

  return (
    <main className="flex flex-col items-center justify-between p-4 pt-8 sm:p-12 pb-0 sm:pb-0 relative">
      <img className="absolute top-0 left-0 -z-10 -rotate-45 translate-x-[-30%] max-w-full opacity-50 dark:opacity-100" alt="Chain side graphic" src="/imgs/chain.png"></img>
      <div className="w-screen h-screen absolute bottom-0 right-0 -z-10 overflow-hidden   hidden sm:block">
        <img className="absolute bottom-0 right-0 max-w-full translate-x-1/4 translate-y-full -rotate-45 opacity-50 dark:opacity-100" alt="Chain side graphic" src="/imgs/chain.png"></img>
      </div>

      <div className="mb-8">
        <img className="w-32 sm:w-64" alt="ChainLynx Logo" src="/imgs/chainlynx_logo_small.png"></img>
      </div>
      <h1 className="text-2xl sm:text-5xl font-bold text-center mb-4 sm:mb-6" dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
      <p className="max-w-3xl lg:max-w-4xl text-center sm:text-lg mb-10" dangerouslySetInnerHTML={parseMDInline(config.about)}></p>
      
      <ImageCarousel pictures={config.pictures} autoScroll></ImageCarousel>

      <div className="flex flex-col items-center mt-14 mb-8 px-4 py-8 gap-4 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="markdown max-w-3xl text-center sm:text-lg" dangerouslySetInnerHTML={parseMDInline(config.plz_donate)}></p>
        <a href={globalConfig.donation_link} className="bg-gradient-to-t from-yellow-500 to-yellow-300 text-black font-bold py-2 px-4 rounded hover:scale-105 transition">Donate</a>
      </div>

      <Footer />
    </main>
  )
}
