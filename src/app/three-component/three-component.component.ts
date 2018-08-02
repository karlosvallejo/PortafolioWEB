import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import 'imports-loader?THREE=three!three/examples/js/loaders/GLTFLoader';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/EffectComposer';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/RenderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/ShaderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/FilmPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/GlitchPass';
import 'imports-loader?THREE=three!three/examples/js/shaders/CopyShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/FilmShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/RGBShiftShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/DigitalGlitch';
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
  GLloader: any;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  meshObject: THREE.Object3D;
  GLObject: THREE.Scene;
  composer: THREE.EffectComposer;
  renderPass: THREE.RenderPass;
  passOne: THREE.ShaderPass;
  passTwo: any;
  passThree: THREE.FilmPass;
  clock: THREE.Clock;
  visibleObjects: boolean;
  theta = 0;
  rotarionDirection = 0;


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

          this.meshObject.visible = false;
          this.visibleObjects = true;
          if (this.GLObject) {
            this.GLObject.visible = true;
          }
          this.renderer.setClearColor(new THREE.Color('rgb(33,33,33)'), 1);
         break;

        case 'endLoading':
         this.meshObject.visible = false;
          this.visibleObjects = false;
         if (this.GLObject) {
           this.GLObject.visible = false;
         }
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
    this.importLogo();
    this.shadering();
    this.renderLoop();
  }

  private initRenderer() {
    this.renderer =  new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
   // this.renderer.setClearColor(new THREE.Color('rgb(38,50,56)'), 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderContainer.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock;
    this.GLloader = new (THREE as any).GLTFLoader();
  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(30, this.getAspectRatio(), 1, 3000);
    this.camera.position.z = 170;
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
    const ambient = new THREE.AmbientLight( 0xffffff, 0.2);
    this.scene.add(ambient);
    const hemis = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.4 );
    this.scene.add(hemis);
    const point = new THREE.PointLight( 0xffffff, 0.1);
    point.position.z = 100;
    point.castShadow = true;
    point.shadow.mapSize.width = 1024;
    point.shadow.mapSize.height = 1024;
    this.scene.add(point);
    const pointTwo = new THREE.PointLight( 0xffffff, 0.2);
    pointTwo.position.z = 150;
    pointTwo.position.y = 20;
    pointTwo.castShadow = true;
    pointTwo.shadow.mapSize.width = 1024;
    pointTwo.shadow.mapSize.height = 1024;
    this.scene.add(pointTwo);
    const spot = new THREE.SpotLight(0xffffff, 5, 200, 60, 0.6, 1.5);
    spot.position.set( 100, 30, 120 );
    spot.castShadow = true;
    spot.shadow.mapSize.width = 2048;
    spot.shadow.mapSize.height = 2048;
    this.scene.add(spot);
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material =  new THREE.MeshStandardMaterial({color: new THREE.Color('rgb(90, 98, 102)'), roughness: 0.6, metalness: 0.9}) ;
    const mesh = new THREE.Mesh(geometry, material);
    this.meshObject = new THREE.Object3D();
    this.meshObject.add(mesh);
    // this.mesh.castShadow = true;
    this.scene.add(this.meshObject);
  }

  importLogo() {
// Load a glTF resource
    this.GLloader.load(
      // resource URL
      'assets/model/logo3d.gltf',
      // called when the resource is loaded
       ( gltf ) =>  {
         gltf.scene.traverse( function( node ) {

           if ( node.isMesh ) {
           //  node.material.color = new THREE.Color('rgb(90, 98, 102)');
             node.material.roughness = 0.6;
             node.material.metalness = 0.5;
             node.castShadow = true;
             node.receiveShadow = true;
           }
         } );
        this.GLObject = gltf.scene;
        if (this.visibleObjects) {
          this.GLObject.visible = true;
        } else {
          this.GLObject.visible = false;
        }
        this.scene.add( gltf.scene );




      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' + error );

      }
    );
  }

  private animateCube() {
    this.meshObject.rotation.x += 0.002;
    this.meshObject.rotation.y += 0.004;
    if (this.GLObject) {

      this.theta += 0.3;
      this.GLObject.rotation.y =  Math.sin(THREE.Math.degToRad(this.theta)) * 0.8;

    }
  }

  private shadering() {
    this.composer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.passOne =  new THREE.ShaderPass(THREE.RGBShiftShader);
    this.passOne.uniforms['amount'].value = 0.0015;
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

    this.passThree = new THREE.FilmPass(10, 1, 1400, false);
    this.composer.addPass(this.passThree);
    this.passThree.renderToScreen = true;


  }

}
