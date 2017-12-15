import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>スクラッチちゃん</Text>
        <Button title="💩 うんちをしました" />
        <Button title="🐕 散歩に行きました" />
        <Button title="おしっこをしました" />
        <Button title="ごはんを食べました" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
