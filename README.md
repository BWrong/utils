# v-videojs
![npm](https://img.shields.io/npm/dt/v-videojs)
![npm](https://img.shields.io/npm/v/v-videojs)
![NPM](https://img.shields.io/npm/l/v-videojs)
![GitHub stars](https://img.shields.io/github/stars/bwrong/v-video?style=social)

基于`video.js`封装的Vue指令，用于创建一个视频播放器。
### 使用方法
在`video`上添加`v-video`指令，部分参数可以通过props传入，也可以全局配置，props拥有更高优先级。

```js
import videojs from 'video.js'; // 需要依赖video.js
import 'video.js/dist/video-js.css'
import video from 'v-videojs';
import lang from 'video.js/dist/lang'
videojs.addLanguage('zh-CN', lang); // 添加语言
Vue.use(video, {
    onlyOnePlay: true, // 是否同时只允许一个播放
    // options... 还可以接收video.js配置项
})
```
```html
<video v-video controls poster="./assets/img/img1.jpg">
    <source  src="/demo.mp4" type="video/mp4">
</video>
```

### API

#### Directive

|名称|说明|
|---|---|
|`v-video`|创建`video.js`播放器|

#### Props

|属性|必须|说明|类型|默认值|
|---|---|---|---|---|
|src|yes|视频文件地址|String|-|
|poster|no|封面文件地址|String|视频第一帧|
|width|no|宽度|String|100%|
|height|no|高度|String|100%|
|controls|no|是否显示控件|Boolean|false|
|autoplay|no|自动播放|Boolean|false|
|preload|no|预加载,可选项：'auto'、'metadata'、'none'|String|'auto'|
|muted|no|静音|Boolean|false|
#### Events
支持video元素所有事件
```html
<video class="" controls v-video @play="play" @pause="pause">
    <source  src="/demo.mp4" type="video/mp4">
</video>
```

#### Methods

正常来说，上述API能够满足日常使用，如果需要使用`video.js`的方法及其他高级用法，可采用如下方式：
1. 使用ref标识元素，名字可以自定义

```html
<!-- html -->
<video v-video controls poster="./assets/img/img1.jpg" ref="video">
    <source src="/demo.mp4" type="video/mp4">
</video>
```
2. 获取`video.js`实例

```js
// js
// 这里的例子使用计算属性computed，也可直接使用 this.$refs.video.videoPlayer
computed: {
    videoPlayer () {
        return this.$refs.video.videoPlayer;
    }
},
```
3. 使用`video.js`实例上的属性和方法，在mounted生命周期使用

所有官方的方法均可使用，具体用法见[官方文档](https://videojs.com)。

```js
// 播放
this.videoPlayer.play();
// 暂停
this.videoPlayer.pause();
// 销毁
this.videoPlayer.dispose();
// 事件监听
this.videoPlayer.on(eventName,fn);
// 触发事件
this.videoPlayer.trigger(eventName);
// ....
// 更多用法见官方文档
```
