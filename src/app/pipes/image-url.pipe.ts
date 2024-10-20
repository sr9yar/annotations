import { Inject, inject, Pipe, PipeTransform } from '@angular/core';
import { API_CONFIG, ApiConfig } from '../api.config';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  constructor(
    @Inject(API_CONFIG) private readonly apiConfig: ApiConfig,
  ) { }

  transform(value: string | undefined): string | null {
    if (!value) {
      return null;
    }
    return `${this.apiConfig.url}/${value}`;
  }

}




