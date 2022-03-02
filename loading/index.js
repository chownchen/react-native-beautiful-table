/**
 * Loading 组件
 * 具体 props 参考该文件夹下的 index.d.ts
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'

import AsLottie from '../as-lottie'

import loading32 from './loading-32.json'

/**
 * normal loading不带文字，用于覆盖弹层加载
 */
export const SizeEnum = {
  Small: 'small',
  Normal: 'normal'
}

const FontSizeEnum = {
  [SizeEnum.Normal]: {
    source: loading32,
    style: {
      width: 32,
      height: 32
    },
    wrapStyle: {}
  }
}
export default function Loading({
  visible,
  size,
  children,
  containerStyle,
  loadingStyle,
}) {
  const { source, wrapStyle, style } = FontSizeEnum[size] || FontSizeEnum[SizeEnum.Small]
  return (
    <View style={[styles.container, containerStyle]}>
      {children}
      {visible ? (
        <View style={[styles.loading, wrapStyle, loadingStyle]}>
          <AsLottie source={source} style={style} />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  }
})

Loading.defaultProps = {
  visible: false,
  size: SizeEnum.Normal
}
