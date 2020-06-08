class gameplay extends Phaser.Scene {
    constructor() {
        super("Play Game");
    }

    create() {
        this.playerJumps = 0;
        this.nextPlatform;
        this.points = 0;
        // adding score text
        this.scoreText = this.add.text(300, 10, "Total Score: " + this.points);

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.points++;
                this.scoreText.setText("Total Score: " + this.points);
            },
            loop: true,
        });

        this.addClouds(); // add static clouds

        this.platformGroup = this.add.group();

        this.addPlatform(800, 0);
        // adding the player;
        this.player = this.physics.add.sprite(
            gameOption.playerStartPosition,
            game.config.height * 0.3,
            "player"
        );
        this.player.setScale(0.35);
        this.player.setGravityY(gameOption.playerGravity);
        this.player.setDepth(2);

        this.platformCollider = this.physics.add.collider(
            this.player,
            this.platformGroup,
            function () {
                if (!this.player.anims.isPlaying) {
                    this.player.anims.play("run");
                }
            },
            null,
            this
        );
        this.input.on("pointerdown", this.makeJump, this);
    }

    // adding clouds
    addClouds() {
        let cloud = this.physics.add.sprite(200, 50, "cloud");
        cloud.setScale(0.3);
        cloud = this.physics.add.sprite(550, 50, "cloud");
        cloud.setScale(0.2);
    }

    // adding platforms
    addPlatform(width, posX) {
        let platform = this.add
            .tileSprite(posX, game.config.height - 100, width, 100, "platform")
            .setOrigin(0);
        this.physics.add.existing(platform);
        platform.body.setImmovable(true);
        platform.body.setVelocityX(-200);
        platform.setDepth(3);
        this.platformGroup.add(platform);
        this.nextPlatform = Phaser.Math.Between(50, 200);
    }

    // jump
    makeJump() {
        if (this.player.body.touching.down) {
            this.playerJumps = 0;
        }
        if (this.playerJumps < gameOption.maxJumps) {
            this.player.setVelocityY(gameOption.jumpForce * -1);
            this.player.anims.stop();
            this.playerJumps++;
        }
    }

    // this logic runs with every tick
    update() {
        if (this.player.y > game.config.height) {
            this.scene.start("Play Game");
        }

        this.player.x = gameOption.playerStartPosition;

        let minDistance = game.config.width;
        let rightMostPlatform = 0;
        this.platformGroup.getChildren().forEach((platform, i) => {
            let distance = game.config.width - (platform.x + platform.width); // get distance of rightmost platform from screen
            if (distance <= minDistance) {
                rightMostPlatform = platform;
            }
            if (platform.x + platform.width < 0) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        });

        // adding new platforms
        if (
            rightMostPlatform.x + rightMostPlatform.width <
            game.config.width - this.nextPlatform
        ) {
            this.addPlatform(
                Phaser.Math.Between(50, 300),
                rightMostPlatform.x +
                    rightMostPlatform.width +
                    this.nextPlatform
            );
        }
    }
}
