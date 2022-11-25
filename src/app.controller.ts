import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getReq')
  getReq(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): string {
    console.log(request);
    response.status(HttpStatus.OK);
    return 'You can see the request info';
  }

  @Get('getQueryAndParam/:id?')
  getQuery(@Param('id') params: string, @Query() query: any): string {
    console.log('params', params);
    console.log('query', query);
    return 'You can see the  params info';
  }

  @Post('postQuery/:id?')
  postQuery(@Param('id') params: string, @Body() body: any): string {
    console.log('params', params);
    console.log('body', body);
    return 'You can see the  body info';
  }

  @Get('userState')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  userState(): string {
    return '204: No Content';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
