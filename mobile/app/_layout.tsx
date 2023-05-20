import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";

import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import * as SecureStore from 'expo-secure-store';

import { styled } from "nativewind";

import blurBg from '../src/assets/blur.png'

import Stripes from '../src/assets/stripes.svg'

import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

const StyledStripes = styled(Stripes)

const RootLayout = () => {

    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);

    const [hasloadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    })

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            setIsUserAuthenticated(!!token);
        })
    }, [])

    if (!hasloadedFonts) {
        return <SplashScreen />
    }

    return (
        <ImageBackground
            source={blurBg}
            className="relative flex-1 bg-gray-900"
            imageStyle={{ position: 'absolute', left: '-100%' }}
        >
            <StyledStripes className="absolute left-2" />
            <StatusBar style="light" />

            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                    animation: 'fade',
                }}
            >
                <Stack.Screen name="index" redirect={isUserAuthenticated} />
                <Stack.Screen name="memories" />
                <Stack.Screen name="new" />
            </Stack>
        </ImageBackground>
    );
}

export default RootLayout;