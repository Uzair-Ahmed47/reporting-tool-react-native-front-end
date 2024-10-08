import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {ReactNativeScannerView} from '@pushpendersingh/react-native-scanner';
import {Commons} from '../utils';

const BarcodeScanner = ({navigation, route}) => {
  let result = 0;
  const {height, width} = useWindowDimensions();

  const handleBarcodeRead = value => {
    if (result > 0) return;

    if (route.params && route.params.onBarcodeRead) {
      route.params.onBarcodeRead(value.nativeEvent.value);
    }
    Commons.navigate(navigation, route.params.returnScreen);
    result = result + 1;
  };

  return (
    <View style={{flex: 1}}>
      <ReactNativeScannerView
        style={{height, width}}
        onQrScanned={handleBarcodeRead}
      />
    </View>
  );
};

export default BarcodeScanner;
