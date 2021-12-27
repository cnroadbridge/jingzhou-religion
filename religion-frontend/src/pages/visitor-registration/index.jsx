import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update } from 'actions/form';
import { View, Text, RadioGroup, Radio, Label, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtTextarea, AtList, AtListItem } from 'taro-ui';
import Header from 'components/header'

import 'taro-ui/dist/style/components/input.scss';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/radio.scss';
import 'taro-ui/dist/style/components/textarea.scss';
import 'taro-ui/dist/style/components/list.scss';
import "taro-ui/dist/style/components/loading.scss";
import './index.scss';

import cityData from 'data/city.json';
import provinceData from 'data/province.json';

import { goToPage } from 'utils/router';
import { request } from 'utils/request';

@connect(({ form }) => ({
  form
}), (dispatch) => ({
  updateForm (data) {
    dispatch(update(data))
  }
}))

export default class VisitorRegistration extends Component {

  constructor (props) {
    super(props);
    this.state = {
      title: '预约登记', // 标题
      username: '', // 姓名
      gender: '', // 性别
      mobile: '', // 手机
      idcard: '', // 身份证
      orgin: '', //访客来源地
      province: '', //省
      city: '', // 市
      place: '', //宗教地址
      religiousCountry: '', // 宗教县区
      religiousType: '', // 宗教类型
      matter: '', // 来访事由
      visiteDate: '', // 拜访日期
      visiteTime: '', // 拜访时间
      leaveTime: '', // 离开时间
      genderOptions: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ], // 性别选项
      genderMap: { male: '男', female: '女' },
      timeRangeOptions: [
        '00:00-02:00',
        '02:00-04:00',
        '04:00-06:00',
        '06:00-08:00',
        '08:00-10:00',
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '18:00-20:00',
        '20:00-22:00',
        '22:00-24:00',
      ], // 时间选项
      orginRangeOptions: [[],[]], // 省市选项
      orginRangeKey: [0, 0],
      provinces: [],
      citys: {},
      isLoading: false,
    }
    this.$instance = getCurrentInstance()
    Taro.setNavigationBarTitle({
      title: this.state.title
    })
  }

  async componentDidMount () {
    console.log(this.$instance.router.params)
    const { place } = this.$instance.router.params;
    const cityOptions = {};
    const provinceOptions = {};
    const provinces = [];
    const citys = {};
    provinceData.forEach(item => {
      const { code, name } = item;
      provinceOptions[code] = name;
      provinces.push(name);
    })
    for(const key in cityData) {
      cityOptions[provinceOptions[key]] = cityData[key];
      citys[provinceOptions[key]] = [];
      for (const item of cityData[key]) {
        if (item.name === '直辖市') {
          citys[provinceOptions[key]].push('');
        } else {
          citys[provinceOptions[key]].push(item.name);
        }
      }
    }
    const orginRangeOptions = [provinces, []]

    await this.setState({
      provinces,
      citys,
      orginRangeOptions,
      place
    });
  }


  handleOriginRangeChange = event => {
    let { value: [ k1, k2 ] } = event.detail;
    const { provinces, citys } = this.state;
    const province = provinces[k1];
    const city = citys[province][k2];
    const orgin = `${province}${city}`;
    this.setState({
      province,
      city,
      orgin
    })
  }

  handleOriginRangleColumnChange = event => {
    let { orginRangeKey } = this.state;
    let changeColumn = event.detail;
    let { column, value } = changeColumn;
    switch (column) {
      case 0:
        this.handleRangeData([value, 0]);
        break;
      case 1:
        this.handleRangeData([orginRangeKey[0], value]);
    }
  }

  handleRangeData = orginRangeKey => {
    const [k0] = orginRangeKey;
    const { provinces, citys } = this.state;
    const cityOptions = citys[provinces[k0]]
    const orginRangeOptions = [provinces, cityOptions];
    this.setState({
      orginRangeKey,
      orginRangeOptions
    })
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
    return value;
  }

  handleDateChange(key, event) {
    const value = event.detail.value;
    this.setState({
      [key]: value
    })
    return value;
  }

  handleClick (key, event) {
    const value = event.target.value;
    this.setState({
      [key]: value
    })
    return value;
  }

  handleRadioClick (key, value) {
    this.setState({
      [key]: value
    })
    return value;
  }

  async onSubmit (event) {
    const {
      username,
      gender,
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      visiteDate,
      visiteTime,
      leaveTime,
      matter,
      genderMap,
    } = this.state;

    if (!username) {
      Taro.showToast({
        title: '请填写用户名',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!gender) {
      Taro.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!mobile || !/^1(3[0-9]|4[579]|5[012356789]|66|7[03678]|8[0-9]|9[89])\d{8}$/.test(mobile)) {
      Taro.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!idcard || !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(idcard)) {
      Taro.showToast({
        title: '请填写正确的身份证号',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!orgin) {
      Taro.showToast({
        title: '请选择来源地',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!place) {
      Taro.showToast({
        title: '请选择宗教场所',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!visiteDate) {
      Taro.showToast({
        title: '请选择预约日期',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!visiteTime) {
      Taro.showToast({
        title: '请选择预约时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    await this.setState({
      isLoading: true
    })

    const data = {
      username,
      gender: genderMap[gender],
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      visiteDate,
      visiteTime,
      leaveTime,
      matter,
    };

    const { data: { code, status, data: formData }} = await request({
      url: '/record',
      method: 'post',
      data
    });

    await this.setState({
      isLoading: false
    });

    if (code === 0 && status === 200 && data) {
      Taro.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // goToPage('result-query', {}, (res) => {
          //   res.eventChannel.emit('formData', { data: formData })
          // })
          this.props.updateForm(formData)
          goToPage('result-query')
        }
      });
    } else {
      Taro.showToast({
        title: '预约失败',
        icon: 'none',
        duration: 2000
      })
      return;
    }
  }

  handlePickerChange = (key, optionName, event) => {
    const options = this.state[optionName];
    this.setState({
      [key]: options[event.detail.value]
    })
  }

  render() {
    const { title,
            username,
            genderOptions,
            mobile,
            idcard,
            visiteTime,
            timeRangeOptions,
            leaveTime,
            matter,
            visiteDate,
            orgin,
            orginRangeOptions,
            orginRangeKey,
            place,
            isLoading
          } = this.state;
    return (
      <View className='visitor-registration'>
        <Header title={title}/>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
        <View className='row'>
          <AtInput
              required
              type='text'
              name='username'
              className='col'
              title='访客姓名'
              placeholder='请输入访客姓名'
              value={username}
              onChange={(value) => {this.handleChange('username', value)}}
            />
          </View>
          <View className='row'>
            <View className='col at-input'>
              <Text className='at-input__title at-input__title--required'>
                性别
              </Text>
              <View className='at-input__input'>
                <RadioGroup>
                  {genderOptions.map((genderOption, i) => {
                    return (
                      <Label for={i} key={i}>
                        <Radio
                          value={genderOption.value}
                          onClick={(event) => {this.handleRadioClick('gender', genderOption.value)}}>
                          {genderOption.label}
                        </Radio>
                      </Label>
                    )
                  })}
                </RadioGroup>
              </View>
            </View>
          </View>
          <View className='row'>
            <AtInput
              required
              type='phone'
              name='mobile'
              title='手机号码'
              className='col'
              placeholder='请输入手机号码'
              value={mobile}
              onChange={(value) => {this.handleChange('mobile', value)}}
            />
          </View>
          <View className='row'>
            <AtInput
              required
              name='idcard'
              type='idcard'
              className='col'
              title='身份证号'
              placeholder='请输入身份证号码'
              value={idcard}
              onChange={(value) => {this.handleChange('idcard', value)}}
            />
          </View>
          <View className='row'>
             <View className='at-input col col-fix'>
                <Text className='at-input__title at-input__title--required'>
                  来源地
                </Text>
                <Picker mode='multiSelector'
                        onChange={(event) => this.handleOriginRangeChange(event)}
                        onColumnChange={(event) => this.handleOriginRangleColumnChange(event)}
                        range={orginRangeOptions}
                        value={orginRangeKey}>
                  <AtList>
                   {orgin ? (
                     <AtListItem
                     className='at-list__item-fix'
                     extraText={orgin}
                   />) : (<Text className='input-placeholder-fix'>请选择访客来源地</Text>)}
                  </AtList>
                </Picker>
            </View>
          </View>
          <View className='row'>
            <AtInput
                required
                type='text'
                name='place'
                className='col'
                title='宗教场所'
                disabled
                placeholder='请选择宗教场所'
                value={place}
                onChange={(value) => {this.handleChange('place', value)}}
              />
          </View>
          <View className='row'>
            <View className='at-input col col-fix'>
                <Text className='at-input__title at-input__title--required'>
                  预约日期
                </Text>
                <Picker mode='date'
                        onChange={(event) => this.handleDateChange('visiteDate', event)}>
                  <AtList>
                   {visiteDate ? (
                     <AtListItem
                      className='at-list__item-fix'
                      extraText={visiteDate}
                    />) : (<Text className='input-placeholder-fix'>请选择预约日期</Text>)}
                  </AtList>
                </Picker>
              </View>
          </View>
          <View className='row'>
            <View className='at-input col col-fix'>
                <Text className='at-input__title at-input__title--required'>
                  预约时间
                </Text>
                <Picker mode='selector'
                        range={timeRangeOptions}
                        onChange={(event) => this.handlePickerChange('visiteTime', 'timeRangeOptions', event)}>
                  <AtList>
                   {visiteTime ? (
                     <AtListItem
                     className='at-list__item-fix'
                     extraText={visiteTime}
                   />) : (<Text className='input-placeholder-fix'>请选择预约时间</Text>)}
                  </AtList>
                </Picker>
              </View>
          </View>
          <View className='row'>
            <View className='at-input col col-fix'>
              <Text className='at-input__title'>
                离开时间
              </Text>
              <Picker mode='selector'
                      range={timeRangeOptions}
                      onChange={(event) => this.handlePickerChange('leaveTime', 'timeRangeOptions', event)}>
                  <AtList>
                   {leaveTime ? (
                      <AtListItem
                      className='at-list__item-fix'
                      extraText={leaveTime}
                    />) : (<Text className='input-placeholder-fix'>请选择离开时间</Text>)}
                  </AtList>
              </Picker>
            </View>
          </View>
          <View className='row'>
            <View className='col at-input'>
              <Text className='at-input__title'>
                   来访事由
              </Text>
              <AtTextarea
                maxLength={200}
                className='textarea-fix'
                value={matter}
                onChange={(value) => {this.handleChange('matter', value)}}
                placeholder='请输入来访事由...'
              />
            </View>
          </View>
          <View className='row'>
            <AtButton
              circle
              loading={isLoading}
              disabled={isLoading}
              type='primary'
              size='normal'
              formType='submit'
              className='col btn-submit'>
                提交
            </AtButton>
          </View>
        </AtForm>
      </View>
    );
  }
}

