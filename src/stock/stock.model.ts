import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop()
  arrivalDate: Date;

  @Prop()
  count: number;

  @Prop()
  saleDate: Date;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
