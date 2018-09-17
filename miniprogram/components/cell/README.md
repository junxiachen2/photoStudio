Cell 单元格
------------
参考 [zanui-webapp](https://github.com/youzan/zanui-weapp/tree/dev/packages/cell)

#### 属性与事件

| 名称 | 类型 | 必须 | 默认 | 描述 |
|-----|-----|------|-----|-----|
|title|String|false|空|左侧标题|
|label|Boolean|false|空|标题下方的描述信息|
|value|String|false|空|右侧内容|
|isLink|Boolean|false|false|是false展示箭头并支持跳转|
|url|String|false|-|当 isLink 为 true 时,跳转到 url|
|linkType|String|false|navigateTo|跳转类型,参照微信api,navigateTo，redirectTo，switchTab，reLaunch|
|bindtap|EventHandle|false|无|点击事件|

#### 可用的 slot

| 名称 | 必须 | 默认 | 描述 |
|-----|-----|------|-----|
|默认|false|无|左侧除了 title,label的自定义内容|
|icon|false|无|icon,默认宽30rpx,高30rpx|
|footer|false|无|右侧内容,若设置了value属性则不生效|

#### 使用方法
```
<cell isLink="true" title="标题" value="这是文字文字文字文字">
    <image slot="icon" src="../../images/icon.png"></image>
</cell>
```


