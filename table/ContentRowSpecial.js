/**
 * 表格内容区域一行
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Row from './Row'

export default function ContentRow({
  // 行数据
  index,
  originDataItem,
  data,
  flexArr,
  alignArr,
  widthArr,
  isLastRow,
  canRowExpand,
  isExpandShow,
  onRowPress,
  expandedDom,
  // 样式
  filterSetRowStyle,
  contentRowStyle,
  contentCellStyle,
  contentTextStyle,
  ...others
}) {
  return (
    <>
      <View style={styles.contentRowWrap}>
        <View style={styles.borderTop} />
        <Row
          data={data}
          flexArr={flexArr}
          alignArr={alignArr}
          widthArr={widthArr}
          canRowExpand={canRowExpand}
          contentCellStyle={contentCellStyle}
          onRowPress={onRowPress}
          style={[styles.contentRow, contentRowStyle || filterSetRowStyle?.(originDataItem, index)]}
          contentTextStyle={[styles.text, contentTextStyle]}
          {...others}
        />
      </View>
      {isExpandShow && expandedDom}
    </>
  )
}

const styles = StyleSheet.create({
  contentRowWrap: {
    position: 'relative'
  },
  contentRow: {
    height: 43
  },
  text: {
    fontSize: 11,
    color: '#333'
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: 15,
    borderTopColor: '#D8D8D8',
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
