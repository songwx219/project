export default {
    state: {
        menustate:false,
        currentMenu:[]
    },
    mutations: {
        changemenu(state){ state.menustate=!state.menustate; },
        setMenu(state,arr){state.currentMenu=arr;localStorage.setItem('menu',JSON.stringify({menu:arr}));}
    },
    actions: {
        changemenu(state){ store.commit('changemenu', data) },
        setMenu(state,data){store.commit('setMenu', data)}
    }
  
  }