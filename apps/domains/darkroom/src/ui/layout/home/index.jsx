import React from 'react';
import styled from 'styled-components';

import Content from './parts/Content';
import HeroArea from './parts/HeroArea';

const Wrapper = styled.div``;

function index({ children, ...passthroughProps }) {
  return <Wrapper {...passthroughProps}>{children}</Wrapper>;
}

index.propTypes = {};

const Parts = {
  Content,
  HeroArea,
};

export default index;

export { Parts };
