import { articleStub } from '../tests/stubs/article.stub';

export const ArticleService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([articleStub()]),
  findOne: jest.fn().mockResolvedValue(articleStub()),
  create: jest.fn().mockResolvedValue(articleStub()),
  updateOne: jest.fn().mockResolvedValue(articleStub()),
  deleteOne: jest.fn(),
});
