import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-address-box',
  templateUrl: './address-box.component.html',
  styleUrls: ['./address-box.component.scss']
})
export class AddressBoxComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() addressId: number;
  @Output() close = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService) {
    this.initForm();
    if (this.addressId) {
      this.getAddress(this.addressId)
    }
  }
  addressForm: FormGroup;
  isSpinning: boolean = false;
  isConfirmLoading = false;


  address = {
    firstname: null,
    lastname: null,
    telephone: null,
    streetaddress: null,
    city: null,
    state: null,
    zipcode: null,
    country: 'United States',
  }
  ngOnInit() {

  }

  getAddress(id) {
    this.isSpinning = true;
    let data = {
      id: id
    }
    this.homeService.update_addres_before(data).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.address = res.data;
      
      }
    }, err => {
      this.isSpinning = false;
    })
  }

  initForm() {
    this.addressForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required,]],
      telephone: [null, [Validators.required]],
      streetaddress: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
      country: ['United States', [Validators.required]],
    });
  }


  getFormControl(name) {
    return this.addressForm.controls[name];
  }

  handleOk = () => {
   
    for (const i in this.addressForm.controls) {
      this.addressForm.controls[i].markAsDirty();
    }
    if(this.addressForm.invalid){
      return;
    }
    this.isConfirmLoading = true;

    
    
    setTimeout(() => {
      this.close.emit();
      this.isConfirmLoading = false;
      this.confirmServ.success({
        title: "Success",
        
        okText:"Confire "
      })
    }, 3000);
  }

  handleCancel = () => {
    this.isVisible = false;
    this.close.emit();
  }


  city = [
    {
      "name": "Alabama"
    },
    {
      "name": "Alaska"
    },
    {
      "name": "Arizona"
    },
    {
      "name": "Arkansas"
    },
    {
      "name": "California"
    },
    {
      "name": "Colorado"
    },
    {
      "name": "Connecticut"
    },
    {
      "name": "Delaware"
    },
    {
      "name": "Florida"
    },
    {
      "name": "Georgia"
    },
    {
      "name": "Hawaii"
    },
    {
      "name": "Idaho"
    },
    {
      "name": "Illinois"
    },
    {
      "name": "Indiana"
    },
    {
      "name": "Iowa"
    },
    {
      "name": "Kansas"
    },
    {
      "name": "kentucky"
    },
    {
      "name": "Louisiana"
    },
    {
      "name": "Maine"
    },
    {
      "name": "Maryland"
    },
    {
      "name": "Massachusetts"
    },
    {
      "name": "Michgan"
    },
    {
      "name": "Michigan"
    },
    {
      "name": "Minnesota"
    },
    {
      "name": "Mississippi"
    },
    {
      "name": "Missouri"
    },
    {
      "name": "Montana"
    },
    {
      "name": "Nebraska"
    },
    {
      "name": "Nevada"
    },
    {
      "name": "Newhampshise"
    },
    {
      "name": "NewJersey"
    },
    {
      "name": "NewMexico"
    },
    {
      "name": "NewYork"
    },
    {
      "name": "NorthCarolina"
    },
    {
      "name": "NorthDakota"
    },
    {
      "name": "Ohio"
    },
    {
      "name": "Oklahoma"
    },
    {
      "name": "Oregon"
    },
    {
      "name": "Pennsylvania"
    },
    {
      "name": "Rhode"
    },
    {
      "name": "SouthCarolina"
    },
    {
      "name": "SouthDakota"
    },
    {
      "name": "Tennessee"
    },
    {
      "name": "Texas"
    },
    {
      "name": "Utah"
    },
    {
      "name": "Vermont"
    },
    {
      "name": "Virginia"
    },
    {
      "name": "Washington"
    },
    {
      "name": "WestVirginia"
    },
    {
      "name": "Wisconsin"
    },
    {
      "name": "Wyoming"
    }
  ];

}
