import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from 'components/header';
import SendSMS from 'components/send-sms';
import Card from 'components/card';

import 'taro-ui/dist/style/components/button.scss';
import './index.scss';

import { request } from 'utils/request';
import { getSubTractDate } from 'utils/date';

export default class RecordQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '预约查询',
      recordList: [],
      isClick: false,
    }
    Taro.setNavigationBarTitle({
      title: this.state.title
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async query(fields) {
    const createTime = getSubTractDate(1);
    const { data: { data: recordList }} = await request({
      url: '/record',
      method: 'get',
      data: {
        createTime,
        ...fields
      }
    });
    this.setState({
      recordList,
      isClick: true
    });
  }

  render () {
    const { title, recordList, isClick } = this.state;
    const isShow = recordList.length > 0 ? true : false;
    return (
      <View className='record-query'>
        <Header title={title}/>
        <SendSMS submit={(fields) => this.query(fields)}/>
        {isShow ? (recordList.map(record => <Card data={record}/>)) : isClick && <Text className='result-tip'>:) 暂无数据</Text>}
      </View>
    )
  }
}
