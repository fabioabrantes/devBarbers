import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import SignInput from '../../components/SignInput';
import {UserCxt} from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

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

const SignUp = () => {
  const {dispatch: userDispatch} = useContext(UserCxt);

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [nameField, setNameField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const handleSignUpClick = async () => {
    if (nameField != '' && emailField != '' && passwordField != '') {
      let res = await Api.signUp(nameField, emailField, passwordField);
      console.log(res);
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
        Alert.alert('Error: ' + res.error);
      }
    } else {
      Alert.alert('Preencha os campos');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={setNameField}
        />
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

        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignUp;
