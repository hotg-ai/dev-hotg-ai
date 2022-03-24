const fs = require("fs");
const path = require("path");

const docs = path.join(__dirname, "docs");
const tutorials = path.join(docs, "rune", "tutorials");

const lessons = fs
  .readdirSync(tutorials)
  .filter(
    (dir) =>
      dir.includes("lesson-") &&
      fs.existsSync(path.join(tutorials, dir, "README.md"))
  )
  .map((dir) => path.join("rune", "tutorials", dir, "README"));

module.exports = {
  docs: [
    {
      type: "category",
      label: "What is HOT-G",
      collapsed: true,
      items: [
        "hot-g/welcome-to-tinyverse",
        "hot-g/what-hotg-has-created",
        "hot-g/where-can-hotg-help",
        "hot-g/how-will-this-benefit-you",
      ],
    },
    {
      type: "category",
      label: "Forge",
      collapsed: true,
      items: [
        "forge/overview", // <-- links to an existing template + general workflow (build with canvas, test, deploy, etc.)
        {
          type: "category",
          label: "Forge SDK",
          items: ["forge/javascript-sdk", "forge/dart-sdk", "forge/native-sdk"],
        },
        {
          type: "category",
          label: "Tutorial",
          items: ["forge/tutorial/lobe_ai"],
        },
        {
          type: "category",
          label: "Studio Pipeline Examples",
          collapsed: true,
          items: [
            "forge/pipeline/bird_classifier",
            "forge/pipeline/food",
            "forge/pipeline/gesture_recognition",
            "forge/pipeline/inception",
            "forge/pipeline/mobileNet",
            "forge/pipeline/person_detection",
            "forge/pipeline/plant_classifier",
            "forge/pipeline/yolo",
            "forge/pipeline/microspeech",
            "forge/pipeline/mobileBert",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Rune",
      collapsed: true,
      items: [
        "rune/overview",
        "rune/install",
        "rune/building-a-rune",
        {
          type: "category",
          label: "Tutorial",
          collapsed: true,
          items: lessons,
        },
      ],
    },
    {
      type: "category",
      label: "The Reference",
      collapsed: true,
      items: [
        "reference/runefile",
        "reference/capabilities",
        "reference/proc-blocks",
        "reference/models",
        "reference/outputs",
      ],
    },
    {
      type: "category",
      label: "For Rune Developers",
      items: ["internal/contributing"],
    },
    {
      type: "category",
      label: "Videos",
      collapsed: false,
      items: [
        "videos/Forge-overview",
        "videos/Proc-block",
        "videos/build-a-pipeline",
        "videos/test-your-pipeline-with-PWA",
        {
          type: "category",
          label: "TF-to-Tflite",
          collapsed: true,
          items: [
            "videos/TF-to-Tflite/model-optimization-techniques",
            "videos/TF-to-Tflite/quantization-techniques",
            "videos/TF-to-Tflite/testing-accuracy-of-quantization-techniques",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Cool Ideas",
      collapsed: true,
      items: ["cool-ideas/controlling-nodes"],
    },
  ],
};
