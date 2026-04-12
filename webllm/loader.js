const MODULE_CDN = 'https://esm.run/@mlc-ai/web-llm';
const DEFAULT_MODEL_ROOT = './webllm/models/gemma-4-E2B-it-q4f16_1-MLC';
const MODEL_ID = 'gemma-4-E2B-it-q4f16_1-MLC';
const MODEL_LIB_NAME = 'libs/gemma-4-E2B-it-q4f16_1-MLC-webgpu.wasm';

const normalizeRoot = (root) => root ? root.replace(/\/$/, '') : root;
const modelRoot = normalizeRoot((window.GEMMA4_MODEL_ROOT || DEFAULT_MODEL_ROOT).trim());
const modelLib = `${modelRoot}/${MODEL_LIB_NAME}`;

const statusReporter = (label, ready = false) => {
  window.gemmaTutorStatus = { label, ready };
  if (typeof window.updateTutorStatus === 'function') {
    window.updateTutorStatus();
  }
};

let enginePromise = null;
const ensureEngine = async () => {
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    if (!('gpu' in navigator)) {
      const message = 'WebGPU is unavailable in this browser';
      statusReporter(message, false);
      console.warn(message);
      return null;
    }
    try {
      statusReporter('Loading WebLLM runtime…', false);
      const { CreateMLCEngine } = await import(MODULE_CDN);
      statusReporter('Configuring Gemma 4 (WebLLM)…', false);
      const engine = await CreateMLCEngine(MODEL_ID, {
        appConfig: {
          model_list: [{
            model: modelRoot,
            model_id: MODEL_ID,
            model_lib: modelLib,
            required_features: ['shader-f16']
          }]
        },
        initProgressCallback(report) {
          const progressPct = typeof report?.progress === 'number'
            ? Math.round(report.progress)
            : null;
          const percentageLabel = progressPct !== null ? `${progressPct}%` : report?.text || 'loading';
          statusReporter(`Downloading Gemma 4… ${percentageLabel}`, false);
        }
      });
      statusReporter('Gemma 4 ready (WebLLM)', true);
      return engine;
    } catch (err) {
      const message = `Gemma 4 failed to load: ${err.message || err}`;
      statusReporter(message, false);
      console.error(message, err);
      return null;
    }
  })();
  return enginePromise;
};

window.gemmaTutor = async (prompt, opts = {}) => {
  if (!prompt) throw new Error('Gemma tutor requires a prompt');
  const engine = await ensureEngine();
  if (!engine) throw new Error('Gemma 4 WebLLM engine did not initialize');
  const systemHint = window.GEMMA4_SYSTEM_PROMPT || 'You are a trustworthy neonatal tutor that references a verified newborn exam chart and stays concise.';
  const completion = await engine.chat.completions.create({
    model: MODEL_ID,
    messages: [
      { role: 'system', content: systemHint },
      { role: 'user', content: prompt }
    ],
    temperature: opts.temperature ?? 0.2,
    top_p: opts.top_p ?? 0.95,
    max_tokens: opts.max_tokens ?? 256
  });
  const choice = completion?.choices?.[0];
  const text = choice?.message?.content ?? choice?.text ?? '';
  return (text || '').trim();
};

statusReporter('Waiting for WebLLM + Gemma', false);
window.gemmaTutorReady = ensureEngine();
