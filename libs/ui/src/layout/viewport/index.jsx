import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
`;

function Viewport({children, ...passthroughProps}) {
  return (
    <Wrapper {...passthroughProps}>
      {children}
    </Wrapper>
  );
}

Viewport.propTypes = {};

export default Viewport;
