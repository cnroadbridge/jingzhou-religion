import { UPDATE } from 'constants/form';

export const update = data => {
  return {
    type: UPDATE,
    data
  };
};
