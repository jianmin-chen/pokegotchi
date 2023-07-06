import { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { getAllPokemon } from '../utils/pokemon'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width - 60,
    borderWidth: 20,
    borderRadius: (Dimensions.get('window').width - 60) / 2,
    borderColor: '#cbd5e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative'
  },
  progressLayer: {
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width - 60,
    borderWidth: 20,
    borderRadius: (Dimensions.get('window').width - 60) / 2,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#1a73e8',
    borderTopColor: '#1a73e8'
  },
  offsetLayer: {
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width - 60,
    borderWidth: 20,
    borderRadius: (Dimensions.get('window').width - 40) / 2,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#cbd5e0',
    borderTopColor: '#cbd5e0',
    transform: [{ rotateZ: '-135deg' }]
  },
  center: {
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width - 60,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function CircularProgress({ percent = 1 }) {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function load() {
      setPokemon(await getAllPokemon())
    }

    load()
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressLayer,
          {
            transform: [{ rotateZ: `${percent * 360}deg` }]
          }
        ]}></View>
      <View style={styles.offsetLayer}></View>
      <View style={styles.center}>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 96,
            color: '#1a73e8'
          }}>
          500
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 24
          }}>
          / 1000 steps
        </Text>
      </View>
    </View>
  )
}
