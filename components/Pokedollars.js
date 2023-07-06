import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getPokedollars } from '../utils/steps'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 7,
    fontSize: 20
  },
  text: {
    fontFamily: 'DMSans-Bold'
  }
})

export default function Pokedollars() {
  const [pokedollars, setPokedollars] = useState(0)

  useState(() => {
    async function load() {
      setPokedollars(await getPokedollars())
    }

    load()
  }, [])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{pokedollars}</Text>
    </View>
  )
}
