export default {
    INFO_CITY(state, rescity) {
        state.nm = rescity.nm
        state.id = rescity.id
    },
    USER_NAME(state, users) {
        state.user = users.username
        state.isAdmin = users.isAdmin
        state.userHead = users.userHead
    },
}