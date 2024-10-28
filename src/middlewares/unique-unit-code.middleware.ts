import { Injectable, NestMiddleware, ConflictException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UniqueUnitCodeMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { unidades } = req.body;

    if (!unidades || !Array.isArray(unidades)) {
      throw new ConflictException('Um lead deve ter no mínimo uma unidade.');
    }

    for (const unidade of unidades) {
      const existingUnit = await this.prisma.unidade.findUnique({
        where: { codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora },
      });

      if (existingUnit) {
        throw new ConflictException(`O código da unidade consumidora ${unidade.codigoDaUnidadeConsumidora} já existe.`);
      }
    }

    next();
  }
}
