import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './components/Navigation';



export default () => <SafeAreaProvider><Navigation /></SafeAreaProvider>;