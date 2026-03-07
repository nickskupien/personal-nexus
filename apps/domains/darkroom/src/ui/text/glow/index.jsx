import React from 'react';
import PropTypes from 'prop-types';
import UnstyledText from '@personal-nexus/ui/text';
import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const Text = styled(UnstyledText)`
  animation: ${glowAnimation} 2s ease-in-out infinite;
`;

function Glow({ children, ...passthroughProps }) {
  return <Text {...passthroughProps}>{children}</Text>;
}

Glow.propTypes = {};

export default Glow;
