import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInput from '../../components/SignInput';
import {UserCxt} from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import Api from '../../Api';

const SignIn = () => {
  const {dispatch: userDispatch} = useContext(UserCxt);

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  const handleSignInClick = async () => {
    if (emailField != '' && passwordField != '') {
      let res = await Api.signIn(emailField, passwordField);

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
        Alert.alert('Email e/ou senha errados');
      }
    } else {
      Alert.alert('Preencha os campos!');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={setEmailField}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={setPasswordField}
          password={true}
        />

        <CustomButton onPress={handleSignInClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignIn;
