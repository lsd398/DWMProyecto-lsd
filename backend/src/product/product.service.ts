import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './create-product.dto';
import { Product, ProductDocument } from './product.schema';
import { Connection, Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/transaction/transaction.schema';

@Injectable()
export class ProductService {

    constructor(
        @InjectConnection() private connection: Connection,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
    ) {}
        
    
    async getProduct(id: string) {
        const q = await this.productModel.find({_id: id}).exec();
        console.log('Found product', q)
        
        return q[0];
        
    }

    deleteProduct(id: string) {
        const q = this.productModel.deleteOne({_id: id}).exec();
        console.log('Deleted product', q)
        return q;
    }

    updateProduct(req: any) {
        throw new Error('Method not implemented.');
    }

    async createProduct(createdProductDto: any) {

        console.log('Create product: ', createdProductDto);

        const createdProduct = await this.productModel.create(createdProductDto);

        console.log('Created product: ', createdProduct);

        const createdTransaction = await this.transactionModel.create({
            buyer: "NONE",
            seller: createdProductDto.owner,
            product: createdProduct._id,
            status: 'available'
        });

        console.log('Created transaction: ', createdTransaction);
        
        return [createdProduct, createdTransaction];
    }

    async getProductList(ownerId: string) {
        
        const q = await this.productModel.find({owner: ownerId}).exec();

        console.log('Get Product List from ' + ownerId + ': ', q);
        

        return q;
    }

    async getAllProductList() {
        const q = await this.productModel.find().exec();
        
        console.log('Get All Product List: ', q);

        return q;
    }

      async findOneByName(name: string): Promise<Product> {
        const q = await this.productModel.find({name: name}).exec();
        console.log('Found product', q);
        return q[0];
      }

      async findOneByDescription(description: string): Promise<Product> {
        const q = await this.productModel.find({description: description}).exec();
        console.log('Found product', q);
        return q[0];
      }

      async findOneByPrice(price: string): Promise<Product> {
        const q = await this.productModel.find({price: price}).exec();
        console.log('Found product', q);
        return q[0];
      }

      async findOneByImage(image: string): Promise<Product> {
        const q = await this.productModel.find({image: image}).exec();
        console.log('Found product', q);
        return q[0];
      }

      async findOneByOwner(owner: string): Promise<Product> {
        const q = await this.productModel.find({owner: owner}).exec();
        console.log('Found product', q);
        return q[0];
      }

      async findOneBySize(size: string): Promise<Product> {
        const q = await this.productModel.find({size: size}).exec();
        console.log('Found product', q);
        return q[0];
      }


}
