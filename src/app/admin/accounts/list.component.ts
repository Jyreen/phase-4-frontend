import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts: Account[] = [];
    searchQuery: string = '';

    currentAccount: Account = {
        id: '',
        acc_email: '',
        acc_passwordHash: '',
        acc_firstname: '',
        acc_lastname: '',
        acc_pnumber: '',
        acc_totalpoints: 0,
        acc_role: null,
        acc_acceptTerms: '',
        acc_image: '',
        acc_status: ''
    };
    isEditing = false;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.loadAccounts();
    }

    loadAccounts() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    get filteredAccounts(): Account[] {
        if (!this.searchQuery.trim()) {
          return this.accounts;
        }
        
        const lowerQuery = this.searchQuery.toLowerCase();
        const filtered = this.accounts.filter(account =>
          (account.acc_firstname?.toLowerCase() || account.acc_lastname?.toLowerCase() ||'').includes(lowerQuery) ||
          (account.acc_email?.toLowerCase() || '').includes(lowerQuery) ||
          (account.acc_pnumber?.toLowerCase() || '').includes(lowerQuery) ||
          (account.acc_role?.toLowerCase() || '').includes(lowerQuery) ||
          (account.acc_status ?.toLowerCase() || '').includes(lowerQuery) 
        );
        
        console.log('Filtered campaigns:', filtered); // Debugging
        return filtered;
      }

    // Delete an account with confirmation alert
    deleteAccount(id: string) {
        // SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this account? This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, proceed with the account deletion
                this.accountService.delete(id)
                    .pipe(first())
                    .subscribe(() => {
                        // Update the account list by filtering out the deleted account
                        this.accounts = this.accounts.filter(x => x.id !== id);
                        
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The account has been deleted successfully.',
                            confirmButtonText: 'OK'
                        });
                    }, error => {
                        // Show error message if something goes wrong
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an issue deleting the account. Please try again later.',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        });
    }
}
