import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from '../article.controller';
import { ArticleService } from '../article.service';
import { articleStub } from './stubs/article.stub';
import { CreateArticleDto } from '../dto/create.article.dto';
import { Article } from '../schemas/article.schema';
import { UpdateArticleDto } from '../dto/update.article.dto';

jest.mock('../article.service');

describe('ArticleController', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET list of articles"', async () => {
    const tCase = await controller.getAll();

    expect(tCase).toEqual([articleStub()]);
  });

  it('GET single article"', async () => {
    const tCase = await controller.getOne(articleStub()._id);

    expect(tCase).toEqual(articleStub());
  });

  it('Create article"', async () => {
    const ArticleDto: CreateArticleDto = {
      title: articleStub().title,
      description: articleStub().description,
      text: articleStub().text,
    };
    const article: Article = await controller.create(ArticleDto);

    expect(article).toEqual(articleStub());
  });

  it('Update article', async () => {
    const UpArticleDto: UpdateArticleDto = {
      title: articleStub().title,
      description: articleStub().description,
      text: articleStub().text,
    };
    const article: Article = await controller.update(
      UpArticleDto,
      articleStub()._id,
    );

    expect(article).toEqual(articleStub());
  });

  it('Delete article"', async () => {
    const tCase = await controller.delete(articleStub()._id);

    expect(tCase).toBeUndefined();
  });
});
