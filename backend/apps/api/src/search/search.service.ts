import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { KafkaService } from '../kafka/kafka.service';
import { SEARCH_STATUS } from '../types/search';
import {
  CreateRequestSearchDto,
  CreateResponseSearchByIdDto,
  CreateResponseSearchDto,
} from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Search, SearchDocument } from './schema/search.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Search.name) private searchModel: Model<SearchDocument>,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(
    createSearchDto: CreateRequestSearchDto,
  ): Promise<CreateResponseSearchDto> {
    const createdSearchDocument = new this.searchModel({
      ...createSearchDto,
      status: SEARCH_STATUS.PENDING,
      jobsFound: 0,
      createdAt: new Date(),
    });

    this.kafkaService.sendMessage({
      ...createdSearchDocument,
      eventId: randomUUID(),
      eventType: process.env.KAFKA_SERVICE ?? '',
      searchId: createdSearchDocument.id,
    });
    await createdSearchDocument.save();

    return {
      searchId: createdSearchDocument.id,
      status: SEARCH_STATUS.PENDING,
    };
  }

  findAll() {
    return this.searchModel.find();
  }

  async findOne(id: string): Promise<CreateResponseSearchByIdDto> {
    const findedSearch = await this.searchModel.findById(id);

    if (!findedSearch)
      throw new NotFoundException('Такого запроса не существует');

    return {
      searchId: findedSearch.id,
      status: findedSearch.status,
      jobs: findedSearch.jobsFound,
    };
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a update search`;
  }

  remove(id: number) {
    return `This action removes a remove search`;
  }
}
