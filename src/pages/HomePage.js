import React from 'react';
import { css } from '@emotion/react';

import AppLayout from '../layouts/AppLayout';
import ThemeProvider from '../contexts/ThemeContext';
import Hero from '../components/hero';
import Investors from '../components/investors';
import StyledSection from '../components/styled-section';
import CompanyOverview from '../components/company-overview';
import OnboardingProcess from '../components/onboarding-process';
import ServicesList from '../components/services-list';
import ProtocolsSupported from '../components/protocols-supported';
import OurTeam from '../components/our-team'
import News from '../components/news'

const HomePage = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <>
          <Hero />

          <StyledSection classNames="nopadding-bot-mobile" color={"gray"} >
            <CompanyOverview />
            <OnboardingProcess />
          </StyledSection>

          <StyledSection classNames="hidden-mobile" color={"white"} >
          </StyledSection>

          <StyledSection color={"black"} >
            <ServicesList />
          </StyledSection>
          <StyledSection classNames="nopadding-bot-top-mobile"  color={"white"} >
            <ProtocolsSupported />
          </StyledSection>

          <StyledSection color={"gray"} >
            <Investors />
          </StyledSection>

          <StyledSection color={"white"} >
            <OurTeam />
          </StyledSection>

          <StyledSection styles={{"z-index": 3}} color={"green"} >
            <News />
          </StyledSection>
        </>
      </AppLayout>
    </ThemeProvider>
  );
};

export default HomePage;
