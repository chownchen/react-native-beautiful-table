/**
 * beautiful-table 组件
 * api 会与 HiUI 基本保持一致，降低用户使用成本
 * 具体 props 参考该文件夹下的 index.d.ts
 */
import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Table } from 'react-native-table-component'

import Content from './Content'
import Header from './Header'
import Loading, { SizeEnum } from '~/components/loading'

import colors from '~/common/colors'

const HEADER_HEIGHT = 38
const CONTENT_ITEM_HEIGHT = 42
const EMPTY_HEIGHT = 150 + 40 + 24

const TableBody = ({
      columns,
      data,
      hideHeader,
      loading,
      fieldKey,
      isSpecial,
      // 行点击展开相关 api
      isExpandShow,
      defaultExpandIndex,
      rowExpandable,
      expandedRender,
      onContentRowPress,
      // 布局回调
      onLayout,
      onGetTableHeight,
      // 横向滚动 api
      scrollHorizontalAble,
      // 样式修改
      scrollViewStyle,
      containerStyle,
      headerStyle,
      headerCellStyle,
      headerTextStyle,
      contentCellStyle,
      filterSetRowStyle,
      contentRowStyle,
      contentTextStyle,
      rowTouchableProps
    }) => {
    const [headerData, setHeaderData] = useState([])
    const [flexArr, setFlexArr] = useState([])
    const [widthArr, setWidthArr] = useState([])
    const [alignArr, setAlignArr] = useState([])
    const [tableData, setTableData] = useState([])
    const [tableOriginData, setTableOriginData] = useState([])
    // data数据预处理完成之前，不展示空数据界面
    const [isReady, setIsReady] = useState(false)

    /**
     * 获取 headerData, flexArr
     */
    useEffect(() => {
      const cacheHeaderData = []
      const cacheFlexArr = []
      const cacheAlignArr = []
      const cacheWidthArr = []
      columns?.forEach((column) => {
        cacheHeaderData.push(column.title)
        cacheFlexArr.push(column.flex)
        cacheAlignArr.push(column.align)
        cacheWidthArr.push(column.width)
      })
      setHeaderData(cacheHeaderData)
      setFlexArr(cacheFlexArr)
      setAlignArr(cacheAlignArr)
      setWidthArr(cacheWidthArr)
    }, [columns])

    /**
     * 获取 tableData
     */
    useEffect(() => {
      const cacheTableData = []
      if (!columns?.length || !data?.length) {
        setTableData(cacheTableData)
        setIsReady(true)
        return
      }
      const dataKeyArr = columns.map((column) => ({
        dataKey: column.dataKey,
        render: column.render ? column.render : undefined
      }))

      data?.forEach((dataItem, index) => {
        const rowData =
          dataKeyArr?.map(({ dataKey, render }) =>
            render ? render(dataItem?.[dataKey], dataItem || {}, index) : dataItem?.[dataKey]
          ) || []
        cacheTableData.push(rowData)
      })
      setTableOriginData([...data])
      setTableData(cacheTableData)
      setIsReady(true)
    }, [columns, data])

    useEffect(() => {
      if (isReady) {
        if (data?.length) {
          onGetTableHeight?.(data.length * CONTENT_ITEM_HEIGHT + HEADER_HEIGHT)
        } else {
          onGetTableHeight?.(EMPTY_HEIGHT + HEADER_HEIGHT)
        }
      }
    }, [data, isReady])

    // 如果未加载完毕，则不展示信息
    if (!isReady) return null

    const tableContent = (
      <View ref={ref} onLayout={onLayout}>
        <Table style={[baseStyles.container, containerStyle]}>
          <Header
            headerData={headerData}
            flexArr={flexArr}
            alignArr={alignArr}
            widthArr={widthArr}
            hideHeader={hideHeader}
            isSpecial={isSpecial}
            headerStyle={headerStyle}
            headerCellStyle={headerCellStyle}
            headerTextStyle={headerTextStyle}
          />
          <Loading size={SizeEnum.Normal} visible={loading}>
            <Content
              loading={loading}
              fieldKey={fieldKey}
              originData={tableOriginData}
              data={tableData}
              flexArr={flexArr}
              alignArr={alignArr}
              widthArr={widthArr}
              isSpecial={isSpecial}
              isExpandShow={isExpandShow}
              defaultExpandIndex={defaultExpandIndex}
              contentCellStyle={contentCellStyle}
              filterSetRowStyle={filterSetRowStyle}
              contentRowStyle={contentRowStyle}
              contentTextStyle={contentTextStyle}
              rowExpandable={rowExpandable}
              expandedRender={expandedRender}
              onRowPress={onContentRowPress}
              rowTouchableProps={rowTouchableProps}
            />
          </Loading>
        </Table>
      </View>
    )

    // 横向滚动
    return scrollHorizontalAble ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={!!data?.length}
        contentContainerStyle={scrollViewStyle}
      >
        {tableContent}
      </ScrollView>
    ) : (
      tableContent
    )
  }

TableBody.displayName = 'TableBody'

TableBody.defaultProps = {
  loading: false,
  isExpandShow: false,
  hideHeader: false,
  rowExpandable: true,
  scrollHorizontalAble: false,
  // 是否为特殊表格
  isSpecial: false,
  defaultExpandIndex: -1,
  fieldKey: 'id'
}

export const baseStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  }
})

export default TableBody
