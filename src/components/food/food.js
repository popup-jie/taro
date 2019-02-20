import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

import Cata from './cata'
import FoodList from './foodlist'

import './food.less'

class Food extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      tabList: [{ title: '点菜' }, { title: '评价' }, { title: '商家' }],
      selectCata: null,
      foodlist: [],
      currentList: []
    }
  }

  changeTab(value) {
    this.setState({ current: value })
  }

  // 切换分类
  changeCata(selectCata) {
    this.setState({
      selectCata: selectCata
    })
    if (this.state.foodlist.some(item => item.pid === selectCata.id)) {
      this.setState({
        currentList: this.state.foodlist.filter(item => item.pid === selectCata.id)
      })
    } else {
      this.setState({
        foodlist: this.state.foodlist.concat(this.getData(selectCata))
      }, () => {
        this.setState({
          currentList: this.state.foodlist.filter(item => item.pid === selectCata.id)
        })
      })
    }
  }

  getData(selectCata) {
    let count = Math.round(Math.random() * 2)
    return Array.from(Array(Math.round(Math.random() * 20)), (v, k) => ({
      img: count,
      title: '分类' + selectCata.id + '菜品' + (k + 1),
      id: selectCata.id + '_' + k,
      pid: selectCata.id,
      sole: Math.round(Math.random() * 50),
      price: Math.round(Math.random() * 20)
    }))
  }

  render() {
    let { current, tabList, currentList, selectCata } = this.state
    return (
      <View>
        <AtTabs current={current} onClick={this.changeTab.bind(this)} tabList={tabList}>
          <AtTabsPane>
            <View className="food_body">
              <Cata onChangeCata={this.changeCata.bind(this)} />
              <FoodList currentList={currentList} selectCata={selectCata} style="width:100%" />
            </View>
          </AtTabsPane>
          <AtTabsPane>评价</AtTabsPane>
          <AtTabsPane>商家</AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Food
