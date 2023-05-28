import { Box, Button, Container, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const DEFAULT_MESSAGE = `Desculpe, não conseguimos encontrar a página que você está procurando.
Talvez você tenha digitado incorretamente a URL? Certifique-se de ter
digitado corretamente.`;

interface IErrorPage {
  title?: string;
  message?: string;
  redirectPath?: string;
}

export default function ErrorPage({
  title,
  message,
  redirectPath,
}: IErrorPage) {
  return (
    <Container maxW="md">
      <Box
        textAlign="center"
        alignItems="center"
        margin="auto"
        minH="100vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Text as="h4" fontSize="2xl" fontWeight="bold" mb={2}>
          {title || 'Página não encontrada!'}
        </Text>
        <Text color="gray.500">{message || DEFAULT_MESSAGE}</Text>
        <Button
          w="full"
          colorScheme="primary"
          size="sm"
          as={RouterLink}
          to={redirectPath || '/'}
          mt={4}
        >
          Voltar ao início
        </Button>
      </Box>
    </Container>
  );
}
