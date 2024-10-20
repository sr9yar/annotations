import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PageController } from './page/page.controller';
import { ListController } from './list/list.controller';

@Module({
  imports: [],
  controllers: [
    PageController,
    ListController,
  ],
  providers: [AppService],
})
export class AppModule { }
