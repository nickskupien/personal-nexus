import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints?.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TopLeftArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  @media (min-width: ${(props) => props.theme.breakpoints?.tablet}) {
    justify-content: flex-start;
    width: 60%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints?.widescreen}) {
    width: 40%;
  }
`;

const BottomRightArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints?.tablet}) {
    justify-content: flex-end;
    align-items: flex-end;
    width: 50%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints?.widescreen}) {
    width: 40%;
  }
`;

function Home({ topLeftArea, bottomRightArea, children, ...passthroughProps }) {
  return (
    <Wrapper {...passthroughProps}>
      <TopLeftArea>{topLeftArea}</TopLeftArea>
      <BottomRightArea>{bottomRightArea}</BottomRightArea>
      {children}
    </Wrapper>
  );
}

Home.propTypes = {};

export default Home;
