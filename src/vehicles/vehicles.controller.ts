import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { Vehicle } from 'src/schemas/vehicle.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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
  async listNewVehicle(@Body() vehicle: Vehicle) {
    try {
      const createdVehicle = await this.vehicleService.listNewVehicle(vehicle);
      return this.successResponse(createdVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Get()
  async listAllVehicle() {
    try {
      const vehicles = await this.vehicleService.listAllVehicle();
      return this.successResponse(vehicles);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Get(':id')
  async getVehicle(@Param('id') id: string) {
    try {
      const vehicle = await this.vehicleService.getVehicle(id);
      return this.successResponse(vehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Patch(':id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() updates: Partial<Vehicle>,
  ) {
    try {
      const updatedVehicle = await this.vehicleService.updateVehicle(
        id,
        updates,
      );
      return this.successResponse(updatedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Delete(':id')
  async deleteListedVehicle(@Param('id') id: string) {
    try {
      const removedVehicle = await this.vehicleService.deleteListedVehicle(id);
      return this.successResponse(removedVehicle);
    } catch (error) {
      return this.errorResponse(error.message);
    }
  }

  @Patch(':id/assign-driver')
  async assignDriver(
    @Param('id') id: string,
    @Body('assignedDriver') driverId: string,
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

  @Patch(':id/maintenance-task')
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
