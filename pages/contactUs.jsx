import Head from "next/head";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function contact() {
  return (
    <>
      <Head>
        <title>Contact VeloRa Technologies | Free Consultation</title>
        <meta
          name="description"
          content="Contact VeloRa Technologies for Web Development, AI Automation, SEO, Branding and Digital Marketing."
        />
      </Head>

      <Navbar />

      <main className="pt-24">
        <Contact />
      </main>

      <Footer />
    </>
  );
}