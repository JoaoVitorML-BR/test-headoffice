import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class SeedService implements OnModuleInit {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    async seedAdmin() {
        try {
            const adminExists = await this.userModel.findOne({ role: UserRole.ADMIN });

            if (adminExists) {
                this.logger.log('Admin user already exists. Skipping seed.');
                return;
            }

            const adminData = {
                name: 'Administrator',
                email: 'admin@headoffice.com',
                cpf: '84106700034',
                password: await bcrypt.hash('Admin@123', 10),
                role: UserRole.ADMIN,
            };

            const admin = new this.userModel(adminData);
            await admin.save();

            this.logger.log('Default admin user created successfully!');
            this.logger.log('Email: admin@headoffice.com');
            this.logger.log('Password: Admin@123');
            this.logger.warn('Please change the default password after first login!');
        } catch (error) {
            this.logger.error('Error seeding admin user:', error.message);
        }
    }
}
