import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'squareMeters' })
export class SquareMetersPipe implements PipeTransform {
  transform(value: string | number): string {
    return `${value} m2`;
  }
}