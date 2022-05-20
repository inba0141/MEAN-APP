import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productFormInfo:FormGroup;
  errStatus:boolean=false;
  errMsg:string='';
  image:File;

  constructor(private fb:FormBuilder,private ps:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productFormInfo=this.fb.group({
      productid:'',
      productname:'',
      price:'',
      description:'',
      productImg:''
    })
  }
  onFormSubmit(){

    //get user obj from form
    let productObj=this.productFormInfo.value;
    //create formdata object
    let formData=new FormData();
    //append userobj to formdata
    formData.append('productObj',JSON.stringify(productObj))
    //APPEND PROFILE PIC TO FORM DATA
    formData.append('productImg',this.image)
   // console.log(this.userObj.value)
   this.ps.createProduct(formData).subscribe({
     next:(res)=>{
      if(res.message=="Product created"){
        this.errStatus=false;
        //navigate to login component
        this.router.navigateByUrl("/addproduct")
      }
      else{
        this.errStatus=true;
        this.errMsg=res.message;
      }
     },
     error:(err)=>{
      console.log(err);
     }
   })
  }
  onFileSelect(event){
    //console.log(event.target.files[0]);
    this.image=event.target.files[0];
  }

}
