import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

interface IconButtonProps {
  name: string
  size: number
  style: any
  onPress?: () => void | undefined
  navigateTo?: string | undefined
}

const IconButton = ({ name, size, style, onPress, navigateTo }: IconButtonProps) => {
  const naviagtion = useNavigation();

  // ------------------------- Handlers ---------------------------------

  const handleOnPress = () => {
    if(onPress !== undefined) {
      onPress()
    }
    else if (navigateTo !== undefined) {
      naviagtion.navigate(navigateTo)
    }
  }

  // ------------------------- Render functions -------------------------

  return (
    <TouchableOpacity style={style} onPress={handleOnPress}>
      <Icon name={name} size={size} />
    </TouchableOpacity>
  )
}

export default IconButton