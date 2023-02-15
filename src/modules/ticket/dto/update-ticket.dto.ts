import { IsString } from "class-validator";

export class UpdateTicketDto  {
    @IsString()
    response!: string;
}
