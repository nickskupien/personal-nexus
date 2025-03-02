import React from 'react';
import PropTypes from 'prop-types';
import UnstyledViewport from '@personal-nexus/ui/layout/viewport';
import styled from 'styled-components';

const Wrapper = styled(UnstyledViewport)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function Viewport({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Viewport.propTypes = {};

export default Viewport;
