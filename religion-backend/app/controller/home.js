'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = { name: 'egg' };
    await ctx.render('index.html', data);
  }
}

module.exports = HomeController;
