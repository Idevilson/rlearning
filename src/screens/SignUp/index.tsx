import React, { useState } from 'react';

import { Image } from 'expo-image';

import {
    Container,
    Header,
    Footer,
    FormContainer,
    FormTitle,
    EmailInput,
    PasswordInput,
    ButtonText,
    NameInput,
    BackButtonContainer,
    BackButton,
    OpemModalAvatar,
    SignUpButton,
    PhotoContainer,
    MiniPhotoContainer
} from './styles';

import Toast from 'react-native-toast-message';

import SelectDropdown from 'react-native-select-dropdown'
import { RFValue } from 'react-native-responsive-fontsize';

import ArrowBack from '../../assets/arrow-back.svg'
import { useNavigation } from '@react-navigation/native';

import { getFirestore, doc, setDoc } from "firebase/firestore";

import { useAuth } from '../../hooks/auth';
import { app } from '../../services/firebase';

import { 
    TouchableOpacity, 
    Text, 
    View, 
    FlatList, 
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Modal from "react-native-modal";

interface dropDownprops {
    selectedItem: string;
    index: number;
}

import { avatarPaths } from './images';

export function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [selectedItem, setSelectedItem] = useState<dropDownprops>({} as dropDownprops);

    const [modalIsOpem, setOpemModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const handleAvatarPress = (avatar: string) => {
        setSelectedAvatar(avatar);
    };


    const navigation = useNavigation();

    const db = getFirestore(app);
    const { signUp } = useAuth();

    const validarFormulario = async () => {
        if (!nome || !email || !senha || !selectedItem) {
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'Por favor, preencha todos os campos ⚠️'
            });
          return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email === '') {
          Toast.show({
            type: 'error',
            text1: 'ATENÇÃO',
            text2: 'Por favor, insira um endereço de email válido.⚠️'
          });
          return false;
        }

        if (senha.length < 6){
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'A senha precisa ter no mínimo 6 digitoso.⚠️'
            });
            return false
        }

        if (selectedAvatar ===  null){
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'Selecione um avatar.⚠️'
            });
            return false
        }

        if(selectedItem.selectedItem === undefined) {
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'Selecione uma categoria.⚠️'
            });

            return false
        }

        const response = await signUp(email, senha);

        if (response) {
            try {
                await setDoc(doc(db, "users", email), {
                    nome: nome,
                    email: email,
                    categoria: selectedItem.selectedItem!,
                       avatar: selectedAvatar
                });

                Toast.show({
                    type: 'success',
                    text1: 'ATENÇÃO',
                    text2: 'CADASTRO REALIZADO COM SUCESSO!'
                })

                setTimeout(() => navigation.navigate('Home'), 3000)
            } catch (error) {
                console.log({ error })
            }
        
        }
        return true;
    };
    
    const onSubmit = async() => {
        await validarFormulario()
    }

    const perildos = ["Nono", "Décimo", "Décimo Primeiro", "Décimo Segundo", "Juizes"]

    return(
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
        <Container>
                    <Header>
                            <BackButtonContainer>
                                <BackButton 
                                    onPress={() => navigation.goBack()}
                                >
                                    <ArrowBack 
                                        width={40}
                                        height={40}
                                    />
                                </BackButton>
                            </BackButtonContainer>
                            <Image 
                            style={{ height: 130, width: 200, marginTop: RFValue(10) }}
                            source={require('../../assets/rLogo.png')}
                            contentFit="cover"
                            transition={1000}
                            />
                    </Header>

                    <Footer>
                        <FormContainer>
                            <FormTitle>
                                FAÇA SEU CADASTRO!
                            </FormTitle>

                            <NameInput 
                                placeholder='NOME'
                                value={nome}
                                onChangeText={setNome}
                            />
                            
                            <EmailInput 
                                placeholder='E-MAIL'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <PasswordInput
                                placeholder='Senha'
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />

                            <OpemModalAvatar
                                onPress={() => setOpemModal(!modalIsOpem)}
                            >
                                <Text
                                    style={{
                                        fontSize: 20
                                    }}
                                >
                                    SELECIONAR AVATAR
                                </Text>

                                {
                                    selectedAvatar !== null ? <MiniPhotoContainer>
                                        <Image 
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26)
                                            }}
                                            contentFit='contain' 
                                            transition={1000}
                                            source={selectedAvatar}
                                        />
                                    </MiniPhotoContainer>
                                    : null
                                }

                                
                            </OpemModalAvatar>

                            <SelectDropdown
                                searchPlaceHolder='Teste'
                                data={perildos}
                                onSelect={(selectedItem, index) => {
                                    setSelectedItem({selectedItem, index})
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}

                                buttonStyle={{
                                    width: '100%', 
                                    height: RFValue(45),
                                    borderRadius: 10,
                                    marginTop: 10
                                }}

                                rowTextStyle={{
                                    fontSize: 20
                                }}

                                defaultButtonText='SELECIONE A CATEGORIA'
                                buttonTextStyle={{
                                    fontWeight: 'bold', fontSize: 20
                                }}
                            />

                            <Modal 
                                isVisible={modalIsOpem}
                                style={{
                                    alignItems: 'center'
                                }}
                            >
                            
                                    <View style={{ 
                                        width: RFValue(300),
                                        height: RFValue(500), 
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        padding: 20,
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                
                                <FlatList
                                        data={avatarPaths}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => handleAvatarPress(item)}>
                                                <PhotoContainer
                                                    style={ selectedAvatar === item ? { borderColor: 'green', borderWidth: 3 } : null }
                                                >
                                                    <Image 
                                                        style={{
                                                            width: RFValue(100),
                                                            height: RFValue(100)
                                                        }}
                                                        contentFit='contain' 
                                                        transition={1000}
                                                        source={item}
                                                    />
                                                </PhotoContainer>
                                            </TouchableOpacity>
                                        )}
                                        numColumns={2} // ou o número desejado de colunas
                                    />


                                    <TouchableOpacity 
                                        onPress={() => setOpemModal(!modalIsOpem)}
                                        style={{
                                            width: RFValue(200),
                                            height: RFValue(45),
                                            borderRadius: 10,
                                            backgroundColor: '#B843F2',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            SELECIONAR AVATAR
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>  

                            <SignUpButton
                                onPress={onSubmit}
                            >
                                <ButtonText>
                                    CRIAR CONTA     
                                </ButtonText>
                            </SignUpButton>
                        </FormContainer>
                    </Footer>
        </Container>
        </TouchableWithoutFeedback>
    );
};
