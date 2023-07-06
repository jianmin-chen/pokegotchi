import { StatusBar, View, Text, StyleSheet, ScrollView } from 'react-native'
import CircularProgress from '../components/CircularProgress'
import SafeView from '../components/SafeView'
import { useState, useEffect } from 'react'
import { getAllPokemon, reset } from '../utils/pokemon'
import Card from '../components/Card'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  padding: {
    padding: 30
  },
  heading: {
    fontFamily: 'DMSans-Bold',
    fontSize: 28
  }
})

export default function Home({ navigation }) {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function load() {
      const p = await getAllPokemon()
      if (!p.length) navigation.navigate('Choose')
      setPokemon(p)
    }

    load()
  }, [navigation])

  return (
    <SafeView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor="#000000" />
      <ScrollView contentContainerStyle={[styles.container, styles.padding]}>
        <CircularProgress />
        <View style={{ paddingVertical: 30 }}>
          <Text style={styles.heading}>Your Pokemon</Text>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingVertical: 15,
              gap: 12
            }}>
            {pokemon.length > 0 ? (
              pokemon.map(p => (
                <Card {...p} navigation={navigation} key={p.id} />
              ))
            ) : (
              <Text style={{ fontSize: 18, fontFamily: 'DMSans' }}>
                No Pokemon yet!
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeView>
  )
}
