import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductHistoryService } from './product-history.service';

@Controller('product-history')
export class ProductHistoryController {
  constructor(private readonly productHistoryService: ProductHistoryService) {}

  
}
