import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://samirneupane:samir984@cluster0.rlohmaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    VehiclesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
