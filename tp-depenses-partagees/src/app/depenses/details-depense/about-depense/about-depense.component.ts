import {Component, Input, OnInit} from '@angular/core';
import {Depense} from '../../depense';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DepenseService} from '../../depense.service';

@Component({
  selector: 'app-about-depense',
  templateUrl: './about-depense.component.html',
  styleUrls: ['./about-depense.component.css']
})
export class AboutDepenseComponent implements OnInit {

  @Input() depense: Depense;

  constructor(private route: ActivatedRoute,
              private service: DepenseService) { }

  ngOnInit() {
  }

}
