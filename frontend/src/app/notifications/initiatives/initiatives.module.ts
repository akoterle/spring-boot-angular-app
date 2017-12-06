import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InitiativesComponent } from './initiatives.component';
import { InitiativeService } from './service/initiative.service';
import { AppConfigModule } from '../../config/module';

@NgModule({
  imports: [AppConfigModule, FormsModule, CommonModule],
  exports: [InitiativesComponent],
  declarations: [InitiativesComponent],
  providers: [InitiativeService]
})
export class InitiativesModule {}
