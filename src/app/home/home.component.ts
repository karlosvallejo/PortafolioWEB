import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger, state} from '@angular/animations';
import {Router} from '@angular/router';
import 'p5';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('charging', [
      state('rise', style({
        width : '93%'
      })),
      state('descend',   style({
        width : '5%'
      })),
      transition('* => *', animate('8000ms ease')),
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('p5Canvas', {read: ElementRef}) containerSketch: ElementRef;
  private canvas;

  showCursorOne = true;

  showCursorTwo = false;

  showCursorThree = false;

  showCursorFour = false;

  writing = false;
  showCursor = true;

  typewriter_textOne = 'HI, MY NAME IS CARLOS AND I’AM AN INTERACTIVE MEDIA DESIGNER';
  typewriter_displayOne = '';

  typewriter_textTwo = 'WRITE A REQUEST OR QUESTION';
  typewriter_displayTwo = '';

  typewriter_textTres = 'jjeeje';
  typewriter_displayTres = '';

  moveBarState = 'rise';
  moveBarStateTwo = 'rise';



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

  animationDone(): void {
    switch (this.moveBarState) {
      case 'rise':
        this.moveBarState = 'descend';
        break;
      case 'descend':
        this.moveBarState = 'rise';
        break;
    }
  }

  animationDoneTwo(): void {
    switch (this.moveBarStateTwo) {
      case 'rise':
        this.moveBarStateTwo = 'descend';
        break;
      case 'descend':
        this.moveBarStateTwo = 'rise';
        break;
    }
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
    this.canvas = new p5(this.sketch, this.containerSketch.nativeElement);
  }

  private destroyCanvas () {
    console.log('destroying canvas');
    this.canvas.noCanvas();
    this.canvas = null;
  }

  private sketch = (p: p5) => {
    const nodes = [];
    const instanceNodes = [];
    const nodeCount = 30;
    const maxDistance = 200;
    let loading = false;
    let backgrounOpacity = 255;
    let textFillOpacity = 255;
    let textLoading;
    let displayText =  '';
    let intervalLoading = null;
    let instanceAboutNode = null;
    let instanceSkillsNode = null;
    let instanceProyectsNode = null;
    const wavesArray = [];



    p.setup = () => {
      p.createCanvas(((p.windowWidth / 100) * 87.5), ((p.windowHeight / 100) * 45), p.P2D);
      p.frameRate(30);
      // p.drawingContext.shadowColor = 'rgba(220,255,220,0.8)';
      // p.drawingContext.shadowBlur = 4;
      p.rectMode(p.CENTER);
      p.imageMode(p.CENTER);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont('VT323');



      startLoading();

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const b = new Ball(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-2, 2),
          p.random(-2, 2)));
        nodes.push(b);
      }

      instanceAboutNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'WHO\nARE\nYOU?', 1);

      instanceSkillsNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'WHAT\nCAN\nYOU DO?', 2);

      instanceProyectsNode =  new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'OPEN\nYOUR\nPROJECTS', 3);

      instanceNodes.push(instanceAboutNode);
      instanceNodes.push(instanceSkillsNode);
      instanceNodes.push(instanceProyectsNode);
      nodes.push(instanceAboutNode);
      nodes.push(instanceSkillsNode);
      nodes.push(instanceProyectsNode);


      for (let i = 1 ; i < 10; i++) {
        wavesArray.push(new Wave((p.height / 10) * i, p.height / 100));
      }



      textLoading  = 'LOADING.';
    };

    p.draw = () => {
      p.clear();
      // p.fill('rgba(255,255,255, 0.8)');
      // p.background(0);
      for (let i = 0; i < wavesArray.length; i++) {
        wavesArray[i].display();
      }


      for (let i = 0; i < nodes.length; i++) {
        drawConnection(i);
        nodes[i].display();
        nodes[i].movimiento();
        nodes[i].edgeCheck();
      }




/*
      for (let i = 0; i < p.instanceNodes.length; i++) {
        p.instanceNodes[i].display();
        p.instanceNodes[i].update();
        p.drawConnection(i);
      }
*/


      if (loading) {
        drawLoading();
      }

   //   console.log(p.frameRate());
    };

    function startLoading() {
      loading = true;
      displayText = textLoading;
      intervalLoading = setInterval(() => {
        displayText += '.';
        //   console.log ('entro');
        if (displayText.length === textLoading.length + 4) {
          displayText = textLoading;
        }
      }, 500);
      p.textAlign(p.LEFT);
      setTimeout(() => {
        endOfLoading();
      }, 8000);
    }

    function endOfLoading() {
        const intervalino =  setInterval(() => {
          backgrounOpacity -= 10;
          textFillOpacity -= 20;
          if (textFillOpacity <= 0) {
            p.textAlign(p.CENTER);
          }
          if (backgrounOpacity <= 0) {
            loading = false;
            clearInterval(intervalino);
            clearInterval(intervalLoading);
          }
        }, 50);
    }




    function drawLoading() {
      p.background(0, backgrounOpacity);
      p.textSize(p.width / 30);
      p.fill(255, textFillOpacity);
      p.text(displayText, p.width / 2.35, p.height / 2);

    }



    p.windowResized = () => {
      p.resizeCanvas(((p.windowWidth / 100) * 87.5), ((p.windowHeight / 100) * 45));
    };

    function drawConnection(theNode) {
      const node1 = nodes[theNode];

      for (let j = theNode; j < nodes.length; j++) {

        const node2 = nodes[j];
        const distance = p.dist(node1.loc.x, node1.loc.y, node2.loc.x, node2.loc.y);
        if (distance < maxDistance) {
          if (j !== theNode) {
              p.stroke(node2.color);
              p.strokeWeight(10 - (distance / maxDistance) * 10);
              p.line(node1.loc.x, node1.loc.y, node2.loc.x, node2.loc.y);
          }
        }
      }
    }

    class Ball {
      loc: p5.Vector;
      vel: p5.Vector;
      size: number;
      color: p5.Color;
      // this.color = p.color(p.random(255), p.random(255), p.random(255));

      constructor(pos: p5.Vector , velo: p5.Vector) {
        this.loc = pos;
        this.vel = velo;
        this.size = 30;
        this.color = p.color(20, 253, 114, 200);
      }

      display() {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.loc.x, this.loc.y, this.size , this.size );
      }

      movimiento() {
        this.loc.add(this.vel);
      }

      edgeCheck() {
        if (this.loc.x < this.size / 2) {
          this.loc.x = this.size / 2;
          this.vel.x = -1 * this.vel.x;
        }
        if (this.loc.x > p.width - (this.size / 2)) {
          this.loc.x = p.width - (this.size / 2);
          this.vel.x = -1 * this.vel.x;
        }
        if (this.loc.y < this.size / 2) {
          this.loc.y = this.size / 2;
          this.vel.y = -1 * this.vel.y;
        }
        if (this.loc.y > p.height - (this.size / 2)) {
          this.loc.y = p.height - (this.size / 2);
          this.vel.y = -1 * this.vel.y;
        }
      }

    }

    class NavigationNode {
      sizeTwo: number;
      size: number;
      loc: p5.Vector;
      vel: p5.Vector;
      shapeKind: number;
      texti: string;
      // this.color = p.color(p.random(255), p.random(255), p.random(255));
      color: p5.Color;
      colorTwo: p5.Color;
      contadorFrames: number;


      direction = 1;
      hoverin = false;

      circleOne: p5.Image;
      shapeTwo: p5.Image;
      circleTres: p5.Image;

      constructor(pos: p5.Vector , velo: p5.Vector, textito: string, shapeType: number) {
        this.sizeTwo = 120;
        this.size = this.sizeTwo * 0.8;
        this.loc = pos;
        this.vel = velo;
        this.shapeKind = shapeType;
        this.texti = textito;
        this.color = p.color(255, 255, 255, 255);
        this.colorTwo = p.color(255, 255, 255, 100);
        this.contadorFrames = p.frameCount;
        this.loadShapeImages();
      }



      loadShapeImages() {
        switch (this.shapeKind) {
          case 1:
            this.circleOne = p.loadImage('assets/generalImages/circleOne.svg');

            break;
          case 2:
            this.circleOne = p.loadImage('assets/generalImages/circleTwoWhite.svg');
            this.shapeTwo = p.loadImage('assets/generalImages/pathTwo.svg');
            break;
          case 3:
            this.circleTres = p.loadImage('assets/generalImages/circleTres.svg');
            break;
        }
      }



      display() {
        p.noStroke();





          switch (this.shapeKind) {
            case 1:
              p.push();
              p.translate(this.loc.x, this.loc.y);
              p.rotate(p.radians((p.frameCount * this.direction) % 360));
              p.image(this.circleOne, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
              p.pop();
              p.fill(this.color);

              p.ellipse(this.loc.x, this.loc.y, this.size , this.size );
              p.fill(this.colorTwo);
              p.ellipse(this.loc.x, this.loc.y, this.sizeTwo , this.sizeTwo );

              break;

            case 2:
              p.push();
              p.translate(this.loc.x, this.loc.y);
              p.rotate(p.radians((p.frameCount * this.direction) % 360));
              p.image(this.circleOne, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
              p.pop();
              p.push();
              p.fill(this.color);
              p.translate(this.loc.x, this.loc.y);
              if (this.hoverin) {
                p.rotate(p.radians((this.contadorFrames * this.direction * -1) % 360));
              } else {
                p.rotate(p.radians((this.contadorFrames * this.direction * -1) % 360));
              }
              p.image(this.shapeTwo, 0, 0, this.sizeTwo , this.sizeTwo );
              p.pop();
              p.fill(255, 255, 255, 250);
              p.ellipse(this.loc.x, this.loc.y, this.size , this.size );
              break;

            case 3:

              p.push();
              p.translate(this.loc.x, this.loc.y);
              p.rotate(p.radians((p.frameCount * this.direction) % 360));
              p.image(this.circleTres, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
              p.pop();
              p.push();
              p.fill(this.color);
              p.translate(this.loc.x, this.loc.y);
              if (this.hoverin) {
                p.rotate(p.radians((this.contadorFrames * this.direction * -1) % 360));
              } else {
                p.rotate(p.radians((this.contadorFrames * this.direction * -1) % 360));
              }
              p.arc(0, 0, this.size, this.size, 0, p.TWO_PI - 1, p.PIE);
              p.pop();
              p.fill(this.colorTwo);
              p.ellipse(this.loc.x, this.loc.y, this.sizeTwo , this.sizeTwo );
              break;
          }


        p.fill(0);
        p.textSize(this.size / 4);
        p.textLeading(this.size / 4.5);
        p.text(this.texti, this.loc.x, this.loc.y);
      }

      movimiento () {
        this.loc.add(this.vel);
        this.hoverCursor();
      }

      edgeCheck() {
        if (this.loc.x < this.size / 2) {
          this.loc.x = this.size / 2;
          this.vel.x = -1 * this.vel.x;
          if (this.shapeKind === 1) {
            this.direction = this.direction * -1;
          }
        }
        if (this.loc.x > p.width - (this.size / 2)) {
          this.loc.x = p.width - (this.size / 2);
          this.vel.x = -1 * this.vel.x;
          if (this.shapeKind === 1) {
            this.direction = this.direction * -1;
          }
        }
        if (this.loc.y < this.size / 2) {
          this.loc.y = this.size / 2;
          this.vel.y = -1 * this.vel.y;
          if (this.shapeKind === 1) {
            this.direction = this.direction * -1;
          }
        }
        if (this.loc.y > p.height - (this.size / 2)) {
          this.loc.y = p.height - (this.size / 2);
          this.vel.y = -1 * this.vel.y;
          if (this.shapeKind === 1) {
            this.direction = this.direction * -1;
          }
        }
      }

      hoverCursor() {
        if (p.dist(this.loc.x, this.loc.y, p.mouseX, p.mouseY) < this.sizeTwo / 2) {
          this.size = this.sizeTwo * 0.8;
          this.hoverin = true;
          this.contadorFrames++;

        } else if (p.dist(this.loc.x, this.loc.y, p.mouseX, p.mouseY) > this.sizeTwo / 2) {
          this.size = this.sizeTwo * 0.7;
          this.hoverin = false;
        }
      }

    }

    class Wave {
      A: number;   // wave amplitude
      frequency: number;    // angular frequency
      time: number;
      diameter: number;
      radius: number;
      phase: number;
      phi: number;
      ypos: number;

      constructor(ypos: number, ampMax: number) {
        this.A = p.random(1, ampMax);   // wave amplitude
        this.ypos = ypos;
        this.frequency = p.random(0.0314, 0.1256);
        this.time = 1.97;
        this.diameter = 10;
        this.radius = this.diameter / 2;
        this.phase = p.random(0.1, 0.6);
      }

      display() {
        p.noFill();
        p.strokeWeight(2);
        p.stroke(255, 90);
        p.push();
        p.translate(0, this.ypos);
        p.beginShape();

        for (let x = this.radius; x <= p.width - this.radius; x += this.diameter * 1.5) {
          this.phi = -x * this.phase;           // phase
          // p.vertex(x, this.A * p.map((p.sin(this.frequency * this.time + this.phi) + p.map(p.noise(x), 0, 1, -1, 1)), -2, 2, -1, 1));
          p.vertex(x, this.A * p.sin(this.frequency * this.time + this.phi));
        }

        p.endShape();
        p.pop();
        this.time += 1;
      }
    }

    p.mouseClicked = () => {
        for (let i = nodes.length - 1; i >= 0; i--) {

        if (nodes[i].hoverin) {
          switch (nodes[i].texti) {
            case 'WHO\nARE\nYOU?':
              this.typingTres('WHO ARE YOU?', 'about');
              break;

            case 'WHAT\nCAN\nYOU DO?':
              this.typingTres('WHAT CAN YOU DO?', 'skills');
              break;

            case 'OPEN\nYOUR\nPROJECTS':
              this.typingTres('OPEN YOUR PROJECTS', 'projects');
              break;
          }

          break;
        }
      }
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

          this.showCursorOne = false;
          this.showCursorTwo = true;
          this.writing = false;
          clearInterval(intervalito);
          this.typingTwo();
        }
      }, 50);
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
          }, 1000);

        }
      }, 50);
    }, 1000);
  }

  typingTres(mensaje: string, route: string) {
    this.typewriter_textTres =  mensaje;
    setTimeout(() => {
      let total_length = this.typewriter_textTres.length;
      let current_length = this.typewriter_displayTres.length;
      this.writing = true;
      const intervalito = setInterval(() => {
        total_length = this.typewriter_textTres.length;
        current_length = this.typewriter_displayTres.length;
        if (current_length < total_length) {
          this.typewriter_displayTres += this.typewriter_textTres[current_length];
        } else {
          // this.typewriter_displayOne = '';

          clearInterval(intervalito);
          setTimeout(() => {
            this.showCursorFour = true;
            this.showCursorThree = false;
            this.writing = false;
            setTimeout(() => {
              this.router.navigate([route]);
            }, 6000);
          }, 200);

        }
      }, 100);
    }, 100);
  }

}
