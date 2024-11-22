import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-reports-profiling',
  templateUrl: './reports-profiling.component.html',
  styleUrls: ['./reports-profiling.component.css']
})
export class ReportsProfilingComponent implements OnInit {
  donors: any[] = [];
  beneficiaries: any[] = [];
  filteredDonors: any[] = [];
  filteredBeneficiaries: any[] = [];
  donorSearchTerm: string = '';
  beneficiarySearchTerm: string = '';
  totalDonations: number = 0;
  totalHelpReceived: number = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadDonors();
    this.loadBeneficiaries();
  }

  loadDonors(): void {
    this.accountService.getAllDonors().subscribe(
      (data) => {
        this.donors = data;
        this.filteredDonors = this.donors; // Initialize filtered donors
        this.calculateTotalDonations();
      },
      (error) => {
        console.error('Error fetching donors:', error);
      }
    );
  }

  loadBeneficiaries(): void {
    this.accountService.getAllBeneficiaries().subscribe(
      (data) => {
        this.beneficiaries = data;
        this.filteredBeneficiaries = this.beneficiaries; // Initialize filtered beneficiaries
        this.calculateTotalHelpReceived();
      },
      (error) => {
        console.error('Error fetching beneficiaries:', error);
      }
    );
  }

  filterDonors(): void {
    this.filteredDonors = this.donors.filter((donor) =>
      `${donor.acc_firstname} ${donor.acc_lastname}`
        .toLowerCase()
        .includes(this.donorSearchTerm.toLowerCase())
    );
  }

  filterBeneficiaries(): void {
    this.filteredBeneficiaries = this.beneficiaries.filter((beneficiary) =>
      `${beneficiary.acc_firstname} ${beneficiary.acc_lastname}`
        .toLowerCase()
        .includes(this.beneficiarySearchTerm.toLowerCase())
    );
  }

  calculateTotalDonations(): void {
    this.totalDonations = this.donors.reduce(
      (sum, donor) => sum + (donor.totalDonations || 0),
      0
    );
  }

  calculateTotalHelpReceived(): void {
    this.totalHelpReceived = this.beneficiaries.reduce(
      (sum, beneficiary) => sum + (beneficiary.totalHelpReceived || 0),
      0
    );
  }

  downloadCSV(data: any[], filename: string): void {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    a.click();
  }

  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => `"${row[header] || ''}"`).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
