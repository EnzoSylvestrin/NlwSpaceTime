import { useEffect, useState } from 'react';

import { Link, useRouter } from "expo-router";

import * as SecureStore from 'expo-secure-store'

import Icon from '@expo/vector-icons/Feather'

import { View, TouchableOpacity, ScrollView, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import dayjs from 'dayjs';

import ptBr from 'dayjs/locale/pt-br';

import { api } from '../src/lib/api';

import Logo from '../src/assets/logo.svg'

dayjs.locale(ptBr);

type Memory = {
    coverUrl: string,
    except: string,
    id: string,
    createdAt: string,
}

const NewMemorie = () => {

    const { bottom, top } = useSafeAreaInsets();

    const router = useRouter();

    const [memories, setMemories] = useState<Memory[]>([]);

    const SignOut = async () => {
        await SecureStore.deleteItemAsync('token')

        router.push('/');
    }

    const LoadMemories = async () => {
        const token = await SecureStore.getItemAsync('token');

        const response = await api.get('/memories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setMemories(response.data);
    }

    useEffect(() => {
        LoadMemories();
    }, [])

    return (
        <ScrollView
            className="flex-1 px-8"
            contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        >
            <View className="flex-row mt-4 items-center justify-between">
                <Logo />

                <View className="flex-row gap-2">

                    <TouchableOpacity
                        className="h-10 w-10 justify-center items-center rounded-full bg-red-500"
                        onPress={SignOut}
                    >
                        <Icon name="log-out" size={16} color='#000' />
                    </TouchableOpacity>

                    <Link href='/new' asChild>
                        <TouchableOpacity className="h-10 w-10 justify-center items-center rounded-full bg-green-500">
                            <Icon name="plus" size={16} color='#000' />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            <View className="mt-6 space-y-10">
                {
                    memories.map(memory => {
                        return (
                            <View className="gap-4" key={memory.id}>
                                <View className="flex-row items-center gap-2">
                                    <View className="h-px w-5 bg-gray-50" />
                                    <Text className="font-body text-xs text-gray-100">
                                        {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]yyyy")}
                                    </Text>
                                </View>
                                <View className="space-y-4 px-8">
                                    <Image
                                        source={{
                                            uri: memory.coverUrl
                                        }}
                                        className="aspect-video w-full rounded-lg"
                                        alt=""
                                    />
                                    <Text className="font-body text-base leading-relaxed text-gray-100">
                                        {memory.except}
                                    </Text>
                                    <Link href={`/memories/${memory.id}`} asChild>
                                        <TouchableOpacity className="flex-row items-center gap-2">
                                            <Text className="font-body text-sm text-gray-200">
                                                Ler mais
                                            </Text>
                                            <Icon name="arrow-right" size={16} color='#9e9ea0' />
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                            </View>
                        )
                    })

                }
            </View>
        </ScrollView >
    );
}

export default NewMemorie;