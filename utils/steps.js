import AsyncStorage from '@react-native-async-storage/async-storage'

const STEPS_KEY = 'steps'
const POKEDOLLARS_KEY = 'pokedollars'
const CONVERSION = 3 // Every 3 steps = 1 Pokedollar

export async function getSteps() {
  let steps = await AsyncStorage.getItem(STEPS_KEY)

  if (!steps) steps = []
  else steps = JSON.parse(steps)

  return steps
}

export async function getPokedollars() {
  let pokedollars = await AsyncStorage.getItem(POKEDOLLARS_KEY)

  if (!pokedollars) pokedollars = 0
  else pokedollars = Number(pokedollars)

  return pokedollars
}

export async function addPokedollars(amount, convert = false) {
  let pokedollars = await getPokedollars()
  return await AsyncStorage.setItem(
    POKEDOLLARS_KEY,
    JSON.stringify(pokedollars + (convert ? Math.floor(amount / 3) : amount))
  )
}

export async function addDay(date, amount) {
  let steps = await getSteps()
  steps[date] = amount
  await AsyncStorage.setItem(STEPS_KEY, steps)
  return { date, steps }
}

export async function reset() {
  await AsyncStorage.setItem(POKEDOLLARS_KEY, JSON.stringify(0))
}
