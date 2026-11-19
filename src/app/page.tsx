
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/home/Hero/Hero';
import { InferenceStudio } from '@/components/scanner/InferenceStudio/InferenceStudio';
import { BusinessModel } from '@/components/home/BusinessModel/BusinessModel';
import { AboutUs } from '@/components/home/AboutUs/AboutUs';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <InferenceStudio />
        <BusinessModel />
        <AboutUs />
      </main>

      <Footer githubRepoUrl="https://github.com/IO420/freshvision" />
    </>
  );
}
