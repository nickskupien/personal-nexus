import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing?.[props.$size]?.normal};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing?.[props.$size]?.double};
  }
`;

function index({ children, size = 'medium', ...passthroughProps }) {
  return (
    <Wrapper {...passthroughProps} $size={size}>
      {children}
    </Wrapper>
  );
}

index.propTypes = {};

export default index;
