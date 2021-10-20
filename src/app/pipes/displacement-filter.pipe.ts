import { Pipe, PipeTransform } from '@angular/core';
import { Displacement } from '../models/displacement';

@Pipe({
  name: 'displacementFilter'
})
export class DisplacementFilterPipe implements PipeTransform {

  transform(value: Displacement[], displacementFilterText:string): Displacement[] {
    displacementFilterText = displacementFilterText?displacementFilterText.toLocaleLowerCase():""
    return displacementFilterText?value.filter((b:Displacement)=>b.engineDisplacement.toString().toLocaleLowerCase().indexOf(displacementFilterText)!==-1):value;
  }
}


