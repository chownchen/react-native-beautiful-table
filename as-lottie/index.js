/**
 * AsLottie 组件
 * 解析 Adobe After Effects（AE）生成的 JSON 文件
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

/**
 *
 * @param {object} source 这个字段一定要传，不然 APP 会崩溃
 * @returns
 */
export default function AsLottie({ source, isAuto, progress, isLoop, style }) {
  return (
    <LottieView
      source={source}
      autoPlay={isAuto}
      progress={progress}
      loop={isLoop}
      enableMergePathsAndroidForKitKatAndAbove
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32
  }
})

AsLottie.defaultProps = {
  progress: 0,
  isAuto: true,
  isLoop: true
}
