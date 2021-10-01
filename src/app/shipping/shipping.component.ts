import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CanComponentDeactivate, CartService } from '../cart.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
//import { browserRefresh } from '../app.component';


const checkValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const street = control?.get('address')?.get('street')?.value;
  const city = control?.get('address')?.get('city')?.value;
  const x = !street && !city ? { checkRevealed: true } : null;
  console.log("checkValidator>>> ",x);
  return x;
};

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit , CanComponentDeactivate  {

  /*public browserRefresh: boolean | undefined;

  chartMethod(){
    let txt;
    if (confirm("Press a button!")) {
      txt = "You pressed OK!";
    } else {
    txt = "You pressed Cancel!";
    }
    this.browserRefresh = false;
  }*/

  @HostListener('window:beforeunload',['$event'])
  showMessage($event: { returnValue: string; }) {
    let x = this.cartService.getItems();
    if(x.length !== 0)
    {
      $event.returnValue='Your data will be lost!';
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let x = this.cartService.getItems();
    if(x.length === 0)
    {
      return true;
    }
    return false;
  }
  /*players = [
    "Sachin Tendulkar",
    "Ricky Ponting",
    "Virat Kohli",
    "Kumar Sangakkara",
    "Jacques Kallis",
    "Hashim Amla    ",
    "Mahela Jayawardene    ",
    "Brian Lara",
    "Rahul Dravid",
    "AB de Villiers"
  ]
  selected = "----"
  
  update(e: any){
    this.selected = e.target.value
  }*/

  //websiteList: any = ['Javatpoint.com', 'HDTuto.com', 'Tutorialandexample.com'];
  
  form = new FormGroup({
    'shipping' : new FormControl(''),
  });
    
  /*get f(){  
    return this.form.controls;  
  } */ 
    
  submit(){  
    console.log(this.form.value);  
  }  
  changeShipping(e:any) {  
    console.log(e.target.value);  
  }
  shipment :any[] | undefined;

  //shippingCosts = this.cartService.getShippingPrices();

  //shipments$ : Observable<any[]> | undefined

  checkoutForm: any;

  items = this.cartService.getItems();

  get name() {return this.checkoutForm.get('name');}

  get email() {return this.checkoutForm.get('email')}

  //get street() {return this.checkoutForm.get('street');}

  get zip() {return this.checkoutForm.get('address').get('zip');}


  /*get phone_no() {
    return this.checkoutForm.get('phone_no') as FormArray;
  }

  addPhone() {
    this.phone_no.push(this.formBuilder.control(''));
  }*/

  //get city() {return this.checkoutForm.get('city');}

  constructor(private cartService: CartService,private formBuilder: FormBuilder){}

  ngOnInit(): void {

    //this.browserRefresh = browserRefresh;

    //this.shipments$ = this.cartService.getShippingPrices();
    const shippingCosts = this.cartService.getShippingPrices();
  
    shippingCosts.subscribe(data=>{
      this.shipment = data;
    });
      
      //const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

      this.checkoutForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
        email: ['',[Validators.required,Validators.email]],
        address: this.formBuilder.group({
          street: [''],
          city: [''],
          //city: ['',[Validators.required,Validators.minLength(4)]],
          state: ['',[Validators.required]],
          zip: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
        }),
        phone_no: this.formBuilder.array([
          //this.formBuilder.control('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
          this.getPhoneFormGroup()
        ])
      },{Validators: [checkValidator]}); 
  }

  getPhoneFormGroup(){
    return this.formBuilder.group({
      phone_no:['',RxwebValidators.unique()]
    })
  }

  /*checkValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if(control.value === undefined && !isNaN(control.value)){
      return {'check': true}
    }
    return null;
  }*/

  /*get phone_no(): FormArray {
    return this.checkoutForm.get('phone_no') as FormArray;
  }*/

  addPhone(){
    let phoneArray = <FormArray>this.checkoutForm.controls.phone_no;
    console.log(phoneArray);
    phoneArray.push(this.getPhoneFormGroup());
  }

  onSubmit() : void{
    console.log('Your order has been submitted',this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  initializeMethod(){
    //this.cartService.addToCart(this.product);
    this.items = this.cartService.clearCart();
  }

}
