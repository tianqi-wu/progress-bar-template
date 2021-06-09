import React, { useState, useEffect } from 'react'
import { Animated, Text, View, StyleSheet } from 'react-native'

const ProgressBar = props => {
  const {
    color_unfinished,
    color_finished,
    borderWidth,
    borderColor,
    text,
    value,
    maxValue,
    isNumberShown,
    borderRadius,
  } = props

  const DEFAULT_VALUE = value

  const DEFAULT_MAX_VALUE = maxValue

  let percentage = Math.round((value / maxValue) * 100)

  const [percentage_state, setPercentage] = useState(percentage)
  const [width, setWidth] = useState(240)
  const height = 24

  let animation = new Animated.Value(0)

  const onPress = () => {
    Animated.timing(animation, {
      toValue:
        percentage == 100 ? 100000000 : 100 / (1 - percentage / 100) - 100,
    }).start()
  }

  const handleLayout = ({ nativeEvent }) => {
    const { prevWidth } = width
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    console.log(width)

    if (width !== prevWidth) {
      setWidth(width)
    }
  }

  const styleForAnimatedView = {
    backgroundColor: color_finished,
    flex: percentage > 100 || percentage < 0 ? 100 : animation,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: borderColor,
  }

  const styleForStaticView = {
    backgroundColor: color_unfinished,
    flex: 100,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: borderColor,
  }

  useEffect(() => {
    // Update the document title using the browser API
    onPress()
  }, [value, maxValue])

  return (
    <>
      <View
        style={[
          styles.row_wrapper,
          {
            height: height,
            overflow: 'hidden',
          },
        ]}
        onLayout={handleLayout}
        //style={{width: width}}
      >
        {width != null && (
          <>
            <Animated.View style={styleForAnimatedView}></Animated.View>
            <View style={styleForStaticView}></View>

            {isNumberShown && (
              <Text style={styles.wrapper}>
                {percentage <= 100 && percentage >= 0
                  ? `${percentage}%`
                  : 'NaN%'}
              </Text>
            )}
          </>
        )}
      </View>
    </>
  )
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
