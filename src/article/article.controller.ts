import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() ArticleDto: CreateArticleDto) {
    return await this.articleService.create(ArticleDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Body() ArticleDto: UpdateArticleDto, @Param('id') id: string) {
    return await this.articleService.updateOne(ArticleDto, id);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    return await this.articleService.deleteOne(id);
  }
}
