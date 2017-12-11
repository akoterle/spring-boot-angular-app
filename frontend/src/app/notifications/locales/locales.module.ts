import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigModule } from '../../config/module';
import { FormsModule } from '@angular/forms';
import { LocalesComponent } from './locales.component';
import { LocalesService } from './locales.service';

@NgModule({
  imports: [AppConfigModule, FormsModule, CommonModule],
  exports: [LocalesComponent],
  declarations: [LocalesComponent],
  providers: [LocalesService]
})
export class LocalesModule {}
