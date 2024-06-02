import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ProductService } from "../product.service";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Extract product ID from URL parameters
    const productId = req.params.id;
    console.log(productId);
    console.log(req.user);

    // Find the product by ID
    const product = await this.productService.findOne(productId);

    // Check if the product exists
    if (!product) {
      return false;
    }
    if (!req.user) return false;

    // Compare the product's user ID with the user ID in the request
    const productOwnerId = product.owner; // assuming the owner field is named 'owner'
    const userId = req.user.id; // assuming the user's ID is available in req.user.id

    return productOwnerId === userId;
  }
}
