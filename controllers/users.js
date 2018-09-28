const { User } = require('../models');

class UsersController {
  constructor() {
    // Function binding
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const data = await User.getAll();

    const json = {
      data: data,
      total_count: data.length,
      per_page: req.body.per_page,
      page: req.body.page,
    };

    if (data.length === 0) {
      res.status(204); // No content
    } else {
      res.status(200); // OK
    }

    res.send(json);
  }

  async get(req, res) {
    const data = await User.get(req.params.userId);

    if (data.length === 0) {
      res.status(404); // Not Found
    }

    res.send(data);
  }

  async insert(req, res) {
    const data = await User.insert(req.body);

    if (data.length === 0) {
      res.status(409); // Conflict
    } else {
      res.status(200); // Created
    }

    res.send(data);
  }

  async update(req, res) {

  }

  async delete(req, res) {

  }
}

module.exports = new UsersController();
