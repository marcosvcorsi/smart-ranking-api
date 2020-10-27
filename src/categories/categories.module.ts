import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/players/models/player.schema';
import { PlayersRepository } from 'src/players/repositories/players.repository';
import { CategoriesController } from './controllers/categories.controller';
import { Category, CategorySchema } from './models/category.schema';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
      {
        name: Player.name,
        schema: PlayerSchema
      }
    ])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, PlayersRepository]
})
export class CategoriesModule {}
