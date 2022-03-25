import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import APP_COLORS from "../../common/colors";
import { setParticipants } from "../../redux/optionsSlice";

import { RootReducer } from "../../redux/store";
import IconButton from "../IconButton/IconButton";

const ParticipantsOption = () => {

  const dispatch = useDispatch()
  const options = useSelector((state: RootReducer) => state.options)

  // ------------------------- Handlers -------------------------
  
  const handlePress = (decrease: boolean) => {
    if(!decrease && options.participants - 1 < 1) return;

    const value = decrease ? 1 : -1
    dispatch(setParticipants(options.participants + value))
  }

  // ------------------------- Render Functions -------------------------

  return (
    <View style={styles.participantsSettingsContainer}>
      <View style={styles.participantsSettings}>
        <IconButton name='remove-circle' size={36} onPress={() => handlePress(false)} />
        <Text style={styles.participantsSettingsText}>{`Participants count: ${options.participants}`}</Text>
        <IconButton name='add-circle' size={36} onPress={() => handlePress(true)} />
      </View>
      <Text style={styles.description}>
        The number of people that this activity could involve
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    padding: 5,
    color: APP_COLORS.white,
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  participantsSettings: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  participantsSettingsContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
  },
  participantsSettingsText: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
  },
})

export default ParticipantsOption;