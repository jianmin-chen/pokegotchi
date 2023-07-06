import { useEffect } from 'react'
import {
  Pressable,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native'
import { addPokemon, getAllPokemon, getPokemon } from '../utils/pokemon'
import SafeView from '../components/SafeView'
import { useState } from 'react'
import { Image, View, Text, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Pokedollars from '../components/Pokedollars'

const styles = StyleSheet.create({
  sprite: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
    marginTop: 30
  },
  xp: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'DMSans',
    marginBottom: 30
  },
  info: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: Platform.OS === 'android' ? 0 : 15,
    borderBottomRightRadius: Platform.OS === 'android' ? 0 : 15,
    padding: 20,
    paddingBottom: 150,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
  rowIcon: {
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  progressBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: Dimensions.get('window').width - 40,
    height: 10,
    borderRadius: 25,
    marginBottom: 15,
    position: 'relative'
  },
  progress: {
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 15
  },
  nav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  choose: {
    borderWidth: 1,
    borderColor: '#cbd5e0',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionText: {
    fontFamily: 'DMSans',
    fontSize: 20
  }
})

function ProgressBar({ percent }) {
  return (
    <View style={styles.progressBar}>
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.progress,
          { width: (Dimensions.get('window').width - 30) * percent || 0 }
        ]}
      />
    </View>
  )
}

export default function Pokemon({ navigation, route }) {
  const { id } = route.params
  const [name, setName] = useState('')
  const [sprite, setSprite] = useState('')
  const [theme, setTheme] = useState('#1a73e8')
  const [level, setLevel] = useState(0)
  const [xp, setXp] = useState(0)
  const [upgrade, setUpgrade] = useState(1)
  const [hunger, setHunger] = useState(0)
  const [energy, setEnergy] = useState(0)

  useEffect(() => {
    const loadInfo = async () => {
      const pokemon = await getPokemon(id)
      if (!pokemon) navigation.navigate('Home')
      setName(pokemon.name)
      setSprite(pokemon.sprite)
      setTheme(pokemon.theme.toLowerCase())
      setLevel(pokemon.level)
      setXp(pokemon.xp)
      setUpgrade(pokemon.upgrade)
      setHunger(pokemon.hunger)
      setEnergy(pokemon.energy)
    }

    loadInfo()
  }, [])

  return (
    <SafeView style={{ backgroundColor: theme, flex: 1, padding: 20 }}>
      <StatusBar backgroundColor={theme} />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons
            color={theme === '#fff' || theme === '#ffffff' ? '#09f' : 'white'}
            style={styles.navIcon}
            name="close-circle"
            size={30}
          />
        </TouchableOpacity>
        <Pokedollars />
      </View>
      {sprite.length !== 0 && (
        <Image
          style={styles.sprite}
          source={{
            uri: sprite,
            width: 400,
            height: 400
          }}
        />
      )}
      <Text
        style={[
          styles.name,
          { color: theme === '#fff' || theme === '#ffffff' ? 'black' : 'white' }
        ]}>
        {name}
      </Text>
      <Text
        style={[
          styles.xp,
          { color: theme === '#fff' || theme === '#ffffff' ? 'black' : 'white' }
        ]}>
        {xp} XP
      </Text>
      <ProgressBar percent={xp / upgrade} />
      <View style={styles.info}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
          <Text style={styles.subheading}>How am I doing?</Text>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons color="white" name="restaurant-sharp" size={30} />
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    position: 'absolute',
                    top: 45 - 25,
                    left: 0,
                    width: 45,
                    height: 25,
                    backgroundColor: '#fd9970',
                    zIndex: -1,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                  }
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionText}>Hunger</Text>
            </View>
            <View style={styles.choose}>
              <Text style={{ fontSize: 20 }}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons color="white" name="flash-outline" size={30} />
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    position: 'absolute',
                    top: 45 - 25,
                    left: 0,
                    width: 45,
                    height: 25,
                    backgroundColor: '#fed92b',
                    zIndex: -1,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                  }
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionText}>Energy</Text>
            </View>
            <View style={styles.choose}>
              <Text style={{ fontSize: 20 }}>+</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeView>
  )
}
