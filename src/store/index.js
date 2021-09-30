import { createStore } from "vuex";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

export default createStore({
  state() {
    return {
      starships: null,
      http: axios.create({
        baseURL: "https://swapi.dev/api/starships",
        adapter: cacheAdapterEnhancer(axios.defaults.adapter),
      }),
      homeHistory: new Set(),
    };
  },
  mutations: {
    updateStarships(state, payload) {
      state.starships = payload.fetchedData.map((starshipData) => ({
        ...starshipData,
        id: +starshipData.url.match(/\/(\d+)\//i)[1],
      }));
    },
    updateHomeHistory(state, payload) {
      state.homeHistory.add(payload.request);
    },
  },
});
