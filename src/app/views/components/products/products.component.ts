import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productImage: ['', Validators.required]
    });
  }
  onSubmit() {
if (this.productForm.valid && this.selectedImage) {
      console.log('entrée dans storage')
      const productName = this.productForm.value.productName;
      const imageName = new Date().getTime().toString();

      const imageRef = this.storage.ref('product-images/' + imageName);
      const uploadTask = this.storage.upload('product-images/' + imageName, this.selectedImage);

      uploadTask.then(() => {
        imageRef.getDownloadURL().subscribe((downloadURL) => {
          this.firestore.collection('products').add({
            name: productName,
            imageUrl: downloadURL
          }).then(() => {
            this.productForm.reset();
          });
        });
      });
     //
  } else {
    console.log('non valide')
  }
  }
  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      console.log("target, event.target.files", this.selectedImage)
    }
  }
}