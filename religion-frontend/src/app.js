import { Component } from 'react';
import { Provider } from 'react-redux';
import configStore from 'store';
import Taro from '@tarojs/taro';

import VConsole from 'vconsole';

import './app.scss';

const store = configStore();

let vConsole = null;

if (process.env.NODE_ENV === 'development') {
  vConsole = new VConsole({ maxLogNumber: 1000 });
}

class App extends Component {
  componentDidMount() {
    Taro.eventCenter.on(
      '__taroRouterChange',
      ({ fromLocation, toLocation }) => {
        const { path } = toLocation;
        console.log(fromLocation, toLocation);
        if (path !== '/public/visitor-registration') {
          let url = window.location.href;
          url = url.split('?')[0];
          window.history.pushState({}, 0, url);
        }
      }
    );
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  componentWillUnmount() {
    vConsole && vConsole.destroy();
    Taro.eventCenter.off('__taroRouterChange');
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
