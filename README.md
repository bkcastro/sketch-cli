# Sketchbook

Sketchbook is a tool that helps create art with code.

[sketchbook_demo_2.webm](https://github.com/user-attachments/assets/ce05dadb-9a61-4e3d-9f10-44bcfe700138)

## Creative process

What is a creative process? An iterative process which generates ideas, develops them, and brings them to life. 

Sketchbook makes use of a process called [ZettleKasten](https://en.wikipedia.org/wiki/Zettelkasten) invented by [Nkilas Luhman](https://en.wikipedia.org/wiki/Niklas_Luhmann). But instead of taking notes we create **sketches**. 

A simple sketchbook will look like this:

```
My_Sketchbook/
    0001/                       <-- First sketch ever created 
        sketch/                 <-- Source files of sketch 0001
        0001/                   <-- First iteration of sketch 0001
            sketch/             <-- Source files of sketch 0001/0001
        0002/                   <-- Seconed iteration of sketch 0001
            sketch/             <-- Source files of sketch 0001/0002
            0001/               <-- First iteration of sketch 0001/0002
                sketch/         <-- Source files of sketch 0001/0002/0001
    0002/                       <-- Folder of sketch 0002 
        sketch/                 <-- Source files of sketch 0002
        0001/                   <-- First iteration of sketch 0002
            sketch/             <-- Source files of sketch 0002/0001
    ...
```

## Getting started

Run the command `sketch init` to make your first sketchbook. Then `cd` to the folder created to get started.

#### Making your first sketch

Once's you have an idea for a sketch just run the command `sketch new` to create one. Two folders will be created `0001` and `0001/sketch`. The `0001/sketch` folder will be populated with basic files needed to render a blank html page. Folder `0001/sketch` holds the source files needed to render your sketch and folder `0001` is there to store the `sketch` folder and future iterations (more on this down below).

```
My_Sketchbook/
    0001/
        sketch/
            index.html
            script.js
            style.css
```

Use any text editor and start hacking away.

To see your sketches run the command `sketch server` in the root directory of your sketchbook. To learn more reference the server section down below.

#### Iterate

The power of this creative process is the ability to iterate on ideas. At any point when you want to explore another idea use this command `sketch iterate`, an exact copy of the current sketch will be created. Make sure you are in the directory of the sketch you want to iterate. For example to iterate on `0001` `cd` to `0001/` and run the command. 

Don't `cd` to `0001/sketch/`, folders named **sketch*** cannot hold iterations.

```
My_Sketchbook/
    0001/
        sketch/
            ...
        0001/           // Iteration just created.
            sketch/
```

##### Tips

Don't hold back on making iterations! It is best if you just capture the essence of a sketch/idea/concept then iterate on it so you can reference it later.

## Sketch

A sketch is a simple idea that can be rendered on a bowser. It is up to the user to defined what they wish to represent.

## Server

Sketchbook has a built-in custom file server. This tool is handy when trying to come up with new ideas. To obtain a holistic view, open up different sketches and move them around the computer screen (assuming a display manger is being used). Then sit back and channel the creative forces.

There are two modes available.

### Reference

Reference mode uses a tree to represent a sketchbook. 

### Display 

Display mode uses the thumbnail image found inside the folder's named `sketch` **if it exists**. It is up to the user to capture their sketch and place it in the directory and name it `thumbnail.webp`. 

```
My_Sketchbook/
    0001/
        sketch/
            index.html      
            style.css
            script.js
            thumbnail.webp     <- Image used by the display server.
        0001/
            ...
    0002/
    ...
```
