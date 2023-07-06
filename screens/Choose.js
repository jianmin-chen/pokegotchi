import {
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { getColors } from 'react-native-image-colors'
import SafeView from '../components/SafeView'
import starter from '../assets/initial.json'
import { addPokemon, getPokemon, reset } from '../utils/pokemon'
import { useEffect } from 'react'
import { addPokedollars } from '../utils/steps'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a73e8',
    flex: 1
  },
  padding: {
    padding: 30
  },
  heading: {
    fontFamily: 'DMSans-Bold',
    fontSize: 30,
    color: 'white'
  },
  text: {
    fontFamily: 'DMSans',
    fontSize: 20
  },
  choices: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: Platform.OS === 'android' ? 0 : 15,
    borderBottomRightRadius: Platform.OS === 'android' ? 0 : 15,
    padding: 20
  },
  subheading: {
    fontFamily: 'DMSans',
    fontSize: 24,
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  rowImage: {
    backgroundColor: '#f9fafb',
    borderRadius: 15
  },
  choose: {
    borderWidth: 1,
    borderColor: '#cbd5e0',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function Row({ id, name, sprite, choose, last }) {
  return (
    <TouchableOpacity
      style={[styles.row, { marginBottom: last ? 150 : 10 }]}
      onPress={() => choose({ id, name, sprite })}>
      <Image
        style={styles.rowImage}
        source={{
          uri: sprite,
          width: 100,
          height: 100
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.choose}>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Choose({ navigation }) {
  const choosePokemon = async ({ id, name, sprite }) => {
    const colors = await getColors(sprite)
    let color = colors.dominant || colors.background
    if (color === '#000' || color === '#000000') color = '#fff'
    await addPokemon(id, name, sprite, color, 0, 450)
    await addPokedollars(5)
    navigation.navigate('Home')
  }

  return (
    <SafeView style={styles.container}>
      <StatusBar backgroundColor="#1a73e8" />
      <View style={styles.padding}>
        <Text style={styles.heading}>
          Hey! Let's choose your first Pokemon:
        </Text>
      </View>
      <ScrollView style={styles.choices}>
        <Text style={styles.subheading}>Starter Pokemon</Text>
        {starter.map((pokemon, idx) => (
          <Row
            key={pokemon.id}
            {...pokemon}
            choose={choosePokemon}
            last={idx === pokemon.length - 1}
          />
        ))}
      </ScrollView>
    </SafeView>
  )
}
