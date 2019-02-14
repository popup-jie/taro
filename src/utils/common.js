import Taro from '@tarojs/taro'
import Event from './event'
const FOODKEY = 'taro_meituan'
let myEvent = new Event()
/**
 * 获取菜品数量 
 * @param {菜品} food 
 */
export function getFoodCount(food) {
  let store = Taro.getStorageSync(FOODKEY);
  if (store && store[food.id]) {
    return store[food.id].Num
  } else {
    return 0
  }
}

/**
 * 设置菜品数量
 * @param {菜品} food 
 * @param {当前菜品数量} Num 
 */
export function setFoodCount(food, Num, type, callBack) {
  let store = Taro.getStorageSync(FOODKEY)
  if (!store) store = {}
  if (food) {
    if (type === 'cut') {
      if (Num === 1) {
        if (store[food.id]) {
          delete store[food.id]
        }
      } else {
        if (store[food.id]) {
          store[food.id].Num = Num - 1
        }
      }
      Taro.setStorageSync(FOODKEY, store)
      callBack && callBack()
    } else if (type === 'add') {
      if (store[food.id]) {
        store[food.id].Num = Num + 1
      } else {
        store[food.id] = {
          Num: 1,
          ...food
        }
      }
      Taro.setStorageSync(FOODKEY, store)
      callBack && callBack()
    }
  }
}

/**
 * 获取所有的菜品数量 及价格
 */
export function getAllFoodInfo() {
  let allPrice = 0 // 总价格
  let allNum = 0
  let store = Taro.getStorageSync(FOODKEY)
  if (store) {
    Object.keys(store).map(key => {
      if (store[key]) {
        allPrice += store[key].price * store[key].Num
        allNum += store[key].Num
      }
    })
  }
  return {
    allPrice, allNum
  }
}

export function getEvent() {
  return myEvent
}