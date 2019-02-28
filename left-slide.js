/*
 *  左滑组件，依赖 jsmodern.js
 *  自定义左滑功能按钮
 *  父组件定义在slot中的html结构必须是以 slide-content 为类名的根元素
 *  父组件传递到该组件中的数据：button 和 params 均为二维数组，params 中的数据为 button 回调函数的参数，两组数据一一对应
 */
(function(){
    var template = `
        <div class="slide-wrap hideBtn" :style="{transform:'translateX(-'+button.map(function(i){return i.widthVW}).reduce(function(p, c){return p + c})+'vw)'}">
            <slot></slot>
            <div class="slide-button" v-for="(item, index) in button" :key="index" @click="slideHide(item.func, params[index])" :style="{backgroundColor:item.bgColor, color:item.fontColor, width:item.widthVW+'vw', lineHeight:item.widthVW+'vw'}">{{item.name}}</div>
        </div>
    `;

    var css = `
        .slide-wrap{display:flex;font-size:6.5vw;width:100%;transition:all 0.3s ease;overflow-x:visible;}
        .slide-wrap.hideBtn{transform:translateX(0)!important;}
        .slide-content{flex:none;width:100%;}
        .slide-button{flex:none;writing-mode:tb;text-align:center;font-size:18px;}
    `;
    var styleNode = document.createElement("style");
    styleNode.type = "text/css";
    if (styleNode.styleSheet) {
        styleNode.styleSheet.cssText = css;
    } else {
        styleNode.innerHTML = css;
    }
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    Vue.component('left-slide', {
        template: template,
        props: ['button', 'params'],
        data: function() {
            return {};
        },
        mounted: function() {
            $('.slide-wrap').on('swipeLeft', function(){
                $('.slide-wrap.showBtn').removeClass('showBtn').addClass('hideBtn');
                $(this).removeClass('hideBtn').addClass('showBtn');
            }).on('swipeRight', function(){
                $(this).removeClass('showBtn').addClass('hideBtn');
            });
        },
        methods: {
            slideHide: function(func, params) {
                $('.slide-wrap.showBtn').removeClass('showBtn').addClass('hideBtn');
                func(params);
            }
        }
    });
})();
