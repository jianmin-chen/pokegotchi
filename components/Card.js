import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f9fafb',
    borderRadius: 15
  },
  text: {
    fontFamily: 'DMSans',
    fontSize: 20
  },
  name: {
    textAlign: 'center',
    marginVertical: 8
  }
})

export default function Card({ navigation, id, sprite, name }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Pokemon', { id })}>
      <Image
        style={styles.image}
        source={{
          uri: sprite,
          width: (Dimensions.get('window').width - 72) / 2,
          height: (Dimensions.get('window').width - 72) / 2
        }}
      />
      <Text style={[styles.text, styles.name]}>{name}</Text>
    </TouchableOpacity>
  )
}
