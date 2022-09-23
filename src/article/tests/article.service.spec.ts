import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '../article.service';
import { getModelToken } from '@nestjs/mongoose';
import { ArticleModel } from './support/article.model';
import { Article } from '../schemas/article.schema';
import { articleStub } from './stubs/article.stub';
import { CreateArticleDto } from '../dto/create.article.dto';
import { UpdateArticleDto } from '../dto/update.article.dto';
import { ignoreElements } from 'rxjs';

describe('ArticleService', () => {
  let service: ArticleService;

  describe('Find and update operations', () => {
    let articleModel: ArticleModel;

    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [
          ArticleService,
          {
            provide: getModelToken(Article.name),
            useClass: ArticleModel,
          },
        ],
      }).compile();

      service = app.get<ArticleService>(ArticleService);
      articleModel = app.get<ArticleModel>(getModelToken(Article.name));

      jest.clearAllMocks();
    });

    it('ArticleService should be defined', () => {
      expect(service).toBeDefined();
    });

    it('findAll function', async () => {
      jest.spyOn(articleModel, 'find');
      const tCase = await service.findAll();

      expect(articleModel.find).toHaveBeenCalledTimes(1);
      expect(tCase).toEqual([articleStub()]);
    });

    it('findOne function', async () => {
      jest.spyOn(articleModel, 'findOne');
      const tCase = await service.findOne(articleStub()._id);

      expect(articleModel.findOne).toHaveBeenCalledTimes(1);
      expect(articleModel.findOne).toHaveBeenCalledWith({
        _id: articleStub()._id,
      });
      expect(tCase).toEqual(articleStub());
    });

    it('Update function', async () => {
      jest.spyOn(articleModel, 'findOneAndUpdate');
      const UpArticleDto: UpdateArticleDto = {
        title: articleStub().title,
        description: articleStub().description,
        text: articleStub().text,
      };
      const article: Article = await service.updateOne(
        UpArticleDto,
        articleStub()._id,
      );

      expect(articleModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(articleModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: articleStub()._id },
        UpArticleDto,
        { new: true },
      );
      expect(article).toEqual(articleStub());
    });
  });

  describe.skip('Create operations', () => {
    let service: ArticleService;

    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [
          ArticleService,
          {
            provide: getModelToken(Article.name),
            useClass: ArticleModel,
          },
        ],
      }).compile();

      service = app.get<ArticleService>(ArticleService);
      jest.clearAllMocks();
    });

    it('create function', async () => {
      const ArticleDto: CreateArticleDto = {
        title: articleStub().title,
        description: articleStub().description,
        text: articleStub().text,
      };
      const saveSpy: jest.SpyInstance = jest.spyOn(
        ArticleModel.prototype,
        'save',
      );
      const constructorSpy: jest.SpyInstance = jest.spyOn(
        ArticleModel.prototype,
        'constructorSpy',
      );
      const article: Article = await service.create(ArticleDto);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(constructorSpy).toHaveBeenCalledWith(ArticleDto);
      expect(article).toEqual(articleStub());
    });
  });
});
