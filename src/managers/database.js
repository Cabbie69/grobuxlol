const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
const fire = new Map();

class DatabaseManager {
  constructor (DataBaseInfo, Options) {
    try {
      if (DataBaseInfo == undefined || Options == undefined || typeof Options != "object" || Options.name == undefined || typeof Options.name != "string" || Options.name.includes(' ') || Options.name.includes('\n')) throw new Error("Invalid parameters !");
      this.options = Options;
      if (fire.has(this.options.name)) throw new Error("Database name already exists !");
      else fire.set(this.options.name, true);
      if (!fire.has(DataBaseInfo)) {
        fire.set(DataBaseInfo, true);
        firebase.initializeApp(DataBaseInfo);
      }
      this.database = firebase.database();
      this.rootRef = this.database.ref(this.options.name);
      console.log(this.options.name + " database has been created successfully !");
      this.default = null;
      if (this.options.default != undefined) {
        this.default = this.options.default;
      }
      return true;
    } catch (err) {
      console.error("Failed to create database !");
      return null;
    }
  }
  
  async setDefault(key) {
    if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
    if (this.default != undefined) {
      if (await this.findKey(key) == false) {
        await this.set(key, this.default);
        return true;
      } else false;
    } else null;
  }
  
  async set(key, value) {
    if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
    if (!value) throw new Error("Value is undefined !");
    await this.rootRef.child(key).set(value).then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }
  
  async push(value) {
    if (!value) throw new Error("Value is undefined !");
    let autoKey = await this.rootRef.push().key;
    await this.rootRef.child(autoKey).set(value).then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }
  
  async update(key, value) {
    if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
    if (!value) throw new Error("Value is undefined !");
    await this.setDefault(key);
    await this.rootRef.child(key).update(value).then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }
  
  async get(key) {
    try {
      if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
      await this.setDefault(key);
      let data = await this.rootRef.child(key).get();
      if (data.exists()) {
        return data.val();
      } else {
        return undefined;
      }
    } catch(err) {
      console.error(err);
      return null;
    }
  }
  
  async getKeys() {
    return new Promise(async (resolve) => {
      try {
        await this.rootRef.once('value', (data) => {
          if (data.exists() && Object.keys(data.val()).length) {
            let dataObject = data.val();
            let keys = Object.keys(dataObject);
            let values = Object.values(dataObject);
            let dataMap = new Map();
            keys.forEach((e, i) => {
              dataMap.set(e, values[i]);
            });
            return resolve(dataMap);
          } else {
            resolve(undefined);
          }
        });
      } catch (err) {
        console.error(err);
        resolve(null);
      }
    });
  }
  
  async findKey(key) {
    if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
    let keys = await this.getKeys();
    if (keys == undefined || !keys.has(key)) return false;
    else true;
  }
  
  async delete(key) {
    if (!key || key.includes(' ') || key.includes('\n')) throw new Error("Invalid key !");
    await this.rootRef.child(key).set(null, null).then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }
  
  async deleteAll() {
    await this.rootRef.set('/', null).then(() => {
      return true;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }
}

module.exports = DatabaseManager;