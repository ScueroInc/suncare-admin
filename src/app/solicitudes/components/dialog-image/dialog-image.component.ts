import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {

  imagenProfile: string;
  imagenDni: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data:{
    imagenProfile: string,
    imagenDni: string
  }
  ) { }

  ngOnInit(): void {
    this.imagenProfile = this.data.imagenProfile;
    this.imagenDni = this.data.imagenDni;
  }

}
