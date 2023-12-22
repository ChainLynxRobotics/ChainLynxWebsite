import Link from "next/link";
import { getConfig, parseMD, parseMDInline } from "../util/configReader";
import Footer from "../components/Footer";


export default function About() {

    // Reads the about.yml file in /config and parses it into a JS object
    const config = getConfig('about.yml');

    return (
        <main className="flex flex-col items-center justify-between p-4 pt-8 sm:p-12 pb-0 sm:pb-0 gap-12 relative">
            <div id="about" className="max-w-4xl flex flex-col items-center markdown">
                <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
                <div className="" dangerouslySetInnerHTML={parseMD(config.content)}></div>
            </div>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl mb-2">Jump To:</h2>
                <ul className="markdown list-disc ml-4">
                    {(config.sections.map((section: any) => (
                        <li key={section.id}>
                            <Link href={`/about#`+section.id} dangerouslySetInnerHTML={parseMDInline(section.title)}></Link>
                        </li>
                    )))}
                </ul>
            </div>
            {(config.sections.map((section: any) => (
                <div id={section.id} className="max-w-4xl flex flex-col items-center markdown" key={section.id}>
                    <h1 dangerouslySetInnerHTML={parseMDInline(section.title)}></h1>
                    <div className="" dangerouslySetInnerHTML={parseMD(section.content)}></div>
                </div>
            )))}
            <Footer />
        </main>
    );
}