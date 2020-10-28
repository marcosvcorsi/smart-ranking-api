import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidationParametersPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!value.includes('@')) {
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser um e-mail`);
    }

    return value;
  }
}