import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Vehicle {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ unique: true, required: true })
  registrationNumber: string;

  @Prop({ enum: ['active', 'under maintenance', 'retired'], default: 'active' })
  currentStatus: string;

  @Prop({ required: true })
  location: string;

  @Prop([
    {
      date: Date,
      description: String,
    },
  ])
  maintenanceTask: { date: Date; description: string }[];

  @Prop({ type: Types.ObjectId, ref: 'Driver' })
  assignedDriver: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
