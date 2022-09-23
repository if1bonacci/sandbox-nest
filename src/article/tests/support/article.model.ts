import { MockModel } from './mock.model';
import { Article } from '../../schemas/article.schema';
import { articleStub } from '../stubs/article.stub';

export class ArticleModel extends MockModel<Article> {
  protected entityStub = articleStub();
}
