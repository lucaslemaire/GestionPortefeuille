import {Component, Input, OnInit} from '@angular/core';
import {Depense} from '../../depense';
import {Participant} from '../../participant';
import {DepenseService} from '../../depense.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-depense',
  templateUrl: './delete-depense.component.html',
  styleUrls: ['./delete-depense.component.css']
})
export class DeleteDepenseComponent implements OnInit {

  @Input() depense: Depense;
  returnUrl: any;
  error: any;

  constructor(private service: DepenseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/depenses/';
  }

  onDeleteSubmit(): void {
    console.log('suppression de la dépense :(');
    this.service.deleteDepense(this.depense).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) =>{
        this.error = error.error;
      }
    );
  }

}
