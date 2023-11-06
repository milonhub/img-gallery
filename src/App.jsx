import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Sortable from "sortablejs";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("images.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);

        // Initialize Sortable with onUpdate callback
        const sortable = new Sortable(containerRef.current, {
          animation: 150,
          // eslint-disable-next-line no-unused-vars
          onStart: (event) => {
            // Get the first item before dragging starts
            const items = containerRef.current.querySelectorAll(".hero");
            if (items.length > 1) {
              items[0].classList.remove("col-span-2", "row-span-2");
            }
          },
          // eslint-disable-next-line no-unused-vars
          onUpdate: (event) => {
            // Get the new first item after the drag operation
            const items = containerRef.current.querySelectorAll(".hero");
            if (items.length > 1) {
              items[0].classList.add("col-span-2", "row-span-2");
            }
          },
        });

        return () => {
          // Clean up the Sortable instance when the component unmounts
          sortable.destroy();
        };
      });
  }, []);

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDelete = () => {
    const showableImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(showableImages);
    toast.success(`${selectedImages.length} Images Deleted`);
  };

  return (
    <div>
      <Toaster />
      <div className="flex items-center justify-between py-2 px-6 border-b mb-6">
        <h2 className="font-bold text-2xl">
          {selectedImages.length ? `${selectedImages.length} Images Selected` : "Gallery"}
        </h2>
        <button className="btn btn-ghost text-lg font-medium normal-case" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6">
        {images?.map((image, index) => (
          <div
            key={image.id}
            className={`hero border rounded-xl overflow-hidden relative grid ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img src={image.url} alt="" />
            <div className="hero-overlay bg-black/0 hover-bg-black/40 transition duration-700 ease-in-out z-20"></div>
            <input
              checked={selectedImages.includes(image.id)}
              onChange={() => toggleImageSelection(image.id)}
              type="checkbox"
              className="bg-white checkbox absolute top-6 left-6 z-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
