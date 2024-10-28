import React from 'react';
import { Box, Button, VStack, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <VStack spacing={6}>
        <Heading as="h1" size="lg">Bem-vindo ao Sistema de Simulação de Energia</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/simular')}>
          Ir para Simular
        </Button>
        <Button colorScheme="blue" onClick={() => navigate('/listagem')}>
          Ir para Listagem
        </Button>
      </VStack>
    </Box>
  );
}

export default HomePage;
