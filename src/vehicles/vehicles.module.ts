import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';

import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehiclesModule {}
