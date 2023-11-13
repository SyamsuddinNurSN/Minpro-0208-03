import { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    axios.post('/upload-profile-picture', formData)
      .then((response) => {
        // Handle respons dari server
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Unggah Foto Profil</button>
    </div>
  );
};

export default ProfilePictureUpload;
