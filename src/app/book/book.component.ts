import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

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
  title = 'Book Master';
  @ViewChild(HTMLButtonElement, {static: true}) saveBookDetailsButtonRef: HTMLButtonElement;
  mode: string;
  id: number;

  ngOnInit() {
    this.createFormGroup();
    this.route.paramMap.subscribe(param => {
      if (param) {
        const paramData: any = param;
        this.mode = paramData.params.mode;
        this.id = Number(paramData.params.id);
        this.getBookDetailsById(this.id);
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

  saveBookDetails(formRef) {
    if (this.bookForm.valid) {
      this.saveBookDetailsButtonRef.disabled = true;
      let obj = {};
      obj = this.bookForm.value;
      const url = '';
      this.httpClient.post(url, obj).subscribe(res => {
        if (res) {
          this.saveBookDetailsButtonRef.disabled = false;
          Swal.fire('Success!', 'Book Details saved successfully', 'success');
        } else {
          this.saveBookDetailsButtonRef.disabled = false;
          Swal.fire('Failed!', 'Failed to save Book Details', 'error');
        }
      }, error => {
        Swal.fire('Failed!', 'Failed to save Book Details', 'error');
      });
    }
  }

  resetForm(formRef: FormGroupDirective) {
    formRef.resetForm();
  }

  getBookDetailsById(id) {
    const obj: any = {};
    obj.id = id;
    const url = '';
    this.httpClient.post(url, obj).subscribe(res => {
      if (res) {
        const data: any = res;
        data.ismodify = 0;
        this.bookForm.setValue(data);
      }
    }, error => {
    });
  }

}
