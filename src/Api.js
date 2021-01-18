import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async (token) => {
    const res = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const json = await res.json();
    return json;
  },
  signIn: async (email, password) => {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await res.json();
    return json;
  },
  signUp: async (name, email, password) => {
    const res = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await res.json();
    return json;
  },
  getBarbers: async (lat = null, lng = null, address = null) => {
    const token = await AsyncStorage.getItem('token');

    console.log('LAT', lat);
    console.log('LNG', lng);
    console.log('ADDRESS', address);

    const res = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`,
    );
    const json = await res.json();
    return json;
  },
  logout: async (name, email, password) => {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const json = await res.json();
    return json;
  },
  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
    const json = await res.json();
    console.log(json);
    return json;
  },
  setFavorite: async (barberId) => {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_API}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, barber: barberId}),
    });
    const json = await res.json();
    return json;
  },
  setAppointment: async (
    userId,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
  ) => {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_API}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
      }),
    });
    const json = await res.json();
    return json;
  },
};
