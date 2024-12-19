import React from 'react';
import { View, Button } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/FirebaseConfig';
import {Box, HStack, Icon, PresenceTransition, Pressable, Avatar, FlatList, NativeBaseProvider} from 'native-base';
import {Feather} from "@expo/vector-icons";

import Storys from '../component/Storys/index';
import Feed from '../component/Feed/index';

const data = [
    {
        id:"1",
        fullName: "Roberto",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL3.jpg")
    },
    {
        id:"2",
        fullName: "Kiara",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL2.jpg")
    },
    {
        id:"3",
        fullName: "Patricia",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL4.jpg")
    },
    {
        id:"4",
        fullName: "Dani",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL5.jpg")
    },
    {
        id:"5",
        fullName: "Paula",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL6.jpg")
    },
    {
        id:"6",
        fullName: "Ana",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL7.jpg")
    },
    {
        id:"7",
        fullName: "Tiago",
        timeStamp:"12:47 PM",
        recentText:"I will call today",
        avatarURL:require("../../../assets/images/PERFIL1.webp")
    },
];

function HomeContent() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error.message);
        }
    };

    return (
        <Box flex={1} background={"#D3D3D3"} flexDirection={"column"}>
            <Box backgroundColor={"#fff"}>
                <HStack padding={4} w={"100%"} alignItems={"center"} justifyContent={"space-between"} safeArea>
                    <Box>
                        <Pressable>
                            <Icon
                                as={Feather}
                                size={7}
                                color="#000"
                                name='menu'
                            />
                        </Pressable>
                    </Box>

                    <Box flexDirection={"row"} alignItems={"center"}>
                        <Pressable>
                            <Icon
                                as={Feather}
                                name="bell"
                                size={7}
                                marginRight={4}
                                color="#000"
                            />
                        </Pressable>
                        <Avatar
                            h={12}
                            w={12}
                            source={require('../../../assets/images/ani.jpeg')}
                        />
                    </Box>
                </HStack>

                <Box paddingX={4}>
                    <FlatList
                        horizontal={true}
                        data={data}
                        renderItem={({item}) => <Storys data={item}/>}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                </Box>
            </Box>

            <Box paddingX={4}>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Feed data={item}/>}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={true}
                />
            </Box>

            <Box position="absolute" bottom={4} right={4}>
                <Button title="Sair" onPress={handleLogout} />
            </Box>
        </Box>
    );
}

export default function Home() {
    return (
        <NativeBaseProvider>
            <HomeContent />
        </NativeBaseProvider>
    );
}
