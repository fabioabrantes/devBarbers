import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {UserCxt} from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';

import {Container, LoadingIcon} from './styles';

import Api from '../../Api';

const Preload = () => {
  const {dispatch: userDispatch} = useContext(UserCxt);

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        //validar o token
        let res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem('token', res.token);
          // salva no context
          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res.data.avatar,
            },
          });
          //envia para tela Dashboard
          navigation.reset({
            routes: [{name: 'MainTab'}],
          });
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <Container>
      <BarberLogo width="100%" heigth="160" />
      <LoadingIcon size="large" color="#ffffff" />
    </Container>
  );
};

export default Preload;
