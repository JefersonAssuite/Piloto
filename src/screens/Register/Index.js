import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { auth } from '../../../services/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      sexo: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      
      const uid = userCredential.user.uid;
      
      const db = getFirestore();
      await setDoc(doc(db, 'usuarios', uid), {
        nome: data.nome,
        email: data.email,
        sexo: data.sexo,
        dataCadastro: new Date().toISOString()
      });
      
      Alert.alert(
        "Sucesso",
        "Cadastro realizado com sucesso!",
        [
          { text: "OK", onPress: () => router.replace('/') }
        ]
      );
      
    } catch (error) {
      Alert.alert("Erro", "Erro ao realizar cadastro: " + error.message);
    }
  };

  return (
   
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            
            <Text style={styles.title}>
              Cadastro
            </Text>
            
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: 'O nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'O nome deve ter pelo menos 3 caracteres'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.nome && styles.inputError]}
                    placeholder="Nome completo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="words"
                  />
                )}
                name="nome"
              />
              {errors.nome && (
                <Text style={styles.errorText}>{errors.nome.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: 'O e-mail é obrigatório',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Digite um e-mail válido'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="E-mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: 'A senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.senha && styles.inputError]}
                    placeholder="Senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="senha"
              />
              {errors.senha && (
                <Text style={styles.errorText}>{errors.senha.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Sexo:</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Selecione o sexo'
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.radioContainer}>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        value === 'masculino' && styles.radioSelected
                      ]}
                      onPress={() => onChange('masculino')}
                    >
                      <Text style={[
                        styles.radioText,
                        value === 'masculino' && styles.radioTextSelected
                      ]}>
                        Masculino
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        value === 'feminino' && styles.radioSelected
                      ]}
                      onPress={() => onChange('feminino')}
                    >
                      <Text style={[
                        styles.radioText,
                        value === 'feminino' && styles.radioTextSelected
                      ]}>
                        Feminino
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                name="sexo"
              />
              {errors.sexo && (
                <Text style={styles.errorText}>{errors.sexo.message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.loginLink}
            >
              <Text style={styles.loginLinkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  radioText: {
    color: '#333',
    fontSize: 16,
  },
  radioTextSelected: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default Register;
