import oanseLogo from '@/assets/images/oanse-logo.png';
import useAuth from '@/hooks/useAuth';
import { ILoginRequest } from '@/services/AuthService';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import validationSchema from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const toast = useToast();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = form;

  console.log({ isSubmitting });

  async function onSubmit(data: ILoginRequest) {
    await handleLogin(data);
    navigate('/');
  }

  return (
    <Container maxWidth={{ base: 'initial', md: '26rem' }} p={0}>
      <Flex
        direction="column"
        align="center"
        justify={{ base: 'center', md: 'center' }}
        h="100vh"
      >
        <VStack
          as="form"
          w="full"
          h={{ base: 'full', xl: 'auto' }}
          align="start"
          justify="center"
          p={{ base: 6, xl: 10 }}
          spacing={6}
          onSubmit={handleSubmit(onSubmit)}
          borderRadius="md"
          border="1px"
          borderColor="secondary.100"
          bg="white"
          noValidate
          sx={{ label: { fontSize: 'sm' } }}
        >
          <Image src={oanseLogo} w="8rem" alignSelf="center" />

          <VStack w="full" spacing={5}>
            <FormControl isInvalid={!!errors.identifier}>
              <FormLabel>Email ou usuário</FormLabel>
              <Input {...register('identifier')} />
              <FormErrorMessage>
                {String(errors?.identifier?.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input {...register('password')} />
              <FormErrorMessage>
                {String(errors?.password?.message)}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <Button
            w="full"
            type="submit"
            isDisabled={isDirty && !isValid}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>

          <VStack w="full">
            <Text>
              Ainda não tem uma conta?{' '}
              <Link
                as={RouterLink}
                to="/register"
                sx={{ ml: 0.5, fontWeight: 'semibold' }}
              >
                Cadastre-se
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
}
