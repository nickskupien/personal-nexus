import React from 'react';
import styled, { keyframes } from 'styled-components';

import HeroLayoutUI, {
  CenterArea as UnstyledCenterAreaUI,
} from '../../ui/layout/hero';
import UnstyledSceneUI from '../../controllers/Scene';
import HomeLayoutUI, { Parts as HomeLayoutPartsUI } from '../../ui/layout/home';
import GlowTextUI from '../../ui/text/glow';
import Viewport from '../../ui/layout/viewport';

const expandAnimation = keyframes`
  0% {
    top: 50%;
    left: 50%;
  }
  100% {
    top: 40px;
    left: 40px;;
    transform: translate(0,0);
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CenterAreaUI = styled(UnstyledCenterAreaUI)`
  transform: translate(-50%, -50%);
  animation: ${fadeInAnimation} 2s ease-in-out forwards;
  animation-delay: 2s; // Waits 1 second before starting animation
  top: 50%;
  left: 50%;
  width: fit-content;
`;

const SceneUI = styled(UnstyledSceneUI)`
  animation: ${fadeOutAnimation} 2s ease-in-out forwards;
  animation-delay: 2s; // Waits 1 second before starting animation
  opacity: 0;
`;

const HeroAreaUI = styled(HomeLayoutPartsUI.HeroArea)`
  background: black;
`;

function Home(props) {
  const centerArea = (
    <GlowTextUI type="h3" block color="WHITETRANSPARENT800">
      Welcome to the Darkroom
    </GlowTextUI>
  );

  return (
    <HomeLayoutUI>
      <HeroAreaUI>
        <HeroLayoutUI>
          <CenterAreaUI>{centerArea}</CenterAreaUI>
          {/* <SceneUI></SceneUI>   */}
        </HeroLayoutUI>
      </HeroAreaUI>
      <HomeLayoutPartsUI.Content>
        <Viewport></Viewport>
      </HomeLayoutPartsUI.Content>
    </HomeLayoutUI>
  );
}

Home.propTypes = {};

export default Home;
