import React from "react";
import { action, computed, observable, toJS } from "mobx";
import { Provider, inject, observer } from "mobx-react";
import _ from "lodash";

const Styles = {
  button: {
    width: "120px",
    height: "44px",
    marginRight: "20px"
  }
};

class WishListStore {
  @observable.shallow lists = [];

  @computed
  get isEmpty() {
    return this.lists.length === 0;
  }

  @computed
  get titles() {
    var output = [];
    _.each(this.lists, list => {
      output.push(`wish title:${list.name}[items:`);
      _.each(list.items, item => {
        output.push(`item title:${item.title}`);
      });
      output.push("],  ");
    });
    return output.join();
  }

  @computed
  get totalWish() {
    return this.lists.length;
  }

  @computed
  get totalWishItems() {
    var count = 0;
    _.each(this.lists, list => (count += list.totalItems));
    return count;
  }

  @action.bound
  addWishList(name) {
    this.lists.push(new WishList(name));
  }

  @action.bound
  removeWishList(list) {
    this.lists.remove(list);
  }
}

class WishList {
  @observable name = "";
  @observable.shallow items = [];

  constructor(name) {
    this.name = name;
  }

  @computed
  get totalItems() {
    return this.items.length;
  }

  @action.bound
  renameWishList(newName) {
    this.name = newName;
  }

  @action.bound
  addItem(title) {
    this.items.push(new WishListItem(title));
  }

  @action.bound
  removeItem(item) {
    this.items.remove(item);
  }
}

class WishListItem {
  @observable title = "";
  @observable purchased = false;

  constructor(title) {
    this.title = title;
  }
}
const Store = new WishListStore();

@inject("store")
@observer
class WishlistExample extends React.Component {
  render() {
    let { totalWish, totalWishItems, titles } = this.props.store;
    let { addWish, addItem } = this.props;
    return (
      <div>
        <div>
          <button style={Styles.button} onClick={addWish}>
            Add Wish
          </button>
          <button style={Styles.button} onClick={addItem}>
            Add Wish Item
          </button>
        </div>
        <div>
          <span>
            总共wish:{totalWish},总共items:{totalWishItems},内容:{titles}
          </span>
        </div>
      </div>
    );
  }
}

export default class WishlistExampleContainer extends React.Component {
  addWish() {
    var i = parseInt(Math.random() * 100);
    Store.addWishList(`wish title ${i}`);
  }

  addItem() {
    if (Store.totalWish > 0) {
      var i = parseInt(Math.random() * 10);
      Store.lists[0].addItem(`wishItem title ${i}`);
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <WishlistExample addWish={this.addWish} addItem={this.addItem} />
      </Provider>
    );
  }
}
