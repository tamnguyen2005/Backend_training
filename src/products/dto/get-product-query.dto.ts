import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetProductQuery {
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsInt({ message: 'Số trang phải là kiểu số' })
  @Min(1, { message: 'Số trang tối thiểu là 1' })
  page: number = 1;
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 10 : parsed;
  })
  @IsInt({ message: 'Số lượng sản phẩm trên 1 trang phải là số' })
  @Min(1, { message: 'Số lượng sản phẩm trên 1 trang tối thiểu là 1' })
  @Max(50, { message: 'Số lượng sản phẩm tối đa trên 1 trang là 50' })
  limit: number = 10;
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  minPrice?: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  maxPrice?: number;
  @IsOptional()
  @IsString({ message: 'Chuỗi tìm kiếm phải là chuỗi kí tự' })
  search?: string;
  @IsOptional()
  @IsString({ message: 'Danh mục phải là chuỗi kí tự' })
  category?: string;
  @IsOptional()
  @IsIn(['price', 'name', 'createdAt'])
  sort?: string;
  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order?: string;
}
