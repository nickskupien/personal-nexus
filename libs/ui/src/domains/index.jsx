import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.small.normal};
  margin: -5px -10px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    align-items: flex-end;
    gap: ${(props) => props.theme.spacing.medium.normal};
  }
`;

function Domains({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Domains.propTypes = {};

export default Domains;
