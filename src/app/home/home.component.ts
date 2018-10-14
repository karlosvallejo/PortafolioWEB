import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {trigger, style, transition, animate, state} from '@angular/animations';
import {Router} from '@angular/router';
import {EventsService} from '../services/events.service';
import * as p5 from 'p5';
import {interval, Subscription} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';



interface Ip5Functions extends p5 {
  endOfLoading: () => void;
}

class NewP5 extends p5 implements Ip5Functions {
  endOfLoading: () => void;
  constructor(sketch: (...args: any[]) => any, container: HTMLElement) {
    super(sketch, container);
  }
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

  typewriter_textOne = 'HI, MY NAME IS CARLOS AND I’AM AN INTERACTIVE MEDIA DESIGNER';
  typewriter_displayOne = '';

  typewriter_textTwo = 'WRITE A REQUEST OR QUESTION';
  typewriter_displayTwo = '';

  typewriter_textTres = 'jjeeje';
  typewriter_displayTres = '';

  moveBarState = 'rise';
  moveBarStateTwo = 'rise';

  isMobile: boolean;



  constructor(private router: Router, private service: EventsService, private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.typeShowAndHideInterval = interval(500).subscribe(x => {
      if (!this.writing) {
        this.showCursor = !this.showCursor;
      } else {
        this.showCursor = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    this.typeShowAndHideInterval.unsubscribe();
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


  private createCanvas () {
    this.canvas = new NewP5(this.sketch, this.containerSketch.nativeElement);
  }

  private destroyCanvas () {
    this.canvas.remove();
    this.canvas = null;
  }

  private sketch = (p: Ip5Functions) => {
    const nodes = [];
    const instanceNodes = [];
    const maxDistance = 200;
    const textLoading = 'LOADING.';
    let nodeCount: number;
    let loading = false;
    let backgrounOpacity = 255;
    let textFillOpacity = 255;
    let displayText =  '';
    let intervalLoading: Subscription;
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

      if (this.isMobile) {
        nodeCount = 10;
      } else {
        nodeCount = 20;
      }

      startLoading();

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const b = new Ball(p.createVector(p.random(100, p.width), p.random(100, p.height)), p.createVector(p.random(-2, 2),
          p.random(-2, 2)));
        nodes.push(b);
      }

      instanceAboutNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
        p.createVector(p.random(-1, 1), p.random(-1, 1)), 'WHO\nARE\nYOU?', 1);

      instanceSkillsNode = new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
        p.createVector(p.random(-1, 1), p.random(-1, 1)), 'WHAT\nCAN\nYOU DO?', 2);

      instanceProyectsNode =  new NavigationNode(p.createVector(p.random(100, p.width), p.random(100, p.height)),
        p.createVector(p.random(-1, 1), p.random(-1, 1)), 'OPEN\nYOUR\nPROJECTS', 3);

      instanceNodes.push(instanceAboutNode);
      instanceNodes.push(instanceSkillsNode);
      instanceNodes.push(instanceProyectsNode);
      nodes.push(instanceAboutNode);
      nodes.push(instanceSkillsNode);
      nodes.push(instanceProyectsNode);

      for (let i = 1 ; i < 10; i++) {
        wavesArray.push(new Wave((p.height / 10) * i, p.height / 100));
      }
    };

    p.draw = () => {
      p.background(0);
      // p.fill('rgba(255,255,255, 0.8)');
      // p.background(0);

      for (let i = 0; i < wavesArray.length; i++) {
        wavesArray[i].display();
      }



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
        */
      }



  /*
      nodes.forEach((node: NavigationNode) => {
        node.display();
        node.movimiento();
        node.edgeCheck();
      });
  */

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
      p.fill(0, 0, 0, backgrounOpacity);
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
        const intervalino =  setInterval(() => {
          backgrounOpacity -= 17;
          textFillOpacity -= 51;
          /*
          if (textFillOpacity <= 0) {
            // p.textAlign(p.CENTER);
          }
          */
          if (backgrounOpacity <= 0) {
            loading = false;
            clearInterval(intervalino);
            intervalLoading.unsubscribe();
            intervalLoading = null;
          }
        }, 200);
    };



    p.windowResized = () => {
      p.resizeCanvas(((p.windowWidth / 100) * 87.5), ((p.windowHeight / 100) * 45));
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
        this.size = p.width / 40;
        this.color = p.color(20, 253, 114, 200);
      }

      display() {
        this.size = p.width / 40;
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
        this.sizeTwo = p.width / 12;
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
        this.sizeTwo = p.width / 12;

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
              this.typingTres('WHO ARE YOU?', 'REstORinG/ABoUT');
              break;

            case 'WHAT\nCAN\nYOU DO?':
              this.typingTres('WHAT CAN YOU DO?', 'REstORinG/SkIlLs');
              break;

            case 'OPEN\nYOUR\nPROJECTS':
              this.typingTres('OPEN YOUR PROJECTS', 'REstORinG/ProJEcTs');
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
              this.router.navigate([route]);
            }, 6000);
          }, 200);
        }
      });
    }, 100);
  }

}
