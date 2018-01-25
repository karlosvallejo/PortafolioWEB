import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import 'p5';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  private p5;

  showCursorOne = true;

  showCursorTwo = false;

  showCursorThree = false;

  writing = false;
  showCursor = true;

  typewriter_textOne = 'HI, MY NAME IS CARLOS AND I’AM A WEB DEVELOPER';
  typewriter_displayOne = '';

  typewriter_textTwo = 'WRITE YOUR REQUEST OR QUESTION';
  typewriter_displayTwo = '';


  constructor() {

   // window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.writing) {
        this.showCursor = !this.showCursor;
      } else {
        this.showCursor = true;
      }
    }, 500);

    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    console.log('analog-destroy');
  }

  ngAfterViewInit(): void {
    this.typingOne();
  }

  private onWindowResize = (e) => {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
  }

  private createCanvas = () => {
    console.log('creating canvas');
    this.p5 = new p5(this.drawing);
  }

  private destroyCanvas = () => {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }

  private drawing = function (p: any) {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('p5Canvas');
      p.rectMode(p.CENTER);
      p.background(0);
    };

    p.draw = () => {
      p.background(0);
      p.fill(100, 50, 200);
      p.rect(p.width / 2, p.height / 2, 30, 30);
    };

  };


  typingOne() {
    setTimeout(() => {
      let total_length = this.typewriter_textOne.length;
      let current_length = this.typewriter_displayOne.length;
      this.writing = true;
    const intervalito = setInterval(() => {
        total_length = this.typewriter_textOne.length;
        current_length = this.typewriter_displayOne.length;
        if (current_length < total_length) {
          this.typewriter_displayOne += this.typewriter_textOne[current_length];
        } else {
         // this.typewriter_displayOne = '';
          clearInterval(intervalito);
          this.showCursorOne = false;
          this.showCursorTwo = true;
          this.writing = false;
          this.typingTwo();
        }
      }, 120);
    }, 2000);
  }

  typingTwo() {
    setTimeout(() => {
      let total_length = this.typewriter_textTwo.length;
      let current_length = this.typewriter_displayTwo.length;
      this.writing = true;
      const intervalito = setInterval(() => {
        total_length = this.typewriter_textTwo.length;
        current_length = this.typewriter_displayTwo.length;
        if (current_length < total_length) {
          this.typewriter_displayTwo += this.typewriter_textTwo[current_length];
        } else {
          // this.typewriter_displayOne = '';
          this.showCursorTwo = false;
          this.showCursorThree = true;
          this.writing = false;
          clearInterval(intervalito);
        }
      }, 120);
    }, 1000);
  }

}
