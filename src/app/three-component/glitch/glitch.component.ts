import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/EffectComposer';
import 'imports-loader?THREE=three!three/examples/js/shaders/CopyShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/FilmShader';
import 'imports-loader?THREE=three!three/examples/js/shaders/DigitalGlitch';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/RenderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/ShaderPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/FilmPass';
import 'imports-loader?THREE=three!three/examples/js/postprocessing/GlitchPass';


@Component({
  selector: 'app-glitch',
  templateUrl: './glitch.component.html',
  styleUrls: ['./glitch.component.css']
})
export class GlitchComponent implements OnInit, AfterViewInit {

  @ViewChild('glitchContainer')
  private rendererContainer: ElementRef;

  private get renderContainer(): HTMLCanvasElement {
    return this.rendererContainer.nativeElement;
  }

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  composerin: THREE.EffectComposer;
  renderPass: THREE.RenderPass;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
  }

  constructor() { }

  ngOnInit() {
    this.scene = new THREE.Scene;
  }

  ngAfterViewInit(): void {
    this.initRenderer();
    this.createCamera();
    this.createLights();
    this.createCube();
    this.shadering();
    this.renderLoop();
  }

  private initRenderer() {
    this.renderer =  new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.renderer.setClearColor(new THREE.Color('rgb(38,50,56)'), 0);
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderContainer.appendChild(this.renderer.domElement);
  }

  private createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 1, 3000);
    this.camera.position.z = 500;
  }

  private getAspectRatio() {
    return this.renderContainer.clientWidth / this.renderContainer.clientHeight;
  }

  private shadering() {
    this.composerin = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composerin.addPass(this.renderPass);
    const passOne = new THREE.FilmPass(64);
    this.composerin.addPass(passOne);


    const passTwo = new (THREE as any).GlitchPass(64);
    this.composerin.addPass(passTwo);
    passTwo.renderToScreen = true;
  //  passOne.enabled = true;
  //  passTwo.goWild = false;
  }


  private renderLoop() {
    requestAnimationFrame(() => this.renderLoop());
    this.composerin.render();
    // this.renderer.render(this.scene, this.camera);
    this.animateCube();
  }

  private createLights() {
    const ambient = new THREE.AmbientLight( 0xffffff, 1);
    this.scene.add(ambient);
    const hemis = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5 );
    this.scene.add(hemis);
    const point = new THREE.PointLight( 0xffffff, 2);
    point.position.z = 400;
    this.scene.add(point);
  }

  private createCube() {
    const geometry = new THREE.BoxGeometry(300, 300, 300);
    const material =  new THREE.MeshStandardMaterial({color: new THREE.Color('rgb(90, 98, 102)'), roughness: 0.6, metalness: 0.9}) ;
    this.mesh = new THREE.Mesh(geometry, material);
    // this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }



  private animateCube() {
    this.mesh.rotation.x += 0.002;
    this.mesh.rotation.y += 0.004;
  }

}
