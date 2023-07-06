import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { createStackNavigator } from '@react-navigation/stack'
import Choose from './screens/Choose'
import Pokemon from './screens/Pokemon'
import Home from './screens/Home'
import { StatusBar } from 'react-native'

SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    'DMSans': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Italic': require('./assets/fonts/DMSans-Italic.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-MediumItalic': require('./assets/fonts/DMSans-MediumItalic.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-BoldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf')
  })

  if (!fontsLoaded) return null

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1a73e8" />
      <Stack.Navigator initialRouteName={'Choose'}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Choose"
          component={Choose}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Pokemon"
          component={Pokemon}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
