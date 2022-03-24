import { SellStockDto } from './dto/sell-stock.dto';
import { AddStockDto } from './dto/add-stock.dto';
import { Stock, StockDocument } from './stock.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
  ) {}

  all() {
    return this.stockModel.find().exec();
  }

  async add(addStockDto: AddStockDto) {
    const addedStock = new this.stockModel(addStockDto);
    return addedStock.save();
  }

  async sell(sellStockDto: SellStockDto) {
    const selectedStock = await this.stockModel.findById(sellStockDto.id);

    if (!selectedStock) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    if (selectedStock.count < sellStockDto.count) {
      throw new HttpException(
        'Количество не хватает в базе',
        HttpStatus.BAD_REQUEST,
      );
    }

    selectedStock.count -= sellStockDto.count;

    await selectedStock.save();

    const selledStock = new this.stockModel();
    selledStock.name = selectedStock.name;
    selledStock.price = selectedStock.price;
    selledStock.expirationDate = selectedStock.expirationDate;
    selledStock.count = sellStockDto.count;
    selledStock.saleDate = new Date();

    return selledStock.save();
  }

  sold() {
    return this.stockModel.find({ saleDate: { $exists: true } }).exec();
  }

  left() {
    return this.stockModel.find({
      count: { $gt: 0 },
      arrivalDate: { $exists: true },
    });
  }
}
