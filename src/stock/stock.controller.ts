import { SellStockDto } from './dto/sell-stock.dto';
import { StockService } from './stock.service';
import { AddStockDto } from './dto/add-stock.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  getAll() {
    return this.stockService.all();
  }

  @Post('add')
  addStock(@Body() dto: AddStockDto) {
    return this.stockService.add(dto);
  }

  @Post('sell')
  sellStock(@Body() dto: SellStockDto) {
    return this.stockService.sell(dto);
  }

  @Get('left')
  leftStock() {
    return this.stockService.left();
  }

  @Get('sold')
  soldStock() {
    return this.stockService.sold();
  }
}
