import { Text } from "./text.js";
import { Particles } from "./particles.js"

export class Visual {
    constructor() {
        this.text = new Text();
        this.texture = PIXI.Texture.from('particles.png');
        this.particles = [];
        this.pointer = {
            x: 0,
            y: 0,
            radius: 30,
        };
        document.addEventListener('pointermove', this.onMove.bind(this), false);
    }

    onMove(e) {
        this.pointer.x = e.clientX;
        this.pointer.y = e.clientY;
    }

    show(stageWidth, stageHeight, stage) {
        if (this.container) stage.removeChild(this.container);

        this.pos = this.text.setText('S T Y L E S !', 2, stageWidth, stageHeight);
        console.log(this.pos);

        this.container = new PIXI.ParticleContainer(
            this.pos.length, {
                vertices: false,
                position: true,
                rotaion: false,
                scale: false,
                uvs: false,
                tint: false
            });
        stage.addChild(this.container);

        this.particles = [];
        for (let i = 0; i < this.pos.length; i++) {
            const item = new Particles(this.pos[i], this.texture);
            this.container.addChild(item.sprite);
            this.particles.push(item);
        }
    }

    animate() {
        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];
            const dx = this.pointer.x - item.x;
            const dy = this.pointer.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = item.radius + this.pointer.radius;

            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * minDist;
                const ty = item.y + Math.sin(angle) * minDist;
                const ax = tx - this.pointer.x;
                const ay = ty - this.pointer.y;
                item.vx -= ax;
                item.vy -= ay;
                /*document.addEventListener('click', function() {
                    document.location.href += "/menu";
                });*/
            }
            item.draw();
        }
    }
}