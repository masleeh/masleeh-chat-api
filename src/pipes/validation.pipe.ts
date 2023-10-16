import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodError, ZodObject } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject<any>) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: unknown, _metadata: ArgumentMetadata) {
        try {
            this.schema.parse(value)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException(error.message ?? 'Validation failed')
            } else {
                throw new BadRequestException('Validation failed')
            }
        }
        return value
    }
}