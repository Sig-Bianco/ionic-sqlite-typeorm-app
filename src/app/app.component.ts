import {APP_INITIALIZER, Component, inject} from '@angular/core';
import {IonApp, IonButton, IonRouterOutlet} from '@ionic/angular/standalone';
import {OrmService, SQLiteService} from "my-lib";
import {Category} from "./entities/category";
import dataSource from "./data-sources/data-source";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

export function initializeFactory(init: SQLiteService) {
  return () => init.initializeWebStore();
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    IonApp,
    IonRouterOutlet,
    IonButton
  ],
  providers: [
    SQLiteService,
    OrmService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [SQLiteService],
      multi: true
    },
  ]
})
export class AppComponent {

  private ormService: OrmService = inject(OrmService)

  async loadDataBase() {
    try {
      await this.ormService.initialize(dataSource)
      this.initialDataBaseTest()
    } catch (e) {
      console.error(e)
    }
  }

  async initialDataBaseTest() {
    try {
      const categoryRepository = dataSource.getRepository(Category)
      const category = new Category()
      category.name = 'test 3'
      await categoryRepository.save(category)
      const savedCategory = await categoryRepository.findOne({
        where: {
          name: 'test 3'
        }
      })
      console.log('Saved category', savedCategory)
    } catch (e) {
      console.error(e)
    }
  }
}
