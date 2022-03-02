/**
 * 表格内容
 */
import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { isEmpty } from 'lodash'

import ContentRow from './ContentRow'
import ContentRowSpecial from './ContentRowSpecial'
import Empty from '../empty'

export default function TableContent({
  loading,
  originData,
  data,
  fieldKey,
  flexArr,
  alignArr,
  widthArr,
  // 默认展开项
  defaultExpandIndex,
  // 是否直接展开expand信息
  isExpandShow,
  // 是否能展开
  rowExpandable,
  // 展开项内容渲染
  expandedRender,
  // 行点击回调事件
  onRowPress,
  isSpecial,
  ...others
}) {
  // 当前展示的 expand 索引
  const [showExpandIndex, setShowExpandIndex] = useState(defaultExpandIndex)

  useEffect(() => {
    if (defaultExpandIndex !== undefined) {
      setShowExpandIndex(defaultExpandIndex)
    }
  }, [defaultExpandIndex])

  // 处理行点击回调时间
  const handleRowPress = (item, index) => {
    const isExpanded = showExpandIndex === index
    const nextIndex = isExpanded ? -1 : index
    setShowExpandIndex(nextIndex)
    onRowPress?.(item, index, isExpanded)
  }

  const ContentRowDom = isSpecial ? ContentRowSpecial : ContentRow
  const length = data.length
  // loading加载时不展示空数据界面
  const loadingOpacity = loading === true ? 0 : 1
  return (
    <View>
      {!isEmpty(data) ? (
        data.map((item, index) => {
          const originDataItem = originData?.[index] || {}

          const key = originDataItem?.[fieldKey]

          if (__DEV__) {
            if (!key) {
              console.warn(
                `BeautifulTable expected a api \`fieldKey\`, that can not find its value find in data item now`
              )
            }
          }

          // 判断是否能展开
          const canRowExpand =
            typeof rowExpandable === 'boolean'
              ? rowExpandable
              : rowExpandable?.(originDataItem, index)
          return (
            <ContentRowDom
              originDataItem={originDataItem}
              data={item}
              flexArr={flexArr}
              alignArr={alignArr}
              widthArr={widthArr}
              key={key || index}
              index={index}
              isSpecial={isSpecial}
              isLastRow={length === index + 1}
              canRowExpand={canRowExpand}
              isExpandShow={isExpandShow || showExpandIndex === index}
              onRowPress={canRowExpand ? () => handleRowPress(originDataItem, index) : null}
              expandedDom={canRowExpand ? expandedRender?.(originDataItem, index) : null}
              {...others}
            />
          )
        })
      ) : (
        // 修改透明度减少 dom 重加载次数
        <Empty
          containerStyle={{
            opacity: loadingOpacity,
            maxWidth: Dimensions.get('window').width - 20
          }}
        />
      )}
    </View>
  )
}
