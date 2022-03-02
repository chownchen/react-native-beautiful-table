/**
 * 表格内容区域一行
 */
import React from 'react'
import { StyleSheet } from 'react-native'

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
      <Row
        data={data}
        flexArr={flexArr}
        alignArr={alignArr}
        widthArr={widthArr}
        canRowExpand={canRowExpand}
        contentCellStyle={contentCellStyle}
        onRowPress={onRowPress}
        style={[
          styles.contentRow,
          !isLastRow && styles.borderBottom,
          contentRowStyle || filterSetRowStyle?.(originDataItem, index)
        ]}
        contentTextStyle={[styles.text, contentTextStyle]}
        {...others}
      />
      {isExpandShow && expandedDom}
    </>
  )
}

const styles = StyleSheet.create({
  contentRow: {
    height: 43
  },
  text: {
    fontSize: 11,
    color: '#333'
  },
  borderBottom: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
