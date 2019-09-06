export default {
    state: {
      userData: {sid:'',uname:'',sessionid:''}
    },
    getters: {
        userData: state => state.userData
    },
    mutations: {
        setUserData(state, data) {
            if (data.sid) state.userData.sid = data.sid;
            if (data.uname) state.userData.uname = data.uname;
            if (data.sessionid) state.userData.sessionid = data.sessionid;
        }
    },
    actions: {
      setUserData (store, data) {
        store.commit('setUserData', data)
      }
    }
  
  }