import { Alert, DevSettings } from 'react-native';

const showError = (title: string, message: string) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Restart App',
        onPress: () => DevSettings.reload(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => DevSettings.reload(),
        style: 'default',
      },
    ],
    {
      cancelable: false,
    }
  );
};

const handleNoConnection = () => {
  Alert.alert(
    'No Connection',
    'It looks like you have no internet, please try again',
    [
      {
        text: 'Restart App',
        onPress: () => DevSettings.reload(),
        style: 'cancel',
      },
    ],
    {
      cancelable: false,
    }
  );
};

const handleObsoleteApi = () => {
  Alert.alert(
    'Obsolete Api',
    'It looks like the api is out of date, reset the app. if the error persists let me know.',
    [
      {
        text: 'Restart App',
        onPress: () => DevSettings.reload(),
        style: 'cancel',
      },
    ],
    {
      cancelable: false,
    }
  );
};

export { showError, handleNoConnection, handleObsoleteApi };
