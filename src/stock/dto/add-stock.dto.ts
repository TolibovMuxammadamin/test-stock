import { IsDate, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddStockDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsDate()
  readonly expirationDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly arrivalDate: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly count: number;
}
