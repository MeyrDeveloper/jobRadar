import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestSearchDto } from './create-search.dto';

export class UpdateSearchDto extends PartialType(CreateRequestSearchDto) {}
