import { Component, OnInit } from '@angular/core';

import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  students: any;
  studentName: string;
  studentLastName: string;
  studentAge: number;
  studentLatestJob: string;
  studentLastJobD: string;
  studentAddress: string;
  studentRJob: string;

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          LastName: e.payload.doc.data()['LastName'],
          Age: e.payload.doc.data()['Age'],
          LatestJob: e.payload.doc.data()['LatestJob'],
          LastJobD: e.payload.doc.data()['LastJobD'],
          Address: e.payload.doc.data()['Address'],
          RJob: e.payload.doc.data()['RJob']
        };
      })
      console.log(this.students);
 
    });
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['LastName'] = this.studentLastName;
    record['Age'] = this.studentAge;
    record['LatestJob'] = this.studentLatestJob;
    record['LastJobD'] = this.studentLastJobD;
    record['Address'] = this.studentAddress;
    record['RJob'] = this.studentRJob;
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = '';
      this.studentLastName = '';
      this.studentAge = undefined;
      this.studentLatestJob = '';
      this.studentLastJobD = undefined;
      this.studentAddress = '';
      this.studentRJob = '';
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
