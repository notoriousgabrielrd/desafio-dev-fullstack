import { Injectable, NestMiddleware, ConflictException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UniqueEmailMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      throw new ConflictException('O campo email é obrigatório.');
    }

    const existingLead = await this.prisma.lead.findFirst({
      where: { email },
    });

    if (existingLead) {
      throw new ConflictException("O email já está em uso.");
    }

    next();
  }
}
