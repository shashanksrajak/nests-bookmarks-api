import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Local Modules
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // --------- SignIn Service -------------
  async signin(dto: AuthDto) {
    console.log(dto);

    // Find the user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    console.log(user);

    if (!user) throw new ForbiddenException('Invalid Credentials.');

    // compare password
    const passwordMatched = bcrypt.compareSync(dto.password, user.password);
    if (!passwordMatched) {
      throw new ForbiddenException('Invalid Credentials.');
    }

    // genreate JWT tokens and send in the response
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return { access_token: accessToken };
  }
  // --------- SignIn Service -------------

  //---------- Sign-Up Service ------------
  async signup(dto: AuthDto) {
    // Business Logic
    console.log(dto);

    // Hash the password
    const hashedPassword = bcrypt.hashSync(dto.password, 10);
    // console.log(hashedPassword);

    // Save user in database
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    // console.log(user);
    // Return the created user
    return user;
  }
  //---------- Sign-Up Service ------------
}
