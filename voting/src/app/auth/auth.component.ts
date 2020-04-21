import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  candidate: any[] = [
    { name: "Candidate1", value: "candidate1" },
    { name: "Candidate2", value: "candidate2" },
    { name: "Candidate3", value: "candidate3" }
  ]
  forms: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'age': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.min(18)]),
    'candidate': new FormControl('', Validators.required),
  });

  results: [{_id: number, candidates: string, counts: string }];


  constructor(private authService: AuthService) { }
 
  message: string = "Choose your leader Wisely";
  subscription:Subscription;
  isVisible:boolean=false;


  ngOnInit() {
    this.fetchResults()
    this.subscription=this.authService.navChange.subscribe(res=>{
      this.isVisible=res;
      if(this.isVisible){
        this.fetchResults();
        console.log(this.results)
      }
    })
    console.log(this.results);
  }
  onSubmit() {
    console.log(this.forms)
    const users = { user: this.forms.value.email, votes_for: this.forms.value.candidate }
    this.authService.storeEmails(users).
      pipe(map(res => {
        return res.error
      })).subscribe(res => {
        // console.log();
        // const msg=JSON.parse(res);
        this.message = res;
        // console.log(this.message)
      })
      console.log(this.fetchResults());
  }

  fetchResults(){
    let rs:[{_id: number, candidates: string, counts: string }]=null;
    this.authService.fetchResult().pipe(
      take(1),map(res=>{
        return res.results;
      })
    ).subscribe(res=>{
      this.results=res;
    });
    // return rs;
  }

  onShow(event){
    console.log(event);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
