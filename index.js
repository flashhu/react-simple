import React from './react'
import ReactDOM from './react-dom'

// 1. jsx
// const element = (
    // <div title="first" className="container" title="123">
    //     hello, <span>world</span>
    //     <p></p>
    // </div>
// )

// 2. 函数组件
// function Home() {
//     return (
//         <div title="first" className="container" title="123">
//             hello, <span>world</span>
//             <p></p>
//         </div>
//     )
// }

// 3. 类组件
class Home extends React.Component {
    render() {
        return (
            <div title="first" className="container" title="123">
                hello, <span>world</span>
                <p></p>
            </div>
        )
    }
}

// ReactDOM.render(element, document.querySelector('#root'))
ReactDOM.render(<Home />, document.querySelector('#root'))