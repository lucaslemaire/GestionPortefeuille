import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public constructor(private titleTagService: Title, public auth: AuthService) {
  }

  public setTitle(pageTitle: string) {
    this.titleTagService.setTitle(pageTitle);
  }

  ngOnInit() {
    if (this.auth.getToken()) {
      this.auth.getUser().subscribe();
    }
  }

  onLogout() {
    console.log('on logout');
    this.auth.onLogout().subscribe();
  }
}
