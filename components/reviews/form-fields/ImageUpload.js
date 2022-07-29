import { useState, useEffect } from "react";
import ImagePreview from "./ImagePreview";
import ReviewCss from "../Review.module.css";
import data from "../../../data.json";
import axios from "axios";

export default function ImageUpload(props) {
  const [base64Images, setBase65Images] = useState([]);
  const [previewImageFiles, setPreviewImageFiles] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);
  const { setImageIds, setUploadingImage, imageIds } = props;
  // handle image upload
  const handleImageUpload = async (i) => {
    const baseUrl = data.apiUrl;

    const formData = new FormData();
    formData.append("image_base64", i);
    // let newImageIds = inputField.image_ids;
    const api_call = axios
      .post(`${baseUrl}reviews/images/`, formData)
      .then((res) => {
        console.log(res);
        // newImageIds.push(res.data.id);
        setUploadedImage((uploadedImage) => [...uploadedImage, i.length]);
        return res.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return Promise.resolve(api_call);
  };

  // remove all image from preview
  const removeAllImage = () => {
    setPreviewImageFiles([]);
    setBase65Images([]);
  };

  // clear the form
  const clearForm = () => {
    setInputField({ caption: "", image_ids: [] });
    removeAllImage();
    setToggleNewPost(false);
  };

  // convert image to base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // function to create object URL of images
  const createObjectURL = (file) => {
    return URL.createObjectURL(file);
  };

  // fileUploadHandler
  const handleImageSelect = (e) => {
    const files = e.target.files;
    const urlFiles = [];

    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(convertImageToBase64(files[i]));
      urlFiles.push(createObjectURL(files[i]));
    }
    Promise.all(urlFiles)
      .then((urls) => {
        setPreviewImageFiles((previewImageFiles) => [
          ...previewImageFiles,
          ...urls,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
    Promise.all(promises)
      .then((data) => {
        setBase65Images((base64Images) => [...base64Images, ...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(async () => {
      let promises = [];
      if (base64Images.length >= 1) {
        setUploadingImage(true);
        base64Images.forEach(async (i) => {
          console.log("uploadedImage", uploadedImage);
          if (!uploadedImage.includes(i.length)) {
            promises.push(handleImageUpload(i));
          }
        });
        Promise.all(promises).then((values) => {
          setImageIds((imageIds) => [...imageIds, ...values]);
          setUploadingImage(false);
        });
      }
    }, 3000);
  }, [base64Images]);

  return (
    <div className={ReviewCss.ReviewFormField}>
      <label className={ReviewCss.ReviewFormLabel} htmlFor="recommended">
        Do you have any photo you would like to upload ?
      </label>
      {previewImageFiles.length > 0 && (
        <ImagePreview
          files={previewImageFiles}
          removeAllImage={removeAllImage}
        />
      )}
      <div className={ReviewCss.FileInputContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-camera"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
        <span>Photo</span>
        <input
          type="file"
          accept="image/*"
          className={ReviewCss.fileInput}
          onChange={handleImageSelect}
        ></input>
      </div>
    </div>
  );
}
