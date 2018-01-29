import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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


  constructor(public router: Router) {

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
    this.createCanvas();
  }
  /*
  private onWindowResize (e) {
    setTimeout(() => {
      this.p5.resizeCanvas( ((this.p5.windowWidth / 16) * 14), ((this.p5.windowHeight / 100) * 44) );
    }, 200);
  }
  */

  private createCanvas () {
    console.log('creating canvas');
    this.p5 = new p5(this.sketch, 'p5Canvas');
  }

  private destroyCanvas () {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }

  private sketch = (p: any) => {
    p.nodes = [];
    p.instanceNodes = [];
    p.nodeCount = 20;
    p.maxDistance = 200;
    p.loading = false;
    p.loadingGraphic = null;
    p.backgrounOpacity = 255;
    p.textFillOpacity = 255;
    p.textLoading = 'LOADING.';
    p.displayText =  '';
    p.intervalLoading = null;
    p.instanceAboutNode = null;


    p.setup = () => {
      p.createCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 45));
      p.loadingGraphic = p.createGraphics(p.width, p.height);
      p.loadingGraphic.textAlign(p.LEFT);
      p.loadingGraphic.textFont('VT323');
      p.frameRate(24);
      p.rectMode(p.CENTER);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont('VT323');



      p.startLoading();

      // Create nodes
      for (let i = 0; i < p.nodeCount; i++) {
        const b = new p.Ball(p.random(26, p.width - 26), p.random(26, p.height - 26));
        p.nodes.push(b);
      }

      p.instanceAboutNode = new p.NavigationNode(p.random(51, p.width - 51), p.random(51, p.height - 51), 'WHO\nARE\nYOU?');

      p.instanceNodes.push(p.instanceAboutNode);
      p.nodes.push(p.instanceAboutNode);
    };

    p.draw = () => {
      // p.clear();
      // p.fill('rgba(255,255,255, 0.8)');
      p.background(0);

      for (let i = 0; i < p.nodes.length; i++) {
        p.drawConnection(i);
        p.nodes[i].display();
        p.nodes[i].update();
      }

      for (let i = p.nodes.length - 1; i < p.nodes.length; i++) {
        if (p.dist(p.nodes[i].x, p.nodes[i].y, p.mouseX, p.mouseY) < 100) {
          p.nodes[i].size = 110;

        } else if (p.dist(p.nodes[i].x, p.nodes[i].y, p.mouseX, p.mouseY) > 110) {
          p.nodes[i].size = 90;
        }
        if (p.nodes[i].size > 100 && p.mouseIsPressed) {
          this.router.navigate(['about']);
        }
      }


/*
      for (let i = 0; i < p.instanceNodes.length; i++) {
        p.instanceNodes[i].display();
        p.instanceNodes[i].update();
        p.drawConnection(i);
      }
*/


      if (p.loading) {
        p.drawLoading();
      }
    };

    p.startLoading = () => {
      p.loading = true;
      p.displayText = p.textLoading;
      p.intervalLoading = setInterval(() => {
          p.displayText += '.';
       //   console.log ('entro');
          if (p.displayText.length === p.textLoading.length + 4) {
            p.displayText = p.textLoading;
          }
      }, 500);
    };

    p.drawLoading = () => {
      p.loadingGraphic.clear();
      p.loadingGraphic.background(0, p.backgrounOpacity);
      p.loadingGraphic.textSize(p.width / 30);
      p.loadingGraphic.noStroke();
      p.loadingGraphic.fill(255, p.textFillOpacity);
      p.loadingGraphic.text(p.displayText, p.width / 2.35, p.height / 2);
      p.image(p.loadingGraphic, 0, 0);
    };

    p.endOfLoading = () => {
     //
    const intervalino =  setInterval(() => {
        p.backgrounOpacity -= 5;
        p.textFillOpacity -= 17;
        if (p.backgrounOpacity <= 0) {
          p.loading = false;
          clearInterval(intervalino);
          clearInterval(p.intervalLoading);
        }
      }, 30);
    };

    p.windowResized = () => {
      p.resizeCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 45) );
    };

    p.drawConnection = (theNode) => {
      p.node1 = p.nodes[theNode];


      for (let j = theNode; j < p.nodes.length; j++) {

        p.node2 = p.nodes[j];
        p.distance = p.dist(p.node1.x, p.node1.y, p.node2.x, p.node2.y);
        if (p.distance < p.maxDistance) {
          if (j !== theNode) {
            p.stroke(p.node2.color);
            p.strokeWeight(30 - (p.distance / p.maxDistance) * 30); // Distance/ max creates line thickness
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

    p.NavigationNode = function (x, y, textito) {
      this.size = 50;
      this.sizeTwo = 120;
      this.x = x;
      this.y = y;
      this.texti = textito;
      this.speed = 1;
      this.xSpeed = this.speed * p.random(-1, 1);
      this.ySpeed = this.speed * p.random(-1, 1);
      // this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.color = p.color(0, 253, 114, 255);
      this.colorTwo = p.color(0, 253, 114, 100);

      this.display = function () {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.x, this.y, this.size , this.size );
        p.fill(this.colorTwo);
        p.ellipse(this.x, this.y, this.sizeTwo , this.sizeTwo );
        p.fill(0);
        p.textSize(this.size / 3.5);
        p.textLeading(this.size / 4);
        p.text(this.texti, this.x, this.y);
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

  }




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
             this.p5.endOfLoading();
          }, 1000);

        }
      }, 120);
    }, 1000);
  }

}
