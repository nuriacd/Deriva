import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {
  deliveryForm: FormGroup;
  provinces: string[] = [];
  cities: string[] = [];
  allData: any;
  selectedProvince: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private _restaurantService: RestaurantService
  ) {
    this.deliveryForm = this.fb.group({
      /*name: ['', Validators.required],
      address: ['', Validators.required],*/
      province: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      /*phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]*/
    });
  }

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces(): void {
    this.http.get<any>('assets/json/provinces.json').subscribe(data => {
      this.allData = data.provinces;
      this.provinces = Object.keys(this.allData);
    });
  }

  onProvinceChange(event: Event): void {
    let province = (event.target as HTMLSelectElement).value;

    this.selectedProvince = province;
    this.deliveryForm.get('city')?.enable();
    this.cities = this.allData[province];
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const subscription = this._restaurantService.getRestaurantDelivery(this.deliveryForm.get('city')?.value).subscribe({
        next: (data: any) => {
          sessionStorage.setItem('derivaRestaurant', data.id);
          sessionStorage.setItem('city', this.deliveryForm.get('city')?.value);
          sessionStorage.setItem('province', this.deliveryForm.get('province')?.value);
          //sessionStorage.setItem('derivaAddress', this.deliveryForm.get('address')?.value);
        },
        complete: () => {
          location.reload();
          subscription.unsubscribe();
        },
        error: console.log
      });
    }
  }
}
