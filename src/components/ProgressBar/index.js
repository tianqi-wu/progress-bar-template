import React, {useState} from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ProgressBar = props => {
  const { color_unfinished, color_finished, text, percentage, height, isNumberShown } = props
  const [percentage_state, setPercentage] = useState(percentage);
  const radius = height / 2;

  
  if(percentage > 100 || percentage < 0) {
    return (
        <Text style={{color: 'red'}}>Invalid Result</Text>
    )} else {
      return (
    

    
      <>
        <View style={{ flexDirection: styles.row_wrapper.flexDirection, height: height, overflow: 'hidden'}}>
        <View style={{ backgroundColor: color_finished, flex: percentage / 100, borderTopLeftRadius: radius, borderBottomLeftRadius: radius, borderWidth: 2, borderColor: 'gold'}}></View>
        <View style={{ backgroundColor: color_unfinished, flex: (100 - percentage) / 100, borderTopRightRadius: radius,  borderBottomRightRadius: radius, borderWidth: 2, borderColor: 'gold' }}></View>
        {isNumberShown && <Text style={styles.wrapper}>{ `${percentage}%`}</Text>}
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
