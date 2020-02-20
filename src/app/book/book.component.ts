import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  bookForm: FormGroup;
  title = 'Book Details';
  @ViewChild(HTMLButtonElement, {static: true}) saveBookDetailsButtonRef: HTMLButtonElement;
  mode: string;
  id: number;

  ngOnInit() {
    this.createFormGroup();
    this.route.paramMap.subscribe(param => {
      if (param) {
        const paramData: any = param;
        this.mode = paramData.params.mode;
        console.log(this.mode);
        this.id = Number(paramData.params.id);
        if (this.mode) {
          this.getBookDetailsById(this.id);
        }
      }
    });
  }

  createFormGroup() {
    this.bookForm = this.formBuilder.group({
      bookName: this.formBuilder.control('', []),
      bookDescription: this.formBuilder.control('', []),
      id: this.formBuilder.control(0, []),
      count: this.formBuilder.control('', []),
      author: this.formBuilder.control('', []),
      ismodify: this.formBuilder.control(0, []),
    });
  }

  saveBookDetails(formRef, saveBookDetailsButtonRef: HTMLButtonElement) {
    if (this.bookForm.valid) {
      saveBookDetailsButtonRef.disabled = true;
      let obj = {};
      obj = this.bookForm.value;
      const url = environment.serverUrl + 'saveBookDetails';
      this.httpClient.post(url, obj).subscribe(res => {
        if (res) {
          saveBookDetailsButtonRef.disabled = false;
          if (this.mode === undefined) {
            Swal.fire('Success!', 'Book Details saved successfully', 'success').then(result => {
              if (result) {
                this.resetForm(formRef);
              }
            });
          } else {
            Swal.fire('Success!', 'Book Details modified successfully', 'success').then(result => {
              if (result) {
                this.resetForm(formRef);
                this.router.navigate(['/manage-books']);
              }
            });
          }
        } else {
          saveBookDetailsButtonRef.disabled = false;
          Swal.fire('Failed!', 'Failed to save Book Details', 'error');
        }
      }, error => {
        saveBookDetailsButtonRef.disabled = false;
        Swal.fire('Failed!', 'Failed to save Book Details', 'error');
      });
    } else {
      this.bookForm.get('bookName').markAsTouched();
      this.bookForm.get('bookName').updateValueAndValidity();
      this.bookForm.get('count').markAsTouched();
      this.bookForm.get('count').updateValueAndValidity();
    }
  }

  resetForm(formRef: FormGroupDirective) {
    formRef.resetForm();
  }

  getBookDetailsById(id) {
    const obj: any = {};
    obj.id = id;
    const url = environment.serverUrl + 'getBookDetailsById';
    this.httpClient.post(url, obj).subscribe(res => {
      if (res) {
        const data: any = res;
        data.ismodify = 1;
        this.bookForm.setValue(data);
        if (this.mode === 'view') {
          this.bookForm.disable();
        }
      }
    }, error => {
    });
  }

}
