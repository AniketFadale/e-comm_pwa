import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(text: string ,args :any[]):any {
    if (!text) {
        return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, ' ');
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return without_html.length > limit ? without_html.substring(0, limit) + trail : without_html;
 
}

}
