import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { GetProductQuery } from './dto/get-product-query.dto';
import { PaginatedResult } from '../common/Interfaces/paginated-result.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(
    getProductQuery: GetProductQuery,
  ): Promise<PaginatedResult<Product>> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    if (getProductQuery.search) {
      queryBuilder.andWhere('product.name LIKE :search', {
        search: `%${getProductQuery.search}%`,
      });
    }
    if (getProductQuery.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: getProductQuery.category,
      });
    }
    if (getProductQuery.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: getProductQuery.minPrice,
      });
    }
    if (getProductQuery.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: getProductQuery.maxPrice,
      });
    }
    const sort = getProductQuery.sort
      ? `product.${getProductQuery.sort}`
      : 'product.id';
    const order = getProductQuery.order
      ? (getProductQuery.order.toUpperCase() as 'ASC' | 'DESC')
      : 'ASC';
    queryBuilder.orderBy(sort, order);
    const skip = (getProductQuery.page - 1) * getProductQuery.limit;
    queryBuilder.skip(skip).take(getProductQuery.limit);
    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data: data,
      meta: {
        currentPage: getProductQuery.page,
        itemCount: data.length,
        itemPerPage: getProductQuery.limit,
        totalItem: total,
        totalPage: Math.ceil(total / getProductQuery.limit),
      },
    } as PaginatedResult<Product>;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
}
