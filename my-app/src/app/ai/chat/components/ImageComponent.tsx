import Image from "next/image";

const ImageComponent = ({ url }: { url: string }) => {

  return (
    <div>
      <img
        src={url}
        alt="Generated Image"
        width={500} // Replace with actual width of the image
        height={500} // Replace with actual height of the image
        style={{ objectFit: "cover" }} // Adjust this if needed
      />
    </div>
  );
};

export default ImageComponent;
 