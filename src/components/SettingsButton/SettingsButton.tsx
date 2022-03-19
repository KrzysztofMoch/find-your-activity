import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

type IconButtonProps = {
  name: string
  size: number
  style: any
  onPress?: () => void
  navigateTo?: string
}

const IconButton: React.FC<IconButtonProps> = ({ name, size, style, onPress, navigateTo }) => {
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