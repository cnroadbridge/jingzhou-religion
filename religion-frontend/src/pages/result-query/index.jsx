import { Component } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { update } from 'actions/form';
import { View, Text } from '@tarojs/components';
import Header from 'components/header';
import Card from 'components/card'

import './index.scss';
@connect(({ form }) => ({
  form
}), (dispatch) => ({
  updateForm (data) {
    dispatch(update(data))
  }
}))

export default class ResultQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '结果查询'
    }
    Taro.setNavigationBarTitle({
      title: this.state.title
    })
  }

  componentDidMount () { }

  componentWillUnmount () {
    const { updateForm } = this.props;
    updateForm({
      city: '',
      createTime: '',
      gender: '',
      id: '',
      idcard: '',
      leaveTime: '',
      matter: '',
      mobile: '',
      orgin: '',
      place: '',
      province: '',
      religiousCountry: '',
      religiousType: '',
      updateTime: '',
      username: '',
      visiteDate: '',
      visiteTime: ''
    })
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { title } = this.state;
    const { form } = this.props;
    return (
      <View className='result-query'>
        <Header title={title}/>
        <Card data={form}/>
        <Text className='result-query-tip'>您已预约成功，请在预约时段内带上身份证前往指定场所</Text>
      </View>
    )
  }
}
