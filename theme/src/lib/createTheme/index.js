import { merge } from 'lodash';
import { theme } from '../theme';

export const createTheme = (overrides = {}) => {
  return merge({}, theme, overrides);
};
