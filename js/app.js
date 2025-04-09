window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
  
    const createScene = function() {
      const scene = new BABYLON.Scene(engine);
      scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
      scene.collisionsEnabled = true;
  
      // Caméra
      const camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 2.5, 5), scene);
      camera.applyGravity = true;
      camera.checkCollisions = true;
      camera.speed = 0.5;
      camera.angularSensibility = 1000;
      camera.keysUp = [90];    // Z
      camera.keysDown = [83];  // S
      camera.keysLeft = [81];  // Q
      camera.keysRight = [68]; // D
      camera.attachControl(canvas);
  
      // Lumière
      const light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 0), scene);
      light.diffuse = new BABYLON.Color3(1, 1, 1);
      light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
      light.intensity = 1.5;
  
      // Sol
      const ground = BABYLON.Mesh.CreatePlane("ground", 50, scene);
      ground.rotation.x = Math.PI / 2;
      ground.checkCollisions = true;
      ground.material = new BABYLON.StandardMaterial("gMaterial", scene);
      ground.material.diffuseTexture = new BABYLON.Texture("img/ground.jpg", scene);
      ground.material.diffuseTexture.uScale = 30;
      ground.material.diffuseTexture.vScale = 30;
  
      // Texture des cubes
      const boxMaterial = new BABYLON.StandardMaterial("bMaterial", scene);
      boxMaterial.diffuseTexture = new BABYLON.Texture("img/box.avif", scene);
  
      // Ajout de caisses
      const cubeSize = 2;
      for (let i = 0; i < 4; i++) {
        const box = BABYLON.Mesh.CreateBox("box", cubeSize, scene);
        const randomX = Math.floor(Math.random() * 31) - 15;
        const randomZ = Math.floor(Math.random() * 31) - 15;
        box.position = new BABYLON.Vector3(randomX, cubeSize / 2, randomZ);
        box.checkCollisions = true;
        box.material = boxMaterial;
      }
  
      return scene;
    };
  
    const scene = createScene();
  
    engine.runRenderLoop(function() {
      scene.render();
    });
  
    window.addEventListener('resize', function() {
      engine.resize();
    });
  });
  