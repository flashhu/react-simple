 import React from './react'
import ReactDOM from './react-dom'
import Component from './react/component';

// 1. jsx
const element = (
    <div title="first" className="container" title="123">
        hello, <span>world</span>
        <p></p>
    </div>
)

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
// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             num: 0,
//         }
//     }

//     componentDidMount() {
//         console.log('==== 【Home】 component did mount！====');
//     }

//     componentDidUpdate() {
//         console.log('++++ 【Home】 component did update！++++');
//     }

//     componentWillUnmount() {
//         console.log('==== 【Home】 component will unmount！====');
//     }

//     handleClick() {
//         this.setState({
//             num: this.state.num + 1
//         })
//     }

//     render() {
//         return (
//             <div title="first" className="container" title="123">
//                 hello, <span>world  click {this.state.num} times</span>
//                 <button onClick={this.handleClick.bind(this)}>点我</button>
//             </div>
//         )
//     }
// }

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: true
//         }
//     }

//     componentDidMount() {
//         console.log('==== 【App】 component did mount！=====');
//     }

//     componentDidUpdate() {
//         console.log('++++ 【App】 component did update！++++');
//     }

//     componentWillUnmount() {
//         console.log('==== 【App】 component will unmount！====');
//     }

//     handleHide() {
//         this.setState({
//             visible: false
//         })
//     }

//     render() {
//         return (
//             <div className="app">
//                 {this.state.visible && <Home />}
//                 <button onClick={this.handleHide.bind(this)}>卸载</button>
//             </div>
//         )
//     }
// }

ReactDOM.render(element, document.querySelector('#root'))
// ReactDOM.render(<App />, document.querySelector('#root'))