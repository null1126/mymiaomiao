export default {
    nm: window.localStorage.getItem('nmkey') || '北京',
    id: window.localStorage.getItem('idkey') || 1,
    user: window.localStorage.getItem('username') || '',
    isAdmin: window.localStorage.getItem('isAdmin') || false,
    userHead: ''
}