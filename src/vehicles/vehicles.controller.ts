import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { Vehicle } from 'src/schemas/vehicle.schema';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  private successResponse(data: any) {
    return {
      status: 'success',
      data,
    };
  }

  private errorResponse(message: string) {
    return {
      status: 'error',
      message,
    };
  }

  @Post()
  async create(@Body() vehicle: Vehicle) {
    try {
      const createdVehicle = await this.vehicleService.create(vehicle);
      return this.successResponse(createdVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const vehicles = await this.vehicleService.findAll();
      return this.successResponse(vehicles);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const vehicle = await this.vehicleService.findOne(id);
      return this.successResponse(vehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Vehicle>) {
    try {
      const updatedVehicle = await this.vehicleService.update(id, updates);
      return this.successResponse(updatedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const removedVehicle = await this.vehicleService.remove(id);
      return this.successResponse(removedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Patch(':id/status')
  async markStatus(@Param('id') id: string, @Body('status') status: string) {
    try {
      const updatedVehicle = await this.vehicleService.markStatus(id, status);
      return this.successResponse(updatedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Patch(':id/assign-driver')
  async assignDriver(
    @Param('id') id: string,
    @Body('driverId') driverId: string,
  ) {
    try {
      const updatedVehicle = await this.vehicleService.assignDriver(
        id,
        driverId,
      );
      return this.successResponse(updatedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Post(':id/maintenance-task')
  async addMaintenanceTask(
    @Param('id') id: string,
    @Body() task: { date: Date; description: string },
  ) {
    try {
      const updatedVehicle = await this.vehicleService.addMaintenanceTask(
        id,
        task,
      );
      return this.successResponse(updatedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }
}
