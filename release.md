# sketch-cli release updates

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

+ Create unit test for core commands.
    + [x] Init.
    + [ ] Sketch.
    + [ ] Serve.
+ New templates: 
    + [x] 3D.
    + [x] 2D_Camera.
    + [x] 2D_Hand_Tracking.
    + [ ] WebXR.
+ [x] Add a description to each template.
+ [x] Add a --vim flag which changes the log output of the sketch and sketch -i commands so that it can be used by vim plugin script.
+ [x] Create a vim plugin with lua.
    - [x] Create a Sketch command wrapper.
    - [x] Map \si to: sketch -i, open the url, and open the new sketch with edit.
    - [x] Map \sI to: sketch -i, open the url, open the new sketch with edit and cwd to the new sketch directory.
+ [ ] FIX: Iterations should not copy thumbnail image.
+ [ ] Refactor server code.
    + [ ] HTTPS support.
    + [ ] Improve UI.
    + [ ] Dynamic image loading.
+ [ ] Remove figlet.
+ [ ] Add the feature of being able to pick which sketch to iterate on like so: `sketch -i 0002`.
