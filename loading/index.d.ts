import React from 'react'
import { StyleProp, ViewStyle, TextStyle } from 'react-native'

/**
 * loading api
 */
export interface IProps {
  /**
   * 是否展示 loading
   * 默认：false
   */
   visible: boolean
  /**
   * loading 样式
   * 默认 small
   */
  size?: 'small' | 'normal'
  /**
   * loading 文案
   * 默认 正在加载
   */
  text?: string
   /**
   * 子元素
   */
  children: JSX.Element
  /**
   * 组件样式
   */
  containerStyle?: StyleProp<ViewStyle>
  loadingStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}
