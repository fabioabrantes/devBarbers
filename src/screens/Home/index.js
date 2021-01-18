import React, {useState, useEffect} from 'react';
import {Platform, RefreshControl} from 'react-native'; // permite puxar itens para qq posição
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from './styles';

import Api from '../../Api';

const Home = () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listBarber, setListBarber] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === 'granted') {
      // antes de pegar a localização zera tudo e dar o loading para true
      setLoading(true);
      setLocationText('');
      setListBarber([]);

      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords);
        getBarbers();
      });
    }
  };

  const getBarbers = async () => {
    setLoading(true);
    setListBarber([]);

    let lat = null;
    let lng = null;
    if (coords) {
      lat = coords.latitude;
      lng = coords.longitude;
    }

    let res = await Api.getBarbers(lat, lng, locationText);
    // se não houve erro
    if (res.error == '') {
      if (res.loc) {
        setLocationText(res.loc);
      }
      setListBarber(res.data);
    } else {
      // se houve error
      alert('Erro: ' + res.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBarbers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const handleLocationSearch = () => {
    setCoords({});
    getBarbers();
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontra o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#ffffff"
            value={locationText}
            onChangeText={setLocationText}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="#fff" />}

        <ListArea>
          {listBarber.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Home;
