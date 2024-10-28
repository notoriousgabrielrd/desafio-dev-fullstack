import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  createLead(@Body() data: CreateLeadDto) {
    const response = this.leadsService.createLead(data);
    return response;
  }

  @Get()
  getAllLeads(
    @Query('nomeCompleto') nomeCompleto?: string,
    @Query('email') email?: string,
    @Query('codigoDaUnidadeConsumidora') codigoDaUnidadeConsumidora?: string,
  ) {
    const response = this.leadsService.getLeads({ nomeCompleto, email, codigoDaUnidadeConsumidora });
    return response;
  }

  @Get(':id')
  getLeadById(@Param('id') id: string) {
    const response = this.leadsService.getLeadById(id);
    return response;
  }

  @Delete(':id')
  async deleteLeadById(@Param('id') id: string) {
    const response = await this.leadsService.deleteLeadById(id);
    return response;
  }
}
