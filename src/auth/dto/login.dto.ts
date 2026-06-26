import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email không thể để trống' })
  @IsEmail()
  @IsString({ message: 'Email phải là chuỗi kí tự' })
  email!: string;
  @IsNotEmpty({ message: 'Mật khẩu không thể để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi kí tự' })
  password!: string;
}
