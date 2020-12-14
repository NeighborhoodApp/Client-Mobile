import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { fetchComplex, fetchRealEstate, login } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { lightGreen100 } from 'react-native-paper/lib/typescript/src/styles/colors';

export default function ChooseComplex (props) {
  const dispatch = useDispatch()
  const { loading, error, realEstate, complex } = useSelector(s => s)
  const [selectedRealEstate, setSelectedRealEstate] = useState('')
  const [selectedComplex, setSelectedComplex] = useState()

  const handleRealEstate = (val) => {
    console.log(typeof val);
  }
  const handleComplexs = val => {
    console.log(val);
  }

  useEffect(() => {
    dispatch(fetchRealEstate())
    dispatch(fetchComplex())
  }, [])

  useEffect(() => {
  }, [selectedRealEstate])

  
  
  if (loading) return <ActivityIndicator size='large' ></ActivityIndicator>
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Picker
        style={{height: 50, width: 100}}
        onValueChange={itemValue => handleRealEstate(itemValue) }>
        {realEstate.map(val => <Picker.Item label={val.name} value={val.id} key={val.id} />)}
      </Picker>
      <Picker
        style={{height: 50, width: 100}}
        onValueChange={val => handleComplexs(val)}>
        {complex.map(val => {
          // if (val.RealEstateId === selectedRealEstate) return <Picker.Item label={val.name} value={val} key={val.id} />
        })}
      </Picker>
      <Button title='Pilih' />
    </View>
  )
}