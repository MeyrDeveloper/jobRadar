import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SEARCH_STATUS } from '../types/search';
import {
  CreateRequestSearchDto,
  CreateResponseSearchDto,
} from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Search, SearchDocument } from './schema/search.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Search.name) private searchModel: Model<SearchDocument>,
  ) {}

  async create(
    createSearchDto: CreateRequestSearchDto,
  ): Promise<CreateResponseSearchDto> {
    const createdSearchDocument = new this.searchModel({ ...createSearchDto });

    const res = await createdSearchDocument.save();

    return {
      searchId: createdSearchDocument.id,
      status: SEARCH_STATUS.PENDING,
    };
  }

  findAll() {
    return `This action returns all search 123`;
  }

  findOne(id: number) {
    return `This action returns a findone search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a update search`;
  }

  remove(id: number) {
    return `This action removes a remove search`;
  }
}
