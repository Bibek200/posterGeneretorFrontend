import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Rnd } from 'react-rnd';
import axios from 'axios';
// import { customerAPI } from '../services/api'; 

const Upload = () => {
  const [category, setCategory] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const [posterSrc, setPosterSrc] = useState('');
  const [logoSrc, setLogoSrc] = useState('');
  const [textValue, setTextValue] = useState('Your Text');
  const [textSize, setTextSize] = useState(16);
  // const [customers, setCustomers] = useState([]);
  

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  const [elements, setElements] = useState({
    logo: { x: 50, y: 50, width: 100, height: 100 },
    text: { x: 150, y: 150, width: 150, height: 40 },
  });

  

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!category) {
      toast.error('Please select a category first!');
      return;
    }
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setPosterSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const combineImageWithElements = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const posterImg = new Image();
    posterImg.src = posterSrc;

    return new Promise((resolve) => {
      posterImg.onload = async () => {
        canvas.width = 400;
        canvas.height = 560;

        ctx.drawImage(posterImg, 0, 0, canvas.width, canvas.height);

        if (logoSrc) {
          const logoImg = new Image();
          logoImg.src = logoSrc;
          await new Promise((resolveImg) => {
            logoImg.onload = () => {
              ctx.drawImage(
                logoImg,
                elements.logo.x,
                elements.logo.y,
                elements.logo.width,
                elements.logo.height
              );
              resolveImg();
            };
          });
        }

        if (textValue) {
          ctx.font = `${textSize}px Arial`;
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textX = elements.text.x + elements.text.width / 2;
          const textY = elements.text.y + elements.text.height / 2;
          ctx.fillText(textValue, textX, textY);
        }

        const combinedImage = canvas.toDataURL('image/png');
        resolve(combinedImage);
      };
    });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (!posterSrc) {
      toast.error('Please upload a poster image!');
      return;
    }
    if (!category) {
      toast.error('Please select a category!');
      return;
    }
    
  
    try {
      const combinedImageBase64 = await combineImageWithElements();
      const response = await fetch(combinedImageBase64);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append('category', category);
     
     // formData.append('image', posterFile); 
     formData.append('image', blob, 'poster.png');

  
      formData.append(
        'placeholders',
        JSON.stringify(
          Object.entries(elements).map(([key, value]) => ({
            key,
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height,
          }))
        )
      );
  
      const res = await axios.post('/api/posters/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Poster uploaded successfully!');
      console.log('Server response:', res.data);
    } catch (error) {
      toast.error('Failed to upload poster.');
      console.error('Upload error:', error);
    }
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!posterSrc) {
      toast.error('Please upload a poster image!');
      return;
    }
    if (!category) {
      toast.error('Please select a category!');
      return;
    }
  
    try {
      const combinedImageBase64 = await combineImageWithElements();
      const response = await fetch(combinedImageBase64);
      const blob = await response.blob(); // ✅ Get the blob of the combined image
  
      const formData = new FormData();
      formData.append('category', category);
  
      // ✅ Use the blob of the combined image instead of the raw posterFile
      formData.append('image', blob, 'poster.png');
  
      formData.append(
        'placeholders',
        JSON.stringify(
          Object.entries(elements).map(([key, value]) => ({
            key,
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height,
          }))
        )
      );
  
      const res = await axios.post('/api/posters/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Poster uploaded successfully!');
      console.log('Server response:', res.data);
    } catch (error) {
      toast.error('Failed to upload poster.');
      console.error('Upload error:', error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Upload Your Poster</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Select Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">-- Choose Category --</option>
                <option value="offers">Offers</option>
                <option value="events">Events</option>
                <option value="festivals">Festivals</option>
              </select>

              

              <label className="block mt-4 mb-2 font-medium text-gray-700">Upload Poster Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <label className="block mt-4 mb-2 font-medium text-gray-700">Upload Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              /> 

              <label className="block mt-4 mb-2 font-medium text-gray-700">Enter Text</label>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <label className="block mt-4 mb-2 font-medium text-gray-700">Text Size</label>
              <input
                type="range"
                min="10"
                max="48"
                value={textSize}
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Poster
              </button>
            </div>

            {/* Poster Preview */}
            <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden">
              {posterSrc && (
                <div
                  ref={wrapperRef}
                  className="relative"
                  style={{
                    backgroundImage: `url(${posterSrc})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '400px',
                    height: '560px',
                  }}
                >
                  {logoSrc && (
                    <Rnd
                      bounds="parent"
                      size={{ width: elements.logo.width, height: elements.logo.height }}
                      position={{ x: elements.logo.x, y: elements.logo.y }}
                      onDragStop={(e, d) =>
                        setElements((prev) => ({
                          ...prev,
                          logo: { ...prev.logo, x: d.x, y: d.y },
                        }))
                      }
                      onResizeStop={(e, direction, ref, delta, position) =>
                        setElements((prev) => ({
                          ...prev,
                          logo: {
                            ...prev.logo,
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                            ...position,
                          },
                        }))
                      }
                    >
                      <img
                        src={logoSrc}
                        alt="Logo"
                        className="w-full h-full object-contain border border-indigo-500 rounded"
                      />
                    </Rnd>
                  )}

                  {textValue && (
                    <Rnd
                      bounds="parent"
                      size={{ width: elements.text.width, height: elements.text.height }}
                      position={{ x: elements.text.x, y: elements.text.y }}
                      onDragStop={(e, d) =>
                        setElements((prev) => ({
                          ...prev,
                          text: { ...prev.text, x: d.x, y: d.y },
                        }))
                      }
                      onResizeStop={(e, direction, ref, delta, position) =>
                        setElements((prev) => ({
                          ...prev,
                          text: {
                            ...prev.text,
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                            ...position,
                          },
                        }))
                      }
                    >
                      <div
                        className="w-full h-full flex items-center justify-center border border-dashed border-indigo-400 rounded bg-white bg-opacity-80"
                        style={{ fontSize: `${textSize}px` }}
                      >
                        {textValue}
                      </div>
                    </Rnd>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default Upload;
