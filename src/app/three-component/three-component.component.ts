import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../services/events.service';
import * as THREE from 'three';
import 'imports-loader?THREE=three!./shaders/StaticShader';
import 'imports-loader?THREE=three!three/examples/js/loaders/GLTFLoader';
import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/EffectComposer';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/RenderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/ShaderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/FilmPass';
import 'imports-loader?THREE=three!../../../src/app/three-component/shaders/GlitchPass';
import 'imports-loader?THREE=three!three/examples/js/shaders/CopyShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/FilmShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/RGBShiftShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/DigitalGlitch';



@Component({
  selector: 'app-three-component',
  templateUrl: './three-component.component.html',
  styleUrls: ['./three-component.component.css']
})
export class ThreeComponentComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer')
  private rendererContainer: ElementRef;

  @ViewChild('threeHTMLcontainer')
  private threeHTMLcontainer: ElementRef;

  private get renderContainer(): HTMLCanvasElement {
    return this.rendererContainer.nativeElement;
  }
  GLloader: any;
  controls: THREE.OrbitControls;
  lightHelper: THREE.SpotLightHelper;
  lightHelperTwo: THREE.SpotLightHelper;
  pointHelper: THREE.PointLightHelper;
  shadowCameraHelper: THREE.CameraHelper;
  // stats: any;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
 // meshObject: THREE.Object3D;
  GLObject: THREE.Scene;
  composer: THREE.EffectComposer;
  renderPass: THREE.RenderPass;
  passOne:  THREE.FilmPass;
  passTwo: THREE.ShaderPass;
  passThree: THREE.ShaderPass;
  passFour: any;
  clock: THREE.Clock;
  deltaClock = 0;
  interval = 1 / 60;
  visibleObjects: boolean;
  theta = 0;


  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.renderContainer.style.width = '100%';
    this.renderContainer.style.height = '100%';
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
  }

  constructor(private service: EventsService) {
  }

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.service.events$.subscribe((event: string) => {
      // console.log(event);
      switch (event) {
        case 'Wild':
          this.passFour.goWild = true;
          break;

        case 'noWild':
          this.passFour.goWild = false;
          break;

        case 'loading':


          this.visibleObjects = true;
          if (this.GLObject) {
            this.GLObject.visible = true;
          } else {
         //   this.meshObject.visible = true;
          }
          this.passThree.uniforms[ 'amount' ].value = 0.15;
          this.passThree.uniforms[ 'size' ].value = 3;
          this.renderer.setClearColor(new THREE.Color('rgb(13,17,19)'), 1);
         break;

        case 'endLoading':
          this.visibleObjects = false;
        //  this.meshObject.visible = false;
         if (this.GLObject) {
           this.GLObject.visible = false;
         }
          this.passThree.uniforms[ 'amount' ].value = 0.1;
          this.passThree.uniforms[ 'size' ].value = 3;
          this.renderer.setClearColor(new THREE.Color('rgb(127,127,130)'), 0.2);
        break;
      }
    });
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.createCamera();
    this.createLights();
   // this.createCube();
    this.importLogo();
    this.shadering();
    this.initRenderLoop();
  }

  private initRenderer() {
    this.renderer =  new THREE.WebGLRenderer({canvas: this.renderContainer, antialias: false, alpha: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(new THREE.Color('rgb(20,20,20)'), 1);
    // this.renderer.toneMapping = THREE.ReinhardToneMapping;
    // this.renderer.toneMappingExposure = Math.pow( 1.5, 5.0 ); // to allow for very bright scenes.
    this.renderer.gammaOutput = true;
    this.renderer.gammaInput = true;
    // this.renderContainer.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock;
    // @ts-ignore
    this.GLloader = new THREE.GLTFLoader();
    // this.stats = new ThreeStats();
    // this.threeHTMLcontainer.nativeElement.appendChild(this.stats.domElement);
  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(30, this.getAspectRatio(), 10, 5000);
    this.camera.position.z = 160;

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );


  }

  private getAspectRatio() {
    return this.renderContainer.clientWidth / this.renderContainer.clientHeight;
  }

  private initRenderLoop() {
    requestAnimationFrame(this.loop());
  }

  private loop(): FrameRequestCallback {
    return () => {
      requestAnimationFrame(this.loop());
      this.deltaClock += this.clock.getDelta();
      if (this.deltaClock > this.interval) {
        /*
        this.passTwo.uniforms['time'].value = (this.clock.getDelta()) * 100;
        this.composer.render();
        */
        this.passThree.uniforms['time'].value = this.deltaClock;
        // this.stats.begin();
        this.composer.render(this.deltaClock);

        // this.renderer.render(this.scene, this.camera);
        // this.stats.end();
        this.animateCube(this.deltaClock);
        this.deltaClock = this.deltaClock % this.interval;
      }
    };
  }

  createLights() {
     /*
     const ambient = new THREE.AmbientLight( 0xffffff, 99999);
     this.scene.add(ambient);
     */
    /*
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(0, 0, 1);
    this.scene.add( directionalLight );
    */


   // const hemis = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );

  //  this.scene.add(hemis);

    /*
    const point = new THREE.PointLight( 0xffffff, 0.5);
    point.position.z = 100;
    point.castShadow = true;
    point.shadow.mapSize.width = 1024;
    point.shadow.mapSize.height = 1024;
    this.scene.add(point);
    */



    const pointTwo = new THREE.PointLight(0xffffff, 1, 200, 2);
    pointTwo.position.set(0, 50, 70);
    pointTwo.power = 5000;
    pointTwo.castShadow = true;
    // pointTwo.shadow.mapSize.width = 512;
    // pointTwo.shadow.mapSize.height = 512;
    this.scene.add(pointTwo);



    const spot = new THREE.SpotLight(0xffffff, 1, 200, Math.PI / 6, 0.5, 2);
    spot.position.set( 60, -50, 60 );
    spot.power = 15000;
    spot.castShadow = true;
    // spot.shadow.mapSize.width = 512;
    // spot.shadow.mapSize.height = 512;
    this.scene.add(spot);

    const spotTwo = new THREE.SpotLight(0xffffff, 1, 200, Math.PI / 6, 0.5, 2);
    spotTwo.position.set( -60, -50, 60 );
    spotTwo.power = 15000;
    spotTwo.castShadow = true;
    // spotTwo.shadow.mapSize.width = 512;
    // spotTwo.shadow.mapSize.height = 512;
    this.scene.add(spotTwo);

    /*
    this.lightHelper = new THREE.SpotLightHelper( spot );
    this.scene.add( this.lightHelper );
    this.lightHelperTwo = new THREE.SpotLightHelper( spotTwo );
    this.scene.add( this.lightHelperTwo );
    this.pointHelper = new THREE.PointLightHelper (pointTwo);
    this.scene.add( this.pointHelper );
    */
  }

  /*

  createCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material =  new THREE.MeshStandardMaterial({color: new THREE.Color('rgb(90, 98, 102)'), roughness: 0.6, metalness: 0.9}) ;
    const mesh = new THREE.Mesh(geometry, material);
    this.meshObject = new THREE.Object3D();
    this.meshObject.add(mesh);
    // this.mesh.castShadow = true;
    this.scene.add(this.meshObject);
  }
*/
  importLogo() {

// Load a glTF resource
 //   const textureLoader = new THREE.TextureLoader();

    // env map
    const path = 'assets/textures/cube/Park3Med/';
    const format = '.jpg';
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
    const reflectionCube = new THREE.CubeTextureLoader().load( urls );


    this.GLloader.load(
      // resource URL
      'assets/model/test/logo3d.gltf',
      // called when the resource is loaded
       ( gltf ) =>  {
   //      gltf.scene.children[3].material.displacementMap = displacementMapa;
   //     gltf.scene.children[3].material.displacementScale = 5;
   //      gltf.scene.children[3].material.displacementBias = -4.4;
  // gltf.scene.children[2].material =  new THREE.MeshPhongMaterial( { color: 0xccfffd, envMap: reflectionCube, refractionRatio: 0.985 } );

         gltf.scene.traverse( function( node ) {

           if ( node.isMesh ) {
           //  node.material.color = new THREE.Color('rgb(90, 98, 102)');

           //  node.material.roughness = node.material.roughness * 1.1;

           //  node.material.metalness = node.material.metalness * 0.8;
           //  node.material.roughness = 0.5;
           //  node.material.metalness = 0.5;

             node.material.envMap = reflectionCube;
             node.material.envMapIntensity = 1;


             node.castShadow = true;
             node.receiveShadow = true;
           }
         } );

        this.GLObject = gltf.scene;
      //  this.meshObject.visible = false;

        this.GLObject.visible = this.visibleObjects;

        this.scene.add( gltf.scene );




      },
      // called while loading is progressing
      function ( xhr ) {

       // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' + error );

      }
    );
  }

  private animateCube(deltaTime: number) {
  //  this.meshObject.rotation.x += 0.002;
  //  this.meshObject.rotation.y += 0.004;
    if (this.GLObject) {

      this.theta += 20 * deltaTime;
      this.GLObject.rotation.y =  Math.sin(THREE.Math.degToRad(this.theta)) * 0.4;

    }
  }

  private shadering() {
    this.composer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);


    this.passOne = new THREE.FilmPass(10, 1, 1500, true);
    this.composer.addPass(this.passOne);



    /*
    // @ts-ignore
    this.passTwo = new THREE.ShaderPass(THREE.FilmShader);
    this.passTwo.uniforms['time'].value = 0;
    this.passTwo.uniforms['nIntensity'].value = 1;
    this.passTwo.uniforms['sIntensity'].value = 0.65;
    this.passTwo.uniforms['sCount'].value = 3096;
    this.passTwo.uniforms['grayscale'].value = false;
    this.composer.addPass(this.passTwo);
    */

    this.passTwo =  new THREE.ShaderPass(THREE.RGBShiftShader);
    this.passTwo.uniforms['amount'].value = 0.0015;
    this.composer.addPass(this.passTwo);


    // @ts-ignore
    this.passThree = new THREE.ShaderPass( THREE.StaticShader );
    this.passThree.uniforms[ 'amount' ].value = 0.15;
    this.passThree.uniforms[ 'size' ].value = 3;
    this.composer.addPass(this.passThree);

    // @ts-ignore
    this.passFour = new THREE.GlitchPass();
    this.composer.addPass(this.passFour);
    this.passOne.enabled = true;
    this.passTwo.enabled = true;
    this.passThree.enabled = true;
    this.passFour.enabled = true;
    this.passFour.renderToScreen = true;


  }

}
