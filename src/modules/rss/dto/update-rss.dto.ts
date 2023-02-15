import { IsString, IsOptional } from 'class-validator';

export class UpdateRssDto {
    @IsString()
    @IsOptional()
    url: string;
  
    @IsString()
    @IsOptional()
    state?: string;
  
}
