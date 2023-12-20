import { createStore } from 'vuex'

const state = {
  Cards:[],
  MaxID:0
  
}

const mutations = {
  UPDATE_CARDS(state,value){
    state.Cards = value
  }

}

const actions = {
  addCard ({state, commit}) {
    let newCard = { id: state.MaxID + 1 };
    state.MaxID = state.MaxID + 1
    let newCards = [...state.Cards, newCard];
    commit('UPDATE_CARDS', newCards);
  },
  removeCard({state, commit}) {
    let newCards = state.Cards.slice(0, -1);
    commit('UPDATE_CARDS', newCards);
  },
  deleteCard({ state, commit }, id) {
    let newCards = state.Cards.filter(card => card.id !== id);
    commit('UPDATE_CARDS', newCards);
  }
}


const getters = {
  Cards: state => state.Cards

}


export default createStore({
  state,
  mutations,
  actions,
  getters
});
