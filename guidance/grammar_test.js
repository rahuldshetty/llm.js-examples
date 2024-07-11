// Import LLM app
import {LLM} from "../llm.js/llm.js";

// State variable to track model load status
var model_loaded = false;

// Initial Prompt
var initial_prompt = `<|im_start|>user
List 9 planets in the Solar System<|im_end|>
<|im_start|>assistant
`

var grammar = `root ::= item+

# Excludes various line break characters
item ::= "- " ([a-zA-Z]+){1,10} "\n"
`

// Callback functions
const on_loaded = () => { 
    model_loaded = true; 
}
const write_result = (text) => { document.getElementById('result').innerText += text + "\n" }
const run_complete = () => {}

// Configure LLM app
const app = new LLM(
     // Type of Model
    'GGUF_CPU',

    // Model URL
    'https://huggingface.co/Qwen/Qwen2-0.5B-Instruct-GGUF/resolve/main/qwen2-0_5b-instruct-q4_0.gguf',

    // Model Load callback function
    on_loaded,          

    // Model Result callback function
    write_result,       

     // On Model completion callback function
    run_complete       
);

// Download & Load Model GGML bin file
app.load_worker();

// Trigger model once its loaded
const checkInterval = setInterval(timer, 5000);

function timer() {
    if(model_loaded){
        app.run({
            prompt: initial_prompt,
            grammar: grammar,
            context_size: 512,
            max_token_len: 256
        });
        clearInterval(checkInterval);
    } else{
        console.log('Waiting...')
    }
}