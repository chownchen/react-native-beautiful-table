/**
 * 表格头部
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { isEmpty } from 'lodash'

import Row from './Row'

export default function TableHeader({
  headerData,
  hideHeader,
  flexArr,
  alignArr,
  widthArr,
  isSpecial,
  headerCellStyle,
  headerStyle,
  headerTextStyle
}) {
  if (isEmpty(headerData) || hideHeader) return null

  return (
    <Row
      isHeader
      data={headerData}
      flexArr={flexArr}
      alignArr={alignArr}
      widthArr={widthArr}
      isSpecial={isSpecial}
      style={[styles.head, !isSpecial && styles.borderBottom, headerStyle]}
      headerTextStyle={[styles.text, headerTextStyle]}
      headerCellStyle={headerCellStyle}
    />
  )
}

const styles = StyleSheet.create({
  head: {
    height: 38
  },
  text: { fontSize: 11, color: '#999' },
  borderBottom: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
