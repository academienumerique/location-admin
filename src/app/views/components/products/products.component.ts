import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productForm: FormGroup;
  selectedImage: File | null = null;
  successSend: boolean = false
  data$!: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'name'];
  imageIsLoading: boolean = false;
  image_Url: string = 'default';

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private toast: ToastrService,
    private databaseService: DatabaseService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productImage: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.data$ = this.databaseService.getAllItems('products');
   }


   /* Ajoute item */
  async onSubmit() {
    if (this.productForm.valid && this.selectedImage) {
      console.log('Entrée dans storage');
      const productName = this.productForm.value.productName;
      const imageName = new Date().getTime().toString();
  
     const uploadTask = await this.storage.upload('product-images/' + imageName, this.selectedImage);
  
      uploadTask.ref.getDownloadURL().then((downloadURL) => {
        this.firestore.collection('products').add({
          name: productName,
          imageUrl: downloadURL
        }).then(() => {
          console.log('Produit ajouté avec succès.');
          this.toast.success('Element ajouté');
          this.productForm.reset();

          // Ajoutez ici le code pour réinitialiser le formulaire ou effectuer d'autres actions après l'ajout du produit.
        }).catch((error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
          this.toast.error('Erreur')
        });
      }).catch((error) => {
        console.error('Erreur lors de l\'obtention de l\'URL de téléchargement :', error);
      });
    } else {
      console.log('Le formulaire n\'est pas valide ou aucune image n\'est sélectionnée.');
    }
  }
  /* delete item */
  deleteItem(id: number) {
    this.databaseService.deleteItemByField('products', 'id', id);
  }

  /* edit item */
  editItem(item : string) {

  }
  
  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      console.log("target, event.target.files", this.selectedImage);
      if (this.selectedImage) {
        this.image_Url = URL.createObjectURL(this.selectedImage); // Obtenez l'URL de l'image
        this.imageIsLoading = true;
      }
    }
  }
}