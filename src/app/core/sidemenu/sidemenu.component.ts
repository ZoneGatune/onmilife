import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';
import { menuMozo } from './menu-element-mozo';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus = null;

    constructor(public router: Router,
      private route: ActivatedRoute ) { }

    ngOnInit() {

      this.route.queryParams
      .subscribe(params => {
        debugger;
       const control = params['control'];
       if (control === 'admin'){
         this.menus = menus;
       } else {
         this.menus = menuMozo;
       }
       debugger;
       const currentUser = JSON.parse(localStorage.getItem('currentUser'));
       if(currentUser !== undefined){
         debugger;
        if (currentUser.control  === 'admin'){
          this.menus = menus;
        } else {
          this.menus = menuMozo;
        }
       }

       debugger;
    });
  }

}
