import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

function UnidadePage() {
  const { leadId, unidadeId } = useParams();
  const [unidade, setUnidade] = useState(null);

  const fetchLead = async () => {
    try {
      const response = await api.get(`/leads/${leadId}`);
      const unidadeData = response.data.unidades.find(u => u.id === unidadeId);
      setUnidade(unidadeData);
    } catch (error) {
      toast.error('Erro ao buscar detalhes da unidade.');
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}

export default UnidadePage;
