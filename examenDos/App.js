import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Perfil from './perfil';
import Home from './home';
import Progress from './progreso';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Progress" component={Progress} options={{ title: 'Cargando' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
