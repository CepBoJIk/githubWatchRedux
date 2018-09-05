import '../style.css';

import './components/follow.component/follow.component.scss';
import GithubWidget from './components/follow.component/follow.component';

const githubWidget = new GithubWidget({
  $box: document.querySelector('.github-widget__content'),
  $template: document.querySelector('.widget-template'),
  $refreshBtn: document.querySelector('.github-widget__refresh'),
  removeBtnClass: 'widget-item__remove-btn',
});

githubWidget.init();
