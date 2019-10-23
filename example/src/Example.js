import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Switch,
  Modal,
  StyleSheet
} from 'react-native'
import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager'

const inputKeys = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6',
    'textarea1', 'textarea2', 'textarea3', 'textarea4',]

class Example extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { enableDisable: true }
  }

  componentDidMount() {
    /* Default values */
    KeyboardManager.setEnable(true)
    KeyboardManager.setEnableDebugging(false)
    KeyboardManager.setKeyboardDistanceFromTextField(10)
    KeyboardManager.setEnableAutoToolbar(true)
    KeyboardManager.setToolbarDoneBarButtonItemText("Done")
    KeyboardManager.setToolbarManageBehaviour(0)
    KeyboardManager.setToolbarPreviousNextButtonEnable(true)
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false)
    KeyboardManager.shouldShowToolbarPlaceholder(true)
    KeyboardManager.setOverrideKeyboardAppearance(false)
    KeyboardManager.setShouldResignOnTouchOutside(true)
    KeyboardManager.resignFirstResponder()
  }

  componentDidUpdate() {
    KeyboardManager.isKeyboardShowing().then((isShowing) => {
      console.log("isKeyboardShowing: " + isShowing)
    })
  }

  onEnableDisable = (value) => {
    KeyboardManager.setEnable(value)
    this.setState({
        enableDisable: value
    })
  }

  render() {
    const self = this
    var inputs = []

    for (let i = 0; i < inputKeys.length; i++) {
      let ref = inputKeys[i]
      let nextRef = i < inputKeys.length - 1 ? inputKeys[i + 1] : ''
      let nextFocus = () => { self.refs[nextRef] ? self.refs[nextRef].focus() : null }

      const multiline = ref.startsWith('textarea')
      inputs.push((
        <View key={i} style={{ padding: 10 }}>
          <Text >{ref}</Text>
          <TextInput style={styles.input}
            ref={ref}
            value={this.state[ref]}
            onChangeText={text => {
              let state = {}
              state[ref] = text
              self.setState(state)
            }}
            placeholder={ref}
            onSubmitEditing={!multiline ? nextFocus : undefined}
            multiline={multiline}
            numberOfLines={multiline ? 10 : 1}
            returnKeyType={multiline ? 'default' : 'next'}
            onLayout={() => {
              // When the input size changes, it updates the keyboard position.
              KeyboardManager.reloadLayoutIfNeeded()
            }}
          />
        </View>
      ))
    }

    return (
      <View style={{ flex: 1 }}>
        <Modal visible={true}>
          <PreviousNextView style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                <Text style={{ marginTop: 50, textAlign: "center" }}>React-Native Keyboard Manager</Text>
                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                  <Text>Enable/Disable </Text>
                  <Switch onValueChange={this.onEnableDisable} value={this.state.enableDisable} />
                </View>
              </View>

              <View>{inputs}</View>
            </ScrollView>

          </PreviousNextView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 5
  }
})

export default Example