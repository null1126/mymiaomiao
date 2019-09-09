export default {
    HandleTocity({ commit }, citynmid) {
        commit('INFO_CITY', citynmid)
    },
    UserName({ commit }, users) {
        commit('USER_NAME', users)
    },
}