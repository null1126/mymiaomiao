import Vue from 'vue'
import MessageBox from './MessageBox'

export const messageBox = (function() {

    return function(opt) { //配置参数

        let defaults = { //默认值
                title: '',
                content: '',
                cancel: '',
                ok: '',
                landleCancel: null,
                landleOk: null
            }
            //将当前配置与MessageBox组件结合
        let Mycomponent = Vue.extend(MessageBox) //返回一个新类

        for (let attr in opt) {
            defaults[attr] = opt[attr]
        }

        let vm = new Mycomponent({
                el: document.createElement('div'),
                data: {
                    title: defaults.title,
                    content: defaults.content,
                    cancel: defaults.cancel,
                    ok: defaults.ok,
                },
                methods: {
                    landleCancel() {
                        defaults.landleCancel && defaults.landleCancel.call(this)
                            //将显示的元素删除
                        document.body.removeChild(vm.$el)
                    },
                    landleOk() {
                        defaults.landleOk && defaults.landleOk.call(this)
                            //将显示的元素删除
                        document.body.removeChild(vm.$el)
                    }
                }
            })
            //显示到body元素中
        document.body.appendChild(vm.$el)
    }
})()