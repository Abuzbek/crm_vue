import firebase from 'firebase/app'
export default{
  state:{
    info:{}
  },
  mutations:{
    setInfo(state,info){
      state.info = info
    },
    clearInfo(state){
      state.info = {}
    }
  },
  actions:{
    async fetchInfo({dispatch,commit}){
      try {
        const uid = await dispatch('getUId')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (error) {
        console.log(error);
      } 
      
    },
    async updateInfo({dispatch,commit,getters},updateInfo){
      try {
        const uid = await dispatch('getUId')
        const updateData = {...getters.info,...updateInfo}
        await firebase.database().ref(`users/${uid}/info`).update(updateData)
        
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
      }
    }
  },
  getters:{
    info: s =>{
      return s.info
    }
  }
}
