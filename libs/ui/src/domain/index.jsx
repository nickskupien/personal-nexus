import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Tooltip } from 'react-tooltip';

import UnstyledLink from '../link';

const Link = styled(UnstyledLink)`
  display: block;
  font-size: 20px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background 0.1s ease-out;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 22px;
  }

  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        background: ${props.theme.colors.BLUETRANSPARENT300};
      }
    `}
`;

function Domain({ children, disabled, ...passthroughProps }) {
  const tooltipProps = {};

  if (disabled) {
    tooltipProps['data-tooltip-id'] = 'domain-tooltip';
    tooltipProps['data-tooltip-content'] = 'Coming soon!';
  }

  return (
    <Link
      {...passthroughProps}
      {...tooltipProps}
      disabled={disabled}
      $disabled={disabled}
      type="h3"
    >
      {children}
      <Tooltip id="domain-tooltip" float={true} offset={12} delayShow={200} />
    </Link>
  );
}

Domain.propTypes = {};

export default Domain;
