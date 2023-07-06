import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'

const styles = StyleSheet.create({
  AndroidSafeView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})

export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.AndroidSafeView, style]}>
      {children}
    </SafeAreaView>
  )
}
