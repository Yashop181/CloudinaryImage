import { useState } from "react";
import axios from "axios";
const ImageUpload = () => {
    const [image, setImage] = useState(null);  // holding selected file
    const [loading, setLoading] = useState(false); // uploading in progress
    const [imageUrl, setImageUrl] = useState(''); // holding the url of uploaded image 

    const handleImageChange = (e) =>{
        setImage(e.target.files[0]); // selected image update with the chosen file
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!image) return; //image is selected or not
        setLoading(true); //uploading image in progress

    const formData =  new FormData();
    formData.append('file',image); // appending in
    formData.append('upload_preset','process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET');  //  upload your preset here remove quotes if uploading with env 

    try{
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData // uploading to cloudinary with the formData also upload the cloudname between /v1_1/here upload it/
        );
        setImageUrl(response.data.secure_url) //successful upload 
        setLoading(false); // resets the loading state
    }
    catch(error)
    {
        console.error('Error Uploading the image', error);
        setLoading(false)
    }
    }

    return (
    <div>
        <h3>Upload Image</h3>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'} </button> 
            {/* submit button is disabled while loading is true  and display a loading message if loading is true */}
        </form>
        {/* displaying the uploaded image  */}
        {imageUrl && (

            <div>
                <h3>uploaded Image</h3>
                <img src={imageUrl} alt="uploaded" width="400px" height="400px" />
            </div>
        )}
    </div>
  )
}

export default ImageUpload
