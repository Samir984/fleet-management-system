import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from 'src/schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(vehicle);
    return createdVehicle.save();
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findById(id).exec();
  }

  async update(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }

  async markStatus(id: string, status: string): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(id, { currentStatus: status }, { new: true })
      .exec();
  }

  async assignDriver(id: string, driverId: string): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(id, { assignedDriver: driverId }, { new: true })
      .exec();
  }

  async addMaintenanceTask(
    id: string,
    task: { date: Date; description: string },
  ): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(
        id,
        { $push: { maintenanceTask: task } },
        { new: true },
      )
      .exec();
  }
}
