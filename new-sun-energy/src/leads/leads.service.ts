import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { last12Months } from 'src/utils/utils';

@Injectable()
export class LeadsService {
    constructor(private prisma: PrismaService) { }

    async createLead({ nomeCompleto, email, telefone, unidades }: CreateLeadDto) {
        const response = this.prisma.lead.create({
            data: {
                nomeCompleto,
                email,
                telefone,
                unidades: {
                    create: unidades.map(({ codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH }) => ({
                        codigoDaUnidadeConsumidora,
                        modeloFasico,
                        enquadramento,
                        historicoDeConsumoEmKWH: {
                            create: historicoDeConsumoEmKWH.map(({ consumoForaPontaEmKWH, mesDoConsumo }) => ({
                                consumoForaPontaEmKWH,
                                mesDoConsumo,
                            })),
                        },
                    })),
                },
            },
        });

        return response
    }

    async getLeads(filters: { nomeCompleto?: string; email?: string; codigoDaUnidadeConsumidora?: string }) {

        const { nomeCompleto, email, codigoDaUnidadeConsumidora } = filters;

        const response = this.prisma.lead.findMany({
            where: {
                nomeCompleto: nomeCompleto ? { contains: nomeCompleto } : undefined,
                email: email ? { contains: email } : undefined,
                unidades: codigoDaUnidadeConsumidora
                    ? { some: { codigoDaUnidadeConsumidora: { contains: codigoDaUnidadeConsumidora } } }
                    : undefined,
            },
            include: {
                unidades: {
                    include: {
                        historicoDeConsumoEmKWH: last12Months('mesDoConsumo')
                    }
                }
            },
        });

        return response
    }

    async getLeadById(id: string) {
        const response = this.prisma.lead.findUnique({
            where: { id },
            include: {
                unidades: {
                    include: {
                        historicoDeConsumoEmKWH: last12Months('mesDoConsumo')
                    }
                }
            }
        })

        return response
    }

    async deleteLeadById(id: string) {
        const response = this.prisma.lead.delete({
            where: { id },
        });
        return response
    }
}
