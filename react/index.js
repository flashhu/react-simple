import Component from './component'

function createElement(component, props, ...children) {
    return {
        component,
        props,
        children
    }
}

const React = {
    createElement,
    Component
}

export default React;