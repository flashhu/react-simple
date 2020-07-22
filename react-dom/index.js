import React from '../react'

/**
 * @description: React元素渲染为DOM，并挂载
 * @param {*} element (vnode) 虚拟Node
 * @param {*} container 节点
 */
function render(element, container) {
    // console.log(element);
    return container.appendChild(_render(element))
}

/**
 * 创建组件实例
 * @param {*} comp React元素中的component, 例 "div"
 * @param {*} props 属性，例 { title: 'test' }
 */
function createComponent(comp, props) {
    let inst;

    if (comp.prototype && comp.prototype.render) {
        // 一、为类定义组件 => 创建实例，返回
        inst = new comp(props);
    } else {
        // 二、为函数组件(扩展成类组件，方便管理)
        // 1. 构造实例， 改变构造函数指数
        inst = new React.Component(props);
        inst.constructor = comp;
        // 2. 定义render函数
        inst.render = function() {
            return this.constructor(props);
        }
    }
    return inst;
}

/**
 * @description: Component实例 -> dom
 * @param {*} comp Component实例，例：Component {props: {…}, state: {…}, constructor: ƒ, render: ƒ}
 */
function renderComponent(comp) {
    let base;
    // 1. 得到返回的 React元素（jsx），例：{component: "div", props: {…}, children: Array(3)}
    const renderer = comp.render();
    // 2. 得到需要挂载的节点对象
    base = _render(renderer);
    comp.base = base;
}

/**
 * @description:设置组件属性
 * @param {*} comp Component实例，例：Component {props: {…}, state: {…}, constructor: ƒ, render: ƒ}
 * @param {*} props 属性，例 { title: 'test' }
 */
function setComponentProps(comp, props) {
    // 1. 设置组件属性
    comp.props = props;
    // 2. 渲染组件
    renderComponent(comp);
}

/**
 * @description: vnode -> node
 * @param {*} element (vnode) 虚拟Node
 */
function _render(element) {
    // 一、未传值
    if (element === undefined || element === null || typeof element === 'boolean'){
        element = '';
    }

    // 二、为字符串，创建文本节点
    if (typeof element === 'string') {
        return document.createTextNode(element);
    }

    // 三、为函数组件
    if (typeof element.component === 'function') {
        // 1. 创建节点
        const comp = createComponent(element.component, element.props);

        // 2. 设置属性
        setComponentProps(comp, element.props);

        // 3. 返回需要挂载的节点对象
        return comp.base;
    }

    // 四、为React元素（虚拟DOM对象）
    const { component, props } = element;

    // 1. 创建节点对象
    const dom = document.createElement(component);

    // 2. 添加属性
    if (props) {
        Object.keys(props).forEach(key => {
            const value = props[key];
            setAttribute(dom, key, value);
        })
    }

    // 3. 递归渲染子节点
    element.children.forEach(child => {
        render(child, dom)
    })

    // 返回需要挂载的节点对象
    return dom;
}

/**
 * @description: 设置属性
 * @param {any} dom 某节点
 * @param {*} key 属性名
 * @param {*} value 属性值
 */
function setAttribute(dom, key, value) {
    // 将 className 转为 class
    if (key === 'className') {
        key = 'class';
    }

    if(/on\w+/.test(key)) {
        // 1. 为事件，如 onClick ...
        key = key.toLowerCase();
        dom[key] = value || ''
    } else if(key === 'style') {
        // 2. 为样式 style='' || style={{}}
        if(!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        }else if (value && typeof value === 'object') {
            for (let k in value) {
                // { width: 20}
                dom.style[k] = typeof value[k] === 'number' ? dom.style[k] = value[k] + 'px' : dom.style[k];
            }
        }
    } else {
        // 3. 其他属性 如 title...
        // ？
        if (key in dom) { 
            dom[key] = value || '';
        }

        if (value) {
            // 更新值
            dom.setAttribute(key, value);
        }else {
            dom.removeAttribute(key);
        }
    }
}

const ReactDOM = {
    render
}

export default ReactDOM;