/**
 * beautiful-table 组件
 * api 会与 HiUI 基本保持一致，降低用户使用成本
 * 具体 props 参考该文件夹下的 index.d.ts
 */
import React, { useMemo, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import TableBody from './table'

import { sum } from './utils'

export default function AsTable({
  data,
  columns,
  scrollHorizontalAble,
  onContentRowPress,
  // 列冻结三部分的expandRender分开
  expandedRender,
  fixedLeftExpandedRender,
  fixedRightExpandedRender,
  defaultExpandIndex,
  isSpecial,
  // 列冻结相关api
  fixedLeftStyle,
  fixedRightStyle,
  fixedNormalStyle,
  containerStyle,
  ...props
}) {
  const [expandIndex, setExpandIndex] = useState(defaultExpandIndex)
  // 分离冻结列和正常列columns
  const { left, right, normal } = useMemo(() => {
    const finalColumn = {
      left: [],
      right: [],
      normal: []
    }
    columns?.forEach((column) => {
      finalColumn[column?.fixed || 'normal']?.push(column)
    })
    return finalColumn
  }, [columns])

  // 判断是否为列冻结表格
  const isFixedTable = left.length || right.length

  // 有数据时才渲染列冻结表格
  if (isFixedTable && data?.length) {
    // 计算冻结列宽度
    const fixedLeftWidth = sum(left.map((item) => item.width))
    const fixedRightWidth = sum(right.map((item) => item.width))

    const handleContentRowPress = (item, index) => {
      const isExpand = expandIndex === index ? -1 : index
      setExpandIndex(isExpand)
      onContentRowPress?.(item, index, expandIndex === index)
    }

    return (
      <View style={[styles.fixedWrap, containerStyle]}>
        {/* 左冻结 */}
        {left?.length > 0 && (
          <View style={{ width: fixedLeftWidth }}>
            <TableBody
              isSpecial={false}
              defaultExpandIndex={expandIndex}
              expandedRender={fixedLeftExpandedRender}
              onContentRowPress={handleContentRowPress}
              containerStyle={fixedLeftStyle}
              columns={left}
              data={data}
              {...props}
            />
          </View>
        )}
        {normal.length > 0 && (
          <TableBody
            isSpecial={false}
            scrollHorizontalAble
            defaultExpandIndex={expandIndex}
            expandedRender={expandedRender}
            onContentRowPress={handleContentRowPress}
            containerStyle={fixedNormalStyle}
            columns={normal}
            data={data}
            {...props}
          />
        )}
        {/* 右冻结 */}
        {right?.length > 0 && (
          <View style={{ width: fixedRightWidth }}>
            <TableBody
              isSpecial={false}
              defaultExpandIndex={expandIndex}
              expandedRender={fixedRightExpandedRender}
              onContentRowPress={handleContentRowPress}
              containerStyle={fixedRightStyle}
              columns={right}
              data={data}
              {...props}
            />
          </View>
        )}
      </View>
    )
  }

  // 一般表格
  return (
    <TableBody
      columns={columns}
      data={data}
      isSpecial={isSpecial}
      defaultExpandIndex={defaultExpandIndex}
      expandedRender={expandedRender}
      onContentRowPress={onContentRowPress}
      scrollHorizontalAble={scrollHorizontalAble}
      containerStyle={containerStyle}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  fixedWrap: {
    flexDirection: 'row',
    flex: 1
  }
})
