import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';



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

  //  window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.writing) {
        this.showCursor = !this.showCursor;
      } else {
        this.showCursor = true;
      }
    }, 500);


  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    console.log('bye');
  }

  ngAfterViewInit(): void {
    this.typingOne();

  }

  private onWindowResize (e) {
    setTimeout(() => {
      this.p5.resizeCanvas( ((this.p5.windowWidth / 16) * 14), ((this.p5.windowHeight / 100) * 44) );
    }, 200);
  }

  private createCanvas () {
    console.log('creating canvas');
    this.p5 = new p5(this.sketch, 'p5Canvas');
  }

  private destroyCanvas () {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }

  private sketch = function (p: any) {
    p.nodes = [];
    p.nodeCount = 15;
    p.maxDistance = 200;

    p.setup = () => {
      p.createCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 45));
      p.rectMode(p.CENTER);


      // Create nodes
      for (let i = 0; i < p.nodeCount; i++) {
        const b = new p.Ball(p.random(26, p.width - 26), p.random(26, p.height - 26));
        p.nodes.push(b);
      }

    };

    p.draw = () => {
       p.clear();
      for (let i = 0; i < p.nodes.length; i++) {
        p.nodes[i].display();
        p.nodes[i].update();
        p.drawConnection(i);
      }

    };

    p.windowResized = () => {
      p.resizeCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 45) );
    };

    p.drawConnection = (theNode) => {
      p.node1 = p.nodes[theNode];
      p.stroke(p.node1.color);

      for (let j = theNode; j < p.nodes.length; j++) {

        p.node2 = p.nodes[j];
        p.distance = p.dist(p.node1.x, p.node1.y, p.node2.x, p.node2.y);
        if (p.distance < p.maxDistance) {
          if (j !== theNode) {
            p.strokeWeight(20 - (p.distance / p.maxDistance) * 20); // Distance/ max creates line thickness
            p.line(p.node1.x, p.node1.y, p.node2.x, p.node2.y);
          }
        }
      }

    };

    p.Ball = function (x , y) {
      this.size = 50;
      this.x = x;
      this.y = y;
      this.speed = 1.5;
      this.xSpeed = this.speed * p.random(-1, 1);
      this.ySpeed = this.speed * p.random(-1, 1);
      // this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.color = p.color(255, 255, 255);

      this.display = function () {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.x, this.y, this.size , this.size );
      };

      this.update = function() {
        if (this.x + this.xSpeed + (this.size / 2) > p.width || this.x + this.xSpeed - (this.size / 2) < 0) {
          this.xSpeed *= -1;
        } else {
          this.x += this.xSpeed;
        }
        if (this.y + this.ySpeed + (this.size / 2) > p.height || this.y + this.ySpeed - (this.size / 2) < 0) {
          this.ySpeed *= -1;
        } else {
          this.y += this.ySpeed;
        }
      };

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
          setTimeout(() => {
            this.createCanvas();
          }, 200);

        }
      }, 120);
    }, 1000);
  }

}
