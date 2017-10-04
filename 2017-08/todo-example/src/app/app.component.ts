import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app works!';
// }


@Component({
  selector: 'app-root',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { name = 'Angular'; }