import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrl: './work-with-us.component.css'
})
export class WorkWithUsComponent {
  contactForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
  ) {
    this.contactForm = this._fb.group ({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  submitForm(): void {
    let name: string = this.contactForm.value.name;
    let email: string = this.contactForm.value.email;
    let cv: File | null = (document.getElementById('cv') as HTMLInputElement)?.files?.[0] || null;

    if(cv && this.contactForm.valid) {
      const subscription = this._contactService.sendEmail(name, email, cv, "Currículum vitae").subscribe(
        {
          next: result => {
            if (result) 
            {
              this.contactForm.reset();
              console.log("Consulta enviada");
            }
            else
            {
              console.log("Error al enviar la consulta");
            }
          },
          complete: () => {
            subscription.unsubscribe();
          },
          error: () => {
            console.error("Error al enviar el mensaje")
            /*this._snackBar.open("Error al enviar el mensaje", '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });*/
          }
        }
      )
    }
  }

  showFiles(event: Event) { 
    const input = event.target as HTMLInputElement;
    const previewsContainer = document.getElementById('pdfPreview'); 
          
    previewsContainer!.innerHTML = ''; 
    const files = input.files; 

    if (files) {
      for (let i = 0; i < files.length; i++) { 
        const file = files[i]; 
        const reader = new FileReader(); 
        
        reader.onload = function (e) { 
          const preview = document.createElement('div');
          preview.setAttribute("style", "width: 100%; height: 600px"); 
          const pdfUrl = URL.createObjectURL(file);

          preview.innerHTML = `
            <embed src="${pdfUrl}" type="application/pdf" width="100%" height="600px" />
            <div class="text-center mt-2">
              <span class="badge bg-secondary" style="font-weight:400">${file.name}</span>
            </div>
          `;

          previewsContainer!.appendChild(preview); 
        }; 
        reader.readAsDataURL(file); 
      } 
    }
  }
}
