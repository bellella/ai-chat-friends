const Avatar = ({ image, altText = 'avatar' }) => {
    return (
      <div className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-200">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={altText}
        />
      </div>
    );
  };

  export default Avatar;