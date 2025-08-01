import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminupload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './adminupload.component.html',
  // styleUrl: './adminupload.component.css'
})
export class AdminuploadComponent {
  constructor(public formbuilder:FormBuilder, public https:HttpClient){
  }

  public foodupload:any;
  public foodCategory= [
    {id:1, name:'Select Food Category'},
    {id:2, name:'Swallows'},
    {id:3, name:'Main Dishes'},
    {id:4, name:'Snacks'},
  ]

  ngOnInit(){
    this.foodupload = this.formbuilder.group({
      foodname: ['', [Validators.required]],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      foodimage: ['', Validators.required],
    })
  }
  public image:any
  selectFoodImage(event:any){

    this.image= event.target.files[0];
    
  }
  UploadFood(){

    const formdata = new FormData();

    formdata.append('foodname', this.foodupload.value.foodname);
    formdata.append('category', this.foodupload.value.category);
    formdata.append('quantity', this.foodupload.value.quantity);
    formdata.append('price', this.foodupload.value.price);
    formdata.append('description', this.foodupload.value.description);
    formdata.append('foodimage', this.image);


    // Send to server
    this.https.post('http://localhost/restaurantapp/upload.php', formdata).subscribe((data: any) => {
      console.log(data);
    });
    

  }

}
