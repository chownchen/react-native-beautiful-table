/**
 * loading 组件全局使用
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RootSiblings from 'react-native-root-siblings'

import AsLottie from '../as-lottie'
import loading32 from '~/assets/json/loading-32.json'

const LoadingContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.global}>
        <AsLottie source={loading32} style={styles.gIcon} />
        <Text style={styles.gText}>正在加载</Text>
      </View>
    </View>
  )
}

class LoadingAction extends Component {
  static displayName = 'Loading'

  static show = (
    options = {
      position: '',
      type: ''
    }
  ) => {
    return new RootSiblings(<LoadingContainer visible={true} />)
  }

  static hide = (toast) => {
    if (toast instanceof RootSiblings) {
      toast.destroy()
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`
      )
    }
  }

  _toast = null

  UNSAFE_componentWillMount = () => {
    this._toast = new RootSiblings(<LoadingContainer {...this.props} duration={0} />)
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this._toast.update(<LoadingContainer {...nextProps} duration={0} />)
  }

  componentWillUnmount = () => {
    this._toast.destroy()
  }

  render() {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  global: {
    height: 100,
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gIcon: {
    width: 32,
    height: 32,
    marginBottom: 8
  },
  gText: {
    fontSize: 12,

    color: '#fff'
  }
})

export default LoadingAction
