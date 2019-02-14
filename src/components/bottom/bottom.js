import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { getAllFoodInfo, getEvent } from '../../utils/common'
import './bottom.less'
let myEvent = getEvent()
class Bottom extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      Num: 0,
      sendPrice: 3,
      supportTakeBySelf: false,
      sendMaxPrice: 20,
      allPrice: 0
    }
  }

  componentDidMount() {
    // 要获取整体存储数据
    let { allPrice, allNum } = getAllFoodInfo()
    this.setState({ Num: allNum, allPrice: allPrice })
    myEvent.on('addcut', () => {
      let { allPrice, allNum } = getAllFoodInfo()
      this.setState({ Num: allNum, allPrice: allPrice })
    })
  }

  render() {
    let { Num, sendPrice, supportTakeBySelf, sendMaxPrice, allPrice } = this.state
    return (
      <View className='bottom'>
        <View className='bottom_body'>
          {Num ? <Text className='num'>{Num}</Text> : null}
          <Image className='store_img' src={Num ? require('../../assets/img/foodstore.png') : require('../../assets/img/emptystore.png')} />
          <View className='info'>
            {
              allPrice ?
                <Text className='price'>{'¥' + allPrice}</Text>
                : <Text>{sendPrice ? '另需配送费¥' + sendPrice + ' | ' : ''}</Text>
            }
            <Text>{supportTakeBySelf ? '支持自取' : '不支持自取'}</Text>
          </View>
          <View className='submit'>
            {
              allPrice >= sendMaxPrice
                ? <Text className='goPay'>立即配送</Text>
                : <Text>{sendMaxPrice ? '¥' + sendMaxPrice + '起送' : ''}</Text>
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Bottom