import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import APP_COLORS from '../../common/colors'
import activityData from '../../types/activityData'
import { setData, setShowProperties } from '../../redux/dataSlice'
import { getActivityByProperties, getRandomActivity } from '../../api/boredApi'
import { RootReducer } from '../../redux/store'


const CONFIG = {
  height: 340,
  width: '90%'
}

const ActivitySwiper = () => {

  const dispatch = useDispatch();
  const options = useSelector((state: RootReducer) => state.options)

  const [bufferedData, setBufferedData] = useState<Array<activityData>>([
    {
      activity: 'Swap Down To Start',
      accessibility: 0,
      activityType: '',
      participants: 0,
      price: 0,
      key: 0
    }
  ])
  
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if(currentIndex === 0 && bufferedData[0].key === 0) return;

    dispatch(setData({ ...bufferedData[currentIndex], showProperties: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // DEBUG
  // useEffect(() => {
  //   console.log('index', currentIndex)
  //   console.log(`----------- count {${bufferedData.length}}-----------`)
  //   bufferedData.forEach(a => console.log(a.key, '-', a.activity))
  // }, [bufferedData])

  // ------------------------- Handler -------------------------

  const handleEndReached = async () => {
    // const randomActivity = await getRandomActivity();
    const randomActivity = await getActivityByProperties(options)
    const newBufferedData = [...bufferedData, randomActivity]

    // removing top item is so bug
    // if(newBufferedData.length > 8){
    //   newBufferedData.shift()
    //   flatListRef.current?.scrollToIndex({animated: false, index: currentIndex})
    // }

    setBufferedData(newBufferedData)
  }

  // ------------------------- Render Functions -------------------------

  const renderItem = (item: activityData) => (
    <View style={styles.card}>
      <Text style={styles.text}>{item.activity}</Text>
    </View>
  )
  
  return (
    <FlatList
      ref={flatListRef}
      style={styles.container} 
      data={bufferedData}
      renderItem={({item}) => { return renderItem(item) }}
      snapToAlignment='start'
      decelerationRate={10}
      snapToInterval={CONFIG.height}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={3}
      getItemLayout={(data, index) => (
        {length: CONFIG.height, offset: CONFIG.height * index, index}
      )}
      onMomentumScrollEnd={
        (event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.y / CONFIG.height);

          if(newIndex !== currentIndex){
            setCurrentIndex(newIndex);
          }
        }
      }
      onMomentumScrollBegin={
        () => dispatch(setShowProperties(false))
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: CONFIG.width,
    height: CONFIG.height,
    backgroundColor: APP_COLORS.lightNightBlue
  },
  card: {
    width: '100%',
    paddingHorizontal: 12, 
    height: 340,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: APP_COLORS.white,
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 0.7,
    marginVertical: 2,
  }
})

export default ActivitySwiper