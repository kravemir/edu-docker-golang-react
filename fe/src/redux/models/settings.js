const INITIAL_STATE = {
  density: "comfortable",
  theme: "gray-blue"
};

const settings = {
  state: INITIAL_STATE,
  reducers: {
    store(state, payload) {
      return { ...state, ...payload };
    }
  },
  effects: dispatch => ({
    async setDensity(val, rootState) {
      dispatch.settings.store({ density: val });
    },
    async setTheme(val, rootState) {
      dispatch.settings.store({ theme: val });
    }
  })
};

export default settings;
