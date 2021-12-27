import { Component } from 'react';
import { View, Text } from '@tarojs/components';

import './index.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    }
  }

  toggleClick() {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow
    })
  }

  secretFields = (field, value) => {
    let res = '';
    switch(field) {
      case 'mobile':
        res = value.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
       break;
      case 'idcard':
        const len = value.length;
        res = len === 0 ? '' : value.substr(0, len - 4) + '****';
        break;
    }
    return res;
  }

  render () {
    const { data } = this.props;
    const {
      place,
      visiteDate,
      username,
      gender,
      mobile = '',
      idcard = '',
      matter,
      visiteTime,
      leaveTime
    } = data;
    const { isShow } = this.state;
    return (
      <View className='info-card'>
        <View className='info-card-title'>
          <Text className='title-content'>{ place}</Text>
          <Text className='title-date'>{ visiteDate }</Text>
        </View>
        <View className='info-card-content'>
          <View className='info-card-item'>
            <Text className='info-card-toggle' onClick={() => this.toggleClick()}>{ isShow ? '隐藏' : '显示'}</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>姓名：</Text>
            <Text className='info-card-word'>{ username }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>性别：</Text>
            <Text className='info-card-word'>{ gender }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>手机：</Text>
            <Text className='info-card-word'>{ isShow ? mobile : this.secretFields('mobile', mobile) }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>身份证号：</Text>
            <Text className='info-card-word'>{ isShow ? idcard : this.secretFields('idcard', idcard) }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>预约时间：</Text>
            <Text className='info-card-word'>{ visiteTime }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>离开时间：</Text>
            <Text className='info-card-word'>{ leaveTime }</Text>
          </View>
          <View className='info-card-item'>
            <Text className='info-card-headline'>来访事由：</Text>
            <Text className='info-card-word'>{ matter }</Text>
          </View>
        </View>
      </View>
    )
  }
}
