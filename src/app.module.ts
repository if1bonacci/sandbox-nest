import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    // custom modules
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
