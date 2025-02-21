import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

class PipelineSingleton {
    static task = "summarization";
    static model = "Dohyeoplim/kobart-summary-v3-onnx";
    static instance = null;

    static async getInstance(progressCallback) {
        if (!this.instance) {
            try {
                const pipe = await pipeline(this.task, this.model, {
                    progress_callback: (progressInfo) => {
                        let progressMessage = "";

                        if (
                            progressInfo &&
                            progressInfo.loaded != null &&
                            progressInfo.total != null &&
                            progressInfo.total > 0
                        ) {
                            const percentage =
                                (progressInfo.loaded / progressInfo.total) *
                                100;
                            progressMessage = `${percentage.toFixed(0)}%`;
                        } else {
                            progressMessage = progressInfo
                                ? JSON.stringify(progressInfo)
                                : "";
                        }

                        if (progressCallback) {
                            progressCallback({
                                status: "progress",
                                message: progressMessage,
                            });
                        }
                    },
                });
                this.instance = pipe;
            } catch (error) {
                console.error("Error loading model:", error);
                throw new Error("Error loading model.");
            }
        }
        return this.instance;
    }
}

self.addEventListener("message", async (event) => {
    try {
        const summarization = await PipelineSingleton.getInstance(
            (progress) => {
                self.postMessage(progress);
            }
        );

        const output = await summarization(event.data.text, {
            max_new_tokens: 120,
            min_new_tokens: 100,
            early_stopping: true,
            length_penalty: 2,
            num_beams: 6,
            do_sample: true,
            top_k: 50,
            top_p: 0.95,
            temperature: 0.7,
        });

        self.postMessage({
            status: "complete",
            output,
        });
    } catch (error) {
        self.postMessage({
            status: "error",
            message: error.message,
        });
    }
});
