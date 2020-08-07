import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit, AfterViewInit {
  @ViewChild('images') imagesDivTag: ElementRef<HTMLDivElement>;
  @ViewChild('myCanvas') myCanvasTag: ElementRef<HTMLCanvasElement>;
  canvas = document.createElement('canvas');
  ctx: CanvasRenderingContext2D;
  parts = []; // to push into oud base64 strings
  img = new Image();
  constructor() {

  }

  ngOnInit(): void {
    this.ctx = this.canvas.getContext("2d");
    //this.imagesDivTag.nativeElement.innerText = 'Whale!';
    //this.img.crossOrigin = "anonymous"
    this.img.src = 'assets/googlelogo_color_272x92dp.png';
    this.img.height = 90;
    this.img.onload = ()=>{
      this.splitImage();
    }
      
  }
  ngAfterViewInit() {


  }
  private splitImage(maxhieght: number = 10) {
    console.log('splitting image');
    // const context = this.myCanvasTag.nativeElement.getContext('2d');
    // context.drawImage(this.img, 10, 10);
    console.log('max height', maxhieght);
    console.log('img height', this.img.height);
    const totalparts = Math.ceil(this.img.height / maxhieght);

    console.log('total parts', totalparts);
    const w2 = this.img.width;
    const h2 = maxhieght;
    //if (this.img.height < maxhieght) maxhieght = this.img.height;
    

    for (let i = 0; i < totalparts; i++) {
      let x = 0,  
      y = (-h2*i);  
      console.log('x',x,'y',y);
      
      this.canvas.width = w2;
      this.canvas.height = maxhieght;
      console.log('count ', i);
      console.log(this.img, x, y, w2, h2);
      
      this.ctx.drawImage(this.img, x, y, w2, this.img.height); // img, x, y, w, h
      this.parts.push(this.canvas.toDataURL()); // ("image/jpeg") for jpeg
    }

    console.log(this.parts);
  }

}
