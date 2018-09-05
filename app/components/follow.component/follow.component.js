import store from '../../store';
import { addUser, replaceUser, clearUsers } from '../../actions/users.actions';
import {
  sendRequest, responseGetted, requestError,
  FETCH_SUCCESS,
} from '../../actions/fetchUser.action';

const USERS_AMOUNT = 3;

const getAsyncData = function getAsyncData(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onload = function onload() {
      if (xhr.status !== 200) {
        const error = new Error(`${xhr.status}: ${xhr.statusText}`);
        reject(error);
      }
      resolve(xhr.response);
    };

    xhr.onerror = function onerror() {
      reject(new Error('network error'));
    };
  });
};

export default class githubWidget {
  constructor(config) {
    store.subscribe(this.processChanges.bind(this));

    this.$box = config.$box;
    this.$template = config.$template;
    this.$refreshBtn = config.$refreshBtn;
    this.removeBtnClass = config.removeBtnClass;

    this.url = 'https://api.github.com/users';
  }

  init() {
    this.removeElementsFromBox();
    this.$box.addEventListener('click', this.replaceUserElem.bind(this));
    this.$refreshBtn.addEventListener('click', this.refreshUsers.bind(this));
    this.addEmptyUsersInBox();
    this.loadUsersList(this.url);
  }

  replaceUserElem(event) {
    const { target } = event;
    const state = store.getState();

    if (target.classList.contains(this.removeBtnClass)
    && state.fetchUsers.type === FETCH_SUCCESS) {
      const targetUserIndex = this.findUserDOMIndex(target);
      if (targetUserIndex === -1) console.log(new Error('Can\'t find index of user'));

      this.getUser().then(
        (response) => {
          const user = JSON.parse(response);
          store.dispatch(replaceUser(targetUserIndex, user));
        },
        (error) => {
          store.dispatch(requestError(error));
        },
      );
    }
  }

  findUserDOMIndex($btn) {
    const { $box } = this;
    const usersArray = Array.from($box.children);
    let index = -1;

    usersArray.forEach(($item, i) => {
      if ($item.contains($btn)) index = i;
    });

    if (index !== -1) {
      return index;
    }
    return false;
  }

  addEmptyUsersInBox() {
    let usersAmount = USERS_AMOUNT;

    while (usersAmount) {
      const $userElem = this.$template.content.cloneNode(true);
      usersAmount -= 1;
      this.$box.appendChild($userElem);
    }
  }

  addUsersInBox() {
    const { users } = store.getState();
    const childrenArray = Array.from(this.$box.children);

    users.forEach((user, index) => {
      const $userElem = childrenArray[index];
      const $userImg = $userElem.querySelector('.widget-item__img');
      const $name = $userElem.querySelector('.widget-item__name');
      const $location = $userElem.querySelector('.widget-item__location');
      const $login = $userElem.querySelector('.widget-item__login');
      $userImg.setAttribute('src', user.avatar_url);
      $name.textContent = user.name || 'Github user';
      $location.textContent = user.location || 'unknown';
      $login.textContent = `@${user.login}`;
    });
    return this;
  }

  removeElementsFromBox() {
    const childrenArray = Array.from(this.$box.children);

    childrenArray.forEach((child) => {
      this.$box.removeChild(child);
    });

    return this;
  }

  loadUsersList(url) {
    store.dispatch(sendRequest());

    getAsyncData('GET', url).then(
      (data) => {
        const response = JSON.parse(data);
        store.dispatch(responseGetted(response));
      },
      (error) => {
        store.dispatch(requestError(error));
      },
    );
    return this;
  }

  getUser() {
    const usersList = store.getState().fetchUsers.data;

    const random = Math.floor(Math.random() * usersList.length);
    const userPreview = usersList[random];

    return getAsyncData('GET', userPreview.url);
  }

  refreshUsers() {
    const random = Math.floor(Math.random() * 500);
    const url = `${this.url}?since=${random}`;
    this.loadUsersList(url);

    store.dispatch(clearUsers());
  }

  processChanges() {
    const state = store.getState();
    console.log(state);

    if (state.fetchUsers.type === FETCH_SUCCESS && state.users.length === 0) {
      let usersAmount = USERS_AMOUNT;

      while (usersAmount) {
        usersAmount -= 1;
        this.getUser().then(
          (response) => {
            const user = JSON.parse(response);
            store.dispatch(addUser(user));
          },
          (error) => {
            store.dispatch(requestError(error));
          },
        );
      }
    }

    if (state.users.length === USERS_AMOUNT) {
      this.addUsersInBox();
    }
    return this;
  }
}
