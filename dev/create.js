const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv
const nameReg = new RegExp('@name', 'g')
const pathReg = 'pages'
const json = require('../miniprogram/app.json')
const SRC_PATH = [
  path.resolve(__dirname, `./temp/wxml`),
  path.resolve(__dirname, `./temp/js`),
  path.resolve(__dirname, `./temp/json`),
  path.resolve(__dirname, `./temp/wxss`)
]
const nameArr = ['wxml', 'js', 'json', 'wxss']
const name = argv.n || null
if (name === null) {
  console.log('please input code with -n=name')
}
else {
  try {
    fs.readdirSync(path.resolve(__dirname, `../miniprogram/${pathReg}/${name}`))
    console.log('已存在该目录，请检查目录是否为空，为空的话可删除了再执行该命令')
  }
  catch (error) {
    fs.mkdirSync(path.resolve(__dirname, `../miniprogram/${pathReg}/${name}`))
    SRC_PATH.map((item, index) => {
      let content = fs.readFileSync(SRC_PATH[index], { encoding: 'utf-8' })
      content = content.replace(nameReg, name)
      fs.writeFileSync(path.resolve(__dirname, `../miniprogram/${pathReg}/${name}/${name}.${nameArr[index]}`), content)
    })
    json.pages.push(`pages/${name}/${name}`)
    const content = JSON.stringify(json, null, 2)
    fs.writeFileSync(path.resolve(__dirname, `../miniprogram/app.json`), content)
  }
}
