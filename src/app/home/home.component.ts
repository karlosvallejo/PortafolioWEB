import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {trigger, style, transition, animate, state} from '@angular/animations';
import {Event as RouterEvent, NavigationStart, Router} from '@angular/router';
import {EventsService} from '../services/events.service';
import * as p5 from 'p5';
import {interval, Subscription} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';



interface Ip5Functions extends p5 {
  endOfLoading: () => void;
  onResize: (width: number, height: number) => void;
  getPromise: () => Promise<string[]>;
}

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

  private canvas: Ip5Functions;

  showCursorOne = true;

  showCursorTwo = false;

  showCursorThree = false;

  showCursorFour = false;

  writing = false;
  showCursor = true;
  typeShowAndHideInterval: Subscription;
  routerSubscription: Subscription;

  typewriter_textOne = 'HI, MY NAME IS CARLOS AND I’AM AN INTERACTIVE MEDIA DESIGNER';
  typewriter_displayOne = '';

  typewriter_textTwo = 'WRITE A REQUEST OR QUESTION';
  typewriter_displayTwo = '';

  typewriter_textTres = 'jjeeje';
  typewriter_displayTres = '';

  moveBarState = 'rise';
  moveBarStateTwo = 'rise';


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const parent: HTMLElement = this.containerSketch.nativeElement;
    this.canvas.onResize(parent.clientWidth, parent.clientHeight);
  }


  constructor(private router: Router, private service: EventsService, private deviceService: DeviceDetectorService) {

  }

  ngOnInit() {
    this.typeShowAndHideInterval = interval(500).subscribe(x => {
      if (!this.writing) {
        this.showCursor = !this.showCursor;
      } else {
        this.showCursor = true;
      }
    });

    this.routerSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.destroyCanvas();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    this.typeShowAndHideInterval.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.createCanvas();
    this.typingOne();
    this.canvas.getPromise().then((value: string[]) => {
      this.typingTres(value[0], value[1]);
    });
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


  private createCanvas () {
    this.canvas = new p5(this.createSketch(this.containerSketch.nativeElement.clientWidth,
      this.containerSketch.nativeElement.clientHeight, this.deviceService.isMobile()), this.containerSketch.nativeElement) as Ip5Functions;
  }

  private destroyCanvas () {
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      console.log('destroyed');
    }
  }
  private createSketch(width: number, height: number, _isMobile: boolean) {

    return function sketch (p: Ip5Functions) {
      const isMobile: boolean = _isMobile;
      const nodes = [];
      const instanceNodes = [];
      const textLoading = 'LOADING.';
      const wavesArray: Wave[] = [];
      let navigationClick: Promise<string[]>;
      let navigationResolve: (messages: string[]) => void;
      let maxDistance = 200;
      let nodeCount: number;
      let loading = false;
      let backgroundOpacity = 255;
      let textFillOpacity = 255;
      let displayText = '';
      let intervalLoading: Subscription;
      let instanceAboutNode = null;
      let instanceSkillsNode = null;
      let instanceProjectsNode = null;

      let nodesImages: Array<p5.Image>;

      p.preload = function() {

        navigationClick = new Promise<string[]>((resolve: (messages: string[]) => void ) => {
          navigationResolve = resolve;
        });

        nodesImages = new Array<p5.Image>(4);

      };

      p.getPromise = function() {
        return navigationClick;
      };


      p.setup = () => {
        p.createCanvas(width, height);
        p.frameRate(25);
        /*
        if (!isMobile) {
          // @ts-ignore
         // p.drawingContext.shadowColor = 'rgba(220,255,220,0.8)';
          // @ts-ignore
         // p.drawingContext.shadowBlur = 4;
        }
        */
        p.rectMode(p.CENTER);
        p.imageMode(p.CENTER);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('VT323');


        if (isMobile) {
          nodeCount = 10;
        } else {
          nodeCount = 20;
        }

        // LOAD ALL IMAGES /// CALLBACK HELL

        p.loadImage('assets/generalImages/circleOne.svg', function(img) {
          nodesImages[0] = img;
          p.loadImage('assets/generalImages/circleTwoWhite.svg', function(imgTwo) {
            nodesImages[1] = imgTwo;
            p.loadImage('assets/generalImages/pathTwo.svg', function(imgThree) {
              nodesImages[2] = imgThree;
              p.loadImage('assets/generalImages/circleTres.svg', function(imgFour) {
                nodesImages[3] = imgFour;
                createNodesAndWaves();
              });
            });
          });
        });


        startLoading();


      };

     function createNodesAndWaves() {
       // Create nodes
       for (let i = 0; i < nodeCount; i++) {
         const b = new Ball(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-2, 2),
           p.random(-2, 2)), p);
         nodes.push(b);
       }

       instanceAboutNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
         p.createVector(p.random(-1, 1), p.random(-1, 1)), 'WHO\nARE\nYOU?', nodesImages, 1, p);

       instanceSkillsNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
         p.createVector(p.random(-1, 1), p.random(-1, 1)), 'WHAT\nCAN\nYOU DO?', nodesImages, 2, p);

       instanceProjectsNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
         p.createVector(p.random(-1, 1), p.random(-1, 1)), 'OPEN\nYOUR\nPROJECTS', nodesImages, 3, p);

       instanceNodes.push(instanceAboutNode);
       instanceNodes.push(instanceSkillsNode);
       instanceNodes.push(instanceProjectsNode);
       nodes.push(instanceAboutNode);
       nodes.push(instanceSkillsNode);
       nodes.push(instanceProjectsNode);

       for (let i = 1; i < 10; i++) {
         wavesArray.push(new Wave((p.height / 10) * i, p.height / 100, p));
       }
      }

      p.draw = () => {
        p.background(0);
        // p.fill('rgba(255,255,255, 0.8)');
        // p.background(0);

        for (let i = 0; i < wavesArray.length; i++) {
          wavesArray[i].display();
        }


        /*
              for (let i = 0; i < nodes.length; i++) {
                if (!this.isMobile) {
                  drawConnection(i);
                }
                nodes[i].display();
                nodes[i].movimiento();
                nodes[i].edgeCheck();
                /*
                for (let j = i + 1; j < nodes.length; j++) {
                  springTo(nodes[i], nodes[j]);
                }

              }
        */


        nodes.forEach((node: Ball) => {
          if (!isMobile) {
            drawConnection(node);
          }
          node.display();
          node.movimiento();
          node.edgeCheck();
        });


        /*
              for (let i = 0; i < nodes.length - 1; i++) {
                for (let c = i + 1; c < nodes.length; c++) {

                  const d = p.sq(nodes[c].loc.x - nodes[i].loc.x) + p.sq(nodes[c].loc.y - nodes[i].loc.y);

                  if (d < p.pow(90, 2)) {
                    p.stroke(15, 155, 241, p.map(d, 0, p.pow(100, 2), 100, 0));
                    // p.strokeWeight(10 - (d / maxDistance) * 10);
                    p.line(nodes[c].loc.x, nodes[c].loc.y, nodes[i].loc.x, nodes[i].loc.y);
                  }
                }
              }
        */


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

      function drawLoading() {
        p.fill(0, 0, 0, backgroundOpacity);
        p.rect(p.width / 2, p.height / 2, p.width, p.height);
        p.textSize(p.width / 30);
        p.fill(255, textFillOpacity);
        p.text(displayText, p.width / 2, p.height / 2);
      }

      function startLoading() {
        loading = true;
        displayText = textLoading;
        intervalLoading = interval(500).subscribe(x => {
          displayText += '.';
          if (displayText.length === textLoading.length + 4) {
            displayText = textLoading;
          }
        });

        // p.textAlign(p.LEFT);
      }


      p.endOfLoading = () => {
        const intervalino = setInterval(() => {
          backgroundOpacity -= 17;
          textFillOpacity -= 51;
          /*
          if (textFillOpacity <= 0) {
            // p.textAlign(p.CENTER);
          }
          */
          if (backgroundOpacity <= 0) {
            loading = false;
            clearInterval(intervalino);
            intervalLoading.unsubscribe();
            intervalLoading = null;
          }
        }, 200);
      };


      p.onResize = (widthR: number, heightR: number) => {
        p.resizeCanvas(widthR, heightR);
        wavesArray.forEach((wave: Wave, index: number) => {
          wave.yPos = (p.height / 10) * (index + 1);
          wave.A = p.random(1, p.height / 100);
        });
      };


      function springTo(p1, p2) {
        const dx = p2.loc.x - p1.loc.x;
        const dy = p2.loc.y - p1.loc.y;
        const dist = p.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          p.stroke(49, 149, 196);
          p.line(p1.loc.x, p1.loc.y, p2.loc.x, p2.loc.y);
        }
      }


      function drawConnection(theNode: Ball | NavigationNode) {
        maxDistance = p.width / 5;

        for (let j = nodes.indexOf(theNode); j < nodes.length; j++) {

          const node2 = nodes[j];
          const distance = p.dist(theNode.loc.x, theNode.loc.y, node2.loc.x, node2.loc.y);
          if (distance < maxDistance) {
            if (j !== nodes.indexOf(theNode)) {
              p.stroke(node2.color);
              p.strokeWeight((p.width / 150) - ((distance / maxDistance) * p.width / 150));
              p.line(theNode.loc.x, theNode.loc.y, node2.loc.x, node2.loc.y);
            }
          }
        }
      }

      p.mouseClicked = () => {
        for (let i = nodes.length - 1; i >= 0; i--) {

          if (nodes[i].hoverin) {
            switch (nodes[i].texti) {
              case 'WHO\nARE\nYOU?':
                navigationResolve(['WHO ARE YOU?', 'REstORinG/ABoUT']);
                break;

              case 'WHAT\nCAN\nYOU DO?':
                navigationResolve(['WHAT CAN YOU DO?', 'REstORinG/SkIlLs']);
                break;

              case 'OPEN\nYOUR\nPROJECTS':
                navigationResolve(['OPEN YOUR PROJECTS', 'REstORinG/ProJEcTs']);
                break;
            }

            break;
          }
        }
      };
    };
}




  typingOne() {
    setTimeout(() => {
      let total_length = this.typewriter_textOne.length;
      let current_length = this.typewriter_displayOne.length;
      this.writing = true;
      const intervalito = interval(60).subscribe(x => {
        total_length = this.typewriter_textOne.length;
        current_length = this.typewriter_displayOne.length;
        if (current_length < total_length) {
          this.typewriter_displayOne += this.typewriter_textOne[current_length];
        } else {
          // this.typewriter_displayOne = '';
          this.showCursorOne = false;
          this.showCursorTwo = true;
          this.writing = false;
          this.typingTwo();
          intervalito.unsubscribe();
        }
      });
    }, 2000);
  }

  typingTwo() {
    setTimeout(() => {
      let total_length = this.typewriter_textTwo.length;
      let current_length = this.typewriter_displayTwo.length;
      this.writing = true;

      const intervalito = interval(60).subscribe(x => {
        total_length = this.typewriter_textTwo.length;
        current_length = this.typewriter_displayTwo.length;
        if (current_length < total_length) {
          this.typewriter_displayTwo += this.typewriter_textTwo[current_length];
        } else {
          // this.typewriter_displayOne = '';
          this.showCursorTwo = false;
          this.showCursorThree = true;
          this.writing = false;
          intervalito.unsubscribe();
          setTimeout(() => {
            this.canvas.endOfLoading();
          }, 1000);
        }
      });
    }, 1000);
  }

  typingTres(mensaje: string, route: string) {
    this.typewriter_textTres =  mensaje;
    setTimeout(() => {
      let total_length = this.typewriter_textTres.length;
      let current_length = this.typewriter_displayTres.length;
      this.writing = true;
      const intervalito = interval(60).subscribe(x => {
        total_length = this.typewriter_textTres.length;
        current_length = this.typewriter_displayTres.length;
        if (current_length < total_length) {
          this.typewriter_displayTres += this.typewriter_textTres[current_length];
        } else {
          // this.typewriter_displayOne = '';

          intervalito.unsubscribe();
          setTimeout(() => {
            this.showCursorFour = true;
            this.showCursorThree = false;
            this.writing = false;
            this.service.newEvent('Wild');
            setTimeout(() => {
              this.service.newEvent('noWild');
              this.canvas.remove();
              this.canvas = null;
              this.router.navigate([route]);
            }, 2000);
          }, 200);
        }
      });
    }, 100);
  }

}

