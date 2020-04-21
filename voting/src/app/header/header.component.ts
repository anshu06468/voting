import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isVisible:boolean=false;
  constructor(private authService:AuthService) { }
  @Output() show:EventEmitter<boolean>=new EventEmitter()

  ngOnInit() {
  }
  toggle(){
    this.isVisible=!this.isVisible;
    this.authService.navChange.emit(this.isVisible);
  }


}
