import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Commons, Colors, Fonts, Endpoints} from '../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import Loader from '../components/loader';
import ApiService from '../services/ApiService';
import Toast from 'react-native-easy-toast';

const PriceSearchScreen = props => {
  const toastRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stockID, setStockID] = useState('');
  const [stockName, setStockName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [balance, setBalance] = useState('');
  const [data, setData] = useState([]);

  const handleBarcodeRead = async data => {
    if (!data) {
      setData([]);
      return;
    }
    setLoading(true);
    try {
      await ApiService.get(Endpoints.scanBarcode + encodeURIComponent(data))
        .then(res => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          if (typeof err === 'object' && err.code === 404) {
            showToast(err.message);
          }
          setData([]);
          setLoading(false);
        });
    } catch (error) {
      if (typeof err === 'object' && err.code === 404) {
        showToast(err.message);
      }
      setLoading(false);
      setData([]);
    }
  };

  const showToast = msg => {
    toastRef.current.show(msg, 2000);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          paddingHorizontal: RFValue(15),
          paddingBottom: RFValue(15),
          paddingTop: Platform.OS === 'android' ? RFValue(15) : RFValue(50),
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer();
          }}>
          <Icon name="menu" size={Commons.size(25)} color={Colors.white} />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            fontFamily: Fonts.family.bold,
            color: Colors.white,
            textAlign: 'center',
          }}>
          Scan Barcode
        </Text>

        <View>
          <Icon name="menu" size={Commons.size(25)} color={Colors.primary} />
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: '90%',
          backgroundColor: Colors.primary,
          padding: 15,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 30,
        }}
        onPress={async () => {
          const permissionsGranted = await Commons.checkPermissions();
          if (!permissionsGranted) {
            showToast('Camera permission is required');
          } else {
            Commons.navigate(props.navigation, 'barcode_scanner', {
              onBarcodeRead: handleBarcodeRead,
              returnScreen: 'search',
            });
          }
        }}>
        <Text
          style={{
            fontFamily: Fonts.family.bold,
            color: Colors.white,
            textAlign: 'center',
          }}>
          Scan Barcode
        </Text>
      </TouchableOpacity>

      <ScrollView style={{marginTop: RFValue(10)}}>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <View
                style={{
                  marginHorizontal: RFValue(15),
                  marginBottom: RFValue(10),
                  borderRadius: RFValue(15),
                  padding: RFValue(15),
                  borderWidth: 0.8,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.family.bold,
                    color: Colors.black,
                    fontSize: RFValue(16),
                  }}>
                  Item: {index + 1}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Stock ID:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.StockID}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Stock Name:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.StockName}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Location:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.Location}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Qty:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.Qty}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Price:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.Price}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.family.regular,
                      color: Colors.black,
                      fontSize: RFValue(14),
                    }}>
                    Balance:{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.family.bold,
                      color: Colors.black,
                      fontSize: RFValue(16),
                    }}>
                    {item.Balance}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
      />

      {loading && <Loader />}
    </View>
  );
};

export default PriceSearchScreen;
