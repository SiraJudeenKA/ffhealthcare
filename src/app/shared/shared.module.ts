import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from './translate.pipe';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    HomeComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [SharedService]
})
export class SharedModule { }
