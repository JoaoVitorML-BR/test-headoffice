import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AgentsModule } from './agents/agents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AgentsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}



