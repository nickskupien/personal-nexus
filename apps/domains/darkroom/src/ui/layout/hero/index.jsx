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

const CenterArea = styled.div`
  position: absolute;
  inset: 0;

  @media (min-width: ${(props) => props.theme.breakpoints?.tablet}) {
  }
`;

function Hero({ centerArea, children, ...passthroughProps }) {
  return (
    <Wrapper {...passthroughProps}>
      <CenterArea>{centerArea}</CenterArea>
      {children}
    </Wrapper>
  );
}

Hero.propTypes = {};

export { CenterArea };
export default Hero;
