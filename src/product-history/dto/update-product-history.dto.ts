import { PartialType } from '@nestjs/swagger';


export class UpdateProductHistoryDto  {
    constructor(price: number, discount: number, availability: boolean) {
        this.price = price;
        this.discount = discount;
        this.availability = availability;
    }

    price: number;
    discount: number;
    availability: boolean;
}
