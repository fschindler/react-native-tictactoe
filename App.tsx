import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Field from './Field';

type Props = {};
type State = {
  court: { [index: number]: number },
};

const EMPTY_CHOICE = 0;
const HUMAN_CHOICE = 1;
const MACHINE_CHOICE = -1;
const INITIAL_COURT = {
  0: EMPTY_CHOICE,
  1: EMPTY_CHOICE,
  2: EMPTY_CHOICE,
  3: EMPTY_CHOICE,
  4: EMPTY_CHOICE,
  5: EMPTY_CHOICE,
  6: EMPTY_CHOICE,
  7: EMPTY_CHOICE,
  8: EMPTY_CHOICE,
};

export default class App extends React.Component<Props, State> {
  state: State = {
    court: INITIAL_COURT,
  };

  componentDidUpdate(): void {
    if (this.countFields(EMPTY_CHOICE) === 0) {
      Alert.alert('Done', undefined, [{ onPress: this.resetCourt }]);
    } else if (this.countFields(HUMAN_CHOICE) > this.countFields(MACHINE_CHOICE)) {
      this.makeMove();
    }
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.court}>
          {Object.values(this.state.court).map((value, index) => (
            <Field
              key={index}
              onPress={() => this.handlePress(index)}
            >
              <Text>{value}</Text>
            </Field>
          ))}
        </View>
      </View>
    );
  }

  resetCourt = (): void => {
    this.setState({
      court: INITIAL_COURT,
    });
  }

  countFields = (value: number): number => {
    return Object.values(this.state.court).filter(v => v === value).length;
  }

  handlePress = (index: number): void => {
    this.setState(state => ({
      court: {
        ...state.court,
        [index]: HUMAN_CHOICE,
      },
    }));
  }

  makeMove = (): void => {
    this.setState(state => {
      const emptyFieldIndices = this.getEmptyFieldIndices(state);

      if (emptyFieldIndices.length === 0) {
        return;
      }

      const random = this.getRandomInt(emptyFieldIndices.length);

      return {
        court: {
          ...state.court,
          [emptyFieldIndices[random]]: MACHINE_CHOICE,
        },
      };
    });
  }

  getEmptyFieldIndices = (state: State): number[] => {
    return Object.values(state.court).reduce((accu, current, index) => {
      return current === 0 ? [ ...accu, index ] : accu;
    }, [] as number[]);
  }

  getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  court: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
