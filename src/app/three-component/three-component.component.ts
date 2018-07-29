import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/EffectComposer';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/RenderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/ShaderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/FilmPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/GlitchPass';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-three-component',
  templateUrl: './three-component.component.html',
  styleUrls: ['./three-component.component.css']
})
export class ThreeComponentComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer')
  private rendererContainer: ElementRef;

  private get renderContainer(): HTMLCanvasElement {
    return this.rendererContainer.nativeElement;
  }

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  meshObject: THREE.Object3D;
  composer: THREE.EffectComposer;
  renderPass: THREE.RenderPass;
  passOne: THREE.FilmPass;
  passTwo: any;
  clock: THREE.Clock;


  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
  }

  constructor(private service: EventsService) {
  }

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.service.events$.subscribe((event: string) => {
      console.log(event);
      switch (event) {
        case 'Wild':
          this.passTwo.goWild = true;
          break;

        case 'noWild':
          this.passTwo.goWild = false;
          break;

        case 'loading':

          this.meshObject.visible = true;
          this.renderer.setClearColor(new THREE.Color('rgb(33,33,33)'), 1);
         break;

        case 'endLoading':
         this.meshObject.visible = false;
          this.renderer.setClearColor(new THREE.Color('rgb(150,150,180)'), 0.2);
        break;
      }
    });
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.createCamera();
    this.createLights();
    this.createCube();
    this.shadering();
    this.renderLoop();
  }

  private initRenderer() {
    this.renderer =  new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
   // this.renderer.setClearColor(new THREE.Color('rgb(38,50,56)'), 0);
   // this.renderer.shadowMap.enabled = true;
   // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderContainer.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock;
  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 1, 3000);
    this.camera.position.z = 500;
  }

  private getAspectRatio() {
    return this.renderContainer.clientWidth / this.renderContainer.clientHeight;
  }

  private renderLoop() {
    requestAnimationFrame(() => this.renderLoop());
    // this.passOne.uniforms['time'].value = (this.clock.getDelta()) * 100;
    this.composer.render(this.clock.getDelta());
    // this.renderer.render(this.scene, this.camera);
    this.animateCube();
  }

  createLights() {
    const ambient = new THREE.AmbientLight( 0xffffff, 1);
    this.scene.add(ambient);
    const hemis = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5 );
    this.scene.add(hemis);
    const point = new THREE.PointLight( 0xffffff, 2);
    point.position.z = 400;
    this.scene.add(point);
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(300, 300, 300);
    const material =  new THREE.MeshStandardMaterial({color: new THREE.Color('rgb(90, 98, 102)'), roughness: 0.6, metalness: 0.9}) ;
    const mesh = new THREE.Mesh(geometry, material);
    this.meshObject = new THREE.Object3D();
    this.meshObject.add(mesh);
    // this.mesh.castShadow = true;
    this.scene.add(this.meshObject);
  }


  private animateCube() {
    this.meshObject.rotation.x += 0.002;
    this.meshObject.rotation.y += 0.004;
  }

  private shadering() {
    this.composer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.passOne = new THREE.FilmPass(1, 0.7, 2731, false);
    this.composer.addPass(this.passOne);

    /*
    this.passOne = new THREE.ShaderPass((THREE as any).FilmShader);
    this.passOne.uniforms['time'].value = 0;
    this.passOne.uniforms['nIntensity'].value = 1;
    this.passOne.uniforms['sIntensity'].value = 0.65;
    this.passOne.uniforms['sCount'].value = 3096;
    this.passOne.uniforms['grayscale'].value = 0.5;
    this.composer.addPass(this.passOne);
    */

    this.passTwo = new (THREE as any).GlitchPass(64);
    this.composer.addPass(this.passTwo);
    this.passTwo.renderToScreen = true;
    this.passOne.enabled = true;
    this.passTwo.enabled = true;
   // this.passTwo.goWild = false;


  }

}
