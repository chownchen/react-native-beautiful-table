/**
 * Empty 组件
 * 空数据、无网络、加载失败 展示
 * 具体 props 参考该文件夹下的 index.d.ts
 */
import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Empty({ containerStyle, text }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.descText}>{text || desc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  descText: {
    color: '#999',
    fontSize: 14
  }
})

export default memo(Empty)
