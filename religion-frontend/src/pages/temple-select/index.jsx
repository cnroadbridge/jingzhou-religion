import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from 'components/header';
import { AtIcon, AtSearchBar } from 'taro-ui';

import 'taro-ui/dist/style/components/search-bar.scss';
import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/icon.scss';

import './index.scss';
import { goToPage } from 'utils/router.js';

const REQUEST_URL = 'http://60.12.105.251:4442/place';


export default class TempleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '宗教场所选择',
      name: '',
      list: []
    }
    Taro.setNavigationBarTitle({
      title: this.state.title
    })
  }

  componentDidMount() {
    this.query();
  }

  onChange (name) {
    this.setState({
      name
    })
  }

  onActionClick () {
    const { name } = this.state;
    this.query(name);
  }

  goPage = (place) => {
    goToPage('visitor-registration', {
      place
    })
  }

  query(name) {
    const url = name ? `${REQUEST_URL}?name=${name}` : REQUEST_URL;
    Taro.showLoading()
    fetch(url, {
      method: 'GET',
      redirect: 'follow'
    }).then(response => response.text())
      .then(result => {
        const list = JSON.parse(result);
        this.setState({
          list
        })
        Taro.hideLoading()
      })
      .catch(error => {
        console.log('error', error);
        Taro.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      });
  }

  render () {
    const { title, list, name } = this.state;
    const length = list.length;
    return (
      <View className='temple-select'>
        <Header title={title}/>
        <AtSearchBar
            showActionButton
            className='search-bar'
            placeholder='请输入宗教场所'
            value={name}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        <View className='link-box'>
          {
            length ? (
              list.map(item => <div className='link' onClick={() => this.goPage(item.name)} key={item.id}>
                <Text className='link-word link-word-left'>
                  <AtIcon prefixClass='icon' className='iconfont link-word-left-icon' value='jingqu' size='30'></AtIcon>
                   {item.name}
                </Text>
                <Text className='link-word link-word-right'>
                  <AtIcon value='chevron-right' size='30'></AtIcon>
                </Text>
            </div>)
            ) : <Text className='not-found'>:)&nbsp;查无数据</Text>
          }

        </View>
      </View>
    )
  }
}
