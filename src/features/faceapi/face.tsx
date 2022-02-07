import * as faceapi from "face-api.js";

// Load models and weights
export async function loadModels() {
  const MODEL_URL = "/models";
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);
}

export async function getFullFaceDescription(
  refImgCanvas: any
): Promise<any[]> {
  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(refImgCanvas, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true)
    .withFaceDescriptors();

  //Detectando similaridad
  const imgEle = document.createElement("img");
  imgEle.src = "/yo.jpg";
  let refe = await faceapi
    .detectAllFaces(imgEle, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true)
    .withFaceDescriptors();

  if (fullDesc.length !== 0) {
    const faceMatcher = new faceapi.FaceMatcher(fullDesc);

    if (refe) {
      const bestMatch = faceMatcher.findBestMatch(refe[0].descriptor);
      console.log(bestMatch);
    }
  }

  console.log(refe, "holaa", fullDesc);
  return fullDesc;
}
