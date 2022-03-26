import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

import APP_COLORS from '../../common/colors';

const AboutAppScreen = () => {
  const URLS = {
    githubProfile: 'https://github.com/KrzysztofMoch/',
    githubProject: 'https://github.com/KrzysztofMoch/find-your-activity',
    boredApi: 'https://www.boredapi.com/',
    boredApiAddActivity: 'https://www.boredapi.com/contributing',
  };

  // ------------------------- Handlers -------------------------

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // ------------------------- Render Functions -------------------------

  const renderAuthor = () => (
    <View style={styles.separator}>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => openLink(URLS.githubProfile)}
      >
        <Text style={styles.smallText}>Author: Krzysztof Moch</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => openLink(URLS.githubProfile)}
      >
        <Text style={styles.smallText}>Source Code</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBoredApi = () => (
    <View style={styles.separator}>
      <TouchableOpacity style={styles.contentContainer} onPress={() => openLink(URLS.boredApi)}>
        <Text style={styles.smallText}>Make sure to visit their site !!!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => openLink(URLS.boredApiAddActivity)}
      >
        <Text style={styles.smallText}>Contributing</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>FindYourActivity</Text>
      </View>
      {renderAuthor()}
      <View style={styles.contentContainer}>
        <Text style={styles.text}>BORED API</Text>
      </View>
      {renderBoredApi()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.nightBlue,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
  },
  contentContainer: {
    width: '100%',
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: APP_COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.7,
    marginVertical: 2,
  },
  separator: {
    backgroundColor: APP_COLORS.black,
    width: '90%',
    marginVertical: 8,
    borderRadius: 30,
  },
  smallText: {
    color: APP_COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.7,
    marginVertical: 2,
  },
});

export default AboutAppScreen;
