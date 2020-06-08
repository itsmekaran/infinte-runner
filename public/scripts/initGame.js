class initGame extends Phaser.Scene {
    constructor() {
        super("Init Game");
    }

    preload() {
        // loading platform
        this.load.image("platform", "assets/images/platform.png");

        this.load.image("cloud", "assets/images/cloud.png");

        // loading spritesheet
        this.load.spritesheet("player", "assets/sprites/player.png", {
            frameWidth: 140,
            frameHeight: 180,
            spacing: 200,
            startFrame: 0,
            endFrame: 2,
            margin: 10,
        });
    }

    create() {
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 2,
            }),
            frameRate: 8,
            repeat: -1,
        });
        this.scene.start("Play Game");
    }
}
