// Import LLM app
import {LLM} from "../llm.js/llm.js";

// State variable to track model load status
var model_loaded = false;

// Initial Prompt
var initial_prompt = `<|im_start|>user
List Marvel superhero names.<|im_end|>
<|im_start|>assistant
`

var json_schema = '{"type": "array","items": {"type": "string"},"minItems": 2,"maxItems": 5}'

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
            top_k: 1,
            context_size: 128,
            max_token_len: 128,
            json_schema: json_schema
        });
        clearInterval(checkInterval);
    } else{
        console.log('Waiting...')
    }
}