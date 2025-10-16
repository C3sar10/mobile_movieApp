import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from "react-native";

const TabIcon = ({focused, icon, title}: any) => {
    if (focused) {
        return (
            <View className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden bg-[#ffffff] gap-1">
                <Feather name={icon} size={16} className="text-secondary"/>
                <Text className="text-secondary text-sm font-semibold">{title}</Text>
            </View> 
        );
    } else {
        return (
            <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden gap-1">
                <Feather name={icon} size={18} color={"gray"}/>
                {/* <Text className="text-gray-300 text-sm font-semibold mt-1/2">{title}</Text> */}
            </View> 
        );
    }
}

const _layout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#545454',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0f0D23',
            }
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{ 
                headerShown: false, 
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={"home"} title={"Home"}/>
                )
            }} 
        />
        <Tabs.Screen 
            name="search" 
            options={{ 
                headerShown: false, 
                title: 'Search',
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={"search"} title={"Search"}/>
                )
            }} />
        <Tabs.Screen 
            name="saved" 
            options={{ 
                headerShown: false, 
                title: 'Saved',
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={"bookmark"} title={"Saved"}/>
                )
            }} 
            />
        <Tabs.Screen 
            name="profile" 
            options={{ 
                headerShown: false, 
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={"user"} title={"Profile"}/>
                )
            }} 
        />
    </Tabs>
  )
}

export default _layout