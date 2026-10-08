import { SharedService } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { JobsModule } from './jobs/jobs.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    JobsModule,
    SearchModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        return { uri };
      },
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, SharedService],
})
export class ApiModule {}
