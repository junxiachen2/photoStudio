const API = {}
const production = true
const proDomain = ''
const devDomain = ''
const DOMAIN = production ? proDomain : devDomain

// 用户登录
API.POST_LOGIN = DOMAIN + '/user/wx/login'
export default API
