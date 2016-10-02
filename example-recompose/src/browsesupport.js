// branchでよく使うであろう例
import platform from 'platform'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'


// const NotSupported = () => (<div>サポート対象外です！</div>)
// 
// const MainContent = () => {
//   if(platform.name === 'IE' && parseInt(platform.version) < 10){
//     return <NotSupported />
//   }
//   return <div>メインコンテンツだよ！</div>  
// }
// export default withBrowserCheck(MainContent)

import platform from 'platform'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'

const NotSupported = () => (<div>サポート対象外です！</div>)

const withBrowserCheck = branch(
  () => (platform.name === 'IE' && parseInt(platform.version) < 10),
  (component) => component, // trueの時。 引数をそのまま表示する
  renderComponent(NotSupported) // falseの場合
)

const MainContent = () => (<div>メインコンテンツだよ！</div>)
export default withBrowserCheck(MainContent)