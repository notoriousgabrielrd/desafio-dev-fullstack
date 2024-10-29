import React, { useState, useEffect } from 'react';
import { Box, Input, Button, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

function ListagemPage() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ nomeCompleto: '', email: '', codigoDaUnidadeConsumidora: '' });
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads', { params: filters });
      setLeads(response.data);
    } catch (error) {
      toast.error('Erro ao buscar simulações.');
      console.error('Erro ao buscar simulações:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const handleRowClick = (leadId, unidadeId) => {
    navigate(`/unidade/${leadId}/${unidadeId}`);
  };

  const deleteLead = async (leadId) => {
    try {
      await api.delete(`/leads/${leadId}`);
      fetchLeads();
      toast.success('Lead deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar o lead.');
      console.error('Erro ao deletar o lead:', error);
    }
  };

  return (
    <Box p={8}>
      <Box mb={4}>
        <Input
          placeholder="Nome Completo"
          value={filters.nomeCompleto}
          onChange={(e) => setFilters({ ...filters, nomeCompleto: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Código da Unidade Consumidora"
          value={filters.codigoDaUnidadeConsumidora}
          onChange={(e) => setFilters({ ...filters, codigoDaUnidadeConsumidora: e.target.value })}
          mb={4}
        />
        <Button onClick={fetchLeads} colorScheme="teal">Buscar</Button>
      </Box>

      <Box as="table" w="100%" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
        <Box as="thead" bg="gray.100">
          <Box as="tr">
            <Box as="th" p={2} border="1px" borderColor="gray.200">Nome</Box>
            <Box as="th" p={2} border="1px" borderColor="gray.200">Email</Box>
            <Box as="th" p={2} border="1px" borderColor="gray.200">Telefone</Box>
            <Box as="th" p={2} border="1px" borderColor="gray.200">Código da Unidade Consumidora</Box>
            <Box as="th" p={2} border="1px" borderColor="gray.200">Ações</Box>
          </Box>
        </Box>
        <Box as="tbody">
          {leads.map((lead) =>
            lead.unidades.map((unidade) => (
              <Box
                as="tr"
                key={unidade.id}
                cursor="pointer"
                _hover={{ backgroundColor: "gray.100" }}
              >
                <Box as="td" p={2} border="1px" borderColor="gray.200" onClick={() => handleRowClick(lead.id, unidade.id)}>
                  {lead.nomeCompleto}
                </Box>
                <Box as="td" p={2} border="1px" borderColor="gray.200" onClick={() => handleRowClick(lead.id, unidade.id)}>
                  {lead.email}
                </Box>
                <Box as="td" p={2} border="1px" borderColor="gray.200" onClick={() => handleRowClick(lead.id, unidade.id)}>
                  {lead.telefone}
                </Box>
                <Box as="td" p={2} border="1px" borderColor="gray.200" onClick={() => handleRowClick(lead.id, unidade.id)}>
                  {unidade.codigoDaUnidadeConsumidora}
                </Box>
                <Box as="td" p={2} border="1px" borderColor="gray.200">
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => deleteLead(lead.id)}
                  />
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}

export default ListagemPage;
