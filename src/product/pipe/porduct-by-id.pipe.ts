import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from '../entities/product.entity';


@Injectable()
export class ProductByIdPipe implements PipeTransform {
  constructor(private readonly productService: ProductService) {}

  async transform(value: any, metadata: ArgumentMetadata) : Promise<Product> {
    const productId = value;

    // Validate the product ID format if necessary (e.g., ObjectId for MongoDB)
    if (!this.isValidId(productId)) {
      throw new BadRequestException('Invalid product ID format');
    }

    // Fetch the product
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Return the product to be appended to the request object
    return product;
  }

  // Optional: Add a method to validate the product ID format
  private isValidId(id: string): boolean {
    if (!id)
        return false;
    return true; // Placeholder: assume all IDs are valid
  }
}
