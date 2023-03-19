import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./components/TabNavigator";


 const App = () => {
  const [input, setInput] = useState('');
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
export default App