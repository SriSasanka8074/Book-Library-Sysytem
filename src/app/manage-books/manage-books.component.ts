import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  manageBooksForm: FormGroup;
  booksData: Array<any> = [];
  title = 'Manage Books';
  faEye = faEye;
  faEdit = faEdit;
  search = '';

  ngOnInit() {
    this.createFormGroup();
    this.getBooksList();
  }

  createFormGroup() {
    this.manageBooksForm = this.formBuilder.group({
      fromDate: this.formBuilder.control('', []),
      toDate: this.formBuilder.control('', []),
    });
  }

  getBooksList() {
    const url = '';
    const obj: any = this.manageBooksForm.value;
    this.httpClient.get(url).subscribe(res => {
      if (res) {
        const data: any = res;
        this.booksData = data;
      } else {
        this.booksData = [];
      }
    }, error => {
      // this.booksData = [];
      this.booksData = [
        {
          id: 1,
          bookName: 'afafafafa',
          author: 'dvsgsgsgsg'
        }
      ];
    });
  }

  navigateToBookMaster(status: boolean, id: number) {
    if (status) {
      this.router.navigate(['/book', 'view', id]);
    } else {
      this.router.navigate(['/book', 'edit', id]);
    }
  }

  /* search(value: string) {
    if (value && value.length > 0) {

    }
  } */
}
