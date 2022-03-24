import { Module } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    StockModule,
    MongooseModule.forRoot('mongodb://localhost:27017/stock'),
  ],
})
export class AppModule {}
