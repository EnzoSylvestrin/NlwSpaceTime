import React, { useState } from "react";

import { Link, useRouter } from "expo-router";

import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from '@expo/vector-icons/Feather'

import Logo from '../src/assets/logo.svg'
import { api } from "../src/lib/api";

const NewMemorie = () => {

    const { bottom, top } = useSafeAreaInsets();

    const router = useRouter();

    const [content, setContent] = useState('');
    const [preview, setPreview] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const OpenImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (result.assets[0]) {
                setPreview(result.assets[0].uri);
            }
        }
        catch (err) {
            // erro não tratado!
        }
    }

    const HandleCreateMemory = async () => {
        const token = await SecureStore.getItemAsync('token');

        let coverUrl = ''

        if (preview) {
            const uploadFormData = new FormData();

            uploadFormData.append('file', {
                uri: preview,
                name: 'image.jpg',
                type: 'image/jpg',
            } as any);

            const uploadReponse = await api.post('/upload', uploadFormData, {
                headers: {
                    "Content-Type": 'Multipart/form-data',
                }
            });

            coverUrl = uploadReponse.data.fileUrl;
        }

        await api.post('/memories',
            {
                content,
                isPublic,
                coverUrl
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        router.push('/memories');
    }

    return (
        <ScrollView
            className="flex-1 px-8"
            contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        >
            <View className="flex-row mt-4 items-center justify-between">
                <Logo />

                <Link href='/memories' asChild>
                    <TouchableOpacity className="h-10 w-10 justify-center items-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color='#fff' />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch
                        value={isPublic}
                        onValueChange={setIsPublic}
                        thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
                        trackColor={{
                            false: '#767577',
                            true: '#372560'
                        }}
                    />
                    <Text className="font-body text-bold text-gray-200">
                        Tornar memória publica
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={OpenImagePicker}
                    className="h-32 justify-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20"

                >
                    {
                        preview
                            ?
                            <Image
                                source={{
                                    uri: preview
                                }}
                                className="w-full h-full rounded-lg object-cover"
                            />
                            :
                            <View className="flex-row items-center gap-2">
                                <Icon name="image" color='#fff' />
                                <Text className="font-body text-sm text-gray-200">
                                    Adicionar foto ou vídeo
                                </Text>
                            </View>
                    }
                </TouchableOpacity>

                <TextInput
                    className="p-0 font-body text-lg text-gray-50"
                    placeholderTextColor='#56565a'
                    placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                    multiline
                    value={content}
                    textAlignVertical="top"
                    onChangeText={setContent}
                >

                </TextInput>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="items-center self-end rounded-full bg-green-500 px-5 py-2"
                    onPress={HandleCreateMemory}
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Salvar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default NewMemorie;