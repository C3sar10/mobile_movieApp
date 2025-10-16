import { View, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import React from 'react'

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View className='flex-row items-center bg-gray-600 rounded-full px-5 py-4'>
      <Feather name="search" size={16} color={"white"}/>
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'white'}
        className='text-white ml-2 flex-1'
      />
    </View>
  )
}

export default SearchBar