import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaModule } from '../database/prisma/prisma.module';
import { UniqueUnitCodeMiddleware } from '../middlewares/unique-unit-code.middleware';
import { UniqueEmailMiddleware } from 'src/middlewares/unique-email.middleware';

@Module({
  imports: [PrismaModule], 
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UniqueUnitCodeMiddleware,UniqueEmailMiddleware).forRoutes({
      path:'leads', 
      method: RequestMethod.POST
    }); 
  }
}