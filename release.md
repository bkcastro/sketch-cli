# Document to track release updates

## June 2026 Version: 0.0.1

+ [x] Upload project to github.
+ [x] File server.
+ [x] Core commands implemented: 
    1. Serve: start up the file server.
    2. Who: print information about the sketchbook.
    3. Init: initialize a sketchbook.
    4. Help: print help text.
    5. Templates: print templates.
+ [x] Core flags implemented: 
    1. Iterate: iterate on sketches.
    2. Tempalte: select a template to use.
+ [x] Default commmand creates a sketch project.

## July 2026 Version: 0.0.2

+ Unit test for core commands.
    + [x] Init.
    + [ ] Sketch.
    + [ ] Serve.
+ New templates: 
    + [x] 3D.
    + [x] 2D_Camera.
    + [x] 2D_Hand_Tracking.
    + [ ] WebXR.
+ [x] Add descriptions to templates.
+ [ ] Refactor server code.
    + [ ] HTTPS support.
    + [ ] Improve UI.
+ [ ] Remove figlet.
+ [ ] Add the feature of being able to pick which sketch to iterate on like so: `sketch -i 0002`.
