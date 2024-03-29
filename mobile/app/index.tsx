import React, { useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router';

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'

import * as SecureStore from 'expo-secure-store'

import Logo from '../src/assets/logo.svg'

import { api } from '../src/lib/api'

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
        'https://github.com/settings/connections/applications/bd6020733d6054f891f5',
}

const Main = () => {


    const router = useRouter();

    const [, response, signInWithGithub] = useAuthRequest(
        {
            clientId: 'bd6020733d6054f891f5',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'nlwspacetime',
            }),
        },
        discovery,
    )


    const HandleGitHubOauth = async (code: string) => {
        const response = await api.post('/register', {
            code,
        })

        const { token } = response.data;

        await SecureStore.setItemAsync('token', token);

        router.push('/memories');
    }

    useEffect(() => {
        // console.log(
        //   makeRedirectUri({
        //     scheme: 'nlwspacetime',
        //   }),
        // )

        if (response?.type === 'success') {
            const { code } = response.params;

            HandleGitHubOauth(code);
        }
    }, [response])

    return (
        <View className='flex-1 items-center px-8 py-10'>
            <View className="flex-1 items-center justify-center gap-6">
                <Logo />

                <View className="space-y-2">
                    <Text className="text-center font-title text-2xl leading-tight text-gray-50">
                        Sua cápsula do tempo
                    </Text>
                    <Text className="text-center font-body text-base leading-relaxed text-gray-100">
                        Colecione momentos marcantes da sua jornada e compartilhe (se
                        quiser) com o mundo!
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full bg-green-500 px-5 py-2"
                    onPress={() => signInWithGithub()}
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Cadastrar lembrança
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
                Feito com 💜 no NLW da Rocketseat
            </Text>
        </View>
    )
}

export default Main
