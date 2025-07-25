
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { PrivateLayoutComponent } from '@layouts/private-layout/private-layout.component';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';


import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    NavbarComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ToggleButtonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    MessagesModule,
    TreeModule,
    TableModule,
    PaginatorModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TagModule,
    PanelModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    MenubarModule,
    ToggleButtonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    MessagesModule,
    TreeModule,
    TableModule,
    PaginatorModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TagModule,
    PanelModule
  ],
  providers: [ConfirmationService]
})
export class SharedModule {}
