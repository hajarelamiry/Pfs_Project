import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import BusDetail from "./BusDetail";
import MapScreen from "./MapView";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="BusDetail" component={BusDetail} />
      <Tab.Screen name="MapView" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
