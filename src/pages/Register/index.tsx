import UsersService from '@/services/UsersService';
import { User } from '@/types/User';
import parseDateToISOString from '@/utils/parseDateToISOString';
import { phone as maskPhone, date as maskDate } from '@/utils/masks';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Link,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import validationSchema from './validationSchema';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    watch,
    setValue,
  } = form;

  async function onSubmit(data: FieldValues) {
    const payload = {
      ...data,
      birthdate: parseDateToISOString(data?.birthdate),
      phone: data?.phone?.replace(/\D/g, ''),
    };

    try {
      await UsersService.create(payload);
      toast({ title: 'Cadastro realizado com sucesso', status: 'success' });
      navigate('/');
    } catch (error) {
      toast({ title: `${error.message}`, status: 'error' });
    }
  }

  const phoneValue = watch('phone');
  const birthdateValue = watch('birthdate');

  useEffect(() => {
    setValue('phone', maskPhone(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue('birthdate', maskDate(birthdateValue));
  }, [birthdateValue]);

  return (
    <Container maxWidth={{ base: 'initial', md: '32rem' }} p={0}>
      <Flex
        direction="column"
        align="center"
        justify={{ base: 'flex-start', md: 'center' }}
        h="100vh"
      >
        <VStack
          as="form"
          w="full"
          align="start"
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
          <VStack align="start" spacing={0}>
            <Heading as="h1">Bem-vindo(a)</Heading>
            <Text color="secondary">
              Crie sua conta com seus dados pessoais.
            </Text>
          </VStack>
          <VStack w="full" spacing={5}>
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel>Nome completo</FormLabel>
              <Input {...register('fullName')} autoComplete="new-fullName" />
              <FormErrorMessage>
                {String(errors?.fullName?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} />
              <FormErrorMessage>
                {String(errors?.email?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="tel"
                inputMode="tel"
                {...register('phone')}
                autoComplete="new-phone-number"
              />
              <FormErrorMessage>
                {String(errors?.phone?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.birthdate}>
              <FormLabel>Data de nascimento</FormLabel>
              <Input
                type="numeric"
                inputMode="tel"
                {...register('birthdate')}
                autoComplete="new-birthdate"
              />
              <FormErrorMessage>
                {String(errors?.birthdate?.message)}
              </FormErrorMessage>
            </FormControl>
            <Stack
              w="full"
              direction={{ base: 'column', xl: 'row' }}
              spacing={5}
            >
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Nome de usuário</FormLabel>
                <Input {...register('username')} />
                <FormErrorMessage>
                  {String(errors?.username?.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input {...register('password')} />
                <FormErrorMessage>
                  {String(errors?.password?.message)}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </VStack>
          <Button
            w="full"
            type="submit"
            isDisabled={isDirty && !isValid}
            isLoading={isSubmitting}
          >
            Criar conta
          </Button>
          <VStack w="full">
            <Text>
              Já possui uma conta?{' '}
              <Link
                as={RouterLink}
                to="/login"
                sx={{ ml: 0.5, fontWeight: 'semibold' }}
              >
                Fazer login
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
}
