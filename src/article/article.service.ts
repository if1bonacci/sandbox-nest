import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
  async findOne(id: string): Promise<Article> {
    return this.articleModel.findOne({ _id: id }).exec();
  }
  async create(ArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(ArticleDto);
    return createdArticle.save();
  }
  async updateOne(ArticleDto: UpdateArticleDto, id: string): Promise<Article> {
    const updatedArticle = this.articleModel.findOneAndUpdate(
      { _id: id },
      ArticleDto,
      { new: true },
    );

    return updatedArticle.exec();
  }
  async deleteOne(id: string): Promise<void> {
    await this.articleModel.deleteOne({ _id: id }).exec();
  }
}
