/**
 * Retorna a data limite, subtraindo o número de meses especificado da data atual.
 * @param months Número de meses a serem subtraídos da data atual (padrão: 12 meses)
 * @returns {Date} A data limite calculada
 */

export const last12Months = (months: number = 12): Date => {
    const last12Months = new Date();
    last12Months.setMonth(last12Months.getMonth() - months);
    return last12Months;
}