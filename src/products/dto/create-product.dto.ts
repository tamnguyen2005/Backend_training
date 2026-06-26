import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được phép trống' })
  @IsString({ message: 'Tên sản phẩm phải là chuỗi kí tự' })
  name!: string;
  @IsNotEmpty({ message: 'Giá sản phẩm không được phép để trống' })
  @IsInt({ message: 'Giá sản phẩm phải là số' })
  @Min(1000, { message: 'Giá tối thiểu của sản phẩm là 1000' })
  price!: number;
  @IsNotEmpty({ message: 'Danh mục không được phép để trống' })
  @IsString({ message: 'Danh mục phải là chuỗi kí tự' })
  category!: string;
  @IsNotEmpty({ message: 'Mô tả không được phép để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi kí tự' })
  description!: string;
  @IsNotEmpty({ message: 'Đường dẫn ảnh không được phép để trống' })
  @IsString({ message: 'Đường dẫn ảnh phải là chuỗi kí tự' })
  imageUrl!: string;
}
