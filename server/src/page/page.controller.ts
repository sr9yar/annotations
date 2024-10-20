import {
  Controller,
  Get,
  Header,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('pages')
export class PageController {
  constructor(
    private readonly appService: AppService,
  ) { }

  /**
   * getImage
   * @param imageUrl 
   * @returns 
   */
  @Get(':imageUrl')
  @Header('Content-Type', 'image/png')
  getImage(@Param('imageUrl') imageUrl: string): StreamableFile {
    return this.appService.getImage(imageUrl);
  }
}
