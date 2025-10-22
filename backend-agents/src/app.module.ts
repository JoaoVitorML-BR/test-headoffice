import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [DatabaseModule, AgentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}



