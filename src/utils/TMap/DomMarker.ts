import { TMap } from './TMap';
type DomMarkerOptions = {
  map: any;
  position: any;
  dom: HTMLElement;
};
export class DomMarker extends TMap.DOMOverlay {
  constructor(options: DomMarkerOptions) {
    super(options);
  }
  onInit(options: DomMarkerOptions) {
    this.dom = options.dom;
    this.position = options.position;
  }
  onDestroy() {
    if (this.onClick) {
      this.dom.removeEventListener(this.onClick);
    }
  }
  createDOM() {
    // 点击事件监听
    this.onClick = () => this.emit('click');
    this.dom.addEventListener('click', () => this.emit('click'));
    this.dom.addEventListener('touch', () => this.emit('click'));
    return this.dom;
  }
  updateDOM() {
    if (!this.map) return;
    // 经纬度坐标转容器像素坐标
    const pixel = this.map.projectToContainer(this.position);
    // 使饼图中心点对齐经纬度坐标点
    const left = pixel.getX() - this.dom.clientWidth / 2 + 'px';
    const top = pixel.getY() - this.dom.clientHeight / 2 + 'px';
    this.dom.style.transform = `translate(${left}, ${top})`;
  }
}
