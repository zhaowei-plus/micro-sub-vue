/* eslint-disable */
import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from 'vue-router'

// Vue.config.productionTip = false

// 保存实例
let router = null
let instance = null
function render(props) {
    console.log('render props:', props)
    const { container } = props

    if (container) {
        props.onGlobalStateChange((state, prevState) => {
            // state：变更后的状态，prevState 变更之前的状态
            console.log('同行状态发生改变:', state, prevState)
        })
    }

    router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
        mode: 'history',
        routes
    })

    instance = new Vue({
        router,
        render: h => h(App),
    }).$mount( container ? container.querySelector('#app') : '#app') // 挂载到自己的html中，基座项目会拿到挂在之后的html，插入父应用中去
}

// 独立运行微应用
// eslint-disable camelcase 
if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

// 子应用暴露协议
export async function bootstrap(props) {
    // 启用子应用
    console.log('bootstrap：', props)
}
export async function mount(props) {
    console.log('mount:', props)
    render(props)
  }
export async function unmount(props) {
    console.log('unmount', props)
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
}