import {createStore} from "vuex";
import {ref} from "vue";

export default createStore({
    state: {
        selectedGender: 'all',
        selectedPersonality: 'all',
        selectedHobby: 'all',
        selectedSpecies: 'all',
        language: 'fr',
    },
    mutations: {
        setSelectedGender(state, selectedGender) {
            state.selectedGender = selectedGender;
        },
        setSelectedPersonality(state, selectedPersonality) {
            state.selectedPersonality = selectedPersonality;
        },
        setSelectedHobby(state, selectedHobby) {
            state.selectedHobby = selectedHobby;
        },
        setSelectedSpecies(state, selectedSpecies) {
            state.selectedSpecies = selectedSpecies;
        },
        setLanguage(state, language) {
            state.language = language;
        },
    },
    actions: {
        setSelectedGender: ({commit}, gender) => commit('setSelectedGender', gender),
        setSelectedPersonality: ({commit}, personnality) => commit('setSelectedPersonality', personnality),
        setSelectedHobby: ({commit}, hobby) => commit('setSelectedHobby', hobby),
        setSelectedSpecies: ({commit}, specy) => commit('setSelectedSpecies', specy),
        setLanguage: ({commit}, language) => commit('setLanguage', language)
    }
});
