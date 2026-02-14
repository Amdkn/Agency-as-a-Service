import React from 'react';
import Hero from './Hero';
import TrinitySection from './TrinitySection';
import MethodSection from './MethodSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import { PageType } from '../types';

interface HomePageProps {
  onChangePage: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onChangePage }) => {
  return (
    <>
      <Hero onChangePage={onChangePage} />
      <TrinitySection onChangePage={onChangePage} />
      <MethodSection />
      <PricingSection />
      <CTASection />
    </>
  );
};

export default HomePage;