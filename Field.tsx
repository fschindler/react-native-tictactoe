import * as React from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

type Props = {
  onPress: () => void,
  children: React.ReactNode,
};

export default class Field extends React.Component<Props> {
  render(): React.ReactNode {
    const { width: windowWidth } = Dimensions.get('window');
    const size = windowWidth * 0.3;

    return (
      <View style={[ styles.container, { width: size, height: size } ]}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.inner} >
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  inner: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
