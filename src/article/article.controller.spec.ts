import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET list of articles"', async () => {
    const tCase = await controller.getAll();
    expect(tCase).toBe(1);
  });
  //
  // it('GET single article"', () => {
  //   expect(controller.getOne()).toHaveLength(1);
  // });
  //
  // it('Create article"', () => {
  //   expect(controller.create()).toHaveLength(1);
  // });
  //
  // it('Update article"', () => {
  //   expect(controller.update()).toHaveLength(1);
  // });
});
