import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: number;

  @ApiProperty()
  ownerId: string;
}
