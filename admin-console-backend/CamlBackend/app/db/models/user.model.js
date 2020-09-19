const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.password = user.password;

};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (null != res.insertId || res.insertId != "") {

    }

    result(null, { id: res.insertId, ...newUser });
    sql.commit;
    return;
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT u.id,u.userName,u.password,u.token,r.id as role,r.type,r.description FROM user u Left JOIN role r ON u.role=r.id where u.id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      let user = {};

      if (null == res[0].role) {
        user = {
          id: res[0].id,
          userName: res[0].userName,
          password: res[0].password,
          token: res[0].token,
          role: null

        }
      } else {
        user = {
          id: res[0].id,
          userName: res[0].userName,
          password: res[0].password,
          token: res[0].token,
          role: {
            id: res[0].role,
            type: res[0].type,
            description: res[0].description,
          }

        }
      }






      result(null, user);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};




User.getAll = result => {
  //sql.query("SELECT * FROM user", (err, res) => {
  sql.query(" SELECT u.id,u.userName,u.password,u.token,r.id as role,r.type,r.description FROM user u Left JOIN role r ON u.role=r.id ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    let userList = [];
    let user1 = {};
    for (let i = 0; i < res.length; i++) {
      if (null == res[i].role) {
        user1 = {
          id: res[i].id,
          userName: res[i].userName,
          password: res[i].password,
          token: res[i].token,
          role: null

        }
      } else {
        user1 = {
          id: res[i].id,
          userName: res[i].userName,
          password: res[i].password,
          token: res[i].token,
          role: {
            id: res[i].role,
            type: res[i].type,
            description: res[i].description,
          }

        }
      }


      userList.push(user1)

    }
   
    result(null, userList);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET email = ?, name = ?, active = ? WHERE id = ?",
    [user.email, user.name, user.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

User.login = (newUser, result) => {
  var name = newUser.name;
  var password = newUser.password;
  let resJson = {};
  if (name && password) {
    sql.query('SELECT a.id,a.name,a.password FROM appuser a WHERE a.name = ? AND a.password = ?', [name, password], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        resJson = sucessJson(res, resJson)
        result(null, resJson);
        return;
      } else {
        var errormsg = 'Incorrect Username and/or Password!';
        resJson = failJson(resJson, errormsg)
        result(null, resJson);
        return;
      }

    });
  } else {
    var errormsg = 'Please enter Username and Password';
    resJson = failJson(resJson, errormsg)
    result(null, resJson);
    return;

  }
};

function sucessJson(res, resJson) {

  let data = {};
  resJson = {
    "status": "SUCCESS",
    "data": {
      id: res[0].id,
      name: res[0].name,
      password: res[0].password

    },
    "msg": null,
    "errormsg": "",

  }
  return resJson;
};

function failJson(resJson, errormsg) {
  let data = {};
  resJson = {
    "status": "FAIL",
    "data": null,
    "msg": null,
    "errormsg": errormsg,

  }
  return resJson;
};




module.exports = User;
