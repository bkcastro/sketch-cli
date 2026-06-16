# Sketchbook

Sketchbook is a tool that helps create art with code.

[sketchbook_demo_2.webm](https://github.com/user-attachments/assets/ce05dadb-9a61-4e3d-9f10-44bcfe700138)

## Creative process

What is a creative process? An iterative process of generating ideas, developing them, and brining them to life. 

Sketchbook makes use of a process called [ZettleKasten](https://en.wikipedia.org/wiki/Zettelkasten) invented by Nkilas Luhman. But instead of taking notes on a concept or idea we create a **Sketch**. 

Take a look at this example diagram:

```
0001/
    0001/
        sketch/
    0002/
        0001/
            sketch/
        sketch/
    sketch/
0002/
    0001/
        sketch/
    sketch/
...
```

### How to use the process

First create a folder where your sketchbook will live. You can name it anything you want. Then `cd` to that directory.

#### Making a new sketch

Once's you have an idea for a sketch just run the command `sketch -n`. This command will create a new sketch like so: 

```
My_Sketchbook/
    0001/
        sketch/
            index.html
            script.js
            style.css
```

Then you can use any text editor and start hacking away.

#### Iterate

The power of this creative process is the ability to iterate on ideas. At any point when you want to explore another idea use this command `sketch -i` which will create an exact copy. Make sure you are in the directory of the sketch you want to iterate. For example to iterate on 0001/ `cd` to 0001/ and run the command. Don't `cd` to 0001/sketch/. 

```
My_Sketchbook/
    0001/
        sketch/
            ...
        0001/           // Iteration just created.
            sketch/
```

##### Tips

Don't hold back on creating iterations! It is best if you just capture the essence of a sketch/idea/concept then iterate on it so you can reference it later.

## Server 

### Reference

### Display 

