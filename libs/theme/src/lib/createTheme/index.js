import { merge } from 'lodash';
import { theme } from '../theme';

export const createtheme = (overrides = {}) => {
  return merge({}, theme, overrides);
};
