const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  const { openId } = event.userInfo
  const { nickName, avatarUrl, gender, city, province, country } = event.user

  try {
    return await db.collection('user').add({
      data: {
        openId,
        nickName,
        avatarUrl,
        gender,
        city,
        province,
        country,
        createTime: new Date()
      }
    })
  }
  catch (e) {
    console.log(e)
  }
}
