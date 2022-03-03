# React Native Beautiful Table

## 介绍
这是一个 api 类似 `antd-table` 的 react-native 组件库，用配置化的方式使用非常方便

## 功能
  - 配置化的表格，提供一定的基础样式
  - 支持内容全部自定义
  - 支持列冻结
  - 支持点击展开子内容
  - 支持支持列横向竖向滚动（包括列冻结时的滚动一致性）
  - 样式调整

它借用了 `react-native-table-component` 组件的能力，并进行了深度优化和改进
如果您对项目感兴趣，请通过电子邮件联系ichenzhangdong@foxmail.com.

<br/><br/>

为react-native设计的表格组件.

- [安装](#安装)
- [版本日志](#版本日志)
- [示例](#示例)
- [组件属性](#组件属性)
- [注意事项](#注意事项)
- [License](#license)

[Switch to English document](https://github.com/chownchen/react-native-beautiful-table#Changelogs)
<br/><br/>

## 安装
> npm install react-native-beautiful-table

`USE:`
```jsx
import BeautifulTable from 'react-native-beautiful-table';
```

## 版本日志
+ [v1.0.0]
  - 组件初始化;

<br/><br/>

## Examples

#### 例一 一般使用
<img src="https://github.com/chownchen/tools_file/blob/main/beautiful-table-demo.jpg?raw=true" width="320"/>

```jsx
import React from 'react';
import { View } from 'react-native';
import BeautifulTable from 'react-native-beautiful-table';

const demoPage = () => {

  const columns = [
    {
      title: '序号',
      dataKey: 'id',
      width: 50,
    },
    {
      title: '品牌',
      dataKey: 'brand',
      flex: 1
    },
    {
      title: '手机名',
      dataKey: 'name',
      flex: 1
    },
    {
      title: '模型',
      dataKey: 'model',
      align: 'right',
      flex: 1
    }
  ]

  const data = [
    {
      brand: '小米',
      name: '小米11',
      id: '1',
      model: '128+8'
    },
    { brand: '小米', name: '小米12', id: '2', model: '256+8' },
    { brand: 'redMi', name: 'redMi 10', id: '3', model: '256+12' },
    { brand: 'redMi', name: 'redMi 超级超级豪华至尊尊享王者版', id: '4', model: '256+12' }
  ]

  return (
    <View flex={1}>
     <BeautifulTable containerStyle={{paddingHorizontal: 20}} columns={columns} data={data} />
  </View>
  )
}
```

---

#### 例二 自定义内容 左侧列冻结

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import BeautifulTable from 'react-native-beautiful-table';

const demoPage = () => {

  const columns = [
    {
      title: '序号',
      dataKey: 'id',
      width: 200,
      fixed: 'left'
    },
    {
      title: <Text>品牌</Text>,
      dataKey: 'brand',
      width: 200,
    },
    {
      title: '手机名',
      dataKey: 'name',
      width: 200,
    },
    {
      title: '模型',
      dataKey: 'model',
      align: 'right',
      width: 200,
    }
  ]

  const data = [
    {
      brand: '小米',
      name: <Text style={{ fontWeight: 'bold' }}>小米11</Text>,
      id: '1',
      model: '128+8',
    },
    { brand: '小米', name: '小米12', id: '2', model: '256+8' },
    { brand: 'redMi', name: 'redMi 10', id: '3', model: '256+12' },
    { brand: 'redMi', name: 'redMi 超级超级豪华至尊尊享王者版', id: '4', model: '256+12' }
  ]

  return (
    <View flex={1}>
     <BeautifulTable columns={columns} data={data} />
  </View>
  )
}
```

---

#### 例三 点击子列表展开
```jsx
import React from 'react';
import { View, Text } from 'react-native';
import BeautifulTable from 'react-native-beautiful-table';

const demoPage = () => {

  const columns = [
    {
      title: '序号',
      dataKey: 'id',
      width: 200,
      fixed: 'left',
      render (key, item) {
        return <Text>自定义序号 {key}</Text>
      }
    },
    {
      title: <Text>品牌</Text>,
      dataKey: 'brand',
      width: 200,
    },
    {
      title: '手机名',
      dataKey: 'name',
      width: 200,
    },
    {
      title: '模型',
      dataKey: 'model',
      align: 'right',
      width: 200,
    }
  ]

  const data = [
    {
      brand: '小米',
      name: <Text style={{ fontWeight: 'bold' }}>小米11</Text>,
      id: '1',
      model: '128+8',
    },
    { brand: '小米', name: '小米12', id: '2', model: '256+8' },
    { brand: 'redMi', name: 'redMi 10', id: '3', model: '256+12' },
    { brand: 'redMi', name: 'redMi 超级超级豪华至尊尊享王者版', id: '4', model: '256+12' }
  ]

  return (
    <View flex={1}>
      <BeautifulTable
        columns={columns}
        data={data}
        isExpandShow
        contentCellStyle={{ justifyContent: 'flex-start' }}
        filterSetRowStyle={(item, index) => {
          // 控制某几项的样式
          return index === 1 && { backgroundColor: 'pink' }
        }}
        onContentRowPress={(item, index) => {
          alert('我点击了行')
        }}
        // 点击 table 后，展开子项
        expandedRender={(item, index) => {
          return (
            <BeautifulTable
              hideHeader
              columns={columns}
              data={data}
              containerStyle={{ backgroundColor: 'pink' }}
            />
          )
        }}
      />
  </View>
  )
}
```

---

<br/><br/>

## 组件属性
| 属性              | 类型  | 描述 | 默认值 |
|---|---|---|---|
| <b>columns</b>       | ColumnItem | 组件数据 | `[]` |
| <b>data</b>      | object | 数据内容 | `[]` |
| <b>fieldKey</b>      | string | 数据唯一标识 | `id` |
| <b>isExpandShow</b>      | boolean | 是否默认展开拓展项 | false |
| <b>defaultExpandIndex</b>      | boolean | 默认展示的展开项索引 |  |

其他信息参考 `libs/index.d.ts` api 描述文件，里面有详细的介绍


### ColumnItem 属性
| 属性              | 类型  | 描述 | 默认值 |
|---|---|---|---|
| <b>dataKey</b>       | string | 键值名称 |  |
| <b>title</b>      | string | JSX.Element | 标题内容 |  |
| <b>flex</b>      | number | 布局宽度占比 | 1 |
| <b>width</b>      | number | 宽度具体值 |  |
| <b>align</b>      | 'left' \| 'center' \| 'right' | 文字对齐方式 | 'left' |
| <b>fixed</b>      | 'left' \| 'right' | 列冻结 |  |
| <b>render</b>      | (text: string, row: ITableDataItem, index: number) => JSX.Element |  |  |

---

<br/><br/>

## 注意事项

+ Col和Cols里的单元格无法做到每行自适应高度
+ 请在textStyle属性里设置margin值来调整内边距，不要用padding值

## License

[MIT](LICENSE)
