import {
  Controller,
  Get,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { IListResponse } from 'src/interfaces/list.interface';



@Controller('list')
export class ListController {
  constructor(
    private readonly appService: AppService,
  ) { }

  /**
   * getList
   * @returns 
   */
  @Get()
  getList(): IListResponse {
    return this.appService.getList();
  }

}
