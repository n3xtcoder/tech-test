import { Component } from '@angular/core';
import { uniq as _uniq } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son'];

  // Set can contain only unique values according to the MDN documentation:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#value_equality

  // **** Preferred method as it uses the native JS Standard built-in ECMAScript method ****
  deduplicateMethod1(): string[] {
    return [...new Set(this.wordList)];
  }

  // Using JS inbuilt method .filter()
  deduplicateMethod2(): string[] {
    return this.wordList.filter((word, index, _this) => {
      return _this.indexOf(word) === index;
    })
  }

  // using external library Lodash
  deduplicateMethod3(): string[] {
    return _uniq(this.wordList)
  }


}
