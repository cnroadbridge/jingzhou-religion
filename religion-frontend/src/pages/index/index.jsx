import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import 'taro-ui/dist/style/components/icon.scss';
import './index.scss';

import { goToPage } from 'utils/router.js';

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      title: '京州市寺庙（教堂）预约平台'
    }
    Taro.setNavigationBarTitle({
      title: this.state.title
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goPage = (page) => {
    goToPage(page)
  }

  render () {
    const { title } = this.state;
    return (
      <View className='index'>
        <Text className='title'>{ title }</Text>
        <View className='link-box'>
          <div className='link' onClick={() => this.goPage('temple-select')}>
            <Text className='link-word link-word-left'>
              <AtIcon value='edit' size='30'></AtIcon>
              &nbsp;预约登记
            </Text>
            <Text className='link-word link-word-right'>
              <AtIcon value='chevron-right' size='30'></AtIcon>
            </Text>
          </div>
          <div className='link' onClick={() => this.goPage('record-query')}>
            <Text className='link-word link-word-left'>
              <AtIcon value='list' size='30'></AtIcon>
                &nbsp;预约查询
            </Text>
            <Text className='link-word link-word-right'>
              <AtIcon value='chevron-right' size='30'></AtIcon>
            </Text>
          </div>
        </View>
      </View>
    )
  }
}
