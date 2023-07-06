import AsyncStorage from '@react-native-async-storage/async-storage'

const POKEMON_KEY = 'pokemon'

export async function getAllPokemon() {
  // Get all Pokemon
  let pokemon = await AsyncStorage.getItem(POKEMON_KEY)

  if (!pokemon)
    pokemon = [] // If pokemon is null, set pokemon to an empty array
  else pokemon = JSON.parse(pokemon)

  return pokemon
}

export async function alreadyExists(id) {
  // Determine if a Pokemon is already in favorites; returns -1 if Pokemon doesn't exist
  let pokemon = await getAllPokemon()
  return pokemon.findIndex(p => p.id === id)
}

export async function getPokemon(id) {
  let pokemon = await getAllPokemon()
  return pokemon.find(p => p.id === id)
}

export async function addPokemon(
  id,
  name,
  sprite,
  theme,
  level = 0,
  xp = 0,
  upgrade = 1000,
  hunger = 0,
  energy = 100
) {
  // Add a Pokemon to the pokemon array if it doesn't already exist
  let pokemon = await getAllPokemon()
  let p = {
    id,
    name,
    sprite,
    theme,
    level,
    xp,
    upgrade,
    hunger,
    energy
  }
  const index = await alreadyExists(id)
  if (index !== -1) pokemon[index] = p
  else pokemon.push(p)
  await AsyncStorage.setItem(POKEMON_KEY, JSON.stringify(pokemon))
  return p
}

export async function updatePokemon(id, update) {
  let pokemon = await getAllPokemon()
  let p = await alreadyExists(id)

  if (p == -1) throw new Error("Pokemon doesn't exist")

  // Update current Pokemon in storage
  pokemon[p] = {
    ...pokemon[p],
    ...update
  }

  await AsyncStorage.setItem(POKEMON_KEY, JSON.stringify(pokemon))
  return pokemon[p]
}

export async function reset() {
  await AsyncStorage.setItem(POKEMON_KEY, JSON.stringify([]))
}
