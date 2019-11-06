import { sessionStorage } from 'src/assets/js/storage';

const mutations = {
  SET_USER (state, user) {
    state.user = user;
    sessionStorage.setItem('user', user);
  },
  SET_TOKEN (state, token) {
    state.token = token;
    sessionStorage.setItem('token', token);
  },
  SET_ID (state, id) {
    state.id = id;
    sessionStorage.setItem('menuCode', id);
  },
  SET_MENUCODE (state, menuCode) {
    state.menuCode = menuCode;
    sessionStorage.setItem('menuCode', menuCode);
  }
};

export default mutations;

