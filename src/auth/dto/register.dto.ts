import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Họ tên không thể để trống' })
  @IsString({ message: 'Họ tên phải là chuỗi kí tự' })
  fullName!: string;
  @IsNotEmpty({ message: 'Email không thể bỏ trống' })
  @IsEmail()
  @IsString({ message: 'Email phải là chuỗi kí tự' })
  email!: string;
  @IsNotEmpty({ message: 'Số điện thoại không thể để trống' })
  @IsString({ message: 'Số điện thoại phải là chuỗi số' })
  @Length(10, 10, { message: 'Số điện thoại phải là chuỗi 10 số' })
  phoneNumber!: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi kí tự' })
  @Length(6, 12, { message: 'Mật khẩu phải có độ dài từ 6-12 kí tự' })
  password!: string;
}
