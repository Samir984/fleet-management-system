import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from 'src/schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async listNewVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(vehicle);
    return createdVehicle.save();
  }

  async listAllVehicle(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findById(id).exec();
  }

  async updateVehicle(
    id: string,
    updates: Partial<Vehicle>,
  ): Promise<Vehicle | null> {
    return this.vehicleModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async deleteListedVehicle(id: string): Promise<Vehicle | null> {
    const deletedVehicle = await this.vehicleModel.findByIdAndDelete(id).exec();

    if (!deletedVehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return deletedVehicle;
  }

  async assignDriver(id: string, driverId: string): Promise<Vehicle | null> {
    const updatedVehicle = await this.vehicleModel
      .findByIdAndUpdate(
        id,
        { $set: { assignedDriver: driverId } },
        { new: true, upsert: true },
      )
      .exec();

    return updatedVehicle;
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
