import { Article } from '../../schemas/article.schema';

export const articleStub = (): Article => {
  return {
    _id: '6321ef46c129bc208b7cc871',
    title: 'Test title',
    description: 'Test description',
    text: 'Test article body',
  };
};
