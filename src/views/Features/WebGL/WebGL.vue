<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Scene,
  DirectionalLight,
  AmbientLight,
  PlaneGeometry,
  MeshPhongMaterial,
  Mesh,
  AnimationMixer,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  Vector2,
  Vector3,
  Raycaster,
} from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import soldierUrl from '@/assets/model/Soldier.glb?url';

const renderRef = ref<HTMLDivElement>();
onMounted(() => {
  const renderDom = renderRef.value;
  if (!renderDom) return;
  // 判断是否支持WebGL
  if (WebGL.isWebGLAvailable()) {
    // 场景 ----------------------------------------------------------------------------------------------------
    const scene = new Scene();
    // 光源
    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(-1, 1, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.near = -10;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.mapSize.height = 1024 * 2;
    directionalLight.shadow.mapSize.width = 1024 * 2;
    const ambientLight = new AmbientLight(0xffffff, 0.1);
    scene.add(directionalLight, ambientLight);
    // 导入模型
    const loader = new GLTFLoader();
    loader.load(
      soldierUrl,
      (gltf) => {
        const model = gltf.scene;
        const character = gltf.scene.getObjectByName('Character');
        if (!character) return;
        scene.add(model);
        // 模型阴影
        character.traverse((obj) => {
          if ((obj as any).isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        // 模型动画
        const mixer = new AnimationMixer(model);
        const clips = gltf.animations;
        const [idleClip, runClip] = clips;
        const idleAction = mixer.clipAction(idleClip),
          runAction = mixer.clipAction(runClip);
        const actions = { idle: idleAction, run: runAction };
        Object.values(actions).forEach((action) => action.play());
        runAction.setEffectiveWeight(0);
        // 动画切换
        let isRunning = false;
        renderDom.addEventListener('mousedown', (event) => {
          if (event.button == 0) {
            isRunning = true;
          }
        });
        renderDom.addEventListener('mouseup', (event) => {
          if (event.button == 0) {
            isRunning = false;
          }
        });
        // 模型方向对齐相机
        controls.addEventListener('change', () => {
          character.rotation.set(
            1.5 * Math.PI,
            0,
            controls.getAzimuthalAngle(),
          );
        });
        // 模型更新
        const clock = new Clock();
        function updateModel() {
          const deltaT = clock.getDelta();
          mixer.update(deltaT);
          const idleWeight = actions?.idle.weight;
          const runWeight = actions?.run.weight;
          if (idleWeight < 1 && !isRunning) {
            actions.run.setEffectiveWeight(runWeight - deltaT * 3);
            actions.idle.setEffectiveWeight(idleWeight + deltaT * 3);
          }
          if (runWeight < 1 && isRunning) {
            actions.run.setEffectiveWeight(runWeight + deltaT * 2);
            actions.idle.setEffectiveWeight(idleWeight - deltaT * 2);
          }
          if (isRunning) {
            const runSpeedRate = 8;
            // 1. 获取相机角度
            const angle = controls.getAzimuthalAngle();
            // 2. 改变模型和相机坐标
            model.position.x -= Math.sin(angle) * deltaT * runSpeedRate;
            model.position.z -= Math.cos(angle) * deltaT * runSpeedRate;
            camera.position.x -= Math.sin(angle) * deltaT * runSpeedRate;
            camera.position.z -= Math.cos(angle) * deltaT * runSpeedRate;
            // 3. 设置相机指向
            controls.target = new Vector3(
              model.position.x,
              2,
              model.position.z,
            );
          }
          requestAnimationFrame(updateModel);
        }
        updateModel();
      },
      (loding) => {
        console.log(
          '加载进度',
          ((loding.loaded / loding.total) * 100).toFixed(2),
        );
      },
      console.error,
    );
    // 添加地面
    const planeGeometry = new PlaneGeometry(10, 10);
    planeGeometry.rotateX((270 * Math.PI) / 180);
    const planeMaterial = new MeshPhongMaterial({ color: 0xffffff });
    const floorMat = new Mesh(planeGeometry, planeMaterial);
    floorMat.receiveShadow = true;
    scene.add(floorMat);
    // 相机 ----------------------------------------------------------------------------------------------------
    const camera = new PerspectiveCamera(
      75,
      renderDom.clientWidth / renderDom.clientHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 2, 1.5);
    // 渲染器 ----------------------------------------------------------------------------------------------------
    const renderer = new WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(renderDom.clientWidth, renderDom.clientHeight);
    renderDom.appendChild(renderer.domElement);
    // 后处理
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // 创建OutlinePass通道
    const v2 = new Vector2(renderDom.clientWidth, renderDom.clientWidth);
    const outlinePass = new OutlinePass(v2, scene, camera);
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.edgeThickness = 4;
    outlinePass.edgeStrength = 6;
    composer.addPass(outlinePass);
    const updateRenderer = () => {
      composer.render();
      requestAnimationFrame(updateRenderer);
    };
    updateRenderer();
    // 补充 ----------------------------------------------------------------------------------------------------
    // 自适应窗口大小变化
    window.addEventListener('resize', () => {
      camera.aspect = renderDom.clientWidth / renderDom.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(renderDom.clientWidth, renderDom.clientHeight);
    });
    // 创建控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new Vector3(0, 2, 0);
    controls.enablePan = false;
    const updateControls = () => {
      requestAnimationFrame(updateControls);
      controls.update();
    };
    updateControls();
    // 鼠标右键点击时窗口中心点选中对象外发光
    const raycaster = new Raycaster();
    renderDom.addEventListener('mousedown', (event) => {
      if (event.button != 2) return;
      raycaster.setFromCamera(new Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects[0]) {
        outlinePass.selectedObjects = [intersects[0].object];
      }
    });
  } else {
    alert('您的浏览器不支持WebGL');
  }
});
</script>

<template>
  <div ref="renderRef" class="w-full h-full overflow-hidden"></div>
  <span class="cross-hair"></span>
</template>
<style lang="scss" scoped>
.cross-hair {
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
  }

  &::before {
    height: 20px;
    width: 2px;
  }

  &::after {
    height: 2px;
    width: 20px;
  }
}
</style>
