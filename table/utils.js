import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import colors from '~/common/colors'

const { width: screenWidth } = Dimensions.get('window')

export const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

/** 使用多行标题 */
export const multiTitles = (titles = []) => (
  <View>
    {titles.map((title, index) => (
      <Text key={index} style={styles.tableTitle}>
        {title}
      </Text>
    ))}
  </View>
)

const styles = StyleSheet.create({
  tableTitle: {
    fontSize: 11,
    color: colors.remark,
    alignSelf: 'flex-end'
  }
})

/**
 * 根据配置的宽度，适配超出宽度后，自适应拉伸
 * 每一项都已配置width宽度
 * table总宽度占比屏幕宽度是否小于0.9时进行宽度缩放
 * @param widthArr number[]
 * @param totalWidth number
 * @param isSpecial boolean
 */
export const transformFullWidthTable = (widthArr, totalWidth, isSpecial) => {
  // 特殊表格需要去掉padding宽度
  const padding = isSpecial ? 30 : 0
  const screenTableWidth = screenWidth - padding
  const percent = totalWidth / (screenTableWidth - padding)
  // 只有每一项width都存在才进行计算
  const isEveryItemHasWidth = widthArr.every((width) => width)
  if (isEveryItemHasWidth) {
    const needTransform = percent < 0.9
    return {
      calcWidthArr: widthArr.map((width) => {
        // 缩放处理
        return needTransform ? parseInt(width / percent) : width
      }),
      totalWidth: needTransform ? screenTableWidth : totalWidth
    }
  } else {
    return { calcWidthArr: widthArr, totalWidth: totalWidth }
  }
}
