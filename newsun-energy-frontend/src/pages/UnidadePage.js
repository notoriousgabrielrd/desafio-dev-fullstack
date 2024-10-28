import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UnidadePage() {
  const { leadId, unidadeId } = useParams();
  const [unidade, setUnidade] = useState(null);

  const fetchLead = async () => {
    try {
      const response = await axios.get(`http://localhost:3033/leads/${leadId}`);
      console.log("response", response)
      const unidadeData = response.data.unidades.find(u => u.id === unidadeId);
      setUnidade(unidadeData);
    } catch (error) {
      console.error('Erro ao buscar detalhes da unidade:', error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  if (!unidade) return <Text>Carregando...</Text>;

  return (
    <Box p={8}>
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">Código da Unidade Consumidora: {unidade.codigoDaUnidadeConsumidora}</Text>
        <Text>Modelo Fásico: {unidade.modeloFasico}</Text>
        <Text>Enquadramento: {unidade.enquadramento}</Text>
        
        <Text fontSize="lg" mt={4} fontWeight="bold">Histórico de Consumo (últimos 12 meses):</Text>
        {unidade.historicoDeConsumoEmKWH.map((consumo, index) => (
          <Box key={index} p={2} border="1px" borderColor="gray.200" borderRadius="md">
            <Text>Consumo Fora Ponta em kWh: {consumo.consumoForaPontaEmKWH}</Text>
            <Text>Mês do Consumo: {new Date(consumo.mesDoConsumo).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default UnidadePage;
