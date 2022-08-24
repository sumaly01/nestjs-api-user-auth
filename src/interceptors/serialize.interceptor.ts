import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
// import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
  new (...args: any[]): {}; //should be a class
}

//custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Run something before a request is handled
    //by request handler
    //     console.log('Running befire handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        //run something before response is sent out
        //   console.log('Running before response is sent out', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, //removes password which is not in UserDto
        });
      }),
    );
  }
}
