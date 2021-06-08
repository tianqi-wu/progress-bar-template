import React, { useState } from 'react'
import { Animated, Text, View, StyleSheet } from 'react-native'

const ProgressBar = props => {
  const { color_unfinished, color_finished, text, percentage, isNumberShown } =
    props
  const [percentage_state, setPercentage] = useState(percentage)
  const [width, setWidth] = useState(240)
  const height = 24
  const radius = height / 2

  animVal = new Animated.Value(0);


  const handleLayout = ({ nativeEvent }) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { prevWidth } = width

    if (width !== prevWidth) {
      setWidth(width)
    }
  }

  if (width == null) {
    return <View></View>
  }

  if (percentage > 100 || percentage < 0) {
    return <Text style={{ color: 'red' }}>Invalid Result</Text>
  } else {
    return (
      <>
        <View
          style={{
            flexDirection: styles.row_wrapper.flexDirection,
            height: height,
            overflow: 'hidden',
          }}
          onLayout={handleLayout}
          //style={{width: width}}
        >
          <View
            style={{
              backgroundColor: color_finished,
              flex: percentage / 100,
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
              borderWidth: 2,
              borderColor: 'gold',
            }}
          ></View>
          <View
            style={{
              backgroundColor: color_unfinished,
              flex: (100 - percentage) / 100,
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
              borderWidth: 2,
              borderColor: 'gold',
            }}
          ></View>
          {isNumberShown && (
            <Text style={styles.wrapper}>{`${percentage}%`}</Text>
          )}
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row_wrapper: {
    flexDirection: 'row',
  },
})

export default ProgressBar
