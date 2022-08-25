import applyEditor from '../common/applyEditor';

app.initializers.add('askvortsov/flarum-rich-text', () => {
  applyEditor();
});

export * from '../common/index';
