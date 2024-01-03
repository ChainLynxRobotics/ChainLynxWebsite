import Link from "next/link";
import { getConfig, parseMD, parseMDInline } from "../util/configReader";
import Footer from "../components/Footer";


export default function About() {

    // Reads the about.yml file in /config and parses it into a JS object
    const config = getConfig('about.yml');

    return (
        <main className="flex flex-col items-center justify-between p-4 pt-8 sm:p-12 pb-0 sm:pb-0 relative">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 xl:gap-16">
                <div className="lg:mt-10">
                    <h2 className="text-2xl mb-2">Jump To:</h2>
                    <ul className="markdown list-disc ml-4">
                        {(config.sections.map((section: any) => (
                            <li key={section.id}>
                                <Link href={`/about#`+section.id} dangerouslySetInnerHTML={parseMDInline(section.title)}></Link>
                            </li>
                        )))}
                    </ul>
                </div>
                {/* <div className="max-w-5xl mb-8 bg-slate-200 dark:bg-slate-700 p-4 rounded shadow">
                    <h2 className="text-2xl mb-2">Jump To:</h2>
                    <div className="flex flex-col gap-2">
                        {(config.sections.map((section: any) => (
                            <Link href={`/about#`+section.id} dangerouslySetInnerHTML={parseMDInline(section.title)} key={section.id} className="w-full px-3 py-1 rounded text-lg font-semibold hover:bg-slate-300 hover:dark:bg-slate-800 transition-colors shadow"></Link>
                        )))}
                    </div>
                </div> */}
                {/* <div className="flex flex-wrap justify-center mb-12 text-lg markdown">
                    {(config.sections.map((section: any, i: number) => (
                        <span key={section.id}>
                            <Link href={`/about#`+section.id} dangerouslySetInnerHTML={parseMDInline(section.title)}></Link>
                            {(i < config.sections.length - 1) && <span className="text-lg mx-2">|</span>}
                        </span>
                    )))}
                </div> */}
                <div className="flex flex-col items-center gap-12">
                    {(config.sections.map((section: any) => (
                        <div id={section.id} className="max-w-5xl flex flex-col items-center" key={section.id}>
                            <h1 className="text-4xl mb-6 markdown" dangerouslySetInnerHTML={parseMDInline(section.title)}></h1>
                            <div className="markdown" dangerouslySetInnerHTML={parseMD(section.content)}></div>
                        </div>
                    )))}
                </div>
            </div>
            <Footer />
        </main>
    );
}