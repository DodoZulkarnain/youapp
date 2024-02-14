import { Body, Controller, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AllExceptionsFilter } from 'src/rpc-exception/all-exception.filter';

@Controller('users')
//@UseGuards(AuthGuard)
export class UsersController {
    constructor(private UserServices: UsersService){}

    @MessagePattern({ cmd: 'userById' })
    async find(@Payload() payload : any) {
        const id = '65ccdc01e4ff177f5ec4874f';
        return await this.UserServices.findUserById(id);
    }

    @MessagePattern({ cmd: 'userUpdate' })
    @UseFilters(new AllExceptionsFilter())
    async updateId(@Payload() updateProfileDto: any){
        console.log(updateProfileDto);
        const id = updateProfileDto.id;
        return await this.UserServices.updateProfile(id, updateProfileDto.updateProfileDto);
    }

    @MessagePattern({ cmd: 'userAll' })
    @UseFilters(new AllExceptionsFilter())
    async getUser(){
        return await this.UserServices.findUser();
    }

    @MessagePattern('register')
    @UseFilters(new AllExceptionsFilter())
    //@UsePipes(new ValidationPipe)
    async createUser(@Payload() createUserDTO: any){
        return await this.UserServices.createUser(createUserDTO);
    }

}
