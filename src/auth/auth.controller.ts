import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeaders } from './decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorator/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }
  
  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {


    return {
      ok: true,
      message: 'Hola mundo private',
      user,
      userEmail,
      rawHeaders,
    }
  }

//OTRA FORMA DE CONFIGURACION DE LOS USUARIOS
  // @Get('private2')
  // @SetMetadata('roles', ['admin','super-user'])
  // @UseGuards( AuthGuard(), UserRoleGuard )
  // privateRoute2(
  //   @GetUser() user: User
  // ){

  //   return {
  //     ok: true,
  //     user
  //   }
  // }

  @Get('private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
  }


  @Get('private3')
  @Auth( ValidRoles.admin ) // si se quiere que ningun tipo de usuario entre a esta ruta no se coloca nada en el parentesis
  privateRoute3(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
  }

}
