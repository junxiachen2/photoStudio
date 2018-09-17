const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  const _openid = event.userInfo.openId
  const { nickName, avatarUrl, gender, city, province, country } = event.user
  const data = { _openid, nickName, avatarUrl, gender, city, province, country, createTime: new Date() }
  const res = await db.collection('user')
    .where({ _openid })
    .get()

  try {
    // 已存在该用户，更新资料
    if (res.data.length > 0) {
      return await db.collection('user')
        .doc(res.data[0]._id)
        .set({ data })
    }
    // 新用户
    else {
      return await db.collection('user')
        .add({ data })
    }
  }
  catch (e) {
    console.log(e)
  }
}
