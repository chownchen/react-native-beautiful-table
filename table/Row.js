/**
 * react-native-table-component 组件 Row 魔改
 */
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Cell } from 'react-native-table-component'

import { sum, transformFullWidthTable } from './utils'

const DEFAULT_ALIGN = 'left'

const styleAlignEnum = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

export default function Row(props) {
  const {
    data,
    style,
    height,
    flexArr,
    widthArr,
    alignArr,
    isHeader,
    headerTextStyle,
    contentTextStyle,
    canRowExpand,
    headerCellStyle,
    contentCellStyle,
    onRowPress,
    isSpecial,
    rowTouchableProps = {},
    ...others
  } = props

  const width = widthArr ? sum(widthArr) : 0
  const { calcWidthArr, totalWidth } = transformFullWidthTable(widthArr, width, isSpecial)
  const extraWidth = isSpecial ? 30 : 0
  const length = data.length

  const RowContent = (
    // 加上 row 外部的 paddingHorizontal
    <View
      style={[
        height && { height },
        // 特殊表格宽度需要加上 padding
        width && { width: totalWidth + extraWidth },
        {
          paddingHorizontal: isSpecial ? 15 : 0
        },
        styles.row,
        style
      ]}
    >
      {data.map((item, i) => {
        const flex = flexArr?.[i]
        const cellWidth = calcWidthArr?.[i]
        const align = alignArr?.[i] || DEFAULT_ALIGN

        return (
          <Cell
            key={i}
            data={item}
            width={cellWidth}
            height={height}
            flex={flex}
            style={[
              {
                // td之间需要间距
                paddingRight: length === i + 1 ? 0 : 8,
                // 排列方式
                alignItems: styleAlignEnum[align]
              },
              isHeader ? headerCellStyle : contentCellStyle
            ]}
            textStyle={isHeader ? headerTextStyle : contentTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
            {...others}
          />
        )
      })}
    </View>
  )

  return data ? (
    canRowExpand ? (
      <TouchableOpacity onPress={onRowPress} {...rowTouchableProps}>
        {RowContent}
      </TouchableOpacity>
    ) : (
      RowContent
    )
  ) : null
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  }
})

Row.defaultProps = {
  contentCellStyle: {}
}
