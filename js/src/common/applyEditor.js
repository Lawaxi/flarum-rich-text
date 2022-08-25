import { extend, override } from 'flarum/common/extend';

import Button from 'flarum/common/components/Button';
import TextEditor from 'flarum/common/components/TextEditor';
import Tooltip from 'flarum/common/components/Tooltip';
import classList from 'flarum/common/utils/classList';

import ProseMirrorEditorDriver from './proseMirror/ProseMirrorEditorDriver';
import ProseMirrorMenu from './components/ProseMirrorMenu';
import MenuState from './states/MenuState';

export default function applyEditor() {

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    items.remove('markdown');
    items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState} />, 100);
    items.add('notice', <span>可使用[color=red]xxx[/color]添加颜色</span>, 0);
  });

  extend(TextEditor.prototype, 'buildEditorParams', function (items) {
    if (!app.session.user.preferences().useRichTextEditor) return;

    items.menuState = this.menuState = new MenuState();
    items.classNames.push('Post-body');
    items.escape = () => app.composer.close();
    m.redraw();
  });

  override(TextEditor.prototype, 'buildEditor', function (original, dom) {
    if (app.session.user.preferences().useRichTextEditor) {
      return new ProseMirrorEditorDriver(dom, this.buildEditorParams());
    }

    return original(dom);
  });
}
