import Footer from './components/Footer';
import ImageCarousel from './components/ImageCarousel';
import { getConfig, parseMDInline } from './util/configReader';

export default function Home() {
  const config = getConfig('index.yml');
  const globalConfig = getConfig('global.yml');

  return (
    <main className="relative flex flex-col items-center justify-between p-4 pt-8 pb-0 sm:p-12 sm:pb-0">
      <img
        className="absolute top-0 left-0 -z-10 max-w-full translate-x-[-30%] -rotate-45 opacity-50 dark:opacity-100"
        alt="Chain side graphic"
        src="/imgs/chain.png"
      ></img>
      <div className="absolute right-0 bottom-0 -z-10 hidden h-screen w-screen overflow-hidden sm:block">
        <img
          className="absolute right-0 bottom-0 max-w-full translate-x-1/4 translate-y-full -rotate-45 opacity-50 dark:opacity-100"
          alt="Chain side graphic"
          src="/imgs/chain.png"
        ></img>
      </div>

      <div className="mb-8">
        <img
          className="w-32 sm:w-64"
          alt="ChainLynx Logo"
          src="/imgs/chainlynx_logo_small.png"
        ></img>
      </div>
      <h1
        className="mb-4 text-center text-2xl font-bold sm:mb-6 sm:text-5xl"
        dangerouslySetInnerHTML={parseMDInline(config.title)}
      ></h1>
      <p
        className="mb-10 max-w-3xl text-center sm:text-lg lg:max-w-4xl"
        dangerouslySetInnerHTML={parseMDInline(config.about)}
      ></p>

      <ImageCarousel pictures={config.pictures} autoScroll></ImageCarousel>

      <div className="mt-14 mb-8 flex flex-col items-center gap-4 rounded-lg border-gray-200 bg-white px-4 py-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <p
          className="markdown max-w-3xl text-center sm:text-lg"
          dangerouslySetInnerHTML={parseMDInline(config.plz_donate)}
        ></p>
        <a
          href={globalConfig.donation_link}
          className="rounded bg-gradient-to-t from-yellow-500 to-yellow-300 px-4 py-2 font-bold text-black transition hover:scale-105"
        >
          Donate
        </a>
      </div>

      <Footer />
    </main>
  );
}
