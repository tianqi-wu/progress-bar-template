import React, { useState } from 'react'
import { Animated, Text, View, StyleSheet } from 'react-native'

const ProgressBar = props => {
  const { color_unfinished, color_finished, text, percentage, isNumberShown } =
    props
  const [percentage_state, setPercentage] = useState(percentage)
  const [width, setWidth] = useState(null)
  const height = 24
  const radius = height / 2

  let animation = new Animated.Value(0);

  const onPress = () => {
    Animated.timing(animation, {
        toValue: percentage == 100? 100000000: 100 / (1 - percentage / 100) - 100
    }).start()
}

  const handleLayout = ({ nativeEvent }) => {
    
    console.log(width);
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { prevWidth } = width

    if (width !== prevWidth) {
      setWidth(width)
    }

    

  }

  onPress();

  if (width == null) {
    setWidth(240)
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
            overflow: 'hidden'
          }}
          onLayout={handleLayout}
          //style={{width: width}}
        >
          <Animated.View
            style={{
              backgroundColor: color_finished,
              flex: animation,
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
              borderWidth: 2,
              borderColor: 'gold',
            }}
          ></Animated.View>
          <View
            style={{
              backgroundColor: color_unfinished,
              flex: 100,
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
