import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import {
  InternalServerErrorException,
} from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { IListResponse } from './interfaces/list.interface';

@Injectable()
export class AppService {

  /**
   * getList
   * @returns 
   */
  getList(): IListResponse {
    const filename: string = join(__dirname, '..', 'static', '1.json');

    if (!existsSync(filename)) {
      throw new InternalServerErrorException();
    }

    const contents: Buffer = readFileSync(filename);

    let data: any;
    try {
      data = JSON.parse(contents.toString());
    } catch {
      throw new InternalServerErrorException();
    }
    return data;
  }

  /**
   * getImage
   * @param imageUrl 
   * @returns 
   */
  getImage(imageUrl: string): StreamableFile {

    const filename: string = join(__dirname, '..', 'static', imageUrl);

    if (!existsSync(filename)) {
      throw new NotFoundException();
    }

    const contents: Buffer = readFileSync(filename);

    return new StreamableFile(contents);
  }
}
