import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import "taro-ui/dist/style/components/icon.scss";

import 'assets/iconfont/iconfont.css'
import './index.scss'

import { goToPage } from 'utils/router.js'

export default function Header(props) {
  return (
    <View className='header'>
      <Text className='header-text'>{ props.title }</Text>
      <Text onClick={() => goToPage('index')}>
        <AtIcon prefixClass='icon' className='iconfont header-reback' value='home' color='#6190e8'></AtIcon>
      </Text>
    </View>
  )
}
