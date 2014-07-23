
// Saves options to localStorage.
function save_options() {
    var debug_select = document.getElementById("debug_mode"),
        env_select = document.getElementById("env_mode"),
        status = document.getElementById("status"),
        alt_id = document.getElementById("alt_id");

    localStorage["debug_mode"] = debug_select.children[debug_select.selectedIndex].value;
    localStorage["env_mode"] = env_select.children[env_select.selectedIndex].value;
    localStorage["alt_id"] = alt_id.value;

    status.innerHTML = "Options Saved.";
    setTimeout(function() {
    status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var child, i, debug_mode = localStorage["debug_mode"],
        env_mode = localStorage["env_mode"],
        debug_select = document.getElementById("debug_mode"),
        env_select = document.getElementById("env_mode");

    if (debug_mode) {
        for (i = 0; i < debug_select.children.length; i++) {
            child = debug_select.children[i];
            if (child.value == debug_mode) {
              child.selected = "true";
              break;
            }
        }
    }
    
    if (env_mode) {
        for (i = 0; i < env_select.children.length; i++) {
            child = env_select.children[i];
            if (child.value == env_mode) {
              child.selected = "true";
              break;
            }
        }
    }

    form_handler();

}

// Handles form submission
function form_handler() {
    var btn = document.getElementById("save");
    
    btn.onclick = save_options;
}

restore_options();
