import React, { useState } from 'react';
import { Text } from 'react-native'

export default function Member (props) {
  const [member, setMember] = useState([
    {
      name: 'agung'
    }
  ])
  
  return (
    <Text>Member</Text>
  )
}