import { UPDATE } from 'constants/form';

const INITIAL_STATE = {
  city: '',
  createTime: '',
  gender: '',
  id: '',
  idcard: '',
  leaveTime: '',
  matter: '',
  mobile: '',
  orgin: '',
  place: '',
  province: '',
  religiousCountry: '',
  religiousType: '',
  updateTime: '',
  username: '',
  visiteDate: '',
  visiteTime: ''
};

export default function form(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
