//this game will have only 1 state
var GameState = {
    
    init:function(){
        //Scalable Game.
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 600;
    },
    preload:function(){
        //Load all our assests
        this.load.image('ground','assets/images/ground.png');
        this.load.image('platform','assets/images/platform.png');
        this.load.image('goal','assets/images/gorilla3.png');
        this.load.image('barrel','assets/images/barrel.png');
        this.load.image('background','assets/images/background2.png');
        
        this.load.spritesheet('player','assets/images/player_spritesheet.png',28,30,5,1,1);
        this.load.spritesheet('fire','assets/images/fire_spritesheet.png',20,21,2,1,1);
    },
    create:function(){
        this.background = this.add.sprite(0,0,'background');
        this.game.world.setBounds(0,0,360,600);
        //this.platform = this.add.sprite(0,300,'platform');
        //this.game.physics.arcade.enable(this.platform);
        //this.platform.body.allowGravity = false;
        
        var platformData = [
            {"x":0,"y":430},
            {"x":45, "y":560},
            {"x":90,"y":260},
            {"x":0,"y":140},
        ];
        
        this.platformGroup = this.add.group();
        this.platformGroup.enableBody = true;
        
        for(i=0;i<4;i++){
            this.platformGroup.create(platformData[i].x,platformData[i].y,'platform');
            this.platformGroup.setAll('body.immovable',true);
            this.platformGroup.setAll('body.allowGravity',false);
        }
        
        
        this.ground = this.add.sprite(0,520,'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        
        this.player = this.add.sprite(100,200,'player',3);
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('movement',[0,1,2,1],6,true);
        this.player.play('movement');
        this.game.camera.follow(this.player);
    },
    update:function(){
        this.game.physics.arcade.collide(this.player,this.ground);
        this.game.physics.arcade.collide(this.player,this.platformGroup);
        //this.game.physics.arcade.overlap(this.player,this.platform,this.landed);
        
        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1,1);
        }
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        }      
    },
    
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');

