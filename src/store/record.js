import firebase from 'firebase/app'
export default {
  actions:{
    async createRecord({commit,dispatch},record){
      try {
        const uid = await dispatch('getUId')
        return await firebase.database().ref(`users/${uid}/records`).push(record)
      } catch (error) {
        commit('setError',error)
      }
    },
    async fetchRecords({commit,dispatch}){
      try {
        const uid = await dispatch("getUId");
        const records = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .once('value')).val() || {}
        return Object.keys(records).map(key=>({...records[key],id:key}))
      } catch (error) {
        commit('setError',error)
      }
    },
    async fetchRecordById({commit,dispatch},id){
      try {
        const uid = await dispatch("getUId");
        const records = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .child(id)
          .once('value')).val() || {}
        return {...records}
      } catch (error) {
        commit('setError',error)
      }
    },
  }
}
