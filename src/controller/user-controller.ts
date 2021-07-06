/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Param, UseBefore, UseAfter, UseInterceptor, Action, Post, OnUndefined, Body, Res,
} from 'routing-controllers';
import 'reflect-metadata';
import { loggingBefore, loggingAfter } from '../middleware/middleware';
import { Info } from '../model/info';

@Controller()
@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
@UseInterceptor((action: Action, content: any) => {
  console.log('change response...');
  return content;
})

export class UserController {
  @Get('/users')
  getAll() {
    console.log('do something in GET function...');
    return 'This action returns all users';
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return `This action returns user #${id}`;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info /* @Res() response?: any */) {
    console.log(JSON.stringify(info));
    /* return response.json({ id }); */
  }
}
