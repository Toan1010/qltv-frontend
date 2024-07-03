import Image from "next/image";
import Link from "next/link";

// components/Card.tsx
type CardProps = {
  title: string;
  imageUrl?: string;
};

const Card: React.FC<CardProps> = ({
  title = "test",
  imageUrl = "image_217480.jpg",
}) => {
  return (
    <Link
      className="w-[210px] h-[310px] rounded overflow-hidden shadow-lg bg-blue-500"
      href={"/library/detail"}
    >
      {imageUrl && (
        <div className="relative w-full h-64">
          <Image
            className="object-cover"
            src={imageUrl}
            alt="Card image"
            sizes={'w'}
            fill
            priority
          />
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </Link>
  );
};

export default Card;
