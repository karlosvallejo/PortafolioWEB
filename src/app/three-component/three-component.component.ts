import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

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
  mesh: THREE.Mesh;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
  }

  constructor() {
  }

  ngOnInit() {
    this.scene = new THREE.Scene();
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.createCamera();
    this.createLights();
    this.createCube();
    this.renderLoop();
  }

  private initRenderer() {
    this.renderer =  new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    this.renderer.setClearColor(new THREE.Color('rgb(38,50,56)'), 1);
   // this.renderer.shadowMap.enabled = true;
   // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderContainer.appendChild(this.renderer.domElement);

  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 1, 3000);
    this.camera.position.z = 500;
  }

  private getAspectRatio() {
    return this.renderContainer.clientWidth / this.renderContainer.clientHeight;
  }

  private renderLoop() {
    window.requestAnimationFrame(() => this.renderLoop());
    this.renderer.render(this.scene, this.camera);
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
    this.mesh = new THREE.Mesh(geometry, material);
    // this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }


  private animateCube() {
    this.mesh.rotation.x += 0.002;
    this.mesh.rotation.y += 0.004;
  }

}
