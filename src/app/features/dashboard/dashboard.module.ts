import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from '@features/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
