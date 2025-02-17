import React from 'react';
import PropTypes from 'prop-types';

import HomeLayoutUI from '../../ui/layout/home';
import ViewportUI from '../../ui/layout/viewport';
import PaddedContainerUI from '../../ui/container/padded';
import FadingCarouselUI from '../../ui/carousel/fading';
import TextUI from '../../ui/text';
import SpacingUI from '../../ui/spacing';
import DomainUI from '../../ui/domain';
import DomainsUI from '../../ui/domains';

function Home(props) {
  const topLeftArea = (
    <PaddedContainerUI size="xlarge">
      <TextUI type="h3" block color="BLUE500">
        Hello
      </TextUI>
      <SpacingUI size="xxsmall" />
      <FadingCarouselUI
        items={[
          <>
            <TextUI type="title">I'm </TextUI>
            <TextUI type="title" color="BLUE500">
              Nick
            </TextUI>
            <br></br>
            <TextUI type="title" color="BLUE500">
              Skupien
            </TextUI>
          </>,
          <>
            <TextUI type="title">My Passion</TextUI>
            <br></br>
            <TextUI type="title">is </TextUI>
            <TextUI type="title" color="BLUE500">
              Creating
            </TextUI>
          </>,
        ]}
        duration={8000}
      ></FadingCarouselUI>
      <SpacingUI size="medium" />
      <TextUI block>
        Creative developer & photographer exploring design, technology, and
        storytelling.
      </TextUI>
    </PaddedContainerUI>
  );

  const bottomRightArea = (
    <PaddedContainerUI size="xlarge">
      <DomainsUI>
        <DomainUI href="https://photos.nickskupien.com" disabled>
          Photos
        </DomainUI>
        <DomainUI href="https://recipes.nickskupien.com" disabled>
          Recipes
        </DomainUI>
        <DomainUI href="https://dev.nickskupien.com" disabled>
          Dev
        </DomainUI>
        <DomainUI href="https://design.nickskupien.com">Design</DomainUI>
        <DomainUI href="https://blog.nickskupien.com" disabled>
          Blog
        </DomainUI>
        <DomainUI href="https://darkroom.nickskupien.com" disabled>
          Darkroom
        </DomainUI>
      </DomainsUI>
    </PaddedContainerUI>
  );

  return (
    <ViewportUI>
      <HomeLayoutUI
        bottomRightArea={bottomRightArea}
        topLeftArea={topLeftArea}
      />
    </ViewportUI>
  );
}

Home.propTypes = {};

export default Home;
