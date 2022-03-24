import { IsInt, IsNotEmpty, Min } from 'class-validator';
export class SellStockDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly count: number;
}
