import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AgentsModule } from './agents/agents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, AgentsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}



