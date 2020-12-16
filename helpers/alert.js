import { Alert } from 'react-native';

export default function customAlert(props) {
  const { actionConfirm, title, message } = props;
  return Alert.alert(message, title, [
    // { text: "Don't leave", style: 'cancel', onPress: () => {} },
    {
      text: 'Ok',
      style: 'destructive',
      onPress: () => actionConfirm(),
    },
  ]);
}
