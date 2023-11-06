import { useState } from "react";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";


const App = () => {
const [images, setImages] = useState([]);
const [selectedImages, setSelectedImages] = useState([]);



  useEffect(() => {
    fetch("images.json")
      .then(res => res.json())
      .then(data => setImages(data))
  }, [])

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
    console.log(selectedImages);
  };

  const handleDelete = () => {
    const showableImages = images.filter(image => !selectedImages.includes(image.id));
    setImages(showableImages);
    toast.success(`${selectedImages.length} Images Deleted`)
  }
  return (
    <div>
      <Toaster />
      <div className="flex items-center justify-between py-2 px-6 border-b mb-6">
        <h2 className="font-bold text-2xl">{selectedImages.length ? `${selectedImages.length} Images Selected` : "Gallery"}</h2>
        <button className="btn btn-ghost text-lg font-medium normal-case" onClick={handleDelete}>Delete</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6">
        {/* <img className="col-span-2 row-span-2" src="https://i.ibb.co/S6RZfK9/image-10.jpg" alt="" /> */}

       
      
       {
          images?.map((image, index) => (
            <div
              key={image.id}
              className={`hero border rounded-xl overflow-hidden relative grid ${index === 0 ? 'col-span-2 row-span-2' : ''}`}

            >
              <img src={image.url} alt="" />

              <div className="hero-overlay bg-black/0 hover:bg-black/40 transition duration-700 ease-in-out"></div>
              <input
                checked={selectedImages.includes(image.id)}
                onChange={() => toggleImageSelection(image.id)}
                type="checkbox"
                className="bg-white checkbox absolute top-6 left-6 z-20" />

            </div>
          ))
        }
       
      
       
      </div>

    </div>
  );
};

export default App;
