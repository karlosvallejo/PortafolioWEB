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

  showCursorFour = false;

  writing = false;
  showCursor = true;

  typewriter_textOne = 'HI, MY NAME IS CARLOS AND I’AM AN INTERACTIVE MEDIA DESIGNER';
  typewriter_displayOne = '';

  typewriter_textTwo = 'WRITE A REQUEST OR QUESTION';
  typewriter_displayTwo = '';

  typewriter_textTres = 'jjeeje';
  typewriter_displayTres = '';


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
    p.nodeCount = 30;
    p.maxDistance = 200;
    p.loading = false;
    p.backgrounOpacity = 255;
    p.textFillOpacity = 255;
    p.textLoading = 'LOADING.';
    p.displayText =  '';
    p.intervalLoading = null;
    p.instanceAboutNode = null;
    p.instanceSkillsNode = null;
    p.instanceProyectsNode = null;


    p.setup = () => {
      p.createCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 44));
     // p.frameRate(25);
     // p.drawingContext.shadowColor = 'rgba(220,255,220,0.8)';
     // p.drawingContext.shadowBlur = 4;
      p.rectMode(p.CENTER);
      p.imageMode(p.CENTER);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont('VT323');



      p.startLoading();

      // Create nodes
      for (let i = 0; i < p.nodeCount; i++) {
        const b = new p.Ball(p.createVector(p.width / 2, p.height / 2), p.createVector(p.random(-1, 1), p.random(-1, 1)));
        p.nodes.push(b);
      }

      p.instanceAboutNode = new p.NavigationNode(p.createVector(p.width / 2, p.height / 2), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'WHO\nARE\nYOU?', 1);

      p.instanceSkillsNode = new p.NavigationNode(p.createVector(p.width / 2, p.height / 2), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'WHAT\nCAN\nYOU DO?', 2);

      p.instanceProyectsNode =  new p.NavigationNode(p.createVector(p.width / 2, p.height / 2), p.createVector(p.random(-1, 1),
        p.random(-1, 1)), 'OPEN\nYOUR\nPROJECTS', 3);

      p.instanceNodes.push(p.instanceAboutNode);
      p.instanceNodes.push(p.instanceSkillsNode);
      p.instanceNodes.push(p.instanceProyectsNode);
      p.nodes.push(p.instanceAboutNode);
      p.nodes.push(p.instanceSkillsNode);
      p.nodes.push(p.instanceProyectsNode);



    };

    p.draw = () => {
      // p.clear();
      // p.fill('rgba(255,255,255, 0.8)');
      p.background(0);

      for (let i = 0; i < p.nodes.length; i++) {
        p.drawConnection(i);
        p.nodes[i].display();
        p.nodes[i].movimiento();
        p.nodes[i].edgeCheck();
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

   //   console.log(p.frameRate());
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
      p.textAlign(p.LEFT);

    };

    p.drawLoading = () => {
      p.background(0, p.backgrounOpacity);
      p.textSize(p.width / 30);
      p.fill(255, p.textFillOpacity);
      p.text(p.displayText, p.width / 2.35, p.height / 2);

    };

    p.endOfLoading = () => {
     //
    const intervalino =  setInterval(() => {
        p.backgrounOpacity -= 10;
        p.textFillOpacity -= 20;
        if (p.textFillOpacity <= 0) {
          p.textAlign(p.CENTER);
        }

        if (p.backgrounOpacity <= 0) {
          p.loading = false;
          clearInterval(intervalino);
          clearInterval(p.intervalLoading);

        }
      }, 50);

    };

    p.windowResized = () => {
      p.resizeCanvas(((p.windowWidth / 16) * 14), ((p.windowHeight / 100) * 45) );
    };

    p.drawConnection = (theNode) => {
      p.node1 = p.nodes[theNode];

      for (let j = theNode; j < p.nodes.length; j++) {

        p.node2 = p.nodes[j];
        p.distance = p.dist(p.node1.loc.x, p.node1.loc.y, p.node2.loc.x, p.node2.loc.y);
        if (p.distance < p.maxDistance) {
          if (j !== theNode) {
              p.stroke(p.node2.color);
              p.strokeWeight(10 - (p.distance / p.maxDistance) * 10);
              p.line(p.node1.loc.x, p.node1.loc.y, p.node2.loc.x, p.node2.loc.y);
          }
        }
      }

    };

    p.Ball = function (pos , velo) {
      this.loc = pos;
      this.vel = velo;
      this.size = 30;
      // this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.color = p.color(20, 253, 114, 200);

      this.display = function () {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.loc.x, this.loc.y, this.size , this.size );
      };

      this.movimiento = function() {
        this.loc.add(this.vel);
      };

      this.edgeCheck = function () {
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
      };

    };

    p.NavigationNode = function (pos , velo, textito, shapeType) {
      this.sizeTwo = 120;
      this.size = this.sizeTwo * 0.8;
      this.loc = pos;
      this.vel = velo;
      this.shapeKind = shapeType;
      this.texti = textito;
      // this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.color = p.color(255, 255, 255, 255);
      this.colorTwo = p.color(255, 255, 255, 100);
      this.contadorFrames = p.frameCount;


      this.direction = 1;
      this.hoverin = false;



      this.loadShapeImages = function () {
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
      };

      this.loadShapeImages();

      this.display = function () {
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
      };

      this.movimiento = function() {
        this.loc.add(this.vel);
        this.hoverCursor();
      };

      this.edgeCheck = function () {
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
      };

      this.hoverCursor =  function () {
        if (p.dist(this.loc.x, this.loc.y, p.mouseX, p.mouseY) < this.sizeTwo / 2) {
          this.size = this.sizeTwo * 0.8;
          this.hoverin = true;
          this.contadorFrames++;

        } else if (p.dist(this.loc.x, this.loc.y, p.mouseX, p.mouseY) > this.sizeTwo / 2) {
          this.size = this.sizeTwo * 0.7;
          this.hoverin = false;
        }
      };

    };

    p.mouseClicked = () => {
        for (let i = p.nodes.length - 1; i >= 0; i--) {

        if (p.nodes[i].hoverin) {
          switch (p.nodes[i].texti) {
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
             this.p5.endOfLoading();
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
            }, 2000);
          }, 200);

        }
      }, 100);
    }, 100);
  }

}
