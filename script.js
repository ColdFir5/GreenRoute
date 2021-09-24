var Car;

function preload() {
  EnergyTank10 = loadImage("/Assets/EnergyTank/10.png");
  EnergyTank09 = loadImage("/Assets/EnergyTank/9.png");
  EnergyTank08 = loadImage("/Assets/EnergyTank/8.png");
  EnergyTank07 = loadImage("/Assets/EnergyTank/7.png");
  EnergyTank06 = loadImage("/Assets/EnergyTank/6.png");
  EnergyTank05 = loadImage("/Assets/EnergyTank/5.png");
  EnergyTank04 = loadImage("/Assets/EnergyTank/4.png");
  EnergyTank03 = loadImage("/Assets/EnergyTank/3.png");
  EnergyTank02 = loadImage("/Assets/EnergyTank/2.png");

  Chewy = loadFont("/Assets/Chewy-Regular.ttf");

  LevelSelectImg = loadImage("/Assets/Screens/Level.png");
  MenuImg = loadImage("/Assets/Screens/Menu.png");
  TitleImg = loadImage("/Assets/Screens/Title.png");
  CustomisationMenuImg = loadImage("/Assets/Screens/Customisation.png");

  LevelOneImg = loadImage("/Assets/Screens/LevelOne.png");
  PowerUpImg = loadImage("/Assets/PowerUp.png");
  CO2BarImg = loadImage("Assets/emptybar.png");
  SmokeImg = loadImage("Assets/smoke.png");
  TwoStar = loadImage("/Assets/Screens/Lvl1Cleared2.png");
  ThreeStar = loadImage("/Assets/Screens/Lvl1Cleared3.png");

  MenuBtnImg = loadImage("/Assets/Hamburger.png");
  ButtonImg = loadImage("/Assets/Button.png");
  BackBtnImg = loadImage("/Assets/back.png");

  LevelCircle = loadImage("/Assets/Circle.png");
  LevelCircleG = loadImage("/Assets/CircleG.png");
  LevelCircleY = loadImage("/Assets/CircleY.png");

  RadioBtnImg = loadImage("/Assets/radiobtn.png");

  Car1 = loadImage("/Assets/Cars/car1.png");
  Car2 = loadImage("/Assets/Cars/car2.png");
  Car3 = loadImage("/Assets/Cars/car3.png");

  ZeroStarCompleteImg = loadImage("/Assets/Stars0.png");
  TwoStarCompleteImg = loadImage("/Assets/Stars2.png");
  ThreeStarCompleteImg = loadImage("/Assets/Stars3.png");

  Pink = loadImage("/Assets/pink.png");
  Yellow = loadImage("/Assets/yellow.png");
  Blue = loadImage("/Assets/blue.png");
}

function setup() {
  createCanvas(502, 856);
  GameMode = 0;
  SpawnOnce = false;
  LevelOneComplete = false;
  SpawnMenu = false;
  ClearedMenu = false;
  SpawnMenuC = false;
  Settings = false;
  Customisation = false;
  Stars = 0;
  Moves = 0;
  Pollution = 0;
  Lvl1Completion = 0;
  Path = "None";
  Skin = "Default";

  TitleScreen = new Group();
  SettingMenu = new Group();
  CustomisationMenu = new Group();
  UI = new Group();
  LevelSelect = new Group();
  LevelOne = new Group();

  TOPWAY = new Group();
  BOTTOMWAY = new Group();

  Car1.resize(100,80);
  Car2.resize(100,80);
  Car3.resize(100,80);

  ZeroStarCompleteImg.resize(100,38);
  TwoStarCompleteImg.resize(100,38);
  ThreeStarCompleteImg.resize(100,38);
}

