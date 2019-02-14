import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './addcut.less'
import { getFoodCount, setFoodCount, getEvent } from '../../utils/common'
let myEvent = getEvent()
class Addcut extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      Num: 0
    }
  }

  componentDidMount() {
    this.setState({
      Num: getFoodCount(this.props.food)
    })
    // myEvent.on('changeCata', () => {
    //   this.setState({
    //     Num: getFoodCount(this.props.food)
    //   })
    // })
  }

  CutFood() {
    if (this.props.food) {
      if (this.state.Num > 0) {
        setFoodCount(this.props.food, this.state.Num, 'cut', () => {
          myEvent.emit('addcut')
          this.setState({
            Num: getFoodCount(this.props.food)
          })
        })
      } else {
        console.error('当前菜品加减出现异常')
      }
    }
  }

  AddFood() {
    if (this.props.food) {
      setFoodCount(this.props.food, this.state.Num, 'add', () => {
        this.setState({
          Num: getFoodCount(this.props.food)
        })
        myEvent.emit('addcut')
      })
    }
  }

  render() {
    let { Num } = this.state
    let hideClass = Num > 0 ? '' : 'hide'
    return (
      <View className='addcut'>
        <Image onClick={this.CutFood.bind(this)} className={'opeate_img ' + hideClass} src={require('../../assets/img/cut.png')}></Image>
        <Text className={'food_num ' + hideClass} >{Num}</Text>
        <Image onClick={this.AddFood.bind(this)} className='opeate_img' src={require('../../assets/img/add.png')}></Image>
      </View>
    )
  }
}

export default Addcut