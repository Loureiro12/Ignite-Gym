import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere')
}).required();

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp(data: FormDataProps) {}

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
        />

        <Center my={24}>
          <LogoSvg />

          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={"gray.100"}
            fontSize={"xl"}
            mb={6}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>
        </Center>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              autoCorrect={false}
              onChangeText={onChange}
              value={value}
              errorMensagem={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMensagem={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMensagem={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar senha"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMensagem={errors.password_confirm?.message}
            />
          )}
        />

        <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />

        <Button
          title="Voltar para login"
          variant={"outline"}
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
