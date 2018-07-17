import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger, state} from '@angular/animations';
import {Router} from '@angular/router';
declare let p5: any;




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('charging', [
      state('rise', style({
        width : '94%'
      })),
      state('descend',   style({
        width : '5%'
      })),
      transition('* => *', animate('8000ms ease')),
    ])
  ]
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
    this.p5 = new p5(this.sketch, 'p5Canvas');
  }

  private destroyCanvas () {
    console.log('destroying canvas');
    this.p5.noCanvas();
    this.p5 = null;
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
    p.glitchImage = null;
    p.glitchEffectObject = null;
    p.drone = null;
    p.wavesArray = [];

/*
    p.loadImage('https://vignette.wikia.nocookie.net/gearsofwar/images/d/d0/Drone-l.jpg', function(img) {
      p.drone = img ;
    });
*/

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


      for (let i = 1 ; i < 10; i++) {
        p.wavesArray.push(new p.wave((p.height / 10) * i, p.height / 100));
      }


    };

    p.draw = () => {
      // p.clear();
      // p.fill('rgba(255,255,255, 0.8)');
      p.background(0);
      for (let i = 0; i < p.wavesArray.length; i++) {
        p.wavesArray[i].display();
      }


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

      if (p.glitchImage != null) {
        p.glitchEffectObject.show();
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

    p.glitch = function (img) {

      this.channelLen = 4;
      this.imgOrigin = img;
      this.imgOrigin.loadPixels();
      this.copyData = [];
      this.flowLineImgs = [];
      this.shiftLineImgs = [];
      this.shiftRGBs = [];
      this.scatImgs = [];
      this.throughFlag = true;
      this.countTFlag = 0;
      this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

      // flow line
      for (let i = 0; i < 1; i++) {
        const o = {
          pixels: null,
          t1: p.floor(p.random(0, 1000)),
          speed: p.floor(p.random(4, 24)),
          randX: p.floor(p.random(24, 80))
        };
        this.flowLineImgs.push(o);
      }

      // shift line
      for (let i = 0; i < 6; i++) {
        const o = null;
        this.shiftLineImgs.push(o);
      }

      // shift RGB
      for (let i = 0; i < 1; i++) {
        const o = null;
        this.shiftRGBs.push(o);
      }

      // scat imgs
      for (let i = 0; i < 3; i++) {
        const scatImg = {
          img: null,
          x: 0,
          y: 0
        };
        this.scatImgs.push(scatImg);
      }


      this.replaceData = function (destImg, srcPixels) {
        for (let y = 0; y < destImg.height; y++) {
          for (let x = 0; x < destImg.width; x++) {
            let r, g, b, a;
            let index;
            index = (y * destImg.width + x) * this.channelLen;
            r = index;
            g = index + 1;
            b = index + 2;
            a = index + 3;
            destImg.pixels[r] = srcPixels[r];
            destImg.pixels[g] = srcPixels[g];
            destImg.pixels[b] = srcPixels[b];
            destImg.pixels[a] = srcPixels[a];
          }
        }
        destImg.updatePixels();
      };

      this.flowLine = function (srcImg, obj) {

        let destPixels,
          tempY;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        obj.t1 %= srcImg.height;
        obj.t1 += obj.speed;
        // tempY = floor(noise(obj.t1) * srcImg.height);
        tempY = p.floor(obj.t1);
        for (let y = 0; y < srcImg.height; y++) {
          if (tempY === y) {
            for (let x = 0; x < srcImg.width; x++) {
              let r, g, b, a;
              let index;
              index = (y * srcImg.width + x) * this.channelLen;
              r = index;
              g = index + 1;
              b = index + 2;
              a = index + 3;
              destPixels[r] = srcImg.pixels[r] + obj.randX;
              destPixels[g] = srcImg.pixels[g] + obj.randX;
              destPixels[b] = srcImg.pixels[b] + obj.randX;
              destPixels[a] = srcImg.pixels[a];
            }
          }
        }
        return destPixels;
      };

      this.shiftLine = function (srcImg) {

        let offsetX;
        let rangeMin, rangeMax;
        let destPixels;
        let rangeH;

        destPixels = new Uint8ClampedArray(srcImg.pixels);
        rangeH = srcImg.height;
        rangeMin = p.floor(p.random(0, rangeH));
        rangeMax = rangeMin + p.floor(p.random(1, rangeH - rangeMin));
        offsetX = this.channelLen * p.floor(p.random(-40, 40));

        for (let y = 0; y < srcImg.height; y++) {
          if (y > rangeMin && y < rangeMax) {
            for (let x = 0; x < srcImg.width; x++) {
              let r, g, b, a;
              let r2, g2, b2;
              const a2 = null;
              let index;

              index = (y * srcImg.width + x) * this.channelLen;
              r = index;
              g = index + 1;
              b = index + 2;
              a = index + 3;
              r2 = r + offsetX;
              g2 = g + offsetX;
              b2 = b + offsetX;
              destPixels[r] = srcImg.pixels[r2];
              destPixels[g] = srcImg.pixels[g2];
              destPixels[b] = srcImg.pixels[b2];
              destPixels[a] = srcImg.pixels[a];
            }
          }
        }
        return destPixels;
      };

      this.shiftRGB = function (srcImg) {

        let randR, randG, randB;
        let destPixels;
        let range;

        range = 16;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        randR = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;
        randG = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;
        randB = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;

        for (let y = 0; y < srcImg.height; y++) {
          for (let x = 0; x < srcImg.width; x++) {
            let r, g, b, a;
            let r2, g2, b2;
            const a2 = null;
            let index;

            index = (y * srcImg.width + x) * this.channelLen;
            r = index;
            g = index + 1;
            b = index + 2;
            a = index + 3;
            r2 = (r + randR) % srcImg.pixels.length;
            g2 = (g + randG) % srcImg.pixels.length;
            b2 = (b + randB) % srcImg.pixels.length;
            destPixels[r] = srcImg.pixels[r2];
            destPixels[g] = srcImg.pixels[g2];
            destPixels[b] = srcImg.pixels[b2];
            destPixels[a] = srcImg.pixels[a];
          }
        }

        return destPixels;
      };

      this.getRandomRectImg = function (srcImg) {
        let startX;
        let startY;
        let rectW;
        let rectH;
        let destImg;
        startX = p.floor(p.random(0, srcImg.width - 30));
        startY = p.floor(p.random(0, srcImg.height - 50));
        rectW = p.floor(p.random(30, srcImg.width - startX));
        rectH = p.floor(p.random(1, 50));
        destImg = srcImg.get(startX, startY, rectW, rectH);
        destImg.loadPixels();
        return destImg;
      };

      this.show = function () {

        // restore the original state
        this.replaceData(this.imgOrigin, this.copyData);

        // sometimes pass without effect processing
        const n = p.floor(p.random(100));
        if (n > 75 && this.throughFlag) {
          this.countTFlag++;
          this.throughFlag = false;
          setTimeout(() => {
            this.throughFlag = true;
          }, p.floor(p.random(40, 400)));
        }
        if (!this.throughFlag) {
          p.push();
          p.translate((p.width) / 2, (p.height) / 2);
          if (this.countTFlag >= 7) {
            console.log('3ntro');
            p.image(this.imgOrigin, 0, 0);
          }
          p.pop();
          return;
        }

        // flow line
        this.flowLineImgs.forEach((v, i, arr) => {
          arr[i].pixels = this.flowLine(this.imgOrigin, v);
          if (arr[i].pixels) {
            this.replaceData(this.imgOrigin, arr[i].pixels);
          }
        });

        // shift line
        this.shiftLineImgs.forEach((v, i, arr) => {
          if (p.floor(p.random(100)) > 50) {
            arr[i] = this.shiftLine(this.imgOrigin);
            this.replaceData(this.imgOrigin, arr[i]);
          } else {
            if (arr[i]) {
              this.replaceData(this.imgOrigin, arr[i]);
            }
          }
        });

        // shift rgb
        this.shiftRGBs.forEach((v, i, arr) => {
          if (p.floor(p.random(100)) > 65) {
            arr[i] = this.shiftRGB(this.imgOrigin);
            this.replaceData(this.imgOrigin, arr[i]);
          }
        });

        p.push();
        p.translate((p.width) / 2, (p.height) / 2);
        p.image(this.imgOrigin, 0, 0);
        p.pop();

        // scat image
        this.scatImgs.forEach((obj) => {
          p.push();
          p.translate((p.width) / 2, (p.height) / 2);
          if (p.floor(p.random(100)) > 80) {
            obj.x = p.floor(p.random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
            obj.y = p.floor(p.random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
            obj.img = this.getRandomRectImg(this.imgOrigin);
          }
          if (obj.img) {
            p.image(obj.img, obj.x, obj.y);
          }
          p.pop();
        });

      };

    };

    p.wave = function (ypos, ampMax) {
      this.A = p.random(1, ampMax);   // wave amplitude
      this.frequency = p.random(0.0314, 0.1256);    // angular frequency
      this.time = 1.97;
      this.diameter = 10;
      this.radius = this.diameter / 2;
      this.phase = p.random(0.1, 0.6);
      this.phi = undefined;

      this.display = function () {
        p.strokeWeight(2);
        p.stroke(255, 90);
        p.push();
        p.translate(0, ypos);
        p.beginShape();

        for (let x = this.radius; x <= p.width - this.radius; x += this.diameter * 1.5) {
          this.phi = -x * this.phase;           // phase
          // p.vertex(x, this.A * p.map((p.sin(this.frequency * this.time + this.phi) + p.map(p.noise(x), 0, 1, -1, 1)), -2, 2, -1, 1));
          p.vertex(x, this.A * p.sin(this.frequency * this.time + this.phi));
        }

        p.endShape();
        p.pop();
        this.time += 1;
      };
    };

    p.glishear = function () {

        p.saveFrames('out', 'jpg', 0.2, 5, function (data) {
          p.loadImage(data[0].imageData, function(img) {
            p.glitchImage  = img ;
            p.glitchEffectObject = new p.glitch(p.glitchImage);
          });
        });

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
            this.p5.glishear();
            setTimeout(() => {
              this.router.navigate([route]);
            }, 6000);
          }, 200);

        }
      }, 100);
    }, 100);
  }

}
