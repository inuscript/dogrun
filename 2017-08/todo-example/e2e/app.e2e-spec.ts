import { TodoExamplePage } from './app.po';

describe('todo-example App', () => {
  let page: TodoExamplePage;

  beforeEach(() => {
    page = new TodoExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
