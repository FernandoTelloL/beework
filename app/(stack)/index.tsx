import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const StackHome = () => {
  return (
    <Redirect
      href="/(stack)/welcome">
    </Redirect>
  )
}

export default StackHome