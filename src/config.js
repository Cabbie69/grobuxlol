const prefix = "-";

module.exports = {
  webGuildId: '',
  creator: "",
  token: "",
  prefix: prefix,
  server: "",
  languages: ["English", "Arabic", "en", "ar"],
  language: "English",
  owners: ["",""],
  color: "RANDOM",
  presence: {
    status: "online",
    activity: {
      type: "WATCHING",
      name: `-help | Galaxy Robux`
    }
  },
  emojis: {
    done: "✅",
    error: "❎",
    style: ""
  },
  dataBaseInfo: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  },
  defaultData: {
    guildsData: {
      blacklisted: false,
      prefix: prefix,
      language: "en",
      system: {
        cookies: "",
        group: "",
        owner: "",
        admins: ["Empty"],
        giftsCode: ["Empty"],
        price: 1100,
        discount: 10,
        limit: 1,
        proofsChannel: "",
        thanksChannel: "",
        boostsChannel: "",
        clientsRole: "",
        boostsRole: "",
        status: true
      }
    },
    usersData: {
      blacklisted: false,
      profile: {
        cloudServer: "",
        username: "",
        title: "",
        level: 1,
        xp: 100,
        rep: 0,
        coins: 0,
        now: "null"
      },
    }
  }
}
