import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SimularPage() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [file, setFile] = useState(null);
  const [decodedData, setDecodedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Por favor, selecione um arquivo.");
      return;
    }

    const fileData = new FormData();
    fileData.append('file', file);

    try {
      toast.info("Processando arquivo...");

      const response = await axios.post('https://magic-pdf.solarium.newsun.energy/v1/magic-pdf', fileData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const magicPdfData = response.data;
      setDecodedData(magicPdfData);

      const historicoDeConsumoEmKWH = magicPdfData.invoice.map(item => ({
        consumoForaPontaEmKWH: item.consumo_fp,
        mesDoConsumo: item.consumo_date,
      }));

      const unidades = [
        {
          codigoDaUnidadeConsumidora: magicPdfData.unit_key,
          modeloFasico: magicPdfData.phaseModel,
          enquadramento: magicPdfData.chargingModel,
          historicoDeConsumoEmKWH,
        }
      ];

      const payload = {
        nomeCompleto,
        email,
        telefone,
        unidades
      };

      toast.info("Enviando simulação...");

      await axios.post('http://localhost:3033/leads', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success("Simulação enviada com sucesso!");

    } catch (error) {
      console.log("error:", error.response.data.message)
      toast.error('Erro ao processar o arquivo ou enviar a simulação: ' + error.response.data.message);
    }
  };

  return (
    <Box p={8}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Box>
          <Text mb="2">Nome Completo</Text>
          <Input value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
        </Box>
        <Box>
          <Text mb="2">Email</Text>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Box>
        <Box>
          <Text mb="2">Telefone</Text>
          <Input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </Box>
        <Box>
          <Text mb="2">Conta de Energia (PDF)</Text>
          <Input type="file" onChange={(e) => setFile(e.target.files[0] || null)} required />
        </Box>
        <Button type="submit" colorScheme="teal">
          Enviar Simulação
        </Button>
      </VStack>

      {decodedData && (
        <Box mt={4} p={4} border="1px solid #ddd">
          <Text fontWeight="bold">Dados Decodificados:</Text>
          <pre>{JSON.stringify(decodedData, null, 2)}</pre>
        </Box>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}

export default SimularPage;
