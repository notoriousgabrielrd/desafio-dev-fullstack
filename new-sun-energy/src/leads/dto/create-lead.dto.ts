import { IsString, IsEmail, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class HistoricoDeConsumoDto {
  consumoForaPontaEmKWH: number;

  @IsString()
  mesDoConsumo: Date;
}

class UnidadeDto {
  @IsString()
  codigoDaUnidadeConsumidora: string;

  @IsString()
  modeloFasico: string;

  @IsString()
  enquadramento: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoricoDeConsumoDto)
  historicoDeConsumoEmKWH: HistoricoDeConsumoDto[];
}

export class CreateLeadDto {
  @IsString()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: "Um lead deve ter no mínimo uma unidade" })
  @Type(() => UnidadeDto)
  unidades: UnidadeDto[];
}
