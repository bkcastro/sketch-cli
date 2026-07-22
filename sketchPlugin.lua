-- Mapping : Command 
-- /S : sketch
-- /si : sketch -i -v
-- /sI : cd sketch -i -v
-- /st : sketch -t -v  // iteractive

-- ~/.config/nvim/plugin/sketch.lua

-- Helper function to handle creation, optional cd, and opening
local function create_sketch(args, change_dir)
    local cmd = { "sketch" }
    table.insert(args, "-v")
    if args then
        for _, arg in ipairs(args) do
            table.insert(cmd, arg)
        end
    end

    local folder_path = vim.trim(vim.fn.system(cmd))

    if vim.v.shell_error ~= 0 or folder_path == "" then
        vim.notify("Sketch creation failed: " .. folder_path, vim.log.levels.ERROR)
        return
    end

    -- Change Neovim's current working directory to the new folder
    if change_dir then
        vim.api.nvim_set_current_dir(folder_path)
        vim.notify("CWD changed to: " .. folder_path, vim.log.levels.INFO)
    end

    -- Open the folder in explorer mode
    vim.cmd.edit(vim.fn.fnameescape(folder_path))
end

-- Register User Command: :Sketch
vim.api.nvim_create_user_command("Sketch", function(opts)
    create_sketch(opts.fargs, false)
end, {
    nargs = "*",
    desc = "Create sketch folder and open it",
})

-- Keymap \ + s: Create & open (keeps existing CWD)
vim.keymap.set("n", "\\si", function()
    create_sketch({"-i"}, false)
end, { desc = "Create sketch", silent = true })

-- Keymap \ + s + Shift+i: Create, cd into folder, & open
vim.keymap.set("n", "\\sI", function()
    create_sketch({"-i"}, true)
end, { desc = "Create sketch and change CWD", silent = true })
