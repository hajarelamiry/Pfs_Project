import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../client/Dashboard";
import BusDetail from "../client/BusDetail";
import MapScreen from "../client/MapView";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="BusDetail" component={BusDetail} />
      <Tab.Screen name="MapView" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
