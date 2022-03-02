import { StyleProp, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native'

/**
 * 表头配置
 */
interface IColumnItem {
  /**
   * data字段
   */
  dataKey: string
  /**
   * 标题
   */
  title: string | JSX.Element
  /**
   * 列占据比例
   */
  flex: number
  /**
   * 列占据s宽度
   * 建议优先使用 flex api 布局
   */
  width?: number
  /**
   * 列占据比例
   * 默认 'left'
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 标示该项为哪一边的列冻结
   * 注意：如果设置了fixed, 则一定需要指定当前column的width
   */
  fixed?: 'left' | 'right'
  /**
   * 自定义渲染方法
   */
  render?: (text: string, row: ITableDataItem, index: number) => JSX.Element
}

/**
 * data 数据配置
 */
interface ITableDataItem {
  [key: string]: string | number | JSX.Element | any
}

interface ILayoutEvent {
  nativeEvent: {
    layout: {
      x: number,
      y: number,
      width: number,
      height: number,
    }
  }
}

/**
 * beautiful-table api
 */
export interface IProps {
  /**
   * 表头
   */
  columns: IColumnItem[]
  /**
   * 数据
   */
  data: ITableDataItem[]
  /**
   * data 中每一项的唯一标识 key
   * 默认：'id'
  */
  fieldKey: string
   /**
   * 是否展示表格头部
   * 默认：false
   */
  hideHeader?: boolean
  /**
   * 展示 loading
   * 默认：false
   */
  loading?: boolean
  /**
   * 是否为特殊表格（宽度撑满100%，有内边距，且border不撑满宽度）
   * 默认：false
   */
  isSpecial?: boolean
  /**
   * 是否默认展开拓展项
   * 默认：false
   */
  isExpandShow?: boolean
  /**
   * 默认展示的展开项索引
   */
  defaultExpandIndex?: number
  /**
   * 是否允许行点击
   */
  rowExpandable?: (item: ITableDataItem, index?: number ) => boolean | boolean
  /**
   * TouchableOpacity上的额外属性
   */
  rowTouchableProps?: TouchableOpacityProps
  /**
   * 点击行渲染内容
   */
  expandedRender?: (item: ITableDataItem, index: number) => JSX.Element
  /**
   * 如下两个api只在列冻结时使用
   * 列冻结三部分的 expandRender 分开
   */
  fixedLeftExpandedRender?: (item: ITableDataItem, index: number) => JSX.Element
  fixedRightExpandedRender?: (item: ITableDataItem, index: number) => JSX.Element
  /**
   * table 内容区域行点击事件回调函数
   */
  onContentRowPress?: (item: ITableDataItem, index: number, isExpanded: boolean) => void
  /**
   * 获取布局信息
  */
  onLayout?: (e: ILayoutEvent) => void
  onGetTableHeight?: (height: number) => void
  /**
   * 横向滚动
   */
  scrollHorizontalAble?: boolean
  /**
   * table 包裹样式
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * table 列冻结时 api
   */
  fixedLeftStyle?: StyleProp<ViewStyle>
  fixedRightStyle?: StyleProp<ViewStyle>
  fixedNormalStyle?: StyleProp<ViewStyle>
  /**
   * 表格外部 ScrollView 组件样式
   */
  scrollViewStyle?: StyleProp<ViewStyle>
  /**
   * 表头区域样式
   */
  headerStyle?: StyleProp<ViewStyle>
  headerCellStyle?: StyleProp<ViewStyle>
  headerTextStyle?: StyleProp<TextStyle>
  /**
   * 内容区域样式
   * filterSetRowStyle: 根据 item 自行校验是否需要增加样式
   */
  filterSetRowStyle?: (item: ITableDataItem, index: number) => StyleProp<ViewStyle>
  contentRowStyle?: StyleProp<ViewStyle>
  contentCellStyle?: StyleProp<ViewStyle>
  contentTextStyle?: StyleProp<TextStyle>
}