function draw() {
  background(0);
  textFont(Chewy);

  //Title Page
  if(GameMode == 0) {
    background(TitleImg);

    if(!SpawnOnce) {
      ClickToPlay = createSprite(width/2+110,height/2+110,200,100);
      ClickToPlay.visible = 0;
      TitleScreen.add(ClickToPlay);

      Hamburger = createSprite(width/2-200, 830);
      Hamburger.addImage(MenuBtnImg);
      TitleScreen.add(Hamburger);

      SpawnOnce = true;
    }

    image(Car1, width/2, height/2-30);
    image(Car3, width/2-200, height/2+35);
    image(Car2, width/2, height/2+300);
    
    ClickToPlay.onMouseReleased = function() {
      if(!Customisation & !Settings) {
        GameMode = 1; //Level Select
        SpawnOnce = false;
        TitleScreen.removeSprites();
      }
    }
  }
  
  //Level Select Screen
  else if(GameMode == 1) {
    textSize(32);
    background(LevelSelectImg);

    if(!Customisation & !Settings) {
    
      if(!SpawnOnce) {
        LevelOneBtn = createSprite(290,780,60,60);
        LevelOneBtn.visible = 0;
        LevelSelect.add(LevelOneBtn);

        BackButton = createSprite(50,830,50,50);
        BackButton.addImage(BackBtnImg);
        LevelSelect.add(BackButton);

        Hamburger = createSprite(width/2+200, 50);
        Hamburger.addImage(MenuBtnImg);
        LevelSelect.add(Hamburger);

        SpawnOnce = true;
      }

      LevelOneBtn.onMouseReleased = function() {
        GameMode = 2;
        Moves = 10;
        Path = "None";
        Pollution = 0;
        ClearedMenu = false;
        LevelOneComplete = false;
        LevelSelect.removeSprites();
        SpawnOnce = false;
      }

      BackButton.onMouseReleased = function() {
        SpawnOnce = false;
        GameMode = 0;
        LevelSelect.removeSprites();
      }
      
      if(Lvl1Completion < 1) {
        image(LevelCircle,260,750);

        image(ZeroStarCompleteImg,240,720);
      }
      else if(Lvl1Completion == 2){
        image(LevelCircleY,260,750);

        image(TwoStarCompleteImg,240,720);
      }
      else if(Lvl1Completion == 3){
        image(LevelCircleG,260,750);

        image(ThreeStarCompleteImg,240,720);
      }
      text("1",285,790);

      image(LevelCircle,130,670);
      text("2",153,710);

      image(LevelCircle,30,520);
      text("3",50,560);

      image(LevelCircle,190,430);
      text("4",210,470);

      image(LevelCircle,390,360);
      text("5",410,400);
    }
  }

  //In-game
  else if (GameMode == 2) {
    background(LevelOneImg);
    PowerUpImg.resize(30,60);
    image(PowerUpImg,240,760);
    CO2BarImg.resize(300,80);
    image(CO2BarImg, width/2-150, 30);
    SmokeImg.resize(5,20);
    image(SmokeImg,width/2-140, 60, Pollution*6);

    if(!Customisation & !Settings) {

      if(!SpawnOnce) {
        Fuel = createSprite(50,780);
        Fuel.addImage("10", EnergyTank10);
        Fuel.addImage("9", EnergyTank09);
        Fuel.addImage("8", EnergyTank08);
        Fuel.addImage("7", EnergyTank07);
        Fuel.addImage("6", EnergyTank06);
        Fuel.addImage("5", EnergyTank05);
        Fuel.addImage("4", EnergyTank04);
        Fuel.addImage("3", EnergyTank03);
        Fuel.addImage("2", EnergyTank02);
        LevelOne.add(Fuel);

        Hamburger = createSprite(50, 50);
        Hamburger.addImage(MenuBtnImg);
        LevelOne.add(Hamburger);

        //Top Path
        TopPath1 = createSprite(110,530);
        TopPath1.addImage(RadioBtnImg);
        TOPWAY.add(TopPath1);

        TopPath2 = createSprite(185,580);
        TopPath2.addImage(RadioBtnImg);
        TOPWAY.add(TopPath2);

        TopPath3 = createSprite(310,530);
        TopPath3.addImage(RadioBtnImg);
        TOPWAY.add(TopPath3);

        TopPath4 = createSprite(310,440);
        TopPath4.addImage(RadioBtnImg);
        LevelOne.add(TopPath4);

        TopPath5 = createSprite(310,360);
        TopPath5.addImage(RadioBtnImg);
        LevelOne.add(TopPath5);

        TopPathFinal = createSprite(410,330);
        TopPathFinal.addImage(RadioBtnImg);
        LevelOne.add(TopPathFinal);

        //Bottom Path
        BottomPath1 = createSprite(110,700);
        BottomPath1.addImage(RadioBtnImg);
        BOTTOMWAY.add(BottomPath1);
        
        BottomPath2 = createSprite(310,700);
        BottomPath2.addImage(RadioBtnImg);
        BOTTOMWAY.add(BottomPath2);

        BottomPath3 = createSprite(475,700);
        BottomPath3.addImage(RadioBtnImg);
        BOTTOMWAY.add(BottomPath3);

        BottomPath4 = createSprite(475,600);
        BottomPath4.addImage(RadioBtnImg);
        BOTTOMWAY.add(BottomPath4);

        BottomPath5 = createSprite(450,450);
        BottomPath5.addImage(RadioBtnImg);
        BOTTOMWAY.add(BottomPath5);

        //Car
        Car = createSprite(50,700);
        Car.addImage("Default", Car1);
        Car.addImage("2", Car2); 
        Car.addImage("3", Car3);      

        Moves = 10;
        SpawnOnce = true;
      }

      //Car Customisation
      if(Skin === "Default") {
        Car.changeImage("Default");
      }
      else if(Skin === "2") {
        Car.changeImage("2");
      }
      else if(Skin === "3") {
        Car.changeImage("3");
      }

      if(Moves == 10) Fuel.changeImage("10");
      else if(Moves == 9) Fuel.changeImage("9");
      else if(Moves == 8) Fuel.changeImage("8");
      else if(Moves == 7) Fuel.changeImage("7");
      else if(Moves == 6) Fuel.changeImage("6");
      else if(Moves == 5) Fuel.changeImage("5");
      else if(Moves == 4) Fuel.changeImage("4");
      else if(Moves == 3) Fuel.changeImage("3");
      else if(Moves == 2) Fuel.changeImage("2");

      //Starting Path ways Choice
      TopPath1.onMouseReleased = function() {
        if(Path === "None") {
          Car.position.x = this.position.x;
          Car.position.y = this.position.y;
          this.remove();
          BOTTOMWAY.removeSprites();
          Moves -= 1;
          Pollution += 5;
          Path = "Top";
        }
      }

      BottomPath1.onMouseReleased = function() {
        if(Path === "None") {
          Car.position.x = this.position.x;
          Car.position.y = this.position.y;
          this.remove();
          TOPWAY.removeSprites();
          Pollution += 5;
          Moves -= 1;
          Path = "Bottom";
        }
      }

      //Top Path way
      TopPath2.onMouseReleased = function() {
        if(Path === "Top") {
          Car.position.x = this.position.x;
          Car.position.y = this.position.y;
          this.remove();
          Pollution += 5;
          Moves -= 1;
        }
      }

      TopPath3.onMouseReleased = function() {
        if(Path === "Top") {
          if(TopPath2.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
          }
        }
      }

      //Bottom Path way
      BottomPath2.onMouseReleased = function() {
        if(Path === "Bottom") {
          Car.position.x = this.position.x;
          Car.position.y = this.position.y;
          this.remove();
          Pollution += 5;
          Moves -= 1;
        }
      }

      BottomPath3.onMouseReleased = function() {
        if(BottomPath2.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
        }
      }

      BottomPath4.onMouseReleased = function() {
        if(BottomPath3.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
        }
      }

      BottomPath5.onMouseReleased = function() {
        if(BottomPath4.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
        }
      }

      //Middle Path way
      TopPath4.onMouseReleased = function() {
        if(BottomPath5.removed && TopPath3.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
        }
      }

      TopPath5.onMouseReleased = function() {
        if(TopPath4.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            Moves -= 1;
        }
      }

      //Final
      TopPathFinal.onMouseReleased = function() {
        if(TopPath5.removed) {
            Car.position.x = this.position.x;
            Car.position.y = this.position.y;
            this.remove();
            Pollution += 5;
            LevelOneComplete = true;
            Moves -= 1;
        }
      }

      if(LevelOneComplete) {
        Car.remove();
        ThreeStar.resize(400,400);
        TwoStar.resize(400,400);

        if(!ClearedMenu) {
          ContinueBtn = createSprite(width/2,height/2+100,240,60);
          ContinueBtn.visible = 0;
          LevelOne.add(ContinueBtn);
          ClearedMenu = true;
        }

        if(Path=="Top") {
          image(ThreeStar,60,180);
          Lvl1Completion = 3;
        }
        else if(Path=="Bottom") {
          image(TwoStar,60,180);
          Lvl1Completion = 2;
        }

        ContinueBtn.onMouseReleased = function() {
          SpawnOnce = false;
          LevelOne.removeSprites();
          GameMode = 1;
        }
      }
    }

  }

  if(Settings) {
    if(!SpawnMenuC) {
      SpawnMenu = true;

      MenuScreen = createSprite(width/2,height/2);
      MenuImg.resize(502,856);
      MenuScreen.addImage(MenuImg);
      SettingMenu.add(MenuScreen);

      CustomisationBtn = createSprite(width/2,225,200,90);
      CustomisationBtn.visible = 0;
      SettingMenu.add(CustomisationBtn);

      BackButton = createSprite(10,30,50,35);
      BackButton.visible = 0;
      SettingMenu.add(BackButton);
    }

    CustomisationBtn.onMouseReleased = function() {
      // Settings = false;
      // SpawnMenuC = false;
      Customisation = true;
      // SettingMenu.removeSprites();
    }

    BackButton.onMouseReleased = function() {
      Settings = false;
      SpawnMenu = false;
      SettingMenu.removeSprites();
    }
  }

  if(Customisation) {
    if(!SpawnMenuC) {
      CustomisationScreen = createSprite(width/2,height/2);
      CustomisationScreen.addImage(CustomisationMenuImg);
      CustomisationMenu.add(CustomisationScreen);

      BackButton = createSprite(30,50,50,50);
      BackButton.addImage(BackBtnImg);
      CustomisationMenu.add(BackButton);

      CarOne = createSprite(350,580,300,200);
      CarOne.visible = 0;
      CustomisationMenu.add(CarOne);

      CarTwo = createSprite(400,750,150,120);
      CarTwo.visible = 0;
      CustomisationMenu.add(CarTwo);

      CarThree = createSprite(180,750,170,120);
      CarThree.visible = 0;
      CustomisationMenu.add(CarThree);

      SelectText = createSprite(width/2,150);
      SelectText.addImage("One", Pink);
      SelectText.addImage("Two", Yellow);
      SelectText.addImage("Three", Blue);
      CustomisationMenu.add(SelectText);

      Settings = false;
      SpawnMenuC = true;
    }

    if(Skin === "Default") {
      SelectText.changeImage("One");
    }
    else if(Skin === "2") {
      SelectText.changeImage("Two");      
    }
    else if(Skin === "3") {
      SelectText.changeImage("Three");      
    }

    CarOne.onMouseReleased = function() {
      Skin = "Default"
    }
    CarTwo.onMouseReleased = function() {
      Skin = "2"
    }
    CarThree.onMouseReleased = function() {
      Skin = "3"
    }

    BackButton.onMouseReleased = function() {
      Customisation = false;
      SpawnMenuC = false;
      CustomisationMenu.removeSprites();
    }
  }

  Hamburger.onMouseReleased = function() {
    Settings = true;
    SpawnMenu = false;
  }

  drawSprites();
}