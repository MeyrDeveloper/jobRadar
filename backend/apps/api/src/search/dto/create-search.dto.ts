import { IsString } from 'class-validator';
import { SEARCH_STATUS } from '../../types/search';

export class CreateRequestSearchDto {
  @IsString()
  query: string;

  @IsString()
  location: string;
}

export class CreateResponseSearchDto {
  @IsString()
  searchId: string;

  @IsString()
  status: SEARCH_STATUS;
}
