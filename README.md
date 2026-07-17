# sketch-cli

A cli scaffolding tool that helps create art with code. 

## What is a sketch? 

A sketch is a simple idea that can be rendered with a browser. This can be anything from generative art, UI/UX, images, 3D experiences, etc. It is up to the user to define what they wish to represent. 

## Getting started

Create a new directory, `cd` into it then run the command `sketch init` to initialize a **sketchbook**.

A **sketchbook** is just a directory that holds sketches.

A simple sketchbook with will look like this:

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

### First sketch

The command `sketch` to create your first sketch. Two folders are created `0001/` and `0001/sketch/`. Folder `0001/sketch/` contains all the files needed to render a sketch, the default is just a blank web page. And folder `0001/` is used to contain future iterations.

```
My_Sketchbook/
    0001/
        sketch/
            index.html
            script.js
            style.css
```

Use any text editor and start hacking away. 

Note: All files and resources should be kept inside the `sketch/` folder.

### Iterate

The flag `--iterate` or `-i` for short is used to iterate on the most recent sketch by default.

Running the command `sketch -i` produces this output:

```
My_Sketchbook/
    0001/
        sketch/             <-- Source files copied
            ...
    0002/                   <-- Iteration just created
        sketch/             <-- Exact copy of 0001/sketch 
            ...
```

There is another way to iterate, which involves moving into folder `0001/` and running the same command producing this output: 

```
My_Sketchbook/
    0001/
        sketch/             <-- Source files copied
            ...
        0001/               <-- Iteration just created
            sketch/         <-- Exact copy of 0001/sketch 
                ...
```

This method allows the parent sketch to act as a container. Usually used to continue a **theme**, but experiment with different forms, color, behavior, etc...

Note: Folders named `sketch/` cannot hold iterations or other folders named `sketch/`.

## Templates 

A new sketch can be created with a template by using the template flag like so: `sketch --template 3D`.

To list all templates run the command `sketch templates`.

## Server

[sketchbook_demo_2.webm](https://github.com/user-attachments/assets/ce05dadb-9a61-4e3d-9f10-44bcfe700138)

Sketches can be viewed by running the command `sketch serve`.

Tip: This tool comes in handy when trying to come up with new ideas. To obtain a holistic view, open up different sketches and move them around the computer screen. Then sit back and channel the creative forces.

There are two modes available.

### Reference

Reference mode is used to represent a sketchbook with a tree like data-structure.

### Display 

Display mode is used to represent a sketchbook with thumbnail images found inside the folders named `sketch/` **if they exists**. It is up to the user to take a screenshot of their sketch and place it in the directory. Image files that match this regular expression will be used `/^thumbnail\.[jpg|webp|png]{1}$/`. 

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
