import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/notification/templates', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true, // <-- debugging purposes only
      // preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [] // [CanDeactivateGuard, SelectivePreloadingStrategy]
})
export class AppRoutingModule {}
