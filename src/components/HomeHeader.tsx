import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { useAuth } from "@hooks/useAuth";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  const { user, signOut } = useAuth();
  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        size={16}
        source={
          user.avatar
            ? { uri: "https://avatars.githubusercontent.com/u/65689062?v=4" }
            : defaultUserPhotoImg
        }
        alt="Imagem do usuário"
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá,
        </Text>

        <Heading color={"gray.100"} fontSize={"md"}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity activeOpacity={0.8} onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" size={7} color={"gray.200"} />
      </TouchableOpacity>
    </HStack>
  );
}
