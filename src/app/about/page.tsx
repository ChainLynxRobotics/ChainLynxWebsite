import Link from "next/link";
import { getConfig, parseMD, parseMDInline } from "../util/configReader";
import Footer from "../components/Footer";


export default function About() {

    // Reads the about.yml file in /config and parses it into a JS object
    const config = getConfig('about.yml');

    return (
        <main className="flex flex-col items-center justify-between p-4 pt-8 sm:p-12 pb-0 sm:pb-0 gap-12 relative">
            {(config.sections.map((section: any) => (
                <div id={section.id} className="max-w-5xl flex flex-col items-center" key={section.id}>
                    <h1 className="text-4xl mb-6 markdown" dangerouslySetInnerHTML={parseMDInline(section.title)}></h1>
                    <div className="markdown" dangerouslySetInnerHTML={parseMD(section.content)}></div>
                </div>
            )))}
            <Footer />
        </main>
    );
}