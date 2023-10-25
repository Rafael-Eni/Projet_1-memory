class User {
  username;
  email;
  password;
  score = [];
  preferences = {
    name: "legume",
    size: "4*3",
  };

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  addScore(number, size, memoryName) {
    this.score.push({
      tries: number,
      size: size,
      memory: memoryName,
      date: Date.now(),
    });
  }

  changeUsername(userName) {
    this.username = userName;
  }

  changeEmail(email) {
    this.email = email;
  }
}
