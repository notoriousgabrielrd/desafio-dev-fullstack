export const last12Months = (field: string, limit: number = 12) => {
    return {
      orderBy: { [field]: 'desc' },
      take: limit,
    };
  }