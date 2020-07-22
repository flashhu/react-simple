import { setAttribute } from './index'

/**
 * 对比节点，vnode -> dom, 并挂载
 * @param {*} dom 真实dom
 * @param {*} element React元素（虚拟DOM）
 * @param {*} container 
 */
export function diff(dom, element, container) {
    // 对比后的节点对象
    const ret = diffNode(dom, element); 

    if (container) {
        container.appendChild(ret);
    }

    return ret;
}

/**
 * 对比节点，返回更新后节点
 * @param {*} dom 真实dom
 * @param {*} element React元素（虚拟DOM）
 */
function diffNode(dom, element) {
    let out = dom;

    // 一、未传值
    if (element === undefined || element === null || typeof element === 'boolean') {
        element = '';
    }
    // 二、 为数值，强制转为字符串
    if (typeof element === 'number') element = String(element);

    // 三、为字符串，创建文本节点
    if (typeof element === 'string') {
        // 原已挂载，且节点类型为文本类型
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== element) {
                // 更新文本内容
                dom.textContent = element;
            }
        } else {
            // 新节点
            out = document.createTextNode(element);
            // 原已挂载，且非根节点  => 替换父节点的子节点
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom)
            }
        }
        return out;
    }

    // 四、非文本/数值 DOM 节点 ( JSX )
    if (!dom) {
        // 如 dom 未定义，即初次挂载时，新建节点
        out = document.createElement(element.component);
    }

    // out 由于上文的赋值，表示真实dom
    diffAttribute(out, element);

    // 比较子节点
    if (element.children && element.children.length > 0 || (out.children && out.childNodes.length > 0)) {
        // diffChildren(out, vnode.childrens)
    }

    return out;
}

/**
 * 对比前后，设置属性
 * @param {*} dom 原有节点对象
 * @param {*} element React元素（虚拟DOM）
 */
function diffAttribute(dom, element) {
    const domAttrs = dom.attributes;
    // 保存原有 dom 的全部属性
    const oldAttrs = {};
    // 保存新的属性值
    const newAttrs = element.props;
    console.log(domAttrs, [...domAttrs]);
    [...domAttrs].forEach(item => {
        oldAttrs[item.name] = item.value;
    })

    // 新旧对比
    for (let key in oldAttrs) {
        // 属性在旧的中存在，在新的中不存在，则移除
        if (!(key in newAttrs)) {
            setAttribute(dom, key, undefined)
        }
    }

    for (let key in newAttrs) {
        // 新旧值不一致，则更新
        if (oldAttrs[key] !== newAttrs[key]) {
            setAttribute(dom, key, newAttrs[key])
        }
    }
}
