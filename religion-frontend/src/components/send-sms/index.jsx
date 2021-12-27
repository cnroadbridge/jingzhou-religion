import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';

import 'taro-ui/dist/style/components/input.scss';
import 'taro-ui/dist/style/components/button.scss';
import './index.scss';

const DEFAULT_SECOND = 120;
import { request } from 'utils/request';

export default class SendSMS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '', // 手机号
      confirmCode: '', // 验证码
      smsCountDown: DEFAULT_SECOND,
      smsCount: 0,
      smsIntervalId: 0,
      isClick: false,
    };
  }

  componentDidMount () { }

  componentWillUnmount () {
    if (this.state.smsIntervalId) {
      clearInterval(this.state.smsIntervalId);
      this.setState(prevState => {
        return {
          ...prevState,
          smsIntervalId: 0,
          isClick: false
        }
      })
    }
  }

  componentDidUpdate (prevProps, prveState) {
  }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
    return value;
  }

  processSMSRequest () {
    const { mobile } = this.state;
    if (!mobile || !/^1(3[0-9]|4[579]|5[012356789]|66|7[03678]|8[0-9]|9[89])\d{8}$/.test(mobile)) {
      Taro.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.countDown()
  }

  sendSMS () {
    const { mobile } = this.state;
    request({
      url: '/sms/send',
      method: 'post',
      data: { mobile }
    }, false).then(res => {
      console.log(res);
      const { data: { data: { description } } } = res;
      Taro.showToast({
        title: description,
        icon: 'none',
        duration: 2000
      })
    }).catch(err => {
      console.log(err);
    });
  }

  countDown () {
    if (this.state.smsIntervalId) {
      return;
    }
    const smsIntervalId = setInterval(() => {
      const { smsCountDown } = this.state;
      if (smsCountDown === DEFAULT_SECOND) {
        this.sendSMS();
      }
      this.setState({
        smsCountDown: smsCountDown - 1,
        isClick: true
      }, () => {
        const { smsCount, smsIntervalId, smsCountDown } = this.state;
        if (smsCountDown <= 0) {
          this.setState({
            smsCountDown: DEFAULT_SECOND,
          })
          smsIntervalId && clearInterval(smsIntervalId);
          this.setState(prevState => {
            return {
              ...prevState,
              smsIntervalId: 0,
              smsCount: smsCount + 1,
            }
          })
        }
      })
    }, 1000);
    this.setState({
      smsIntervalId
    })
  }

  submit() {
    // 校验参数
    const { mobile, confirmCode } = this.state;
    if (!mobile || !/^1(3[0-9]|4[579]|5[012356789]|66|7[03678]|8[0-9]|9[89])\d{8}$/.test(mobile)) {
      Taro.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (confirmCode.length !== 6) {
      Taro.showToast({
        title: '验证码输入有误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.props.submit({ mobile, code: confirmCode });
  }

  render () {
    const { mobile, confirmCode, smsCountDown, isClick } = this.state;

    return (
      <View className='sms-box'>
         <View className='row-inline'>
            <AtInput
              required
              type='phone'
              name='mobile'
              title='手机号码'
              className='row-inline-col-7'
              placeholder='请输入手机号码'
              value={mobile}
              onChange={(value) => {this.handleChange('mobile', value)}}
            />
            {!isClick ? ( <Text
              onClick={() => this.processSMSRequest()}
              className='row-inline-col-3 at-input__input code-fix'>
               发送验证码
            </Text>) : ( <Text
              onClick={() => this.processSMSRequest()}
              className='row-inline-col-3 at-input__input code-fix red'>
               {( smsCountDown === DEFAULT_SECOND ) ? '重新发送' : `${smsCountDown}秒后重试`}
            </Text>)}
          </View>
          <View>
            <AtInput
              required
              type='text'
              name='confirmCode'
              title='验证码'
              placeholder='请输入验证码'
              value={confirmCode}
              onChange={(value) => {this.handleChange('confirmCode', value)}}
            />
          </View>
          <View>
            <AtButton
              circle
              type='primary'
              size='normal'
              onClick={() => this.submit()}
              className='col btn-submit'>
                查询
            </AtButton>
          </View>
      </View>
    )
  }
}