class Ball {
  loc: p5.Vector;
  vel: p5.Vector;
  size: number;
  color: p5.Color;
  p: Ip5Functions;

  // this.color = p.color(p.random(255), p.random(255), p.random(255));

  constructor(pos: p5.Vector, velo: p5.Vector, pInstance: Ip5Functions) {
    this.p = pInstance;
    this.loc = pos;
    this.vel = velo;
    this.size = this.p.width / 40;
    this.color = this.p.color(20, 253, 114, 200);
  }

  display() {
    this.size = this.p.width / 40;
    this.p.noStroke();
    this.p.fill(this.color);
    this.p.ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }

  movimiento() {
    this.loc.add(this.vel);
  }

  edgeCheck() {
    if (this.loc.x < this.size / 2) {
      this.loc.x = this.size / 2;
      this.vel.x = -1 * this.vel.x;
    }
    if (this.loc.x > this.p.width - (this.size / 2)) {
      this.loc.x = this.p.width - (this.size / 2);
      this.vel.x = -1 * this.vel.x;
    }
    if (this.loc.y < this.size / 2) {
      this.loc.y = this.size / 2;
      this.vel.y = -1 * this.vel.y;
    }
    if (this.loc.y > this.p.height - (this.size / 2)) {
      this.loc.y = this.p.height - (this.size / 2);
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
  images: p5.Image[];
  // this.color = p.color(p.random(255), p.random(255), p.random(255));
  color: p5.Color;
  colorTwo: p5.Color;
  contadorFrames: number;


  direction = 1;
  hoverin = false;
  circleOne: p5.Image;
  shapeTwo: p5.Image;
  circleTres: p5.Image;

  p: Ip5Functions;

  constructor(pos: p5.Vector, velo: p5.Vector, textito: string, _images: p5.Image[], shapeType: number, pInstance: Ip5Functions) {
    this.p = pInstance;
    this.sizeTwo = this.p.width / 12;
    this.size = this.sizeTwo * 0.8;
    this.loc = pos;
    this.vel = velo;
    this.shapeKind = shapeType;
    this.texti = textito;
    this.images = _images;
    this.color = this.p.color(255, 255, 255, 255);
    this.colorTwo = this.p.color(255, 255, 255, 100);
    this.contadorFrames = this.p.frameCount;
    this.loadShapeImages();
  }


  loadShapeImages() {
    switch (this.shapeKind) {
      case 1:
        this.circleOne = this.images[0];

        break;
      case 2:
        this.circleOne = this.images[1];
        this.shapeTwo = this.images[2];
        break;
      case 3:
        this.circleTres = this.images[3];
        break;
    }
  }


  display() {
    this.p.noStroke();
    this.sizeTwo = this.p.width / 12;

    switch (this.shapeKind) {
      case 1:
        this.p.push();
        this.p.translate(this.loc.x, this.loc.y);
        this.p.rotate(this.p.radians((this.p.frameCount * this.direction) % 360));
        this.p.image(this.circleOne, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
        this.p.pop();
        this.p.fill(this.color);

        this.p.ellipse(this.loc.x, this.loc.y, this.size, this.size);
        this.p.fill(this.colorTwo);
        this.p.ellipse(this.loc.x, this.loc.y, this.sizeTwo, this.sizeTwo);

        break;

      case 2:
        this.p.push();
        this.p.translate(this.loc.x, this.loc.y);
        this.p.rotate(this.p.radians((this.p.frameCount * this.direction) % 360));
        this.p.image(this.circleOne, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
        this.p.pop();
        this.p.push();
        this.p.fill(this.color);
        this.p.translate(this.loc.x, this.loc.y);
        if (this.hoverin) {
          this.p.rotate(this.p.radians((this.contadorFrames * this.direction * -1) % 360));
        } else {
          this.p.rotate(this.p.radians((this.contadorFrames * this.direction * -1) % 360));
        }
        this.p.image(this.shapeTwo, 0, 0, this.sizeTwo, this.sizeTwo);
        this.p.pop();
        this.p.fill(255, 255, 255, 250);
        this.p.ellipse(this.loc.x, this.loc.y, this.size, this.size);
        break;

      case 3:
        this.p.push();
        this.p.translate(this.loc.x, this.loc.y);
        this.p.rotate(this.p.radians((this.p.frameCount * this.direction) % 360));
        this.p.image(this.circleTres, 0, 0, this.sizeTwo * 1.2, this.sizeTwo * 1.2);
        this.p.pop();
        this.p.push();
        this.p.fill(this.color);
        this.p.translate(this.loc.x, this.loc.y);
        if (this.hoverin) {
          this.p.rotate(this.p.radians((this.contadorFrames * this.direction * -1) % 360));
        } else {
          this.p.rotate(this.p.radians((this.contadorFrames * this.direction * -1) % 360));
        }
        this.p.arc(0, 0, this.size, this.size, 0, this.p.TWO_PI - 1, this.p.PIE);
        this.p.pop();
        this.p.fill(this.colorTwo);
        this.p.ellipse(this.loc.x, this.loc.y, this.sizeTwo, this.sizeTwo);
        break;
    }


    this.p.fill(0);
    this.p.textSize(this.size / 4);
    this.p.textLeading(this.size / 4.5);
    this.p.text(this.texti, this.loc.x, this.loc.y);
  }

  movimiento() {
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
    if (this.loc.x > this.p.width - (this.size / 2)) {
      this.loc.x = this.p.width - (this.size / 2);
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
    if (this.loc.y > this.p.height - (this.size / 2)) {
      this.loc.y = this.p.height - (this.size / 2);
      this.vel.y = -1 * this.vel.y;
      if (this.shapeKind === 1) {
        this.direction = this.direction * -1;
      }
    }
  }

  hoverCursor() {
    if (this.p.dist(this.loc.x, this.loc.y, this.p.mouseX, this.p.mouseY) < this.sizeTwo / 2) {
      this.size = this.sizeTwo * 0.8;
      this.hoverin = true;
      this.contadorFrames++;

    } else if (this.p.dist(this.loc.x, this.loc.y, this.p.mouseX, this.p.mouseY) > this.sizeTwo / 2) {
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
  yPos: number;
  p: Ip5Functions;

  constructor(ypos: number, ampMax: number, pInstance: Ip5Functions) {
    this.p = pInstance;
    this.A = this.p.random(1, ampMax);   // wave amplitude
    this.yPos = ypos;
    this.frequency = this.p.random(0.0314, 0.1256);
    this.time = 1.97;
    this.diameter = 10;
    this.radius = this.diameter / 2;
    this.phase = this.p.random(0.1, 0.6);
  }

  display() {
    this.p.noFill();
    this.p.strokeWeight(this.p.width / 350);
    this.p.stroke(255, 90);
    this.p.push();
    this.p.translate(0, this.yPos);
    this.p.beginShape();

    for (let x = 0; x <= this.p.width + this.radius; x += this.diameter * 1.5) {
      this.phi = -x * this.phase;           // phase
      // p.vertex(x, this.A * p.map((p.sin(this.frequency * this.time + this.phi) + p.map(p.noise(x), 0, 1, -1, 1)), -2, 2, -1, 1));
      this.p.vertex(x, this.A * this.p.sin(this.frequency * this.time + this.phi));
    }

    this.p.endShape();
    this.p.pop();
    this.time += 1;
  }
}
