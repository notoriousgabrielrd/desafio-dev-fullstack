import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formSchema } from '../validation/validation';
import { uploadFileToMagicPdf, submitLead } from '../api/api';

function SimularPage() {
  const [formValues, setFormValues] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    file: null,
  });
  
  const [formErrors, setFormErrors] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    file: '',
  });

  const validateField = (field, value) => {
    const result = formSchema.safeParse({ ...formValues, [field]: value });
    if (!result.success) {
      const error = result.error.errors.find(err => err.path[0] === field);
      return error ? error.message : '';
    }
    return '';
  };

  const handleChange = (field) => (e) => {
    const value = field === 'file' ? e.target.files[0] || null : e.target.value;

    setFormValues((prev) => ({ ...prev, [field]: value }));

    const errorMessage = validateField(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = formSchema.safeParse(formValues);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setFormErrors(errors);
      return;
    }

    try {
      toast.info("Processando arquivo...");
      const response = await uploadFileToMagicPdf(formValues.file);

      const magicPdfData = response.data;
      setFormValues((prev) => ({ ...prev, decodedData: magicPdfData }));

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
        nomeCompleto: formValues.nomeCompleto,
        email: formValues.email,
        telefone: formValues.telefone,
        unidades,
      };

      toast.info("Enviando simulação...");
      await submitLead(payload);

      toast.success("Simulação enviada com sucesso!");

    } catch (error) {
      console.error('Erro ao processar o arquivo ou enviar a simulação:', error);
      toast.error('Erro ao processar o arquivo ou enviar a simulação: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box p={8}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl isInvalid={!!formErrors.nomeCompleto}>
          <Text mb="2">Nome Completo</Text>
          <Input
            value={formValues.nomeCompleto}
            onChange={handleChange('nomeCompleto')}
            required
          />
          <FormErrorMessage>{formErrors.nomeCompleto}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formErrors.email}>
          <Text mb="2">Email</Text>
          <Input
            type="email"
            value={formValues.email}
            onChange={handleChange('email')}
            required
          />
          <FormErrorMessage>{formErrors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formErrors.telefone}>
          <Text mb="2">Telefone</Text>
          <Input
            type="tel"
            value={formValues.telefone}
            onChange={handleChange('telefone')}
            required
          />
          <FormErrorMessage>{formErrors.telefone}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formErrors.file}>
          <Text mb="2">Conta de Energia (PDF)</Text>
          <Input
            type="file"
            onChange={handleChange('file')}
            required
          />
          <FormErrorMessage>{formErrors.file}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Enviar Simulação
        </Button>
      </VStack>

      {formValues.decodedData && (
        <Box mt={4} p={4} border="1px solid #ddd">
          <Text fontWeight="bold">Dados Decodificados:</Text>
          <pre>{JSON.stringify(formValues.decodedData, null, 2)}</pre>
        </Box>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
}

export default SimularPage;
