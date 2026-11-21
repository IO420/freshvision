
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/home/Hero/Hero';
import { InferenceStudio } from '@/components/scanner/InferenceStudio/InferenceStudio';
import { BusinessModel } from '@/components/home/BusinessModel/BusinessModel';
import { AboutUs } from '@/components/home/AboutUs/AboutUs';
import MisionVision from '@/components/home/MisionVision';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <InferenceStudio />
        <BusinessModel />
        <MisionVision />
        <AboutUs />
      </main>

      <Footer githubRepoUrl="https://github.com/IO420/freshvision" />
      <Footer githubRepoUrl="https://github.com/IO420/fruit-quality" />
    </>
  );
}
