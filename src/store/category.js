import firebase from "firebase/app";
export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch("getUId");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });
        return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUId");
        const category = (await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .once('value')).val() || {}
        return Object.keys(category).map(key=>({...category[key],id:key}))
        // return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async fetchCategoryById({ dispatch, commit },id) {
      try {
        const uid = await dispatch("getUId");
        const category = (await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .once('value')).val() || {}
        return {...category}
        // return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateCategories({ dispatch, commit },{title,limit,id}) {
      try {
        const uid = await dispatch("getUId");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id).update({title,limit})
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
