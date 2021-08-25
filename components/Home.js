import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Image, Dimensions, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { format } from 'date-fns'; // started the crashing of app
import colors from '../constants/colors'
import { ConversionInput } from '../containers/ConversionInput';
import { Button } from "./Button";
import { KeyboardSpacer } from '../containers/KeyboardSpacer';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
    },
    content: {
      paddingTop: screen.height * 0.1
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.width * 0.45
    },
    logo: {
        position: 'absolute',
        width: screen.width * 0.25,
        height: screen.width * 0.25
    },
    textHeader: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 30,
      // marginVertical: "center", //crashes expo app!
      textAlign: "center",
      marginBottom: 20
    },
    text: {
      color: colors.white,
      fontSize: 16,
      textAlign: "center"
    },
    header: {
      alignItems: 'flex-end',
      marginHorizontal: 20
    }
});

export default ({ navigation }) => {

    const [baseCurrency, setBaseCurrency] =useState('USD');
    const [quoteCurrency, setQuoteCurrency] = useState('GBP')
    const conversionRate = 0.444;
    const [value, setValue] = useState('100')
    const swapCurrencies = () => {
      setBaseCurrency(quoteCurrency);
      setQuoteCurrency(baseCurrency);
    }

    const [scrollEnabled, setScrollEnabled] = useState(false);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColo={colors.blue} />
        <ScrollView scrollEnabled={scrollEnabled}>
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push("Options")}>
              <Entypo name="cog" size={32} color={colors.white} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/background.png')} 
                style={styles.logoBackground} 
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </View>

            <Text style={styles.textHeader}>Currency Converrter</Text>

            <ConversionInput
              text={baseCurrency}
              value={value}
              onButtonPress={() =>
                navigation.push('CurrencyList', { title: 'Base Currency', activeCurrency: baseCurrency })
              }
              onChangeText={text => setValue(text)}
              KeyboardType="numeric"
            />
            <ConversionInput
              text={quoteCurrency}
              value={
                value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
              }
              onButtonPress={() =>
                navigation.push('CurrencyList', { title: 'Quote Currency', activeCurrency: quoteCurrency })
              }
              editable={false}
            />

            <Text style={styles.text}>
              {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency}`}
            </Text>
            <Button text="Reversed Currencies" onPress={() => swapCurrencies()} />
            <KeyboardSpacer onToggle={(keyboardIsVisible) => setScrollEnabled(keyboardIsVisible)} />
          </View>
        </ScrollView>
      </View>
    )
};