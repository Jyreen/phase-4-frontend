import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportsCampaignComponent } from './reports-campaign.component';
import { ReportsEventComponent } from './reports-event.component';
import { ReportsAccountComponent } from './reports-account.component';
import { ReportsParticipantComponent } from './reports-participant.component';
import { ReportsDonationComponent } from './reports-donation.component';
import { ReportsRevenueComponent } from './reports-revenue.component';
import { ReportsProfilingComponent } from './reports-profiling.component';
import { ReportsDonationHistoryComponent } from './reports-dohistory.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'reports-campaign', component: ReportsCampaignComponent },
  { path: 'reports-event', component: ReportsEventComponent },
  { path: 'reports-account', component: ReportsAccountComponent },
  { path: 'reports-participant', component: ReportsParticipantComponent },
  { path: 'reports-donation', component: ReportsDonationComponent },
  { path: 'reports-revenue', component: ReportsRevenueComponent},
  { path: 'reports-profiling', component: ReportsProfilingComponent},
  { path: 'reports-donationhistory', component: ReportsDonationHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }